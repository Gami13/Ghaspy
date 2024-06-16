package endpoints

import (
	protoutils "ghaspy_server/src/protoUtils"
	"ghaspy_server/src/queries"
	"ghaspy_server/src/snowflake"
	"ghaspy_server/src/types"
	"ghaspy_server/src/utils"
	"os"

	"io"
	"net/http"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"google.golang.org/protobuf/proto"
)

func (ec *EndpointContext) PostLogInUserEndpoint(w http.ResponseWriter, r *http.Request) {

	requestBody := types.RequestLogInUser{}
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantReadBody")
		return
	}

	err = proto.Unmarshal(bodyBytes, &requestBody)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantUnmarshal")
		return
	}
	println("LOGGING IN: ", requestBody.Email)

	authData, err := ec.Query.SelectAuthData(ec.Ctx, requestBody.Email)

	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "dataIncorrect")
		return

	}
	if !authData.Isvalidated {

		println("ERROR: ", "unvalidated")
		protoutils.ProtoError(w, http.StatusBadRequest, "unvalidated")
		return

	}
	match := utils.ComparePasswordAndHash(requestBody.Password, authData.Password, authData.Salt)

	if !match {

		println("ERROR: ", "dataIncorrect")
		protoutils.ProtoError(w, http.StatusBadRequest, "dataIncorrect")
		return

	}

	token, snowflake, err := utils.GenerateToken()
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantGenerateToken")
		return

	}

	insertResult, err := ec.Query.InsertToken(ec.Ctx, queries.InsertTokenParams{
		ID:     int64(snowflake),
		Userid: authData.ID,
		Token:  token,
		Device: requestBody.DeviceName,
	})

	if err != nil {

		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantInsertToken")

	}
	if insertResult.ID == 0 {
		protoutils.ProtoError(w, http.StatusBadRequest, "cantInsertToken")
		return
	}
	println("USER LOGGED IN: ", requestBody.Email)

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseLogInUser{Token: token, UserID: int64(authData.ID), Message: "userLoggedIn"})

}

// TODO: maybe split this into multiple functions
func (ec *EndpointContext) PostSignUpUserEndpoint(w http.ResponseWriter, r *http.Request) {
	requestBody := types.RequestSignUpUser{}
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantReadBody")
		return
	}
	err = proto.Unmarshal(bodyBytes, &requestBody)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantUnmarshal")
		return
	}
	println("REGISTERING: ", requestBody.Email, requestBody.Username, requestBody.Password)

	passwordErrors := utils.IsPasswordValid(requestBody.Password)
	usernameErrors := utils.IsUsernameValid(requestBody.Username)
	var emailErrors []string

	if requestBody.Email == "" || requestBody.Email[0] == '@' || requestBody.Email[len(requestBody.Email)-1] == '@' || !strings.Contains(requestBody.Email, "@") {
		println("EMAIL INVALID", !strings.Contains(requestBody.Email, "@"), requestBody.Email)
		emailErrors = append(emailErrors, "emailInvalid")
	}

	if len(passwordErrors) > 0 {
		protoutils.ProtoError(w, http.StatusBadRequest, passwordErrors[0])

		return
	}
	if len(usernameErrors) > 0 {
		protoutils.ProtoError(w, http.StatusBadRequest, usernameErrors[0])
		return
	}
	if len(emailErrors) > 0 {
		protoutils.ProtoError(w, http.StatusBadRequest, emailErrors[0])
		return

	}

	rowAmount, err := ec.Query.SelectTakenUsername(ec.Ctx, requestBody.Username)
	if err != nil {
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	if rowAmount != 0 {
		//TODO: IF USERNAME IS TAKEN BUT ISNT VERIFIED, AND THE VERIFICATION CODE IS NO LONGER VALID, DELETE THE USER AND REGISTER A NEW ONE
		protoutils.ProtoError(w, http.StatusBadRequest, "usernameTaken")
		return

	}

	rowAmount, err = ec.Query.SelectTakenEmail(ec.Ctx, requestBody.Email)
	if err != nil {
		println("ERROR: ", err)

		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	if rowAmount != 0 {
		protoutils.ProtoError(w, http.StatusBadRequest, "emailTaken")
		return
	}

	hash, salt, err := utils.PreparePassword(requestBody.Password)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	println("HASH: ", hash, "SALT: ", salt)

	userId := snowflake.New(snowflake.USER)
	affectedRows, err := ec.Query.InsertNewUser(ec.Ctx, queries.InsertNewUserParams{
		ID:       int64(userId),
		Username: requestBody.Username,
		Email:    requestBody.Email,
		Password: hash,
		Salt:     salt,
	})

	if err != nil {
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	if affectedRows == 0 {
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}

	verificationCode, err := addVerificationCode(ec, userId)
	if err != nil {

		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return

	}
	println("VERIFICATION CODE: ", verificationCode)

	//SEND EMAIL WITH VERIFICATION CODE
	//

	// err = sendMail(requestBody.Email, "Verify your email for Ghaspy", "Verify your account by clicking this link: "+os.Getenv("FRONTEND_URL")+"/validate/"+verificationCode)

	// if err != nil {
	// return protoUtils.ProtoErrorOld(c, http.StatusInternalServerError, "internalError")
	// }

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseSignUpUser{Message: "userRegistered"})

}

func (ec *EndpointContext) GetVerifyUserEndpoint(w http.ResponseWriter, r *http.Request) {
	valCode := strings.TrimPrefix(r.URL.Path, "/validate/")
	println("Validating: " + valCode)

	row, err := ec.Query.SelectVerificationToken(ec.Ctx, valCode)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "verificationCodeInvalid")
		return
	}
	println("ID: ", row.ID, "USERID: ", row.Userid, "CODE: ", row.Code, "VALIDUNTIL: ", row.Validuntil.Time.GoString())

	if time.Now().After(row.Validuntil.Time) {
		verificationCode, err := addVerificationCode(ec, snowflake.Snowflake(row.Userid))
		if err != nil {
			protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
			return
		}
		//GET EMAIL
		email, err := ec.Query.SelectEmailFromID(ec.Ctx, row.Userid)

		if err != nil {
			protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
			return

		}
		utils.SendMail(email, "Verify your email for Ghaspy", "Verify your account by clicking this link: "+os.Getenv("FRONTEND_URL")+"/validate/"+verificationCode)

		protoutils.ProtoError(w, http.StatusBadRequest, "verificationCodeOutdated")
		return

	}
	//CHECK IF USER IS ALREADY VALIDATED

	isVerified, err := ec.Query.SelectIsVerified(ec.Ctx, row.Userid)
	if err != nil {
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
	}
	if isVerified {
		protoutils.ProtoError(w, http.StatusBadRequest, "userAlreadyValidated")
		return
	}

	affected, err := ec.Query.UpdateIsVerified(ec.Ctx, row.Userid)
	if err != nil {
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	if affected == 0 {
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseValidateUser{Message: "userValidated"})
}

func (ec *EndpointContext) DeleteLogOutUserEndpoint(w http.ResponseWriter, r *http.Request) {

	token := r.Header.Get("Authorization")

	println("LOGGING OUT: ", token)

	affected, err := ec.Query.DeleteToken(ec.Ctx, token)

	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
	}
	if affected == 0 {
		protoutils.ProtoError(w, http.StatusBadRequest, "invalidToken")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseLogOutUser{Message: "userLoggedOut"})
}

func addVerificationCode(ec *EndpointContext, userId snowflake.Snowflake) (string, error) {

	verificationId := snowflake.New(snowflake.VERIFICATION)
	verificationBytes, err := utils.GenerateRandomBytes(96)
	if err != nil {
		println("ERROR: ", err)
		return "", err
	}
	var verificationCode = utils.Base64URL(verificationBytes)
	println("VERIFICATION CODE: ", verificationCode)

	validUntil := time.Now().AddDate(0, 0, 7)
	_, err = ec.Query.InsertVerificationToken(ec.Ctx, queries.InsertVerificationTokenParams{
		ID:         int64(verificationId),
		Userid:     int64(userId),
		Code:       verificationCode,
		Validuntil: pgtype.Timestamp{Time: validUntil},
	})

	if err != nil {
		println("VERIFICATION ERROR: ", err)
		return "", err
	}

	return verificationCode, nil
}

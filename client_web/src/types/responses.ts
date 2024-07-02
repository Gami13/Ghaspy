/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Post, User } from "./internal";

export const protobufPackage = "main.responses";

export interface ResponseError {
  message: string;
}

export interface ResponseSetDisplayName {
  message: string;
}

export interface ResponseSetBio {
  message: string;
}

export interface ResponseToggleFollowersPublic {
  message: string;
  state: boolean;
}

export interface ResponseToggleFollowingPublic {
  message: string;
  state: boolean;
}

export interface ResponseTogglePostsPublic {
  message: string;
  state: boolean;
}

export interface ResponseToggleLikesPublic {
  message: string;
  state: boolean;
}

export interface ResponseSetAvatar {
  message: string;
  url: string;
}

export interface ResponseSetBanner {
  message: string;
  url: string;
}

export interface ResponseLogInUser {
  token: string;
  userID: string;
  message: string;
}

export interface ResponseGetProfile {
  profile: User | undefined;
}

export interface ResponseSignUpUserError {
  passwordErrors: string[];
  emailErrors: string[];
  usernameErrors: string[];
  message: string;
}

export interface ResponseToggleBookmark {
  message: string;
  state: boolean;
}

export interface ResponseToggleLike {
  message: string;
  state: boolean;
}

export interface ResponseToggleFollow {
  message: string;
  state: boolean;
}

export interface ResponseDeletePost {
  message: string;
  state: boolean;
}

export interface ResponseAddPost {
  message: string;
  postID: string;
}

export interface ResponseSignUpUser {
  message: string;
}

export interface ResponseLogOutUser {
  message: string;
}

export interface ResponseValidateUser {
  message: string;
}

export interface ResponseGetPostsChronologically {
  posts: Post[];
  message: string;
  pageNumber: number;
}

export interface ResponseGetPost {
  post: Post | undefined;
  message: string;
}

export interface ResponseGetPostReplies {
  posts: Post[];
  message: string;
  pageNumber: number;
}

export interface ResponseGetPostsChronologicallyByUser {
  posts: Post[];
  message: string;
  pageNumber: number;
}

export interface ResponseGetBookmarksChronologically {
  posts: Post[];
  message: string;
  pageNumber: number;
}

export interface ResponseEditProfile {
  message: string;
  profile: User | undefined;
}

function createBaseResponseError(): ResponseError {
  return { message: "" };
}

export const ResponseError = {
  encode(message: ResponseError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseError>, I>>(base?: I): ResponseError {
    return ResponseError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseError>, I>>(object: I): ResponseError {
    const message = createBaseResponseError();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseSetDisplayName(): ResponseSetDisplayName {
  return { message: "" };
}

export const ResponseSetDisplayName = {
  encode(message: ResponseSetDisplayName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseSetDisplayName {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseSetDisplayName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseSetDisplayName>, I>>(base?: I): ResponseSetDisplayName {
    return ResponseSetDisplayName.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseSetDisplayName>, I>>(object: I): ResponseSetDisplayName {
    const message = createBaseResponseSetDisplayName();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseSetBio(): ResponseSetBio {
  return { message: "" };
}

export const ResponseSetBio = {
  encode(message: ResponseSetBio, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseSetBio {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseSetBio();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseSetBio>, I>>(base?: I): ResponseSetBio {
    return ResponseSetBio.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseSetBio>, I>>(object: I): ResponseSetBio {
    const message = createBaseResponseSetBio();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseToggleFollowersPublic(): ResponseToggleFollowersPublic {
  return { message: "", state: false };
}

export const ResponseToggleFollowersPublic = {
  encode(message: ResponseToggleFollowersPublic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseToggleFollowersPublic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseToggleFollowersPublic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseToggleFollowersPublic>, I>>(base?: I): ResponseToggleFollowersPublic {
    return ResponseToggleFollowersPublic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseToggleFollowersPublic>, I>>(
    object: I,
  ): ResponseToggleFollowersPublic {
    const message = createBaseResponseToggleFollowersPublic();
    message.message = object.message ?? "";
    message.state = object.state ?? false;
    return message;
  },
};

function createBaseResponseToggleFollowingPublic(): ResponseToggleFollowingPublic {
  return { message: "", state: false };
}

export const ResponseToggleFollowingPublic = {
  encode(message: ResponseToggleFollowingPublic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseToggleFollowingPublic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseToggleFollowingPublic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseToggleFollowingPublic>, I>>(base?: I): ResponseToggleFollowingPublic {
    return ResponseToggleFollowingPublic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseToggleFollowingPublic>, I>>(
    object: I,
  ): ResponseToggleFollowingPublic {
    const message = createBaseResponseToggleFollowingPublic();
    message.message = object.message ?? "";
    message.state = object.state ?? false;
    return message;
  },
};

function createBaseResponseTogglePostsPublic(): ResponseTogglePostsPublic {
  return { message: "", state: false };
}

export const ResponseTogglePostsPublic = {
  encode(message: ResponseTogglePostsPublic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseTogglePostsPublic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseTogglePostsPublic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseTogglePostsPublic>, I>>(base?: I): ResponseTogglePostsPublic {
    return ResponseTogglePostsPublic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseTogglePostsPublic>, I>>(object: I): ResponseTogglePostsPublic {
    const message = createBaseResponseTogglePostsPublic();
    message.message = object.message ?? "";
    message.state = object.state ?? false;
    return message;
  },
};

function createBaseResponseToggleLikesPublic(): ResponseToggleLikesPublic {
  return { message: "", state: false };
}

export const ResponseToggleLikesPublic = {
  encode(message: ResponseToggleLikesPublic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseToggleLikesPublic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseToggleLikesPublic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseToggleLikesPublic>, I>>(base?: I): ResponseToggleLikesPublic {
    return ResponseToggleLikesPublic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseToggleLikesPublic>, I>>(object: I): ResponseToggleLikesPublic {
    const message = createBaseResponseToggleLikesPublic();
    message.message = object.message ?? "";
    message.state = object.state ?? false;
    return message;
  },
};

function createBaseResponseSetAvatar(): ResponseSetAvatar {
  return { message: "", url: "" };
}

export const ResponseSetAvatar = {
  encode(message: ResponseSetAvatar, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseSetAvatar {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseSetAvatar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseSetAvatar>, I>>(base?: I): ResponseSetAvatar {
    return ResponseSetAvatar.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseSetAvatar>, I>>(object: I): ResponseSetAvatar {
    const message = createBaseResponseSetAvatar();
    message.message = object.message ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseResponseSetBanner(): ResponseSetBanner {
  return { message: "", url: "" };
}

export const ResponseSetBanner = {
  encode(message: ResponseSetBanner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseSetBanner {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseSetBanner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseSetBanner>, I>>(base?: I): ResponseSetBanner {
    return ResponseSetBanner.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseSetBanner>, I>>(object: I): ResponseSetBanner {
    const message = createBaseResponseSetBanner();
    message.message = object.message ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseResponseLogInUser(): ResponseLogInUser {
  return { token: "", userID: "0", message: "" };
}

export const ResponseLogInUser = {
  encode(message: ResponseLogInUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.userID !== "0") {
      writer.uint32(16).int64(message.userID);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseLogInUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseLogInUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.userID = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseLogInUser>, I>>(base?: I): ResponseLogInUser {
    return ResponseLogInUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseLogInUser>, I>>(object: I): ResponseLogInUser {
    const message = createBaseResponseLogInUser();
    message.token = object.token ?? "";
    message.userID = object.userID ?? "0";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseGetProfile(): ResponseGetProfile {
  return { profile: undefined };
}

export const ResponseGetProfile = {
  encode(message: ResponseGetProfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.profile !== undefined) {
      User.encode(message.profile, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseGetProfile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseGetProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.profile = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseGetProfile>, I>>(base?: I): ResponseGetProfile {
    return ResponseGetProfile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseGetProfile>, I>>(object: I): ResponseGetProfile {
    const message = createBaseResponseGetProfile();
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? User.fromPartial(object.profile)
      : undefined;
    return message;
  },
};

function createBaseResponseSignUpUserError(): ResponseSignUpUserError {
  return { passwordErrors: [], emailErrors: [], usernameErrors: [], message: "" };
}

export const ResponseSignUpUserError = {
  encode(message: ResponseSignUpUserError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.passwordErrors) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.emailErrors) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.usernameErrors) {
      writer.uint32(26).string(v!);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseSignUpUserError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseSignUpUserError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.passwordErrors.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.emailErrors.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.usernameErrors.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseSignUpUserError>, I>>(base?: I): ResponseSignUpUserError {
    return ResponseSignUpUserError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseSignUpUserError>, I>>(object: I): ResponseSignUpUserError {
    const message = createBaseResponseSignUpUserError();
    message.passwordErrors = object.passwordErrors?.map((e) => e) || [];
    message.emailErrors = object.emailErrors?.map((e) => e) || [];
    message.usernameErrors = object.usernameErrors?.map((e) => e) || [];
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseToggleBookmark(): ResponseToggleBookmark {
  return { message: "", state: false };
}

export const ResponseToggleBookmark = {
  encode(message: ResponseToggleBookmark, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseToggleBookmark {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseToggleBookmark();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseToggleBookmark>, I>>(base?: I): ResponseToggleBookmark {
    return ResponseToggleBookmark.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseToggleBookmark>, I>>(object: I): ResponseToggleBookmark {
    const message = createBaseResponseToggleBookmark();
    message.message = object.message ?? "";
    message.state = object.state ?? false;
    return message;
  },
};

function createBaseResponseToggleLike(): ResponseToggleLike {
  return { message: "", state: false };
}

export const ResponseToggleLike = {
  encode(message: ResponseToggleLike, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseToggleLike {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseToggleLike();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseToggleLike>, I>>(base?: I): ResponseToggleLike {
    return ResponseToggleLike.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseToggleLike>, I>>(object: I): ResponseToggleLike {
    const message = createBaseResponseToggleLike();
    message.message = object.message ?? "";
    message.state = object.state ?? false;
    return message;
  },
};

function createBaseResponseToggleFollow(): ResponseToggleFollow {
  return { message: "", state: false };
}

export const ResponseToggleFollow = {
  encode(message: ResponseToggleFollow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseToggleFollow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseToggleFollow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseToggleFollow>, I>>(base?: I): ResponseToggleFollow {
    return ResponseToggleFollow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseToggleFollow>, I>>(object: I): ResponseToggleFollow {
    const message = createBaseResponseToggleFollow();
    message.message = object.message ?? "";
    message.state = object.state ?? false;
    return message;
  },
};

function createBaseResponseDeletePost(): ResponseDeletePost {
  return { message: "", state: false };
}

export const ResponseDeletePost = {
  encode(message: ResponseDeletePost, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseDeletePost {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseDeletePost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.state = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseDeletePost>, I>>(base?: I): ResponseDeletePost {
    return ResponseDeletePost.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseDeletePost>, I>>(object: I): ResponseDeletePost {
    const message = createBaseResponseDeletePost();
    message.message = object.message ?? "";
    message.state = object.state ?? false;
    return message;
  },
};

function createBaseResponseAddPost(): ResponseAddPost {
  return { message: "", postID: "0" };
}

export const ResponseAddPost = {
  encode(message: ResponseAddPost, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.postID !== "0") {
      writer.uint32(16).int64(message.postID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseAddPost {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseAddPost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.postID = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseAddPost>, I>>(base?: I): ResponseAddPost {
    return ResponseAddPost.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseAddPost>, I>>(object: I): ResponseAddPost {
    const message = createBaseResponseAddPost();
    message.message = object.message ?? "";
    message.postID = object.postID ?? "0";
    return message;
  },
};

function createBaseResponseSignUpUser(): ResponseSignUpUser {
  return { message: "" };
}

export const ResponseSignUpUser = {
  encode(message: ResponseSignUpUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseSignUpUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseSignUpUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseSignUpUser>, I>>(base?: I): ResponseSignUpUser {
    return ResponseSignUpUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseSignUpUser>, I>>(object: I): ResponseSignUpUser {
    const message = createBaseResponseSignUpUser();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseLogOutUser(): ResponseLogOutUser {
  return { message: "" };
}

export const ResponseLogOutUser = {
  encode(message: ResponseLogOutUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseLogOutUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseLogOutUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseLogOutUser>, I>>(base?: I): ResponseLogOutUser {
    return ResponseLogOutUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseLogOutUser>, I>>(object: I): ResponseLogOutUser {
    const message = createBaseResponseLogOutUser();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseValidateUser(): ResponseValidateUser {
  return { message: "" };
}

export const ResponseValidateUser = {
  encode(message: ResponseValidateUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseValidateUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseValidateUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseValidateUser>, I>>(base?: I): ResponseValidateUser {
    return ResponseValidateUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseValidateUser>, I>>(object: I): ResponseValidateUser {
    const message = createBaseResponseValidateUser();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseGetPostsChronologically(): ResponseGetPostsChronologically {
  return { posts: [], message: "", pageNumber: 0 };
}

export const ResponseGetPostsChronologically = {
  encode(message: ResponseGetPostsChronologically, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.posts) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.pageNumber !== 0) {
      writer.uint32(24).uint32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseGetPostsChronologically {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseGetPostsChronologically();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.posts.push(Post.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageNumber = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseGetPostsChronologically>, I>>(base?: I): ResponseGetPostsChronologically {
    return ResponseGetPostsChronologically.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseGetPostsChronologically>, I>>(
    object: I,
  ): ResponseGetPostsChronologically {
    const message = createBaseResponseGetPostsChronologically();
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.message = object.message ?? "";
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

function createBaseResponseGetPost(): ResponseGetPost {
  return { post: undefined, message: "" };
}

export const ResponseGetPost = {
  encode(message: ResponseGetPost, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.post !== undefined) {
      Post.encode(message.post, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseGetPost {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseGetPost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.post = Post.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseGetPost>, I>>(base?: I): ResponseGetPost {
    return ResponseGetPost.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseGetPost>, I>>(object: I): ResponseGetPost {
    const message = createBaseResponseGetPost();
    message.post = (object.post !== undefined && object.post !== null) ? Post.fromPartial(object.post) : undefined;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseGetPostReplies(): ResponseGetPostReplies {
  return { posts: [], message: "", pageNumber: 0 };
}

export const ResponseGetPostReplies = {
  encode(message: ResponseGetPostReplies, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.posts) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.pageNumber !== 0) {
      writer.uint32(24).uint32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseGetPostReplies {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseGetPostReplies();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.posts.push(Post.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageNumber = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseGetPostReplies>, I>>(base?: I): ResponseGetPostReplies {
    return ResponseGetPostReplies.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseGetPostReplies>, I>>(object: I): ResponseGetPostReplies {
    const message = createBaseResponseGetPostReplies();
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.message = object.message ?? "";
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

function createBaseResponseGetPostsChronologicallyByUser(): ResponseGetPostsChronologicallyByUser {
  return { posts: [], message: "", pageNumber: 0 };
}

export const ResponseGetPostsChronologicallyByUser = {
  encode(message: ResponseGetPostsChronologicallyByUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.posts) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.pageNumber !== 0) {
      writer.uint32(24).uint32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseGetPostsChronologicallyByUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseGetPostsChronologicallyByUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.posts.push(Post.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageNumber = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseGetPostsChronologicallyByUser>, I>>(
    base?: I,
  ): ResponseGetPostsChronologicallyByUser {
    return ResponseGetPostsChronologicallyByUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseGetPostsChronologicallyByUser>, I>>(
    object: I,
  ): ResponseGetPostsChronologicallyByUser {
    const message = createBaseResponseGetPostsChronologicallyByUser();
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.message = object.message ?? "";
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

function createBaseResponseGetBookmarksChronologically(): ResponseGetBookmarksChronologically {
  return { posts: [], message: "", pageNumber: 0 };
}

export const ResponseGetBookmarksChronologically = {
  encode(message: ResponseGetBookmarksChronologically, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.posts) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.pageNumber !== 0) {
      writer.uint32(24).uint32(message.pageNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseGetBookmarksChronologically {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseGetBookmarksChronologically();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.posts.push(Post.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageNumber = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseGetBookmarksChronologically>, I>>(
    base?: I,
  ): ResponseGetBookmarksChronologically {
    return ResponseGetBookmarksChronologically.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseGetBookmarksChronologically>, I>>(
    object: I,
  ): ResponseGetBookmarksChronologically {
    const message = createBaseResponseGetBookmarksChronologically();
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.message = object.message ?? "";
    message.pageNumber = object.pageNumber ?? 0;
    return message;
  },
};

function createBaseResponseEditProfile(): ResponseEditProfile {
  return { message: "", profile: undefined };
}

export const ResponseEditProfile = {
  encode(message: ResponseEditProfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.profile !== undefined) {
      User.encode(message.profile, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEditProfile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseEditProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.profile = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<ResponseEditProfile>, I>>(base?: I): ResponseEditProfile {
    return ResponseEditProfile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseEditProfile>, I>>(object: I): ResponseEditProfile {
    const message = createBaseResponseEditProfile();
    message.message = object.message ?? "";
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? User.fromPartial(object.profile)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

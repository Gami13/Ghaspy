/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "main";

export interface RequestSignUpUser {
  username: string;
  password: string;
  email: string;
}

export interface RequestLogInUser {
  email: string;
  password: string;
  deviceName: string;
}

export interface RequestSetDisplayName {
  displayName: string;
}

export interface RequestSetBio {
  bio: string;
}

export interface RequestGetBookmarks {
  page: number;
}

export interface RequestToggleBookmark {
  postID: string;
}

export interface RequestToggleLike {
  postID: string;
}

export interface RequestToggleFollow {
  userID: string;
}

export interface RequestDeletePost {
  postID: string;
}

export interface RequestGetPosts {
  username: string;
  page: number;
}

export interface ResponseError {
  message: string;
}

export interface ResponseSetDisplayName {
  message: string;
}

export interface ResponseLogInUser {
  token: string;
  userID: string;
  message: string;
}

export interface ResponseSignUpUserError {
  passwordErrors: string[];
  emailErrors: string[];
  usernameErrors: string[];
  message: string;
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

export interface SQLUser {
  id: number;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  banner: string;
  isFollowersPublic: boolean;
  isFollowingPublic: boolean;
  isPostsPublic: boolean;
  isLikesPublic: boolean;
  isFollowingYou: boolean;
  isFollowedByYou: boolean;
  countLikes: number;
  countPosts: number;
  countFollowers: number;
  countFollowing: number;
  isYourProfile: boolean;
}

export interface User {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  banner: string;
  countLikes: number;
  countPosts: number;
  countFollowers: number;
  countFollowing: number;
  isFollowingYou: boolean;
  isFollowedByYou: boolean;
  joinedAt: string;
  isFollowersPublic: boolean;
  isFollowingPublic: boolean;
  isPostsPublic: boolean;
  isLikesPublic: boolean;
  isYourProfile: boolean;
}

export interface Post {
  id: string;
  author: User | undefined;
  content: string;
  replyToID?: string | undefined;
  replyTo?: Post | undefined;
  quotedID?: string | undefined;
  quoted?: Post | undefined;
  attachments: string[];
  countLikes: number;
  countReplies: number;
  countQuotes: number;
  timePosted: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

function createBaseRequestSignUpUser(): RequestSignUpUser {
  return { username: "", password: "", email: "" };
}

export const RequestSignUpUser = {
  encode(message: RequestSignUpUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestSignUpUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestSignUpUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestSignUpUser {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
    };
  },

  toJSON(message: RequestSignUpUser): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestSignUpUser>, I>>(base?: I): RequestSignUpUser {
    return RequestSignUpUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestSignUpUser>, I>>(object: I): RequestSignUpUser {
    const message = createBaseRequestSignUpUser();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseRequestLogInUser(): RequestLogInUser {
  return { email: "", password: "", deviceName: "" };
}

export const RequestLogInUser = {
  encode(message: RequestLogInUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.deviceName !== "") {
      writer.uint32(26).string(message.deviceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestLogInUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestLogInUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deviceName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestLogInUser {
    return {
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      deviceName: isSet(object.deviceName) ? globalThis.String(object.deviceName) : "",
    };
  },

  toJSON(message: RequestLogInUser): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.deviceName !== "") {
      obj.deviceName = message.deviceName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestLogInUser>, I>>(base?: I): RequestLogInUser {
    return RequestLogInUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestLogInUser>, I>>(object: I): RequestLogInUser {
    const message = createBaseRequestLogInUser();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.deviceName = object.deviceName ?? "";
    return message;
  },
};

function createBaseRequestSetDisplayName(): RequestSetDisplayName {
  return { displayName: "" };
}

export const RequestSetDisplayName = {
  encode(message: RequestSetDisplayName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestSetDisplayName {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestSetDisplayName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestSetDisplayName {
    return { displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "" };
  },

  toJSON(message: RequestSetDisplayName): unknown {
    const obj: any = {};
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestSetDisplayName>, I>>(base?: I): RequestSetDisplayName {
    return RequestSetDisplayName.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestSetDisplayName>, I>>(object: I): RequestSetDisplayName {
    const message = createBaseRequestSetDisplayName();
    message.displayName = object.displayName ?? "";
    return message;
  },
};

function createBaseRequestSetBio(): RequestSetBio {
  return { bio: "" };
}

export const RequestSetBio = {
  encode(message: RequestSetBio, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bio !== "") {
      writer.uint32(10).string(message.bio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestSetBio {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestSetBio();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bio = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestSetBio {
    return { bio: isSet(object.bio) ? globalThis.String(object.bio) : "" };
  },

  toJSON(message: RequestSetBio): unknown {
    const obj: any = {};
    if (message.bio !== "") {
      obj.bio = message.bio;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestSetBio>, I>>(base?: I): RequestSetBio {
    return RequestSetBio.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestSetBio>, I>>(object: I): RequestSetBio {
    const message = createBaseRequestSetBio();
    message.bio = object.bio ?? "";
    return message;
  },
};

function createBaseRequestGetBookmarks(): RequestGetBookmarks {
  return { page: 0 };
}

export const RequestGetBookmarks = {
  encode(message: RequestGetBookmarks, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== 0) {
      writer.uint32(8).uint32(message.page);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestGetBookmarks {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestGetBookmarks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestGetBookmarks {
    return { page: isSet(object.page) ? globalThis.Number(object.page) : 0 };
  },

  toJSON(message: RequestGetBookmarks): unknown {
    const obj: any = {};
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestGetBookmarks>, I>>(base?: I): RequestGetBookmarks {
    return RequestGetBookmarks.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestGetBookmarks>, I>>(object: I): RequestGetBookmarks {
    const message = createBaseRequestGetBookmarks();
    message.page = object.page ?? 0;
    return message;
  },
};

function createBaseRequestToggleBookmark(): RequestToggleBookmark {
  return { postID: "" };
}

export const RequestToggleBookmark = {
  encode(message: RequestToggleBookmark, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.postID !== "") {
      writer.uint32(10).string(message.postID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestToggleBookmark {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestToggleBookmark();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.postID = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestToggleBookmark {
    return { postID: isSet(object.postID) ? globalThis.String(object.postID) : "" };
  },

  toJSON(message: RequestToggleBookmark): unknown {
    const obj: any = {};
    if (message.postID !== "") {
      obj.postID = message.postID;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestToggleBookmark>, I>>(base?: I): RequestToggleBookmark {
    return RequestToggleBookmark.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestToggleBookmark>, I>>(object: I): RequestToggleBookmark {
    const message = createBaseRequestToggleBookmark();
    message.postID = object.postID ?? "";
    return message;
  },
};

function createBaseRequestToggleLike(): RequestToggleLike {
  return { postID: "" };
}

export const RequestToggleLike = {
  encode(message: RequestToggleLike, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.postID !== "") {
      writer.uint32(10).string(message.postID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestToggleLike {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestToggleLike();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.postID = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestToggleLike {
    return { postID: isSet(object.postID) ? globalThis.String(object.postID) : "" };
  },

  toJSON(message: RequestToggleLike): unknown {
    const obj: any = {};
    if (message.postID !== "") {
      obj.postID = message.postID;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestToggleLike>, I>>(base?: I): RequestToggleLike {
    return RequestToggleLike.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestToggleLike>, I>>(object: I): RequestToggleLike {
    const message = createBaseRequestToggleLike();
    message.postID = object.postID ?? "";
    return message;
  },
};

function createBaseRequestToggleFollow(): RequestToggleFollow {
  return { userID: "" };
}

export const RequestToggleFollow = {
  encode(message: RequestToggleFollow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userID !== "") {
      writer.uint32(10).string(message.userID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestToggleFollow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestToggleFollow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userID = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestToggleFollow {
    return { userID: isSet(object.userID) ? globalThis.String(object.userID) : "" };
  },

  toJSON(message: RequestToggleFollow): unknown {
    const obj: any = {};
    if (message.userID !== "") {
      obj.userID = message.userID;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestToggleFollow>, I>>(base?: I): RequestToggleFollow {
    return RequestToggleFollow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestToggleFollow>, I>>(object: I): RequestToggleFollow {
    const message = createBaseRequestToggleFollow();
    message.userID = object.userID ?? "";
    return message;
  },
};

function createBaseRequestDeletePost(): RequestDeletePost {
  return { postID: "" };
}

export const RequestDeletePost = {
  encode(message: RequestDeletePost, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.postID !== "") {
      writer.uint32(10).string(message.postID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestDeletePost {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestDeletePost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.postID = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestDeletePost {
    return { postID: isSet(object.postID) ? globalThis.String(object.postID) : "" };
  },

  toJSON(message: RequestDeletePost): unknown {
    const obj: any = {};
    if (message.postID !== "") {
      obj.postID = message.postID;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestDeletePost>, I>>(base?: I): RequestDeletePost {
    return RequestDeletePost.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestDeletePost>, I>>(object: I): RequestDeletePost {
    const message = createBaseRequestDeletePost();
    message.postID = object.postID ?? "";
    return message;
  },
};

function createBaseRequestGetPosts(): RequestGetPosts {
  return { username: "", page: 0 };
}

export const RequestGetPosts = {
  encode(message: RequestGetPosts, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.page !== 0) {
      writer.uint32(16).uint32(message.page);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestGetPosts {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestGetPosts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.page = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestGetPosts {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      page: isSet(object.page) ? globalThis.Number(object.page) : 0,
    };
  },

  toJSON(message: RequestGetPosts): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestGetPosts>, I>>(base?: I): RequestGetPosts {
    return RequestGetPosts.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestGetPosts>, I>>(object: I): RequestGetPosts {
    const message = createBaseRequestGetPosts();
    message.username = object.username ?? "";
    message.page = object.page ?? 0;
    return message;
  },
};

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

  fromJSON(object: any): ResponseError {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: ResponseError): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
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

  fromJSON(object: any): ResponseSetDisplayName {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: ResponseSetDisplayName): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
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

function createBaseResponseLogInUser(): ResponseLogInUser {
  return { token: "", userID: "", message: "" };
}

export const ResponseLogInUser = {
  encode(message: ResponseLogInUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.userID !== "") {
      writer.uint32(18).string(message.userID);
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
          if (tag !== 18) {
            break;
          }

          message.userID = reader.string();
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

  fromJSON(object: any): ResponseLogInUser {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      userID: isSet(object.userID) ? globalThis.String(object.userID) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: ResponseLogInUser): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.userID !== "") {
      obj.userID = message.userID;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseLogInUser>, I>>(base?: I): ResponseLogInUser {
    return ResponseLogInUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseLogInUser>, I>>(object: I): ResponseLogInUser {
    const message = createBaseResponseLogInUser();
    message.token = object.token ?? "";
    message.userID = object.userID ?? "";
    message.message = object.message ?? "";
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

  fromJSON(object: any): ResponseSignUpUserError {
    return {
      passwordErrors: globalThis.Array.isArray(object?.passwordErrors)
        ? object.passwordErrors.map((e: any) => globalThis.String(e))
        : [],
      emailErrors: globalThis.Array.isArray(object?.emailErrors)
        ? object.emailErrors.map((e: any) => globalThis.String(e))
        : [],
      usernameErrors: globalThis.Array.isArray(object?.usernameErrors)
        ? object.usernameErrors.map((e: any) => globalThis.String(e))
        : [],
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: ResponseSignUpUserError): unknown {
    const obj: any = {};
    if (message.passwordErrors?.length) {
      obj.passwordErrors = message.passwordErrors;
    }
    if (message.emailErrors?.length) {
      obj.emailErrors = message.emailErrors;
    }
    if (message.usernameErrors?.length) {
      obj.usernameErrors = message.usernameErrors;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
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

  fromJSON(object: any): ResponseSignUpUser {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: ResponseSignUpUser): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
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

  fromJSON(object: any): ResponseLogOutUser {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: ResponseLogOutUser): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
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

  fromJSON(object: any): ResponseValidateUser {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: ResponseValidateUser): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
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

function createBaseSQLUser(): SQLUser {
  return {
    id: 0,
    username: "",
    displayName: "",
    bio: "",
    avatar: "",
    banner: "",
    isFollowersPublic: false,
    isFollowingPublic: false,
    isPostsPublic: false,
    isLikesPublic: false,
    isFollowingYou: false,
    isFollowedByYou: false,
    countLikes: 0,
    countPosts: 0,
    countFollowers: 0,
    countFollowing: 0,
    isYourProfile: false,
  };
}

export const SQLUser = {
  encode(message: SQLUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.displayName !== "") {
      writer.uint32(26).string(message.displayName);
    }
    if (message.bio !== "") {
      writer.uint32(34).string(message.bio);
    }
    if (message.avatar !== "") {
      writer.uint32(42).string(message.avatar);
    }
    if (message.banner !== "") {
      writer.uint32(50).string(message.banner);
    }
    if (message.isFollowersPublic === true) {
      writer.uint32(56).bool(message.isFollowersPublic);
    }
    if (message.isFollowingPublic === true) {
      writer.uint32(64).bool(message.isFollowingPublic);
    }
    if (message.isPostsPublic === true) {
      writer.uint32(72).bool(message.isPostsPublic);
    }
    if (message.isLikesPublic === true) {
      writer.uint32(80).bool(message.isLikesPublic);
    }
    if (message.isFollowingYou === true) {
      writer.uint32(88).bool(message.isFollowingYou);
    }
    if (message.isFollowedByYou === true) {
      writer.uint32(96).bool(message.isFollowedByYou);
    }
    if (message.countLikes !== 0) {
      writer.uint32(104).uint64(message.countLikes);
    }
    if (message.countPosts !== 0) {
      writer.uint32(112).uint64(message.countPosts);
    }
    if (message.countFollowers !== 0) {
      writer.uint32(120).uint64(message.countFollowers);
    }
    if (message.countFollowing !== 0) {
      writer.uint32(128).uint64(message.countFollowing);
    }
    if (message.isYourProfile === true) {
      writer.uint32(136).bool(message.isYourProfile);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SQLUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSQLUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.bio = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.avatar = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.banner = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.isFollowersPublic = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.isFollowingPublic = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.isPostsPublic = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.isLikesPublic = reader.bool();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.isFollowingYou = reader.bool();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.isFollowedByYou = reader.bool();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.countLikes = longToNumber(reader.uint64() as Long);
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.countPosts = longToNumber(reader.uint64() as Long);
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.countFollowers = longToNumber(reader.uint64() as Long);
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.countFollowing = longToNumber(reader.uint64() as Long);
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.isYourProfile = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SQLUser {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      bio: isSet(object.bio) ? globalThis.String(object.bio) : "",
      avatar: isSet(object.avatar) ? globalThis.String(object.avatar) : "",
      banner: isSet(object.banner) ? globalThis.String(object.banner) : "",
      isFollowersPublic: isSet(object.isFollowersPublic) ? globalThis.Boolean(object.isFollowersPublic) : false,
      isFollowingPublic: isSet(object.isFollowingPublic) ? globalThis.Boolean(object.isFollowingPublic) : false,
      isPostsPublic: isSet(object.isPostsPublic) ? globalThis.Boolean(object.isPostsPublic) : false,
      isLikesPublic: isSet(object.isLikesPublic) ? globalThis.Boolean(object.isLikesPublic) : false,
      isFollowingYou: isSet(object.isFollowingYou) ? globalThis.Boolean(object.isFollowingYou) : false,
      isFollowedByYou: isSet(object.isFollowedByYou) ? globalThis.Boolean(object.isFollowedByYou) : false,
      countLikes: isSet(object.countLikes) ? globalThis.Number(object.countLikes) : 0,
      countPosts: isSet(object.countPosts) ? globalThis.Number(object.countPosts) : 0,
      countFollowers: isSet(object.countFollowers) ? globalThis.Number(object.countFollowers) : 0,
      countFollowing: isSet(object.countFollowing) ? globalThis.Number(object.countFollowing) : 0,
      isYourProfile: isSet(object.isYourProfile) ? globalThis.Boolean(object.isYourProfile) : false,
    };
  },

  toJSON(message: SQLUser): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.bio !== "") {
      obj.bio = message.bio;
    }
    if (message.avatar !== "") {
      obj.avatar = message.avatar;
    }
    if (message.banner !== "") {
      obj.banner = message.banner;
    }
    if (message.isFollowersPublic === true) {
      obj.isFollowersPublic = message.isFollowersPublic;
    }
    if (message.isFollowingPublic === true) {
      obj.isFollowingPublic = message.isFollowingPublic;
    }
    if (message.isPostsPublic === true) {
      obj.isPostsPublic = message.isPostsPublic;
    }
    if (message.isLikesPublic === true) {
      obj.isLikesPublic = message.isLikesPublic;
    }
    if (message.isFollowingYou === true) {
      obj.isFollowingYou = message.isFollowingYou;
    }
    if (message.isFollowedByYou === true) {
      obj.isFollowedByYou = message.isFollowedByYou;
    }
    if (message.countLikes !== 0) {
      obj.countLikes = Math.round(message.countLikes);
    }
    if (message.countPosts !== 0) {
      obj.countPosts = Math.round(message.countPosts);
    }
    if (message.countFollowers !== 0) {
      obj.countFollowers = Math.round(message.countFollowers);
    }
    if (message.countFollowing !== 0) {
      obj.countFollowing = Math.round(message.countFollowing);
    }
    if (message.isYourProfile === true) {
      obj.isYourProfile = message.isYourProfile;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SQLUser>, I>>(base?: I): SQLUser {
    return SQLUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SQLUser>, I>>(object: I): SQLUser {
    const message = createBaseSQLUser();
    message.id = object.id ?? 0;
    message.username = object.username ?? "";
    message.displayName = object.displayName ?? "";
    message.bio = object.bio ?? "";
    message.avatar = object.avatar ?? "";
    message.banner = object.banner ?? "";
    message.isFollowersPublic = object.isFollowersPublic ?? false;
    message.isFollowingPublic = object.isFollowingPublic ?? false;
    message.isPostsPublic = object.isPostsPublic ?? false;
    message.isLikesPublic = object.isLikesPublic ?? false;
    message.isFollowingYou = object.isFollowingYou ?? false;
    message.isFollowedByYou = object.isFollowedByYou ?? false;
    message.countLikes = object.countLikes ?? 0;
    message.countPosts = object.countPosts ?? 0;
    message.countFollowers = object.countFollowers ?? 0;
    message.countFollowing = object.countFollowing ?? 0;
    message.isYourProfile = object.isYourProfile ?? false;
    return message;
  },
};

function createBaseUser(): User {
  return {
    username: "",
    displayName: "",
    bio: "",
    avatar: "",
    banner: "",
    countLikes: 0,
    countPosts: 0,
    countFollowers: 0,
    countFollowing: 0,
    isFollowingYou: false,
    isFollowedByYou: false,
    joinedAt: "",
    isFollowersPublic: false,
    isFollowingPublic: false,
    isPostsPublic: false,
    isLikesPublic: false,
    isYourProfile: false,
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.bio !== "") {
      writer.uint32(26).string(message.bio);
    }
    if (message.avatar !== "") {
      writer.uint32(34).string(message.avatar);
    }
    if (message.banner !== "") {
      writer.uint32(42).string(message.banner);
    }
    if (message.countLikes !== 0) {
      writer.uint32(48).uint64(message.countLikes);
    }
    if (message.countPosts !== 0) {
      writer.uint32(56).uint64(message.countPosts);
    }
    if (message.countFollowers !== 0) {
      writer.uint32(64).uint64(message.countFollowers);
    }
    if (message.countFollowing !== 0) {
      writer.uint32(72).uint64(message.countFollowing);
    }
    if (message.isFollowingYou === true) {
      writer.uint32(80).bool(message.isFollowingYou);
    }
    if (message.isFollowedByYou === true) {
      writer.uint32(88).bool(message.isFollowedByYou);
    }
    if (message.joinedAt !== "") {
      writer.uint32(98).string(message.joinedAt);
    }
    if (message.isFollowersPublic === true) {
      writer.uint32(104).bool(message.isFollowersPublic);
    }
    if (message.isFollowingPublic === true) {
      writer.uint32(112).bool(message.isFollowingPublic);
    }
    if (message.isPostsPublic === true) {
      writer.uint32(120).bool(message.isPostsPublic);
    }
    if (message.isLikesPublic === true) {
      writer.uint32(128).bool(message.isLikesPublic);
    }
    if (message.isYourProfile === true) {
      writer.uint32(136).bool(message.isYourProfile);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bio = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.avatar = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.banner = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.countLikes = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.countPosts = longToNumber(reader.uint64() as Long);
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.countFollowers = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.countFollowing = longToNumber(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.isFollowingYou = reader.bool();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.isFollowedByYou = reader.bool();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.joinedAt = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.isFollowersPublic = reader.bool();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.isFollowingPublic = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.isPostsPublic = reader.bool();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.isLikesPublic = reader.bool();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.isYourProfile = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      bio: isSet(object.bio) ? globalThis.String(object.bio) : "",
      avatar: isSet(object.avatar) ? globalThis.String(object.avatar) : "",
      banner: isSet(object.banner) ? globalThis.String(object.banner) : "",
      countLikes: isSet(object.countLikes) ? globalThis.Number(object.countLikes) : 0,
      countPosts: isSet(object.countPosts) ? globalThis.Number(object.countPosts) : 0,
      countFollowers: isSet(object.countFollowers) ? globalThis.Number(object.countFollowers) : 0,
      countFollowing: isSet(object.countFollowing) ? globalThis.Number(object.countFollowing) : 0,
      isFollowingYou: isSet(object.isFollowingYou) ? globalThis.Boolean(object.isFollowingYou) : false,
      isFollowedByYou: isSet(object.isFollowedByYou) ? globalThis.Boolean(object.isFollowedByYou) : false,
      joinedAt: isSet(object.joinedAt) ? globalThis.String(object.joinedAt) : "",
      isFollowersPublic: isSet(object.isFollowersPublic) ? globalThis.Boolean(object.isFollowersPublic) : false,
      isFollowingPublic: isSet(object.isFollowingPublic) ? globalThis.Boolean(object.isFollowingPublic) : false,
      isPostsPublic: isSet(object.isPostsPublic) ? globalThis.Boolean(object.isPostsPublic) : false,
      isLikesPublic: isSet(object.isLikesPublic) ? globalThis.Boolean(object.isLikesPublic) : false,
      isYourProfile: isSet(object.isYourProfile) ? globalThis.Boolean(object.isYourProfile) : false,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.bio !== "") {
      obj.bio = message.bio;
    }
    if (message.avatar !== "") {
      obj.avatar = message.avatar;
    }
    if (message.banner !== "") {
      obj.banner = message.banner;
    }
    if (message.countLikes !== 0) {
      obj.countLikes = Math.round(message.countLikes);
    }
    if (message.countPosts !== 0) {
      obj.countPosts = Math.round(message.countPosts);
    }
    if (message.countFollowers !== 0) {
      obj.countFollowers = Math.round(message.countFollowers);
    }
    if (message.countFollowing !== 0) {
      obj.countFollowing = Math.round(message.countFollowing);
    }
    if (message.isFollowingYou === true) {
      obj.isFollowingYou = message.isFollowingYou;
    }
    if (message.isFollowedByYou === true) {
      obj.isFollowedByYou = message.isFollowedByYou;
    }
    if (message.joinedAt !== "") {
      obj.joinedAt = message.joinedAt;
    }
    if (message.isFollowersPublic === true) {
      obj.isFollowersPublic = message.isFollowersPublic;
    }
    if (message.isFollowingPublic === true) {
      obj.isFollowingPublic = message.isFollowingPublic;
    }
    if (message.isPostsPublic === true) {
      obj.isPostsPublic = message.isPostsPublic;
    }
    if (message.isLikesPublic === true) {
      obj.isLikesPublic = message.isLikesPublic;
    }
    if (message.isYourProfile === true) {
      obj.isYourProfile = message.isYourProfile;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.username = object.username ?? "";
    message.displayName = object.displayName ?? "";
    message.bio = object.bio ?? "";
    message.avatar = object.avatar ?? "";
    message.banner = object.banner ?? "";
    message.countLikes = object.countLikes ?? 0;
    message.countPosts = object.countPosts ?? 0;
    message.countFollowers = object.countFollowers ?? 0;
    message.countFollowing = object.countFollowing ?? 0;
    message.isFollowingYou = object.isFollowingYou ?? false;
    message.isFollowedByYou = object.isFollowedByYou ?? false;
    message.joinedAt = object.joinedAt ?? "";
    message.isFollowersPublic = object.isFollowersPublic ?? false;
    message.isFollowingPublic = object.isFollowingPublic ?? false;
    message.isPostsPublic = object.isPostsPublic ?? false;
    message.isLikesPublic = object.isLikesPublic ?? false;
    message.isYourProfile = object.isYourProfile ?? false;
    return message;
  },
};

function createBasePost(): Post {
  return {
    id: "",
    author: undefined,
    content: "",
    replyToID: undefined,
    replyTo: undefined,
    quotedID: undefined,
    quoted: undefined,
    attachments: [],
    countLikes: 0,
    countReplies: 0,
    countQuotes: 0,
    timePosted: "",
    isLiked: false,
    isBookmarked: false,
  };
}

export const Post = {
  encode(message: Post, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.author !== undefined) {
      User.encode(message.author, writer.uint32(18).fork()).ldelim();
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.replyToID !== undefined) {
      writer.uint32(34).string(message.replyToID);
    }
    if (message.replyTo !== undefined) {
      Post.encode(message.replyTo, writer.uint32(42).fork()).ldelim();
    }
    if (message.quotedID !== undefined) {
      writer.uint32(50).string(message.quotedID);
    }
    if (message.quoted !== undefined) {
      Post.encode(message.quoted, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.attachments) {
      writer.uint32(66).string(v!);
    }
    if (message.countLikes !== 0) {
      writer.uint32(72).uint64(message.countLikes);
    }
    if (message.countReplies !== 0) {
      writer.uint32(80).uint64(message.countReplies);
    }
    if (message.countQuotes !== 0) {
      writer.uint32(88).uint64(message.countQuotes);
    }
    if (message.timePosted !== "") {
      writer.uint32(98).string(message.timePosted);
    }
    if (message.isLiked === true) {
      writer.uint32(104).bool(message.isLiked);
    }
    if (message.isBookmarked === true) {
      writer.uint32(112).bool(message.isBookmarked);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Post {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.author = User.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.content = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.replyToID = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.replyTo = Post.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.quotedID = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.quoted = Post.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.attachments.push(reader.string());
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.countLikes = longToNumber(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.countReplies = longToNumber(reader.uint64() as Long);
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.countQuotes = longToNumber(reader.uint64() as Long);
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.timePosted = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.isLiked = reader.bool();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.isBookmarked = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Post {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      author: isSet(object.author) ? User.fromJSON(object.author) : undefined,
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      replyToID: isSet(object.replyToID) ? globalThis.String(object.replyToID) : undefined,
      replyTo: isSet(object.replyTo) ? Post.fromJSON(object.replyTo) : undefined,
      quotedID: isSet(object.quotedID) ? globalThis.String(object.quotedID) : undefined,
      quoted: isSet(object.quoted) ? Post.fromJSON(object.quoted) : undefined,
      attachments: globalThis.Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) => globalThis.String(e))
        : [],
      countLikes: isSet(object.countLikes) ? globalThis.Number(object.countLikes) : 0,
      countReplies: isSet(object.countReplies) ? globalThis.Number(object.countReplies) : 0,
      countQuotes: isSet(object.countQuotes) ? globalThis.Number(object.countQuotes) : 0,
      timePosted: isSet(object.timePosted) ? globalThis.String(object.timePosted) : "",
      isLiked: isSet(object.isLiked) ? globalThis.Boolean(object.isLiked) : false,
      isBookmarked: isSet(object.isBookmarked) ? globalThis.Boolean(object.isBookmarked) : false,
    };
  },

  toJSON(message: Post): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.author !== undefined) {
      obj.author = User.toJSON(message.author);
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.replyToID !== undefined) {
      obj.replyToID = message.replyToID;
    }
    if (message.replyTo !== undefined) {
      obj.replyTo = Post.toJSON(message.replyTo);
    }
    if (message.quotedID !== undefined) {
      obj.quotedID = message.quotedID;
    }
    if (message.quoted !== undefined) {
      obj.quoted = Post.toJSON(message.quoted);
    }
    if (message.attachments?.length) {
      obj.attachments = message.attachments;
    }
    if (message.countLikes !== 0) {
      obj.countLikes = Math.round(message.countLikes);
    }
    if (message.countReplies !== 0) {
      obj.countReplies = Math.round(message.countReplies);
    }
    if (message.countQuotes !== 0) {
      obj.countQuotes = Math.round(message.countQuotes);
    }
    if (message.timePosted !== "") {
      obj.timePosted = message.timePosted;
    }
    if (message.isLiked === true) {
      obj.isLiked = message.isLiked;
    }
    if (message.isBookmarked === true) {
      obj.isBookmarked = message.isBookmarked;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Post>, I>>(base?: I): Post {
    return Post.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Post>, I>>(object: I): Post {
    const message = createBasePost();
    message.id = object.id ?? "";
    message.author = (object.author !== undefined && object.author !== null)
      ? User.fromPartial(object.author)
      : undefined;
    message.content = object.content ?? "";
    message.replyToID = object.replyToID ?? undefined;
    message.replyTo = (object.replyTo !== undefined && object.replyTo !== null)
      ? Post.fromPartial(object.replyTo)
      : undefined;
    message.quotedID = object.quotedID ?? undefined;
    message.quoted = (object.quoted !== undefined && object.quoted !== null)
      ? Post.fromPartial(object.quoted)
      : undefined;
    message.attachments = object.attachments?.map((e) => e) || [];
    message.countLikes = object.countLikes ?? 0;
    message.countReplies = object.countReplies ?? 0;
    message.countQuotes = object.countQuotes ?? 0;
    message.timePosted = object.timePosted ?? "";
    message.isLiked = object.isLiked ?? false;
    message.isBookmarked = object.isBookmarked ?? false;
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

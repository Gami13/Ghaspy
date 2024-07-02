/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "main.requests";

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

export interface RequestEditProfile {
  displayName: string;
  bio: string;
  didAvatarChange: boolean;
  avatar: Uint8Array;
  didBannerChange: boolean;
  banner: Uint8Array;
  isFollowersPublic: boolean;
  isFollowingPublic: boolean;
  isPostsPublic: boolean;
  isLikesPublic: boolean;
  prefferedTheme: string;
  prefferedLanguage: string;
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

function createBaseRequestEditProfile(): RequestEditProfile {
  return {
    displayName: "",
    bio: "",
    didAvatarChange: false,
    avatar: new Uint8Array(0),
    didBannerChange: false,
    banner: new Uint8Array(0),
    isFollowersPublic: false,
    isFollowingPublic: false,
    isPostsPublic: false,
    isLikesPublic: false,
    prefferedTheme: "",
    prefferedLanguage: "",
  };
}

export const RequestEditProfile = {
  encode(message: RequestEditProfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.bio !== "") {
      writer.uint32(18).string(message.bio);
    }
    if (message.didAvatarChange === true) {
      writer.uint32(24).bool(message.didAvatarChange);
    }
    if (message.avatar.length !== 0) {
      writer.uint32(34).bytes(message.avatar);
    }
    if (message.didBannerChange === true) {
      writer.uint32(40).bool(message.didBannerChange);
    }
    if (message.banner.length !== 0) {
      writer.uint32(50).bytes(message.banner);
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
    if (message.prefferedTheme !== "") {
      writer.uint32(90).string(message.prefferedTheme);
    }
    if (message.prefferedLanguage !== "") {
      writer.uint32(98).string(message.prefferedLanguage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestEditProfile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestEditProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bio = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.didAvatarChange = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.avatar = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.didBannerChange = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.banner = reader.bytes();
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
          if (tag !== 90) {
            break;
          }

          message.prefferedTheme = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.prefferedLanguage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create<I extends Exact<DeepPartial<RequestEditProfile>, I>>(base?: I): RequestEditProfile {
    return RequestEditProfile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestEditProfile>, I>>(object: I): RequestEditProfile {
    const message = createBaseRequestEditProfile();
    message.displayName = object.displayName ?? "";
    message.bio = object.bio ?? "";
    message.didAvatarChange = object.didAvatarChange ?? false;
    message.avatar = object.avatar ?? new Uint8Array(0);
    message.didBannerChange = object.didBannerChange ?? false;
    message.banner = object.banner ?? new Uint8Array(0);
    message.isFollowersPublic = object.isFollowersPublic ?? false;
    message.isFollowingPublic = object.isFollowingPublic ?? false;
    message.isPostsPublic = object.isPostsPublic ?? false;
    message.isLikesPublic = object.isLikesPublic ?? false;
    message.prefferedTheme = object.prefferedTheme ?? "";
    message.prefferedLanguage = object.prefferedLanguage ?? "";
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

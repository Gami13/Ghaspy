/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "main.internal";

export interface SQLUser {
  ID: string;
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
  ID: string;
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
  ID: string;
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

function createBaseSQLUser(): SQLUser {
  return {
    ID: "0",
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
    if (message.ID !== "0") {
      writer.uint32(8).uint64(message.ID);
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
    if (message.isFollowersPublic !== false) {
      writer.uint32(56).bool(message.isFollowersPublic);
    }
    if (message.isFollowingPublic !== false) {
      writer.uint32(64).bool(message.isFollowingPublic);
    }
    if (message.isPostsPublic !== false) {
      writer.uint32(72).bool(message.isPostsPublic);
    }
    if (message.isLikesPublic !== false) {
      writer.uint32(80).bool(message.isLikesPublic);
    }
    if (message.isFollowingYou !== false) {
      writer.uint32(88).bool(message.isFollowingYou);
    }
    if (message.isFollowedByYou !== false) {
      writer.uint32(96).bool(message.isFollowedByYou);
    }
    if (message.countLikes !== 0) {
      writer.uint32(104).uint32(message.countLikes);
    }
    if (message.countPosts !== 0) {
      writer.uint32(112).uint32(message.countPosts);
    }
    if (message.countFollowers !== 0) {
      writer.uint32(120).uint32(message.countFollowers);
    }
    if (message.countFollowing !== 0) {
      writer.uint32(128).uint32(message.countFollowing);
    }
    if (message.isYourProfile !== false) {
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

          message.ID = longToString(reader.uint64() as Long);
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

          message.countLikes = reader.uint32();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.countPosts = reader.uint32();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.countFollowers = reader.uint32();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.countFollowing = reader.uint32();
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

  create<I extends Exact<DeepPartial<SQLUser>, I>>(base?: I): SQLUser {
    return SQLUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SQLUser>, I>>(object: I): SQLUser {
    const message = createBaseSQLUser();
    message.ID = object.ID ?? "0";
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
    ID: "0",
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
    if (message.ID !== "0") {
      writer.uint32(8).uint64(message.ID);
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
    if (message.countLikes !== 0) {
      writer.uint32(56).uint32(message.countLikes);
    }
    if (message.countPosts !== 0) {
      writer.uint32(64).uint32(message.countPosts);
    }
    if (message.countFollowers !== 0) {
      writer.uint32(72).uint32(message.countFollowers);
    }
    if (message.countFollowing !== 0) {
      writer.uint32(80).uint32(message.countFollowing);
    }
    if (message.isFollowingYou !== false) {
      writer.uint32(88).bool(message.isFollowingYou);
    }
    if (message.isFollowedByYou !== false) {
      writer.uint32(96).bool(message.isFollowedByYou);
    }
    if (message.joinedAt !== "") {
      writer.uint32(106).string(message.joinedAt);
    }
    if (message.isFollowersPublic !== false) {
      writer.uint32(112).bool(message.isFollowersPublic);
    }
    if (message.isFollowingPublic !== false) {
      writer.uint32(120).bool(message.isFollowingPublic);
    }
    if (message.isPostsPublic !== false) {
      writer.uint32(128).bool(message.isPostsPublic);
    }
    if (message.isLikesPublic !== false) {
      writer.uint32(136).bool(message.isLikesPublic);
    }
    if (message.isYourProfile !== false) {
      writer.uint32(144).bool(message.isYourProfile);
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
          if (tag !== 8) {
            break;
          }

          message.ID = longToString(reader.uint64() as Long);
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

          message.countLikes = reader.uint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.countPosts = reader.uint32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.countFollowers = reader.uint32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.countFollowing = reader.uint32();
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
          if (tag !== 106) {
            break;
          }

          message.joinedAt = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.isFollowersPublic = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.isFollowingPublic = reader.bool();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.isPostsPublic = reader.bool();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.isLikesPublic = reader.bool();
          continue;
        case 18:
          if (tag !== 144) {
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

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.ID = object.ID ?? "0";
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
    ID: "0",
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
    if (message.ID !== "0") {
      writer.uint32(8).uint64(message.ID);
    }
    if (message.author !== undefined) {
      User.encode(message.author, writer.uint32(18).fork()).ldelim();
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.replyToID !== undefined) {
      writer.uint32(32).uint64(message.replyToID);
    }
    if (message.replyTo !== undefined) {
      Post.encode(message.replyTo, writer.uint32(42).fork()).ldelim();
    }
    if (message.quotedID !== undefined) {
      writer.uint32(48).uint64(message.quotedID);
    }
    if (message.quoted !== undefined) {
      Post.encode(message.quoted, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.attachments) {
      writer.uint32(66).string(v!);
    }
    if (message.countLikes !== 0) {
      writer.uint32(72).uint32(message.countLikes);
    }
    if (message.countReplies !== 0) {
      writer.uint32(80).uint32(message.countReplies);
    }
    if (message.countQuotes !== 0) {
      writer.uint32(88).uint32(message.countQuotes);
    }
    if (message.timePosted !== "") {
      writer.uint32(98).string(message.timePosted);
    }
    if (message.isLiked !== false) {
      writer.uint32(104).bool(message.isLiked);
    }
    if (message.isBookmarked !== false) {
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
          if (tag !== 8) {
            break;
          }

          message.ID = longToString(reader.uint64() as Long);
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
          if (tag !== 32) {
            break;
          }

          message.replyToID = longToString(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.replyTo = Post.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.quotedID = longToString(reader.uint64() as Long);
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

          message.countLikes = reader.uint32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.countReplies = reader.uint32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.countQuotes = reader.uint32();
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

  create<I extends Exact<DeepPartial<Post>, I>>(base?: I): Post {
    return Post.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Post>, I>>(object: I): Post {
    const message = createBasePost();
    message.ID = object.ID ?? "0";
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

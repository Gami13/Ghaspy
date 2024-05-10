import { posts } from "@/MockData";
import { PostList } from "./Post/PostList";

export function Main() {
	return <PostList posts={posts} />;
}

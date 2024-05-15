import { posts } from "@/MockData";
import { PostList } from "./Post/PostList";
import { ProtoFetch } from "@/ProtoFetch";
import { ResponseGetPostsChronologically } from "@/types/responses";
import { POSTS_CHRONO_ENDPOINT } from "@/constants";
import { useAppState } from "@/AppState";
import { createEffect, onMount, Show } from "solid-js";
import type { Post } from "@/types/internal";

export function Main() {
	const AppState = useAppState();
	const proto = new ProtoFetch<undefined, ResponseGetPostsChronologically>(undefined, ResponseGetPostsChronologically);
	onMount(() =>
		proto.Query(`${POSTS_CHRONO_ENDPOINT}/0`, {
			method: "GET",
			headers: {
				Authorization: AppState.userToken() || "",
			},
		}),
	);
	createEffect(() => {
		if (proto.state.isSuccess) {
			console.log(proto.state.data?.posts as Post[]);
		}
		if (proto.state.isError) {
			console.log(proto.state.error);
		}
		if (proto.state.isLoading) {
			console.log("Loading...");
		}
		console.log("PROTO", proto);
	});

	return (
		<Show
			when={proto.state.isSuccess}
			fallback={
				<div>
					<h1>Loading...</h1>
				</div>
			}
		>
			<PostList posts={proto.state.data?.posts as Post[]} />
		</Show>
	);
}

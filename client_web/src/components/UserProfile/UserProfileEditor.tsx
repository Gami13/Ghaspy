import type { User } from "@/types/internal";
import { colors, transitions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import type { RequestEditProfile } from "@/types/requests";
import { createStore } from "solid-js/store";
import { allLocales } from "@/Translation";
import { createSignal, For, Show } from "solid-js";
import { TbArrowBack, TbCircleArrowLeft, TbRotate, TbRotate2 } from "solid-icons/tb";
import { UnlimitedModal } from "../Modal";
import { UserAvatarHandler } from "./UserAvatarHandler";
const style = stylex.create({
	form: {
		color: colors.text950,
	},
	fieldset: {
		color: "inherit",
	},
	legend: {
		color: colors.text700,
	},
	label: {
		display: "block",
		color: "inherit",
	},
	undoBtn: {
		color: "inherit",
		width: "2em",
		height: "2em",
		borderRadius: "50%",
		transitionDuration: transitions.duration,
		transitionTimingFunction: transitions.timing,

		":hover": {
			backgroundColor: colors.background200,
		},
	},
});

type UserProfileEditorProps = {
	profile: User;
	onEdited: () => void;
};
//edits: display name, bio, avatar,  banner, following public/private, followers public/private, posts public/private, likes public/private,  preffered language, theme
//currently  unavailable: vitals like username, email, password
export function UserProfileEditor(props: UserProfileEditorProps) {
	console.log("UserProfileEditModal", props.profile);
	const [formState, setFormState] = createStore<RequestEditProfile>({
		displayName: props.profile.displayName,
		bio: props.profile.bio,
		didAvatarChange: false,
		avatar: new Uint8Array(),
		didBannerChange: false,
		banner: new Uint8Array(),
		isFollowersPublic: props.profile.isFollowersPublic,
		isFollowingPublic: props.profile.isFollowingPublic,
		isPostsPublic: props.profile.isPostsPublic,
		isLikesPublic: props.profile.isLikesPublic,
		// TODO: implement prefferedTheme properly
		prefferedTheme: "dark",
		prefferedLanguage: props.profile.prefferedLanguage,
	});
	const [isChangingAvatar, setIsChangingAvatar] = createSignal(false);
	const [isChangingBanner, setIsChangingBanner] = createSignal(false);
	return (
		<form {...stylex.attrs(style.form)}>
			<fieldset {...stylex.attrs(style.fieldset)}>
				<legend {...stylex.attrs(style.legend)}>Main</legend>
				<label {...stylex.attrs(style.label)}>
					Display Name
					<input
						type="text"
						value={formState.displayName}
						onInput={(e) => {
							setFormState("displayName", e.currentTarget.value);
						}}
					/>
					<button
						type="button"
						{...stylex.attrs(style.undoBtn)}
						onClick={() => {
							setFormState("displayName", props.profile.displayName);
						}}
					>
						<TbRotate2 />
					</button>
				</label>
				<label {...stylex.attrs(style.label)}>
					Bio
					<input
						type="text"
						value={formState.bio}
						onInput={(e) => {
							setFormState("bio", e.currentTarget.value);
						}}
					/>
					<button
						type="button"
						{...stylex.attrs(style.undoBtn)}
						onClick={() => {
							setFormState("bio", props.profile.bio);
						}}
					>
						<TbRotate2 />
					</button>
				</label>
				<label {...stylex.attrs(style.label)}>
					Avatar
					<button
						type="button"
						onclick={() => {
							setIsChangingAvatar(true);
						}}
					>
						Change
					</button>
				</label>
				<Show when={isChangingAvatar()}>
					<UnlimitedModal onOutsideClick={() => setIsChangingAvatar(false)}>
						<UserAvatarHandler />
					</UnlimitedModal>
				</Show>
				<label {...stylex.attrs(style.label)}>
					Banner
					<button
						type="button"
						onclick={() => {
							setIsChangingBanner(true);
						}}
					>
						Change
					</button>
				</label>

				{/* <Show when={isChangingBanner()}>
					<UnlimitedModal onOutsideClick={() => setIsChangingBanner(false)}>
						<h1>Change Banner</h1>
						<button
							type="button"
							{...stylex.attrs(style.undoBtn)}
							onClick={() => {
								setIsChangingBanner(false);
							}}
						>
							<TbCircleArrowLeft />
						</button>
					</UnlimitedModal>
				</Show> */}
			</fieldset>
			<fieldset>
				<legend>Privacy</legend>
				<label {...stylex.attrs(style.label)}>
					Following
					<select
						onChange={(e) => {
							setFormState("isFollowingPublic", e.currentTarget.value === "true");
						}}
					>
						<option value="true" selected={formState.isFollowingPublic}>
							Public
						</option>
						<option value="false" selected={!formState.isFollowingPublic}>
							Private
						</option>
					</select>
					<button
						type="button"
						{...stylex.attrs(style.undoBtn)}
						onClick={() => {
							setFormState("isFollowingPublic", props.profile.isFollowingPublic);
						}}
					>
						<TbRotate2 />
					</button>
				</label>
				<label {...stylex.attrs(style.label)}>
					Followers
					<select
						onchange={(e) => {
							setFormState("isFollowersPublic", e.currentTarget.value === "true");
						}}
					>
						<option value="true" selected={formState.isFollowersPublic}>
							Public
						</option>
						<option value="false" selected={!formState.isFollowersPublic}>
							Private
						</option>
					</select>
					<button
						type="button"
						{...stylex.attrs(style.undoBtn)}
						onClick={() => {
							setFormState("isFollowersPublic", props.profile.isFollowersPublic);
						}}
					>
						<TbRotate2 />
					</button>
				</label>
				<label {...stylex.attrs(style.label)}>
					Posts
					<select
						onchange={(e) => {
							setFormState("isPostsPublic", e.currentTarget.value === "true");
						}}
					>
						<option value="true" selected={formState.isPostsPublic}>
							Public
						</option>
						<option value="false" selected={!formState.isPostsPublic}>
							Private
						</option>
					</select>
					<button
						type="button"
						{...stylex.attrs(style.undoBtn)}
						onClick={() => {
							setFormState("isPostsPublic", props.profile.isPostsPublic);
						}}
					>
						<TbRotate2 />
					</button>
				</label>
				<label {...stylex.attrs(style.label)}>
					Likes
					<select
						onchange={(e) => {
							setFormState("isLikesPublic", e.currentTarget.value === "true");
						}}
					>
						<option value="true" selected={formState.isLikesPublic}>
							Public
						</option>
						<option value="false" selected={!formState.isLikesPublic}>
							Private
						</option>
					</select>
					<button
						type="button"
						{...stylex.attrs(style.undoBtn)}
						onClick={() => {
							setFormState("isLikesPublic", props.profile.isLikesPublic);
						}}
					>
						<TbRotate2 />
					</button>
				</label>
			</fieldset>
			<fieldset>
				<legend>Preferences</legend>
				<label {...stylex.attrs(style.label)}>
					Language
					<select
						onChange={(e) => {
							setFormState("prefferedLanguage", e.currentTarget.value);
						}}
					>
						<For each={allLocales}>
							{(locale) => (
								<option
									selected={formState.prefferedLanguage === locale.name}
									value={locale.symbol}
								>
									{locale.name}
								</option>
							)}
						</For>
					</select>
					<button
						type="button"
						{...stylex.attrs(style.undoBtn)}
						onClick={() => {
							setFormState("prefferedLanguage", props.profile.prefferedLanguage);
						}}
					>
						<TbRotate2 />
					</button>
				</label>
				<label {...stylex.attrs(style.label)}>
					Theme
					<select>
						<option>Light</option>
						<option selected>Dark</option>
					</select>
				</label>
			</fieldset>
			<button type="submit">Save</button>
		</form>
	);
}

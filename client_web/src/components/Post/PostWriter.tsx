import type { Post as PostType, User } from '@/types/internal';
import stylex from '@stylexjs/stylex';
import { createSignal, Match, Show, Switch } from 'solid-js';
import { PostQuoteBig } from './PostQuoteBig';
import { PostQuoteSmall } from './PostQuoteSmall';
import { colors } from '../../variables.stylex';
import { formatDate, timeSince } from '@/Translation';

import { InteractionButton, InteractionButtonStyle } from './InteractionButton';
import { AttachmentList } from './AttachmentList';
import { PostWriterAttachmentList } from './PostWriterAttachments';
import { TbPhoto } from 'solid-icons/tb';

const styles = stylex.create({
  post: {
    width: '100%',
    height: 'fit-content',
    color: colors.text900,
    display: 'flex',
    backgroundColor: colors.background100,
    padding: '1em',
    borderRadius: '1em',
    flexDirection: 'column',
    gap: '0.75em',
    //!Dont really like margin but i dont want to add a wrapper
    marginBottom: '0.5em',
  },
  header: {
    gap: '0.5em',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: '1em',
  },
  avatar: {
    flexShrink: 0,
    width: '3.5em',
    height: '3.5em',
    borderRadius: '50%',
    aspectRatio: '1/1',
  },
  names: {
    display: 'flex',
    gap: '0.1em',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  username: {
    fontSize: '1em',
    color: colors.text500,
    fontWeight: 500,
  },
  time: {
    fontSize: '0.9em',
    color: colors.text500,
    height: '2.3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  displayName: {
    fontSize: '1.3em',
  },
  content: {
    minHeight: '2em',
    border: 'none',
    outline: 'none',
    fontSize: '1.3em',
    wordBreak: 'break-word',
  },
  placeholder: {
    color: colors.text500,
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '1.3em',
  },
  statistics: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: '1em',
    color: colors.text500,
    fontSize: '0.9em',
  },
  activityWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3em',
  },
  send: {},
  sendButton: {
    fontWeight: 700,
    fontSize: '1.2em',
    height: '2.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    backgroundColor: colors.primary500,
    border: 'none',
    width: 'fit-content',
    padding: '0.5em 1.25em',
    borderRadius: '2.5em',
    cursor: 'pointer',
    color: colors.text950,
    lineHeight: 1,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
    paddingHorizontal: '1em',
    position: 'relative',
  },
});
//! Use Small quote if original and quote have media, otherwise use Big quote
export function PostWriter(props: { user: User; quote?: PostType }) {
  //stupid protobuf generates as optional even tho its required and will always be
  const [attachments, setAttachments] = createSignal<string[]>([]);
  const [renderPlaceholder, setRenderPlaceholder] = createSignal(true);
  const [content, setContent] = createSignal('');

  return (
    <article {...stylex.attrs(styles.post)}>
      <header {...stylex.attrs(styles.header)}>
        <img
          {...stylex.attrs(styles.avatar)}
          src={props.user.avatar}
          alt={props.user.displayName}
        />
        <section {...stylex.attrs(styles.names)}>
          <h2 {...stylex.attrs(styles.displayName)}>
            {props.user.displayName}
          </h2>
          <h3 {...stylex.attrs(styles.username)}>@{props.user.username}</h3>
        </section>
      </header>
      <main {...stylex.attrs(styles.main)}>
        <Show when={renderPlaceholder()}>
          <span {...stylex.attrs(styles.placeholder)}>What's popping?</span>
        </Show>
        <div
          onfocus={() => {
            setRenderPlaceholder(false);
          }}
          onblur={() => {
            if (content().length === 0) {
              setRenderPlaceholder(true);
            }
          }}
          contentEditable={true}
          oninput={(e) => {
            const target = e.target as HTMLDivElement;
            setContent(target.innerText);
          }}
          {...stylex.attrs(styles.content)}
        />
        <Show when={attachments().length > 0}>
          <PostWriterAttachmentList attachments={attachments()} />
        </Show>
        <Show when={props.quote?.quoted}>
          <PostQuoteSmall post={props.quote as PostType} />
        </Show>
      </main>
      <footer>
        <ol {...stylex.attrs(styles.statistics)}>
          <InteractionButton icon={<TbPhoto />} />
          <li>
            <button type="button" {...stylex.attrs(styles.sendButton)}>
              Post
            </button>
          </li>
        </ol>
      </footer>
    </article>
  );
}

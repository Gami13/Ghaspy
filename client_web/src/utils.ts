import type { User } from "./types/internal";

export function getDisplayName(user: User) {
	return user.displayName.length > 0 ? user.displayName : user.username;
}

export function getCursorPosition(parent: Node, node: Node, offset: number, stat: { pos: number; done: boolean }) {
	if (stat.done) return stat;
	if (parent.textContent === null) return stat;
	let currentNode = null;
	if (parent.childNodes.length === 0) {
		stat.pos += parent.textContent.length;
	} else {
		for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
			currentNode = parent.childNodes[i];
			if (currentNode === node) {
				stat.pos += offset;
				stat.done = true;
				return stat;
			}
			getCursorPosition(currentNode, node, offset, stat);
		}
	}
	return stat;
}

//find the child node and relative position and set it on range
export function setCursorPosition(parent: Node, range: Range, stat: { pos: number; done: boolean }) {
	if (stat.done) return range;
	if (parent.textContent === null) return stat;

	if (parent.childNodes.length === 0) {
		if (parent.textContent.length >= stat.pos) {
			range.setStart(parent, stat.pos);
			stat.done = true;
		} else {
			stat.pos -= parent.textContent.length;
		}
	} else {
		for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
			const currentNode = parent.childNodes[i];
			setCursorPosition(currentNode, range, stat);
		}
	}
	return range;
}

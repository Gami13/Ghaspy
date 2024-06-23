import { createStore, type SetStoreFunction, type Store } from "solid-js/store";
import type _m0 from "protobufjs/minimal";
import type { ErrorTransKeys } from "./Translation";
import type { DeepPartial, Exact } from "./types/requests";
import { ResponseError } from "./types/responses";
import { batch } from "solid-js";
import type { Endpoint } from "./constants";
import { getTokenFromCookie, useAppState } from "./AppState";
//ytes

type ProtoFetchType<DataType> =
	| {
			isLoading: true;
			isError: undefined;
			isSuccess: undefined;
			error: undefined;
			data: undefined;
	  }
	| {
			isLoading: false;
			isError: true;
			isSuccess: false;
			error: ErrorTransKeys;
			data: undefined;
	  }
	| {
			isLoading: false;
			isError: false;
			isSuccess: true;
			error: undefined;
			data: DataType;
	  }
	| {
			isLoading: false;
			isError: false;
			isSuccess: false;
			error: undefined;
			data: undefined;
	  };

export class ProtoFetch<A, B> {
	private store;
	state;

	private endpointData;
	private controller: AbortController | undefined;
	constructor(endpoint: Endpoint<A, B>) {
		this.endpointData = endpoint;
		this.store = createStore<ProtoFetchType<B>>({
			isLoading: false,
			isError: false,
			isSuccess: false,
			error: undefined,
			data: undefined,
		});

		this.state = this.store[0];
	}

	async Query(body: A = {} as A) {
		this.store[1]("isLoading", true);
		console.log("Querying");
		if (this.controller) {
			this.controller.abort();
			this.controller = undefined;
		}

		this.controller = new AbortController();
		const encodedBody = this.endpointData.encoder?.encode(body);
		const token = getTokenFromCookie();
		console.log("protofetch token", token);
		const response = await fetch(this.endpointData.url, {
			method: this.endpointData.method,
			headers: {
				"Content-Type": this.endpointData.contentType,
				Authorization: token || "",
			},
			body: encodedBody ? new Uint8Array(encodedBody.finish()) : undefined,
			signal: this.controller.signal,
		}).catch((e) => {
			if (e.name === "AbortError") return;
		});
		console.log("response", response);
		if (!response) {
			return this.state;
		}

		this.controller = undefined;

		const bodyAsString = await response.clone().text();
		if (bodyAsString === "internalErrorCrit") {
			batch(() => {
				this.store[1]("isLoading", false);
				this.store[1]("isError", true);
				this.store[1]("isSuccess", false);
				this.store[1]("error", "internalErrorCrit" as ErrorTransKeys);
			});

			return this.state;
		}
		const data = new Uint8Array(await response.arrayBuffer());

		if (!response.ok) {
			const error = ResponseError.decode(data);
			batch(() => {
				this.store[1]("isError", true);
				this.store[1]("isSuccess", false);
				this.store[1]("error", error.message as ErrorTransKeys);
				this.store[1]("isLoading", false);
			});
			return this.state;
		}
		const success = this.endpointData.decoder.decode(data);
		batch(() => {
			this.store[1]("isSuccess", true);
			this.store[1]("data", success);
			this.store[1]("isLoading", false);
			this.store[1]("isError", false);
		});
		return this.state;
	}
}

import { createStore, type SetStoreFunction, type Store } from "solid-js/store";
import type _m0 from "protobufjs/minimal";
import type { ErrorTransKeys } from "./Translation";
import type { DeepPartial, Exact } from "./types/requests";
import { ResponseError } from "./types/responses";
import { batch } from "solid-js";
//ytes
type Coder<Type> = {
	encode(message: Type, writer?: _m0.Writer): _m0.Writer;
	decode(input: _m0.Reader | Uint8Array, length?: number): Type;
	create<I extends Exact<DeepPartial<Type>, I>>(base?: I): Type;
};
type ProtoFetchType<ReturnType> =
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
			data: ReturnType;
	  }
	| {
			isLoading: false;
			isError: false;
			isSuccess: false;
			error: undefined;
			data: undefined;
	  };

export class ProtoFetch<RequestType, ReturnType> {
	private store: [get: Store<ProtoFetchType<ReturnType>>, set: SetStoreFunction<ProtoFetchType<ReturnType>>];
	state: Store<ProtoFetchType<ReturnType>>;
	encoder: Coder<RequestType> | undefined;
	decoder: Coder<ReturnType>;
	controller: AbortController | undefined;
	constructor(encoder: Coder<RequestType> | undefined, decoder: Coder<ReturnType>) {
		this.encoder = encoder;
		this.decoder = decoder;
		this.store = createStore<ProtoFetchType<ReturnType>>({
			isLoading: false,
			isError: false,
			isSuccess: false,
			error: undefined,
			data: undefined,
		});

		this.state = this.store[0];
	}

	createBody<I extends Exact<DeepPartial<RequestType>, I>>(base?: I): Uint8Array {
		if (this.encoder !== undefined) {
			return this.encoder.encode(this.encoder.create(base ?? ({} as Partial<RequestType> as I))).finish();
		}

		return new Uint8Array();
	}

	async Query(url: string, init: RequestInit) {
		this.store[1]("isLoading", true);
		console.log("Querying");
		if (this.controller) {
			this.controller.abort();
			this.controller = undefined;
		}

		this.controller = new AbortController();
		init.signal = this.controller.signal;

		const response = await fetch(url, init).catch((e) => {
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
		const success = this.decoder.decode(data);
		batch(() => {
			this.store[1]("isSuccess", true);
			this.store[1]("data", success);
			this.store[1]("isLoading", false);
			this.store[1]("isError", false);
		});
		return this.state;
	}
}

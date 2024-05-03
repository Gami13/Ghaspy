import { createStore, type SetStoreFunction, type Store } from "solid-js/store";
import _m0 from "protobufjs/minimal";
import type { ErrorTransKeys } from "./Translation";
import { DeepPartial, Exact } from "./types/requests";
import { ResponseError } from "./types/responses";

type Coder<Type> = {
	encode(message: Type, writer?: _m0.Writer): _m0.Writer;
	decode(input: _m0.Reader | Uint8Array, length?: number): Type;
	create<I extends Exact<DeepPartial<Type>, I>>(base?: I): Type;
};
type ProtoFetchType<ReturnType> = {
	isLoading: boolean;
	isError: boolean;
	isCriticalError: boolean;
	isSuccess: boolean;
	error: ErrorTransKeys | undefined;
	data: ReturnType | undefined;
};

export class ProtoFetch<RequestType, ReturnType> {
	private store: [get: Store<ProtoFetchType<ReturnType>>, set: SetStoreFunction<ProtoFetchType<ReturnType>>];
	state: Store<ProtoFetchType<ReturnType>>;
	encoder: Coder<RequestType>;
	decoder: Coder<ReturnType>;
	constructor(encoder: Coder<RequestType>, decoder: Coder<ReturnType>) {
		this.encoder = encoder;
		this.decoder = decoder;
		this.store = createStore<ProtoFetchType<ReturnType>>({
			isLoading: false,
			isError: false,
			isCriticalError: false,
			isSuccess: false,
			error: undefined,
			data: undefined,
		});
		this.state = this.store[0];
	}

	createBody<I extends Exact<DeepPartial<RequestType>, I>>(base?: I): Uint8Array {
		return this.encoder.encode(this.encoder.create(base ?? ({} as any))).finish();
	
	}


	async Query(url: string, init: RequestInit) {
		this.store[1]("isLoading", true);
		const response = await fetch(url, init);
		const bodyAsString = await response.clone().text();
		if(bodyAsString=="internalErrorCrit")
			{
				this.store[1]("isLoading", false);
				this.store[1]("isError", true);
				this.store[1]("isCriticalError", true);
				return;
			}
		const data = new Uint8Array(await response.arrayBuffer());
		
		if (!response.ok) {
	
			const error = ResponseError.decode(data);
			this.store[1]("isError", true);
			this.store[1]("error", error.message as ErrorTransKeys);
			this.store[1]("isLoading", false);
			return
		}
		const success = this.decoder.decode(data);
		this.store[1]("isSuccess", true);
		this.store[1]("data", success);
		this.store[1]("isLoading", false);

	}
}

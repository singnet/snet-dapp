// package: MinecraftizingService
// file: MinecraftizingService.proto

import * as MinecraftizingService_pb from "./MinecraftizingService_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MinecraftizingServicegetMinecraftiziedImage = {
  readonly methodName: string;
  readonly service: typeof MinecraftizingService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MinecraftizingService_pb.minecraftRequest;
  readonly responseType: typeof MinecraftizingService_pb.minecraftResponse;
};

export class MinecraftizingService {
  static readonly serviceName: string;
  static readonly getMinecraftiziedImage: MinecraftizingServicegetMinecraftiziedImage;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class MinecraftizingServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getMinecraftiziedImage(
    requestMessage: MinecraftizingService_pb.minecraftRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MinecraftizingService_pb.minecraftResponse|null) => void
  ): UnaryResponse;
  getMinecraftiziedImage(
    requestMessage: MinecraftizingService_pb.minecraftRequest,
    callback: (error: ServiceError|null, responseMessage: MinecraftizingService_pb.minecraftResponse|null) => void
  ): UnaryResponse;
}


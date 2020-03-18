// package: MatchingApi
// file: MatchingAPI.proto

import * as MatchingAPI_pb from "./MatchingAPI_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MatchApigetKP = {
  readonly methodName: string;
  readonly service: typeof MatchApi;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MatchingAPI_pb.keypointRequest;
  readonly responseType: typeof MatchingAPI_pb.keypointResponse;
};

type MatchApigetDescByImage = {
  readonly methodName: string;
  readonly service: typeof MatchApi;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MatchingAPI_pb.descriptorRequest;
  readonly responseType: typeof MatchingAPI_pb.descriptorResponse;
};

type MatchApigetDescByKps = {
  readonly methodName: string;
  readonly service: typeof MatchApi;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MatchingAPI_pb.descriptorByKpsRequest;
  readonly responseType: typeof MatchingAPI_pb.descriptorResponse;
};

type MatchApigetMatch = {
  readonly methodName: string;
  readonly service: typeof MatchApi;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MatchingAPI_pb.matchingRequest;
  readonly responseType: typeof MatchingAPI_pb.matchingResponse;
};

type MatchApigetMatchByImage = {
  readonly methodName: string;
  readonly service: typeof MatchApi;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MatchingAPI_pb.matchingByImageRequest;
  readonly responseType: typeof MatchingAPI_pb.matchingByImageResponse;
};

type MatchApigetTransformParameters = {
  readonly methodName: string;
  readonly service: typeof MatchApi;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MatchingAPI_pb.transformRequest;
  readonly responseType: typeof MatchingAPI_pb.transformResponse;
};

type MatchApigetTransformParametersByImage = {
  readonly methodName: string;
  readonly service: typeof MatchApi;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MatchingAPI_pb.transformByImageRequest;
  readonly responseType: typeof MatchingAPI_pb.transformResponse;
};

type MatchApigetClosestImages = {
  readonly methodName: string;
  readonly service: typeof MatchApi;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof MatchingAPI_pb.imageRetrievalRequest;
  readonly responseType: typeof MatchingAPI_pb.imageRetrievalResponse;
};

export class MatchApi {
  static readonly serviceName: string;
  static readonly getKP: MatchApigetKP;
  static readonly getDescByImage: MatchApigetDescByImage;
  static readonly getDescByKps: MatchApigetDescByKps;
  static readonly getMatch: MatchApigetMatch;
  static readonly getMatchByImage: MatchApigetMatchByImage;
  static readonly getTransformParameters: MatchApigetTransformParameters;
  static readonly getTransformParametersByImage: MatchApigetTransformParametersByImage;
  static readonly getClosestImages: MatchApigetClosestImages;
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

export class MatchApiClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getKP(
    requestMessage: MatchingAPI_pb.keypointRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.keypointResponse|null) => void
  ): UnaryResponse;
  getKP(
    requestMessage: MatchingAPI_pb.keypointRequest,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.keypointResponse|null) => void
  ): UnaryResponse;
  getDescByImage(
    requestMessage: MatchingAPI_pb.descriptorRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.descriptorResponse|null) => void
  ): UnaryResponse;
  getDescByImage(
    requestMessage: MatchingAPI_pb.descriptorRequest,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.descriptorResponse|null) => void
  ): UnaryResponse;
  getDescByKps(
    requestMessage: MatchingAPI_pb.descriptorByKpsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.descriptorResponse|null) => void
  ): UnaryResponse;
  getDescByKps(
    requestMessage: MatchingAPI_pb.descriptorByKpsRequest,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.descriptorResponse|null) => void
  ): UnaryResponse;
  getMatch(
    requestMessage: MatchingAPI_pb.matchingRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.matchingResponse|null) => void
  ): UnaryResponse;
  getMatch(
    requestMessage: MatchingAPI_pb.matchingRequest,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.matchingResponse|null) => void
  ): UnaryResponse;
  getMatchByImage(
    requestMessage: MatchingAPI_pb.matchingByImageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.matchingByImageResponse|null) => void
  ): UnaryResponse;
  getMatchByImage(
    requestMessage: MatchingAPI_pb.matchingByImageRequest,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.matchingByImageResponse|null) => void
  ): UnaryResponse;
  getTransformParameters(
    requestMessage: MatchingAPI_pb.transformRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.transformResponse|null) => void
  ): UnaryResponse;
  getTransformParameters(
    requestMessage: MatchingAPI_pb.transformRequest,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.transformResponse|null) => void
  ): UnaryResponse;
  getTransformParametersByImage(
    requestMessage: MatchingAPI_pb.transformByImageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.transformResponse|null) => void
  ): UnaryResponse;
  getTransformParametersByImage(
    requestMessage: MatchingAPI_pb.transformByImageRequest,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.transformResponse|null) => void
  ): UnaryResponse;
  getClosestImages(
    requestMessage: MatchingAPI_pb.imageRetrievalRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.imageRetrievalResponse|null) => void
  ): UnaryResponse;
  getClosestImages(
    requestMessage: MatchingAPI_pb.imageRetrievalRequest,
    callback: (error: ServiceError|null, responseMessage: MatchingAPI_pb.imageRetrievalResponse|null) => void
  ): UnaryResponse;
}


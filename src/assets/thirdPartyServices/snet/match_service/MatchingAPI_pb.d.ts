// package: MatchingApi
// file: MatchingAPI.proto

import * as jspb from "google-protobuf";

export class keyPoint extends jspb.Message {
  getSize(): number;
  setSize(value: number): void;

  getAngle(): number;
  setAngle(value: number): void;

  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  getResponse(): number;
  setResponse(value: number): void;

  getOctave(): number;
  setOctave(value: number): void;

  getClassId(): number;
  setClassId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): keyPoint.AsObject;
  static toObject(includeInstance: boolean, msg: keyPoint): keyPoint.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: keyPoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): keyPoint;
  static deserializeBinaryFromReader(message: keyPoint, reader: jspb.BinaryReader): keyPoint;
}

export namespace keyPoint {
  export type AsObject = {
    size: number,
    angle: number,
    x: number,
    y: number,
    response: number,
    octave: number,
    classId: number,
  }
}

export class keypointRequest extends jspb.Message {
  getImage(): Uint8Array | string;
  getImage_asU8(): Uint8Array;
  getImage_asB64(): string;
  setImage(value: Uint8Array | string): void;

  getDetectorName(): string;
  setDetectorName(value: string): void;

  getParameters(): string;
  setParameters(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): keypointRequest.AsObject;
  static toObject(includeInstance: boolean, msg: keypointRequest): keypointRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: keypointRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): keypointRequest;
  static deserializeBinaryFromReader(message: keypointRequest, reader: jspb.BinaryReader): keypointRequest;
}

export namespace keypointRequest {
  export type AsObject = {
    image: Uint8Array | string,
    detectorName: string,
    parameters: string,
  }
}

export class keypointResponse extends jspb.Message {
  clearKeypointsList(): void;
  getKeypointsList(): Array<keyPoint>;
  setKeypointsList(value: Array<keyPoint>): void;
  addKeypoints(value?: keyPoint, index?: number): keyPoint;

  getStatus(): string;
  setStatus(value: string): void;

  getUiimage(): string;
  setUiimage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): keypointResponse.AsObject;
  static toObject(includeInstance: boolean, msg: keypointResponse): keypointResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: keypointResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): keypointResponse;
  static deserializeBinaryFromReader(message: keypointResponse, reader: jspb.BinaryReader): keypointResponse;
}

export namespace keypointResponse {
  export type AsObject = {
    keypointsList: Array<keyPoint.AsObject>,
    status: string,
    uiimage: string,
  }
}

export class oneDescriptor extends jspb.Message {
  clearOnedescfList(): void;
  getOnedescfList(): Array<number>;
  setOnedescfList(value: Array<number>): void;
  addOnedescf(value: number, index?: number): number;

  clearOnedescuList(): void;
  getOnedescuList(): Array<number>;
  setOnedescuList(value: Array<number>): void;
  addOnedescu(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): oneDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: oneDescriptor): oneDescriptor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: oneDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): oneDescriptor;
  static deserializeBinaryFromReader(message: oneDescriptor, reader: jspb.BinaryReader): oneDescriptor;
}

export namespace oneDescriptor {
  export type AsObject = {
    onedescfList: Array<number>,
    onedescuList: Array<number>,
  }
}

export class descriptorRequest extends jspb.Message {
  getImage(): Uint8Array | string;
  getImage_asU8(): Uint8Array;
  getImage_asB64(): string;
  setImage(value: Uint8Array | string): void;

  getDescriptorName(): string;
  setDescriptorName(value: string): void;

  getDescParameters(): string;
  setDescParameters(value: string): void;

  getDetectorName(): string;
  setDetectorName(value: string): void;

  getDetParameters(): string;
  setDetParameters(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): descriptorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: descriptorRequest): descriptorRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: descriptorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): descriptorRequest;
  static deserializeBinaryFromReader(message: descriptorRequest, reader: jspb.BinaryReader): descriptorRequest;
}

export namespace descriptorRequest {
  export type AsObject = {
    image: Uint8Array | string,
    descriptorName: string,
    descParameters: string,
    detectorName: string,
    detParameters: string,
  }
}

export class descriptorResponse extends jspb.Message {
  clearFeaturesList(): void;
  getFeaturesList(): Array<oneDescriptor>;
  setFeaturesList(value: Array<oneDescriptor>): void;
  addFeatures(value?: oneDescriptor, index?: number): oneDescriptor;

  clearKeypointsList(): void;
  getKeypointsList(): Array<keyPoint>;
  setKeypointsList(value: Array<keyPoint>): void;
  addKeypoints(value?: keyPoint, index?: number): keyPoint;

  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): descriptorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: descriptorResponse): descriptorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: descriptorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): descriptorResponse;
  static deserializeBinaryFromReader(message: descriptorResponse, reader: jspb.BinaryReader): descriptorResponse;
}

export namespace descriptorResponse {
  export type AsObject = {
    featuresList: Array<oneDescriptor.AsObject>,
    keypointsList: Array<keyPoint.AsObject>,
    status: string,
  }
}

export class matchingRequest extends jspb.Message {
  clearFeaturesFirstList(): void;
  getFeaturesFirstList(): Array<oneDescriptor>;
  setFeaturesFirstList(value: Array<oneDescriptor>): void;
  addFeaturesFirst(value?: oneDescriptor, index?: number): oneDescriptor;

  clearFeaturesSecondList(): void;
  getFeaturesSecondList(): Array<oneDescriptor>;
  setFeaturesSecondList(value: Array<oneDescriptor>): void;
  addFeaturesSecond(value?: oneDescriptor, index?: number): oneDescriptor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): matchingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: matchingRequest): matchingRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: matchingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): matchingRequest;
  static deserializeBinaryFromReader(message: matchingRequest, reader: jspb.BinaryReader): matchingRequest;
}

export namespace matchingRequest {
  export type AsObject = {
    featuresFirstList: Array<oneDescriptor.AsObject>,
    featuresSecondList: Array<oneDescriptor.AsObject>,
  }
}

export class matchedPoint extends jspb.Message {
  getQueryidx(): number;
  setQueryidx(value: number): void;

  getTrainidx(): number;
  setTrainidx(value: number): void;

  getImgidx(): number;
  setImgidx(value: number): void;

  getDistance(): number;
  setDistance(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): matchedPoint.AsObject;
  static toObject(includeInstance: boolean, msg: matchedPoint): matchedPoint.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: matchedPoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): matchedPoint;
  static deserializeBinaryFromReader(message: matchedPoint, reader: jspb.BinaryReader): matchedPoint;
}

export namespace matchedPoint {
  export type AsObject = {
    queryidx: number,
    trainidx: number,
    imgidx: number,
    distance: number,
  }
}

export class matchingResponse extends jspb.Message {
  clearAllMatchesList(): void;
  getAllMatchesList(): Array<matchedPoint>;
  setAllMatchesList(value: Array<matchedPoint>): void;
  addAllMatches(value?: matchedPoint, index?: number): matchedPoint;

  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): matchingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: matchingResponse): matchingResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: matchingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): matchingResponse;
  static deserializeBinaryFromReader(message: matchingResponse, reader: jspb.BinaryReader): matchingResponse;
}

export namespace matchingResponse {
  export type AsObject = {
    allMatchesList: Array<matchedPoint.AsObject>,
    status: string,
  }
}

export class descriptorByKpsRequest extends jspb.Message {
  getImage(): Uint8Array | string;
  getImage_asU8(): Uint8Array;
  getImage_asB64(): string;
  setImage(value: Uint8Array | string): void;

  getDescriptorName(): string;
  setDescriptorName(value: string): void;

  getDescParameters(): string;
  setDescParameters(value: string): void;

  clearKeypointsList(): void;
  getKeypointsList(): Array<keyPoint>;
  setKeypointsList(value: Array<keyPoint>): void;
  addKeypoints(value?: keyPoint, index?: number): keyPoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): descriptorByKpsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: descriptorByKpsRequest): descriptorByKpsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: descriptorByKpsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): descriptorByKpsRequest;
  static deserializeBinaryFromReader(message: descriptorByKpsRequest, reader: jspb.BinaryReader): descriptorByKpsRequest;
}

export namespace descriptorByKpsRequest {
  export type AsObject = {
    image: Uint8Array | string,
    descriptorName: string,
    descParameters: string,
    keypointsList: Array<keyPoint.AsObject>,
  }
}

export class matchingByImageRequest extends jspb.Message {
  getImageFirst(): Uint8Array | string;
  getImageFirst_asU8(): Uint8Array;
  getImageFirst_asB64(): string;
  setImageFirst(value: Uint8Array | string): void;

  getImageSecond(): Uint8Array | string;
  getImageSecond_asU8(): Uint8Array;
  getImageSecond_asB64(): string;
  setImageSecond(value: Uint8Array | string): void;

  getDescriptorName(): string;
  setDescriptorName(value: string): void;

  getDescParameters(): string;
  setDescParameters(value: string): void;

  getDetectorName(): string;
  setDetectorName(value: string): void;

  getDetParameters(): string;
  setDetParameters(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): matchingByImageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: matchingByImageRequest): matchingByImageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: matchingByImageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): matchingByImageRequest;
  static deserializeBinaryFromReader(message: matchingByImageRequest, reader: jspb.BinaryReader): matchingByImageRequest;
}

export namespace matchingByImageRequest {
  export type AsObject = {
    imageFirst: Uint8Array | string,
    imageSecond: Uint8Array | string,
    descriptorName: string,
    descParameters: string,
    detectorName: string,
    detParameters: string,
  }
}

export class matchingByImageResponse extends jspb.Message {
  clearAllMatchesList(): void;
  getAllMatchesList(): Array<matchedPoint>;
  setAllMatchesList(value: Array<matchedPoint>): void;
  addAllMatches(value?: matchedPoint, index?: number): matchedPoint;

  getStatus(): string;
  setStatus(value: string): void;

  clearKeypointsFirstList(): void;
  getKeypointsFirstList(): Array<keyPoint>;
  setKeypointsFirstList(value: Array<keyPoint>): void;
  addKeypointsFirst(value?: keyPoint, index?: number): keyPoint;

  clearKeypointsSecondList(): void;
  getKeypointsSecondList(): Array<keyPoint>;
  setKeypointsSecondList(value: Array<keyPoint>): void;
  addKeypointsSecond(value?: keyPoint, index?: number): keyPoint;

  getUiimage(): string;
  setUiimage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): matchingByImageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: matchingByImageResponse): matchingByImageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: matchingByImageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): matchingByImageResponse;
  static deserializeBinaryFromReader(message: matchingByImageResponse, reader: jspb.BinaryReader): matchingByImageResponse;
}

export namespace matchingByImageResponse {
  export type AsObject = {
    allMatchesList: Array<matchedPoint.AsObject>,
    status: string,
    keypointsFirstList: Array<keyPoint.AsObject>,
    keypointsSecondList: Array<keyPoint.AsObject>,
    uiimage: string,
  }
}

export class transformRequest extends jspb.Message {
  clearAllMatchesList(): void;
  getAllMatchesList(): Array<matchedPoint>;
  setAllMatchesList(value: Array<matchedPoint>): void;
  addAllMatches(value?: matchedPoint, index?: number): matchedPoint;

  getTransformType(): string;
  setTransformType(value: string): void;

  clearKeypointsFirstList(): void;
  getKeypointsFirstList(): Array<keyPoint>;
  setKeypointsFirstList(value: Array<keyPoint>): void;
  addKeypointsFirst(value?: keyPoint, index?: number): keyPoint;

  clearKeypointsSecondList(): void;
  getKeypointsSecondList(): Array<keyPoint>;
  setKeypointsSecondList(value: Array<keyPoint>): void;
  addKeypointsSecond(value?: keyPoint, index?: number): keyPoint;

  getTransformInputParameters(): string;
  setTransformInputParameters(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): transformRequest.AsObject;
  static toObject(includeInstance: boolean, msg: transformRequest): transformRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: transformRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): transformRequest;
  static deserializeBinaryFromReader(message: transformRequest, reader: jspb.BinaryReader): transformRequest;
}

export namespace transformRequest {
  export type AsObject = {
    allMatchesList: Array<matchedPoint.AsObject>,
    transformType: string,
    keypointsFirstList: Array<keyPoint.AsObject>,
    keypointsSecondList: Array<keyPoint.AsObject>,
    transformInputParameters: string,
  }
}

export class transformResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): void;

  clearTransformParametersList(): void;
  getTransformParametersList(): Array<number>;
  setTransformParametersList(value: Array<number>): void;
  addTransformParameters(value: number, index?: number): number;

  getResultimage(): string;
  setResultimage(value: string): void;

  getUiimage(): string;
  setUiimage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): transformResponse.AsObject;
  static toObject(includeInstance: boolean, msg: transformResponse): transformResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: transformResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): transformResponse;
  static deserializeBinaryFromReader(message: transformResponse, reader: jspb.BinaryReader): transformResponse;
}

export namespace transformResponse {
  export type AsObject = {
    status: string,
    transformParametersList: Array<number>,
    resultimage: string,
    uiimage: string,
  }
}

export class transformByImageRequest extends jspb.Message {
  getImageFirst(): Uint8Array | string;
  getImageFirst_asU8(): Uint8Array;
  getImageFirst_asB64(): string;
  setImageFirst(value: Uint8Array | string): void;

  getImageSecond(): Uint8Array | string;
  getImageSecond_asU8(): Uint8Array;
  getImageSecond_asB64(): string;
  setImageSecond(value: Uint8Array | string): void;

  getDescriptorName(): string;
  setDescriptorName(value: string): void;

  getDescParameters(): string;
  setDescParameters(value: string): void;

  getDetectorName(): string;
  setDetectorName(value: string): void;

  getDetParameters(): string;
  setDetParameters(value: string): void;

  getTransformType(): string;
  setTransformType(value: string): void;

  getTransformInputParameters(): string;
  setTransformInputParameters(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): transformByImageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: transformByImageRequest): transformByImageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: transformByImageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): transformByImageRequest;
  static deserializeBinaryFromReader(message: transformByImageRequest, reader: jspb.BinaryReader): transformByImageRequest;
}

export namespace transformByImageRequest {
  export type AsObject = {
    imageFirst: Uint8Array | string,
    imageSecond: Uint8Array | string,
    descriptorName: string,
    descParameters: string,
    detectorName: string,
    detParameters: string,
    transformType: string,
    transformInputParameters: string,
  }
}

export class imageRetrievalRequest extends jspb.Message {
  getInputImage(): Uint8Array | string;
  getInputImage_asU8(): Uint8Array;
  getInputImage_asB64(): string;
  setInputImage(value: Uint8Array | string): void;

  clearImageBaseList(): void;
  getImageBaseList(): Array<Uint8Array | string>;
  getImageBaseList_asU8(): Array<Uint8Array>;
  getImageBaseList_asB64(): Array<string>;
  setImageBaseList(value: Array<Uint8Array | string>): void;
  addImageBase(value: Uint8Array | string, index?: number): Uint8Array | string;

  getDescriptorName(): string;
  setDescriptorName(value: string): void;

  getDescParameters(): string;
  setDescParameters(value: string): void;

  getDetectorName(): string;
  setDetectorName(value: string): void;

  getDetParameters(): string;
  setDetParameters(value: string): void;

  getNumofimagestoretrieve(): number;
  setNumofimagestoretrieve(value: number): void;

  getNumofclusters(): number;
  setNumofclusters(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): imageRetrievalRequest.AsObject;
  static toObject(includeInstance: boolean, msg: imageRetrievalRequest): imageRetrievalRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: imageRetrievalRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): imageRetrievalRequest;
  static deserializeBinaryFromReader(message: imageRetrievalRequest, reader: jspb.BinaryReader): imageRetrievalRequest;
}

export namespace imageRetrievalRequest {
  export type AsObject = {
    inputImage: Uint8Array | string,
    imageBaseList: Array<Uint8Array | string>,
    descriptorName: string,
    descParameters: string,
    detectorName: string,
    detParameters: string,
    numofimagestoretrieve: number,
    numofclusters: number,
  }
}

export class imageRetrievalResponse extends jspb.Message {
  clearImagesList(): void;
  getImagesList(): Array<Uint8Array | string>;
  getImagesList_asU8(): Array<Uint8Array>;
  getImagesList_asB64(): Array<string>;
  setImagesList(value: Array<Uint8Array | string>): void;
  addImages(value: Uint8Array | string, index?: number): Uint8Array | string;

  clearDistancesList(): void;
  getDistancesList(): Array<number>;
  setDistancesList(value: Array<number>): void;
  addDistances(value: number, index?: number): number;

  getStatus(): string;
  setStatus(value: string): void;

  getUiimage(): string;
  setUiimage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): imageRetrievalResponse.AsObject;
  static toObject(includeInstance: boolean, msg: imageRetrievalResponse): imageRetrievalResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: imageRetrievalResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): imageRetrievalResponse;
  static deserializeBinaryFromReader(message: imageRetrievalResponse, reader: jspb.BinaryReader): imageRetrievalResponse;
}

export namespace imageRetrievalResponse {
  export type AsObject = {
    imagesList: Array<Uint8Array | string>,
    distancesList: Array<number>,
    status: string,
    uiimage: string,
  }
}


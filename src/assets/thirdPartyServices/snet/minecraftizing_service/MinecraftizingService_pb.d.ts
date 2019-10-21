// package: MinecraftizingService
// file: MinecraftizingService.proto

import * as jspb from "google-protobuf";

export class minecraftRequest extends jspb.Message {
  getNetworkName(): string;
  setNetworkName(value: string): void;

  getDataset(): string;
  setDataset(value: string): void;

  getInputImage(): Uint8Array | string;
  getInputImage_asU8(): Uint8Array;
  getInputImage_asB64(): string;
  setInputImage(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): minecraftRequest.AsObject;
  static toObject(includeInstance: boolean, msg: minecraftRequest): minecraftRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: minecraftRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): minecraftRequest;
  static deserializeBinaryFromReader(message: minecraftRequest, reader: jspb.BinaryReader): minecraftRequest;
}

export namespace minecraftRequest {
  export type AsObject = {
    networkName: string,
    dataset: string,
    inputImage: Uint8Array | string,
  }
}

export class minecraftResponse extends jspb.Message {
  getOutput(): string;
  setOutput(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getDType(): string;
  setDType(value: string): void;

  getHeight(): number;
  setHeight(value: number): void;

  getWidth(): number;
  setWidth(value: number): void;

  getNChannels(): number;
  setNChannels(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): minecraftResponse.AsObject;
  static toObject(includeInstance: boolean, msg: minecraftResponse): minecraftResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: minecraftResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): minecraftResponse;
  static deserializeBinaryFromReader(message: minecraftResponse, reader: jspb.BinaryReader): minecraftResponse;
}

export namespace minecraftResponse {
  export type AsObject = {
    output: string,
    status: string,
    dType: string,
    height: number,
    width: number,
    nChannels: number,
  }
}


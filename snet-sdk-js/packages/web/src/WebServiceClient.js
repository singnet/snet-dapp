import { grpc } from "@improbable-eng/grpc-web";
import { forOwn } from "lodash";
import { PaymentChannelStateService, PaymentChannelStateServiceClient } from "./proto/state_service_pb_service";
import { Model, ModelClient } from "./proto/training_pb_service";
import training_pb from "./proto/training_pb";
import { BaseServiceClient, logger } from "./sdk-core";

class WebServiceClient extends BaseServiceClient {
  /**
   * @param {MethodDescriptor} methodDescriptor
   * @param {InvokeRpcOptions} props
   * @returns {Request}
   */
  async invoke(methodDescriptor, props) {
    const requestProps = await this._generateRequestProps(methodDescriptor, props);
    return grpc.invoke(methodDescriptor, requestProps);
  }

  /**
   * @param {UnaryMethodDefinition} methodDescriptor
   * @param {UnaryRpcOptions} props
   * @returns {Request}
   */
  async unary(methodDescriptor, props) {
    const requestProps = await this._generateRequestProps(methodDescriptor, props);
    return grpc.unary(methodDescriptor, requestProps);
  }

  /**
   *
   * @param {UnaryMethodDefinition} methodDescriptor
   * @param {UnaryRpcOptions} props
   * @returns {Promise<UnaryRpcOptions>}
   * @private
   */
  async _generateRequestProps(methodDescriptor, props) {
    const serviceEndpoint = this._getServiceEndpoint();
    const host = `${serviceEndpoint.protocol}//${serviceEndpoint.host}`;
    const metadata = await this._enhanceMetadata(props.metadata, methodDescriptor);
    return {
      ...props,
      host,
      metadata,
    };
  }

  async _enhanceMetadata(metadata = new grpc.Metadata(), methodDescriptor) {
    if (this._options.disableBlockchainOperations) {
      return metadata;
    }

    if (this._options.metadataGenerator) {
      const { serviceName } = methodDescriptor.service;
      const { methodName } = methodDescriptor;
      const customMetadata = await this._options.metadataGenerator(this, serviceName, methodName);
      forOwn(customMetadata, (value, key) => {
        metadata.append(key, value);
      });
      return metadata;
    }

    // const { channelId, nonce, signingAmount, signatureBytes } = await this._fetchPaymentMetadata();
    // metadata.append('snet-payment-type', 'escrow');

    const paymentMetadata = await this._fetchPaymentMetadata();
    paymentMetadata.forEach((paymentMeta) => {
      Object.entries(paymentMeta).forEach(([key, value]) => {
        metadata.append(key, value);
      });
    });

    // metadata.append('snet-payment-channel-id', `${channelId}`);
    // metadata.append('snet-payment-channel-nonce', `${nonce}`);
    // metadata.append('snet-payment-channel-amount', `${signingAmount}`);
    // metadata.append('snet-payment-channel-signature-bin', signatureBytes.toString('base64'));
    metadata.append("snet-payment-mpe-address", this._mpeContract.address);
    console.log("metadata", metadata);
    return metadata;
  }

  _generatePaymentChannelStateServiceClient() {
    logger.debug("Creating PaymentChannelStateService client", {
      tags: ["gRPC"],
    });
    const serviceEndpoint = this._getServiceEndpoint();
    logger.debug(`PaymentChannelStateService pointing to ${serviceEndpoint.host}, `, { tags: ["gRPC"] });
    const host = `${serviceEndpoint.protocol}//${serviceEndpoint.host}`;
    return new PaymentChannelStateServiceClient(host);
  }

  _getChannelStateRequestMethodDescriptor() {
    return PaymentChannelStateService.GetChannelState.requestType;
  }

  _generateModelServiceClient() {
    logger.debug("Creating TrainingStateService client", { tags: ["gRPC"] });
    const serviceEndpoint = this._getServiceEndpoint();
    logger.debug(`TrainingChannelStateService pointing to ${serviceEndpoint.host}, `, { tags: ["gRPC"] });
    const host = `${serviceEndpoint.protocol}//${serviceEndpoint.host}`;
    return new ModelClient(host);
  }

  _getModelRequestMethodDescriptor() {
    return Model.get_all_models.requestType;
  }

  _getAuthorizationRequestMethodDescriptor() {
    return training_pb.AuthorizationDetails;
  }

  _getCreateModelRequestMethodDescriptor() {
    return Model.create_model.requestType;
  }

  _getDeleteModelRequestMethodDescriptor() {
    return Model.delete_model.requestType;
  }

  _getUpdateModelRequestMethodDescriptor() {
    return Model.update_model_access.requestType;
  }

  _getModelDetailsRequestMethodDescriptor() {
    return training_pb.ModelDetails;
  }
}

export default WebServiceClient;

export function unaryDynamic(serviceClient, root, serviceFqn, methodName, requestObj, onActionEnd) {
  console.log(serviceClient);
  const svc = root.lookupService(serviceFqn);
  const m = svc.methods[methodName];

  const Req = root.lookupType(m.requestType);
  const Res = root.lookupType(m.responseType);

  const methodDef = {
    service: { serviceName: serviceFqn },
    methodName,
    requestStream: false,
    responseStream: false,

    // responseType is needed by grpc-web to parse the response:
    responseType: {
      deserializeBinary: (bytes) => {
        const message = Res.decode(new Uint8Array(bytes));
        const object = Res.toObject(message);
        return object;
      },
    },
  };

  const request = {
    serializeBinary: () => Req.encode(Req.fromObject(requestObj)).finish(),
  };

  serviceClient.unary(methodDef, {
    request,
    preventCloseServiceOnEnd: false,
    onEnd: onActionEnd,
  });
}

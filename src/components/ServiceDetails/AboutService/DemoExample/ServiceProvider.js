import React, { Component, Fragment } from "react";
import { Root } from "protobufjs";

import SampleServices from "../../../../assets/services";
import GRPCProtoV3Spec from "../../../../assets/models/GRPCProtoV3Spec";

const fetchServiceSpec = (org_id, service_id) => {
  let _urlservicebuf = `https://protojs.singularitynet.io/ropsten/${org_id}/${service_id}`;

  return fetch(encodeURI(_urlservicebuf))
    .then(serviceSpecResponse => serviceSpecResponse.json())
    .then(
      serviceSpec =>
        new Promise(resolve => {
          const serviceSpecJSON = Root.fromJSON(serviceSpec[0]);
          const protoSpec = new GRPCProtoV3Spec(serviceSpecJSON);
          resolve({ serviceSpecJSON, protoSpec });
        })
    );
};

const ServiceProvider = async ({ org_id, service_id, demoComponentProps }) => {
  const { serviceSpecJSON, protoSpec } = await fetchServiceSpec(org_id, service_id);

  const handleJobInvocation = (serviceName, methodName, requestObject) => {
    console.log("serviceName", serviceName, "methodName", methodName, "requestObject", requestObject);
  };

  const DemoComponent = SampleServices.getComponent(service_id, org_id);
  return props => {
    return (
      <DemoComponent
        {...demoComponentProps}
        callApiCallback={handleJobInvocation}
        protoSpec={protoSpec}
        serviceSpec={serviceSpecJSON}
      />
    );
  };
};

export default ServiceProvider;

# snet-sdk-web

![npm](https://img.shields.io/npm/v/snet-sdk-web.svg)

SingularityNET SDK for Browser (Web)

## Getting Started

These instructions are for the development and use of the SingularityNET SDK for JavaScript on web platform like browsers.
### Installation
```bash
npm install snet-sdk-web
```
### Usage

The SingularityNET SDK allows you to import compiled client libraries for your service or services of choice and make calls to those services programmatically from your application by setting up state channels with the providers of those services and making gRPC calls to the SingularityNET daemons for those services by selecting a channel with sufficient funding and supplying the appropriate metadata for authentication.

```javascript
import SnetSDK from "snet-sdk-web";

import config from "./config";

const sdk = new SnetSDK(config);
```

Now, the instance of the sdk can be used to instantiate clients for SingularityNET services. To interact with those services, the sdk needs to be supplied with the compiled gRPC client libraries.

This SDK uses [gRPC-web](https://github.com/improbable-eng/grpc-web) by improbable engineering. To generate the gRPC client libraries, follow the instructions given by the `gRPC-web` package [here](https://github.com/improbable-eng/grpc-web/tree/master/client/grpc-web).

The api to invoke gRPC methods against a service is similar to that of the `gRPC-web` package used.

```javascript

import { <ServiceName> } from  '<path_to_grpc_service_file>'

import { <Message> } from  '<path_to_grpc_message_file>'

const  client = sdk.createServiceClient("<org_id>", "<service_id>")

```
This generates a service client which can be used to make gRPC calls to the desired service.
You can then invoke service specific calls as follows
```javascript
client.invoke(<ServiceName>.<MethodName>, <InvokeRpcOptions>);
```

More details about can be found on the official [documentation](https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/invoke.md#invokerpcoptions).

---

## WEBSDK SETUP LOCALLY

If you want to setup WEB SDK locally please follow below steps

First clone this repo to your local machine.

Then open repo and go to web folder inside SNET-SDK-JS > packages > web

```bash
npm install
```

If you are using **Windows** Then follow below steps first

Copy **core** folder from **SNET-SDK-JS > packages > core** and paste or replace it inside **SNET-SDK-JS > packages > web > src**

```bash
npm run build
```

```bash
npm link
```

Now go to the other project or repo where you want to connect SDK locally

```bash
npm link snet-sdk-web
```

```bash
npm run start
```

**(NOTE)** If you change anything inside web sdk and you want to access the updated code inside your repo you need to re run all the above commands.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the
[tags on this repository](https://github.com/singnet/snet-sdk-js/tags).

## License

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/singnet/snet-sdk-js/blob/master/LICENSE) file for details.

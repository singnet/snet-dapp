# snet-dapp

This Dapp allows you to browse the list of AI services from the SingularityNET Registry and call them.

## How to call a Service

1. Navigate to the SingularityNET [beta dapp](http://beta.singularitynet.io/)
2. Sign up / Login to the DApp account
3. Some artificial intelligence services have a free trial version, so you can use it without any payment
4. If free trial has expired, you need to use your AGIX tokens to make the call using Metamask (this is on the mainnet)
5. Authorize and Transfer tokens to the Multi party escrow in the Accounts page
6. Follow the service execution steps on the service details page
7. The result from the operation is displayed in the result tab

## Development instructions

Install [Node.js and npm](https://nodejs.org/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install)

- node version >=18
- yarn  version >=1.22.21

For getting dependencies:
```
yarn install
```
To serve the application locally and watch source files for modifications:
```
yarn start
```
or 
```
npm run start
```
## UI for Services

Currently the UI needed by a service to capture inputs and render the output must be provided by the service developer through [Publisher](https://publisher.singularitynet.io/). To create a Snet-dapp style user interface, a developer can use the [next repository](https://github.com/singnet/snet-dapp-components).


This approach will change in the future. Work on it is in progress

## Sandbox mode for Services

Cloning this repo:
```
git clone git@github.com:singnet/snet-dapp.git
```
Go to project folder:
```
cd snet-dapp
```
Get dependencies:
```
yarn install
```
Create the env file:
```
cp .env.sandbox .env
```
1. Update `.env` file to reflect the actual values for each environment variable.

    1. `REACT_APP_SANDBOX_SERVICE_ENDPOINT`

        The daemon endpoint for call AI methods of your service.

    2. `REACT_APP_SANDBOX_ORG_ID` & `REACT_APP_SANDBOX_SERVICE_ID` 

        The `org_id` to which the service belongs and the `service_id` of the service. The values set for these variables will be used for registering the custom ui.
    
2. Start the AI service locally along with the snet daemon. Make sure the blockchain is disabled in the daemon configuration.
3. Building the custom ui
    1. Generate `js` stubs from `.proto` files

        For the custom ui to talk to the services on SingularityNET platform via the DApp, we are using [gRPC-web](https://github.com/improbable-eng/grpc-web) by improbable-eng. Apart from the steps mentioned at the official [documentation](https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/code-generation.md) to generate `js stubs` from `.proto` definitions, you also need to provide the `namespace_prefix` flag to the generator. Here is an example which illustrates the usage

        For Linux
    ```
        protoc \
        --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
        --js_out=import_style=commonjs,binary,namespace_prefix=\
        [package name]_[org id]_[service]:. --ts_out=service=grpc-web:. \
        [proto file name].proto
    ```   

        For Windows CMD
    ```    
        protoc ^
        --plugin=protoc-gen-ts=%cd%/node_modules/.bin/protoc-gen-ts.cmd ^ --js_out=import_style=commonjs,binary,namespace_prefix=^
        [package name]_[org id]_[service]:. --ts_out=service=grpc-web:. ^
        [proto file name].proto
    ```

    2. You need build the custom UI following the steps

        Create a new directory named after the `org-id` to which this service belongs inside `src/assets/thirdPartyServices`. It could be possible that the directory already exists, in which case you can use it instead of creating a new one.

        Create a new directory named after the `service-id` under the newly created directory in the above step

        e.g. for a service with org-id: snet and service-id: example-service you will have to do the following assuming you are at the root of the `snet-dapp`

            cd src/assets/thirdPartyServices
            mkdir snet
            cd snet
            mkdir example_service
            cd example_service

        Put the all the resources used by the custom ui  under this directory including the `js stubs`.

4. Register the custom ui

    Add an entry for the new service in `src/assets/thirdPartyServices/index.js` if it does not already exist. Add the following line towards the end of the file. Make sure to replace `orgId`, `serviceId` and `CustomUIComponent` accordingly. 

        thirdPartyCustomUIComponents.addCustomUIComponent(orgId, serviceId, CustomUIComponent);

5. Assuming that the snet daemon is running on the port that you specified in the REACT_APP_SANDBOX_SERVICE_ENDPOINT, running the bellow commands should bring up the DApp in sandbox mode for local development.

    ```
    yarn start
    ```
    or 
    ```
    npm run start
    ```

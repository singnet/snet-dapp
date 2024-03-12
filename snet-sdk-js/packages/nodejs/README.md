# snet-sdk
![npm](https://img.shields.io/npm/v/snet-sdk.svg)

SingularityNET SDK for Node.js
  
## Getting Started  
  
These instructions are for the development and use of the SingularityNET SDK for JavaScript on Node.js platform.
### Installation
```bash
npm install snet-sdk
```
### Usage

The SingularityNET SDK allows you to import compiled client libraries for your service or services of choice and make calls to those services programmatically from your application by setting up state channels with the providers of those services and making gRPC calls to the SingularityNET daemons for those services by selecting a channel with sufficient funding and supplying the appropriate metadata for authentication.
  
```javascript
import SnetSDK from 'snet-sdk';
import config from './config';
const sdk = new SnetSDK(config);
```

You can find a sample config below

```json
{
  "web3Provider": "https://ropsten.infura.io/v3/1234567890",
  "privateKey": "",
  "signerPrivateKey": "",
  "networkId": "3",
  "ipfsEndpoint": "http://ipfs.organization.io:80",
  "defaultGasPrice": "4700000",
  "defaultGasLimit": "210000"
}
```

Now, the instance of the sdk can be used to instantiate clients for SingularityNET services. To interact with those services, the sdk needs to be supplied with the compiled gRPC client libraries.
  
To generate the gRPC client libraries, you need the SingularityNET Command Line Interface, or CLI, which you can download from PyPi, see [https://github.com/singnet/snet-cli#installing-with-pip](https://github.com/singnet/snet-cli#installing-with-pip)
  
Once you have the CLI installed, run the following command:
```bash
$ snet sdk generate-client-library nodejs <org_id> <service_id>
```
Optionally, you can specify an output path; otherwise it's going to be `./client_libraries/nodejs/<hash>/<org_id>/<service_id>`
Once you have the generated gRPC client libraries, you can create an instance of a SingularityNET service client:
```javascript
import services from '<path_to_grpc_service_file>'
import messages from '<path_to_grpc_message_file>'
const client = sdk.createServiceClient("<org_id>", "<service_id>", "<services.<ClientStub>>")
```
This generates a service client which can be used to make gRPC calls to the desired service.
You can then invoke service specific calls as follows
```javascript
client.service.<methodName>(<gRPC.message>, callback);
```
---

### Concurrency
SDK exposes two methods to facilitate concurrent service calls. 
 - getConcurrencyTokenAndChannelId
 - setConcurrencyTokenAndChannelId
 
 In the consumer, you should call the getConcurrencyTokenAndChannelId() in the master thread.  
 It will return the concurrency token and the channel id. 
 Pass both of them to worker threads and the set the same in the respective instances using setConcurrencyTokenAndChannelId.  
 
 SDK also exposes the `class DefaultPaymentStrategy` to handle the payment metadata for concurrent calls. 
 Initialize the DefaultPaymentStrategy with the number of calls you would want to run concurrently.
 
 e.g
 ```
import SnetSDK, { DefaultPaymentStrategy } from "snet-sdk";
const sdk = new SnetSDK(config);
import cluster from "cluster";

const main = async () => {
...
// Planning for four concurrent calls
const paymentStrategy = new DefaultPaymentStrategy(4);
const serviceClient = await sdk.createServiceClient(
        orgId,
        serviceId,
        service.CalculatorClient,
        groupName,
        paymentStrategy,
        serviceClientOptionsFreeCall
      );

if(cluster.isMaster) {
 const {concurrencyToken, channelId} = await serviceClient.getConcurrencyTokenAndChannelId()
 const worker = cluster.fork()
 worker.on("message", message=>{
     console.log(`worker:${worker.id}, message:${message}`)
     worker.send({concurrencyToken,channelId, info:"master: sent you the concurrency token and channel id"})
 })
}else {
 process.send(`send me the token for concurrency`);
 process.on("message", async (message) => {
         const { concurrencyToken, info,channelId } = message;
         console.log(info);
         serviceClient.setConcurrencyTokenAndChannelId(concurrencyToken,channelId)
         const numbers = new messages.Numbers();
         numbers.setA(6);
         numbers.setB(7);
         serviceClient.service.mul(numbers, (err, result)=>{
          if(err) {
            console.error(`service failed with error ${err}`)
          }else{
            console.log(`service response is ${result}`)
            }
         });
 });
}
main()
```
 
 
### Versioning  
  
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the
[tags on this repository](https://github.com/singnet/snet-sdk-js/tags).   
  
## License  
  
This project is licensed under the MIT License - see the
[LICENSE](https://github.com/singnet/snet-sdk-js/blob/master/LICENSE) file for details.

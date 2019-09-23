# snet-dapp

This Dapp allows you to browse the list of services from the SingularityNET Registry and call them.
The beta dapp is under active development and will see several changes in the upcoming weeks

## How to call a Service

1. Navigate to the SingularityNET beta [dapp](http://beta.singularitynet.io/)
2. Sign up / Login to the DApp account
3. Every service has a free trial, so you can invoke the service without any payment
4. If free trial has expired, you need to use your AGI tokens to make the call using Metamask (this is on the mainnet)
5. Authorize and Transfer tokens to the Multi party escrow in the Accounts page
6. Follow the service execution steps on the service details page
7. The result from the operation is displayed in the result tab

## Development instructions
* Install [Node.js and npm](https://nodejs.org/)
* `npm install` to get dependencies
* `npm run start` to serve the application locally and watch source files for modifications

### UI for Services
Currently the UI needed by a service to capture inputs and render the output must be provided by the service developer as a PR. It must be provided in the form of a React component. 
This approach will change in the future as we support a generic mechanism to declaratively describe a service's API. See [this](https://github.com/singnet/custom-ui-research) for more details

### Sandbox mode for Services

### Component structure for `AI Marketplace`
* __AI Marketplace__
    * Header
    * Top section
    * Main section
        * Filter
        * Right side
            * Toolbar
            * Card group
            * Pagination
    * Footer
        * Primary footer
            * Footer links
        * Secondary footer

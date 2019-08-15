import React from "react";

export default class TemplateService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      // We currently are undecided about whether to allow a SNet service to publish
      // multiple grpc sub-services.
      //
      // While our tooling allows multiple services to be published, the Dapp has a bug
      // that will only ever pass a single service to your component.
      // https://github.com/singnet/snet-dapp/issues/110
      //
      // Best to stick with a one grpc service per SNet service, this is the name you used
      // inside the proto file, NOT the name used in the registry.
      serviceName: "TemplateService",
      // If your service provides multiple methods, then you'll want some way of
      // controlling which method is called.
      methodName: undefined,
      // You can initialise your service arguments to a sensible default here
      // ...
    };
  }

  handleFormUpdate(event) {
    // You can add more complex logic here when the user changes the form.
    // This just stores the value of the form component that changed, inside the service component's state.
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  canBeInvoked() {
    // You should validate your form or component state is okay for calling your service.
    // The UI will allow the user to call the service if you return true.
    return true;
  }

  submitAction() {
    // This makes a call to your service and handles the blockchain interactions.
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      // this JSON object should match the structure of your grpc method arguments.
    });
  }

  renderServiceMethodNames(serviceMethodNames) {
    // This renders each method that belongs to a service, if you only have
    // one method you could skip this.
    const serviceNameOptions = ["Select a method", ...serviceMethodNames];
    return serviceNameOptions.map((serviceMethodName, index) => {
      return <option key={index}>{serviceMethodName}</option>;
    });
  }

  renderForm() {
    // This is the UI for selecting arguments to your service.
    const service = this.props.protoSpec.findServiceByName(this.state.serviceName);
    const serviceMethodNames = service.methodNames;
    return (
      // This form only lets you select the method name for the service
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Method Name:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="methodName"
              value={this.state.methodName}
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              {this.renderServiceMethodNames(serviceMethodNames)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.submitAction}
              disabled={!this.canBeInvoked()}
            >
              Invoke
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    // Here you can render your service's results.
    // This may be as simple as displaying an image or text response, or as complex as creating a canvas
    // and doing custom dynamic rendering of a binary result. It's up to you!
    const response = this.props.response;

    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is {response} </p>
      </div>
    );
  }

  render() {
    // This toggles whether we are showing a form to call the service, or showing the result.
    // Generally you can leave this method alone and focus on customising renderComplete and renderForm.
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}

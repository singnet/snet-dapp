import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";


// Importing grpc stubs which is failing
//const grpc=require('grpc');
//const messages= require('./icecream_pb');
//const services= require('./icecream_grpc_pb');

const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "Chocolate",
      content: "Chocolate",
      value: "0",
    },
    {
      label: "Vanilla",
      content: "Vanilla",
      value: "1",
    },
    {
      label: "Strawberry",
      content: "Strawberry",
      value: "2",
    },
    {
      label: "Black-Currant",
      content: "Black-Currant",
      value: "3",
    }
  ],
  a: "0"
};


export default class IceCreamService extends React.Component {

  constructor(props) {
    super(props);

    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.state = { ...initialUserInput };
  }

  

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onKeyPressvalidator(event) {
    const keyCode = event.keyCode || event.which;
    if (!(keyCode === 8 || keyCode === 46) && (keyCode < 48 || keyCode > 57)) {
      event.preventDefault();
    } else {
      let dots = event.target.value.split(".");
      if (dots.length > 1 && keyCode === 46) event.preventDefault();
    }
  }

  async submitAction() {
    
    const { methodIndex, methodNames } = this.state;


    // Creating a client request to call on service methods

    // const client = new services.IceCreamClient( 
    //   'localhost:50051', grpc.credentials.createInsecure()
    // );
    // const iceCreamRequest = new messages.IceCreamRequest();
    // iceCreamRequest.setScoops(2);  //Pass state variable-> in console.log(), instead of hard code 
    // iceCreamRequest.setFlavor('chocolate');
    // client.orderIceCream(iceCreamRequest, function(err,response){
    //   if(err){
    //       console.log("There has been an error", err)
    //   }
    //   else{
    //       console.log("Response from server:", response.getMessage());
    //   }
    // })


    
    console.log(this.state);
    this.state.methodNames.forEach((method)=>{if(methodIndex===method.value)console.log("Flavor:",method.content)})
    console.log("Scoops",this.state.a);

     
    

//     const props = {
//       request,        //define request variable
//       onEnd: ({ message }) => {
//         this.setState({ ...initialUserInput, response: { value: message.getValue() } });
//       },
//     };




  }

  handleFocus = event => event.target.select();

  renderForm() {
    return (
      <React.Fragment>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={6} container style={{ textAlign: "center" }}>
            <OutlinedDropDown
              id="method"
              name="methodIndex"
              label="Flavor"
              fullWidth={true}
              list={this.state.methodNames}
              value={this.state.methodIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={6} container spacing={1}>
            <Grid item xs>
              <OutlinedTextArea
                id="number_a"
                name="a"
                label="Scoops"
                type="number"
                fullWidth={false}
                value={this.state.a}
                rows={1}
                onChange={this.handleFormUpdate}
                onKeyPress={e => this.onKeyPressvalidator(e)}
                onFocus={this.handleFocus}
              />
            </Grid>

  
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={this.submitAction}>
              Invoke
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  parseResponse() {
    const { response } = this.state;
    if (typeof response !== "undefined") {
      if (typeof response === "string") {
        return response;
      }
      return response.value;
    }
  }

  renderComplete() {
    const response = this.parseResponse();
    return (
      <Grid item xs={12} container justify="center">
        <p style={{ fontSize: "20px" }}>Response from service: {response} </p>
      </Grid>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}




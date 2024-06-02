/*eslint-disable*/
import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Checkbox,FormControlLabel } from "@material-ui/core";
import * as grpcWeb from 'grpc-web';


import OutlinedTextArea from "../../common/OutlinedTextArea";
import OutlinedDropDown from "../../common/OutlinedDropdown";

let todos = [
  { id : '1',title : 'Todo 1',iscompleted : false },
  
]
const grpc = {};
grpc.web = require('grpc-web');
const methodDescriptor_TodoService_List = require('./todo_grpc_web_pb');
const  methodDescriptor_TodoService_Insert = require('./todo_grpc_web_pb');
const TodoServiceClient = require('./todo_grpc_web_pb');
const getTodoList = require('./todo_pb');

// let data = methodDescriptor_TodoService_List.TodoList;
// let insert = methodDescriptor_TodoService_Insert.Todo;
let data_data = TodoServiceClient.TodoList;
let insert_insert = TodoServiceClient.Todo;


const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "ListData",
      content: "List",
      value: "0",
    },
    {
      label: "InsertData",
      content: "insert",
      value: "1",
    },
  ],
    string_id : 0,
    string_title : "0",
    bool_iscompleted : false,
  };

export default class ClientData extends React.Component{
    constructor(props){
        super(props);
        this.submitAction = this.submitAction.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);
        this.state = {...initialUserInput};
    }
    handleFormUpdate(event){
        this.setState({
            [event.target.name]:
            event.target.value,
        });
       
    }

    handleChangeCheckbox = e => this.setState({ bool_iscompleted: e.target.checked });

    

  submitAction() {
    console.log('hai');
    const { methodIndex, methodNames } = this.state;
    // const methodDescriptor = TodoServiceClient[methodNames[methodIndex].content];
    const methodDescriptor = TodoServiceClient[methodNames[methodIndex].content];

    console.log('75');
    console.log(methodDescriptor);
    console.log(grpcWeb.MethodType);
    const request = new methodDescriptor.TodoList();
   
    console.log('76');
    // request.string_id('1');
    // request.string_title('Todo1');
    // request.bool_iscompleted(false);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({ ...initialUserInput, response: { value: message.getTodoList() } });
      },
    };
    console.log('86');
    this.props.serviceClient.unary(methodDescriptor, props);
  }
  // handleFocus = event => event.target.select();

    renderForm(){
        return(
            <React.Fragment>
              <Grid container direction="column" alignItems="center" justify="center">
              <Grid item xs={6} container style={{ textAlign: "center" }}>
                <OutlinedDropDown
                id="method"
                name="methodIndex"
                label="Method"
                fullWidth={true}
                list={this.state.methodNames}
                value={this.state.methodIndex}
                onChange={this.handleFormUpdate}
                // onFocus={this.handleFocus}
                />
              </Grid>
              {this.state.methodIndex === "1" ?(
              <Grid item xs={6}>
                <Grid>
                <OutlinedTextArea
                  id="string_id"
                  name="string_id"
                  label="String_id"
                  type="text"
                  fullWidth={false}
                  value={this.state.string_id}
                  onChange={this.handleFormUpdate}
                  onFocus={this.handleFocus}
                />
                </Grid>
                <Grid>
                <OutlinedTextArea
                  id="string_title"
                  name="string_title"
                  label="String_title"
                  type="text"
                  fullWidth={false}
                  value={this.state.string_title}
                  onChange={this.handleFormUpdate}
                  // onFocus={this.handleFocus}
                />
                </Grid>
                <Grid>
                <FormControlLabel
                  control={<Checkbox
                  id="bool_iscompleted"
                  name="bool_iscompleted"
                  onChange={this.handleChangeCheckbox}
                  checked={this.state.bool_iscompleted}
                  onFocus={this.handleFocus}
                />
                }
                label="Bool_iscompleted"
                />
                </Grid>
              </Grid>
              ) : (<></>)}
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
      console.log(this.state);
    
        // return <div>{this.renderForm()}</div>;

        if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
      }
      
}

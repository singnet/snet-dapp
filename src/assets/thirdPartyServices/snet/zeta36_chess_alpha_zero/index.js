import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import { AlphaZero } from "./alpha_zero_pb_service";


const initialUserInput = {
  uid: "",
  move: "",
  cmd: "",
};


export default class Zeta36ChessAlphaZero extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide:
        "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/zeta36-chess-alpha-zero.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/zeta36-chess-alpha-zero",
      reference: "https://github.com/Zeta36/chess-alpha-zero",

      serviceName: "AlphaZero",
      methodName: "play",
      response: undefined,
    };
  }

  canBeInvoked() {
    return (
      (this.state.move.length === 4 || this.state.move.length === 5) &&
      ["a", "b", "c", "d", "e", "f", "g", "h"].includes(this.state.move[0]) &&
      ["1", "2", "3", "4", "5", "6", "7", "8"].includes(this.state.move[1]) &&
      ["a", "b", "c", "d", "e", "f", "g", "h"].includes(this.state.move[2]) &&
      ["1", "2", "3", "4", "5", "6", "7", "8"].includes(this.state.move[3])
    );
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, uid, move, cmd } = this.state;
    const methodDescriptor = AlphaZero[methodName];
    const request = new methodDescriptor.requestType();

    request.setUid(uid);
    request.setMove(move);
    request.setCmd(cmd);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", uid: message.getUid(), board: message.getBoard(), resStatus: message.getStatus()},
        });
      },
    };
    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            UID:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="uid"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"eg: Your Name"}
              value={this.state.uid}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Move:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="move"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"eg: c2c4"}
              value={this.state.move}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Command:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="cmd"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"eg: empty or restart (the game)"}
              value={this.state.cmd}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            About:{" "}
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.users_guide} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Guide
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.code_repo} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Code
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.reference} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Reference
            </Button>
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
    let status = "\n";
    let uid = "\n";
    let board = "\n";

    if (typeof this.state.response === "object") {
      status = this.state.response.resStatus + "\n";
      uid = this.state.response.uid + "\n";
      board = "\n" + this.state.response.board;
    } else {
      status = this.state.response + "\n";
    }
    return (
        
<div style={{background:"#F8F8F8", padding: "24px"}}>
    <h4> Results</h4>
    <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color:"#9b9b9b" }}>
        <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>Status: <span style={{color:"#212121"}}>{status}</span></div>
        <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>UID: <span style={{color:"#212121"}}>{uid}</span></div>        
        <div style={{ padding: "10px 0" }}>Board: 
            <div style={{color:"#212121", marginTop:"5px",padding:"10px", background:"#f1f1f1",borderRadius:"4px"}}>
                <pre>
                    {board}
                </pre>
            </div>
        </div>       
    </div>
</div>          
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}

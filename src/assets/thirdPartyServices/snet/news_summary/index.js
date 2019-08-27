import React from "react";
import  {TextSummary} from  "./summary_pb_service";

export default class NewSummaryService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    const initialUserInput = {
        serviceName: "TextSummary",
        methodName: "summary",
        article_content:
          'Analysts are predicting record highs as a global shortage of teddy bears sweeps the nation. "The market these products is way up". The advice is to stay indoors as society collapses under the demand.',
      }

    this.state = { 
      ...initialUserInput,
    };
  }

  canBeInvoked() {
    return this.state.article_content !== "";
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitAction() {
     const { methodName, article_content } = this.state;
    const methodDescriptor = TextSummary[methodName];
    const request = new methodDescriptor.requestType();

    request.setArticleContent(article_content)

    const props = {
      request,
      onEnd: ({message}) => {
        this.setState({
          response: { status: "success", article_summary: message.getArticleSummary() },
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
            News text to summarise:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <textarea
              rows="8"
              cols="60"
              name="article_content"
              value={this.state.article_content}
              onChange={this.handleFormUpdate}
            />
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
    const {response} = this.state;

    return (
        
<div style={{background:"#F8F8F8", padding: "24px"}}>
    <h4> Results</h4>
    <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color:"#9b9b9b" }}>
        <div style={{ padding: "10px 0" }}>Summary of article: 
            <div style={{color:"#212121", marginTop:"5px",padding:"10px", background:"#f1f1f1",borderRadius:"4px"}}>{response.article_summary}</div>
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

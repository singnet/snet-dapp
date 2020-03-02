import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import OutlinedTextArea from "../../common/OutlinedTextArea";

import  {TextSummary} from  "./summary_pb_service";

export default class NewSummaryService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    const initialUserInput = {
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
     const { article_content } = this.state;
    const methodDescriptor = TextSummary["summary"];
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
        <Grid container direction="column" justify="center">

          <Grid item xs={12} style={{ textAlign: "left" }}>
            <OutlinedTextArea
              id="article_content"
              name="article_content"
              label="News text to summarize:"
              fullWidth={true}
              value={this.state.article_content}
              rows={8}
              charLimit={5000}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
              Invoke
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    const {response} = this.state;

    return (
        
      <React.Fragment>
        <Grid container direction="column" justify="center">
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <OutlinedTextArea
              id="article_summary"
              name="article_summary"
              label="Summarization:"
              fullWidth={true}
              value={response.article_summary}
              rows={8}
              charLimit={5000}
              onChange={this.handleFormUpdate}
            />
          </Grid>
        </Grid>
      </React.Fragment>       
        
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}

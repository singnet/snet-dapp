import * as React from "react";
import { Grid, Button, Hidden } from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";
import MasonryLayout from "./MasonryLayout";
import withWidth from "@material-ui/core/withWidth";

export class ImageGridViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  downloadImage(image) {
    const link = document.createElement("a");
    link.setAttribute("type", "hidden");
    link.setAttribute("href", image);
    link.setAttribute("download", "result-image");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  renderContent(response, key) {
    return (
      <div
        key={key}
        style={{
          padding: "10px",
          position: "relative",
          textAlign: "right",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          style={{ position: "absolute", right: "30px", top: "30px" }}
          onClick={e => this.downloadImage("data:image/" + response.image_type + ";base64," + response.image)}
        >
          <ArrowDownward />
        </Button>
        <img
          src={"data:image/" + response.image_type + ";base64," + response.image}
          style={{
            maxWidth: "100%",
            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <MasonryLayout items={this.props.result.map((r, i) => this.renderContent(r, i))} />
      </React.Fragment>
    );
  }
}

export default withWidth()(ImageGridViewer);

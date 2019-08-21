import React from "react";
import { relative } from "path";
import Dropzone from "react-dropzone";
import classNames from "classnames";
import { CloudUpload, Check } from "@material-ui/icons";
import { showNotification } from "./utils";
import fileSize from "filesize";

export default class DatasetUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileError: false,
      notification: null,
    };
  }

  componentDidUpdate() {
    this.props.setValidationStatus(this.props.uploadedFile ? true : false);
  }

  render() {
    const props = {
      name: "dataset",
      multiple: false,
      onDrop: files => {
        const file = files[0];
        this.props.handleFileUpload(file);
        return false;
      },
    };

    return (
      <div className="datasetUploadWrapper" style={{ width: "100%" }}>
        {this.state.notification &&
          showNotification(this.state.notification, () => {
            this.setState({ notification: null });
          })}
        <Dropzone {...props} style={{ marginBottom: "15px" }} accept=".csv, .xlsx, .xls,">
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                className={classNames("dropzone", {
                  "dropzone--isActive": isDragActive,
                })}
                style={{
                  textAlign: "center",
                  padding: "30px",
                  border: "dashed 1px #90D4FF",
                }}
              >
                <input {...getInputProps()} />
                {this.props.uploadedFile ? (
                  <Check style={{ fontSize: "48px", color: "#54C21F" }} />
                ) : (
                  <CloudUpload style={{ fontSize: "48px" }} />
                )}
                {isDragActive ? (
                  <p>Drop dataset here...</p>
                ) : (
                  <p>Click here to select a dataset file, or drag and drop it over this text.</p>
                )}
              </div>
            );
          }}
        </Dropzone>
        {this.props.uploadedFile && (
          <div
            id="fileDetails"
            style={{
              borderRadius: 0,
              position: relative,
              bottom: "5px",
              border: "solid 1px #90D4FF",
              borderTop: "none",
              padding: "15px",
              backgroundColor: "#e1f4ff",
            }}
          >
            {this.props.uploadedFile.name + " " + fileSize(this.props.uploadedFile.size)}
          </div>
        )}
      </div>
    );
  }
}

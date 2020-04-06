import React from "react";
import { relative } from "path";
import Dropzone from "react-dropzone";
import classNames from "classnames";
import { CloudUpload, Check } from "@material-ui/icons";
import fileSize from "filesize";

export default class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileError: false,
    };
  }

  componentDidUpdate() {
    this.props.setValidationStatus(this.props.uploadedFiles ? true : false);
  }

  render() {
    const props = {
      name: "uploadedFiles",
      multiple: this.props.multiple ? true : false,
      onDrop: files => {
        this.props.handleFileUpload(files);
        return false;
      },
    };

    const { uploadedFiles, maxFileNames } = this.props;
    const _maxFileNames = maxFileNames ? maxFileNames : 5;

    let text = "";
    if (uploadedFiles) {
      // Unique file
      if (uploadedFiles.name !== undefined && uploadedFiles.size !== undefined) {
        text = uploadedFiles.name + " " + fileSize(uploadedFiles.size);
      }
      // More than 1 file. Files' name in text is limited to "maxFileNames" (5).
      else if (uploadedFiles.length) {
        let tmp_text = "";
        let total_size = 0;
        for (let i = 0; i < uploadedFiles.length; i++) {
          if (i < _maxFileNames) tmp_text += uploadedFiles[i].name + ", ";
          total_size += uploadedFiles[i].size;
        }
        if (uploadedFiles.length > _maxFileNames) tmp_text += " ...";
        text = tmp_text + " (" + uploadedFiles.length + " file(s), " + fileSize(total_size) + ")";
      }
    }

    return (
      <div className="datasetUploadWrapper" style={{ width: "100%" }}>
        <Dropzone {...props} style={{ marginBottom: "15px" }} accept={this.props.fileAccept}>
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
                {text ? (
                  <Check style={{ fontSize: "48px", color: "#54C21F" }} />
                ) : (
                  <CloudUpload style={{ fontSize: "48px" }} />
                )}
                {isDragActive ? (
                  <p>Drop dataset here...</p>
                ) : (
                  <p>
                    Click here to select one or more files, or drag and drop them over this text. Directory must be
                    dragged. We expect {this.props.fileAccept} to be uploaded. Other files are disabled.
                  </p>
                )}
              </div>
            );
          }}
        </Dropzone>
        {text && (
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
            {text}
          </div>
        )}
      </div>
    );
  }
}

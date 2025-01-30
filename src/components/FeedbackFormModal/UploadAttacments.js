import { useState } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import SNETFileUpload from "../common/SNETFileUpload";
import { alertTypes } from "../common/AlertBox";
import { loaderActions } from "../../Redux/actionCreators";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { byteToMegabyte } from "../../utility/sizeConverter";
import { FEEDBACK_ATTACHMENTS_FOLDER, FeedbackAssetsInstanceS3 } from "../../config/SupportAPI";
import { acceptedFileTypes, MAX_FILE_SIZE } from "./meta";
import { publishFilesToS3 } from "../../Redux/actionCreators/ServiceTrainingActions";

const UploadAttacments = ({ setAlert, setFilesUrls, email }) => {
  const dispatch = useDispatch();
  const [attachmentUrls, setAttachmentUrls] = useState();
  const [attachmentNames, setAttachmentNames] = useState();

  const cleanCurrentFiles = () => {
    setAttachmentUrls();
    setFilesUrls([]);
    setAttachmentNames();
  };

  const handleDropValidation = (acceptedFiles, rejectedFiles, email) => {
    if (!isEmpty(rejectedFiles)) {
      return false;
    }

    if (isEmpty(acceptedFiles)) {
      setAlert({ type: alertTypes.ERROR, message: "Accepted files were not found" });
      return false;
    }

    if (!email) {
      setAlert({ type: alertTypes.ERROR, message: "Please, fill your email" });
      return false;
    }

    return true;
  };

  const handleDrop = async (acceptedFiles, rejectedFiles) => {
    if (!handleDropValidation(acceptedFiles, rejectedFiles, email)) {
      return;
    }

    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.FEEDBACK));
      const acceptedFilesBlob = await Promise.all(
        acceptedFiles.map(async (acceptedFile) => {
          const { name, size } = acceptedFile;
          // setAttachmentNames({ name, size });
          if (byteToMegabyte(size) > MAX_FILE_SIZE) {
            setAlert({
              type: alertTypes.ERROR,
              message: `The ${name} is too big. The file should be no more than ${MAX_FILE_SIZE}Mb`,
            });
            throw new Error(`The ${name} is too big`);
          }
          const { url } = await publishFilesToS3(
            acceptedFile,
            name,
            FeedbackAssetsInstanceS3,
            FEEDBACK_ATTACHMENTS_FOLDER,
            email
          );

          return { url, name };
        })
      );
      console.log("acceptedFilesUrl: ", acceptedFilesBlob);
      const filesName = acceptedFilesBlob.map((acceptedFilesUrl) => acceptedFilesUrl.name);
      const filesUrl = acceptedFilesBlob.map((acceptedFilesUrl) => acceptedFilesUrl.url);

      setAttachmentNames(filesName);
      setAttachmentUrls(filesUrl);
      setFilesUrls(filesUrl);
      setAlert({});
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: error?.message });
      cleanCurrentFiles();
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  return (
    <div className="assets-uploader-container">
      <div className="assets-uploader-helper">
        <p>Please fill out the email before sending the attachments</p>
        <p>The files should be no more than {MAX_FILE_SIZE}Mb</p>
      </div>
      <SNETFileUpload
        onDrop={handleDrop}
        accept={acceptedFileTypes}
        multiple={true}
        showFileDetails
        uploadSuccess={Boolean(attachmentUrls)}
        cleanCurrentFile={cleanCurrentFiles}
        isFileStatsDisplay={false}
        fileName={attachmentNames}
      />
    </div>
  );
};

export default UploadAttacments;

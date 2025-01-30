import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { feedbackCategories, formFieldsMeta, initialFormState, textAreaField } from "./meta";
import { eventListenerForKey } from "@utility/listenerForKey";
import snetValidator from "@utility/snetValidator";
import AlertBox, { alertTypes } from "@common/AlertBox";
import { LoaderContent } from "@utility/constants/LoaderContent";
import { loaderActions } from "@redux/actionCreators";
import StyledButton from "@common/StyledButton";
import UploadAttacments from "./UploadAttacments";

export const supportTypes = {
  SNET: "SNET",
  PROVIDER: "PROVIDER",
};

const FeedbackForm = ({ closeForm, sendFeedbackAPI }) => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(initialFormState);
  const [category, setCategory] = useState("");
  const [isRequestHandling, setIsRequestHandling] = useState(false);
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
  const [attachmentUrls, setAttachmentUrls] = useState([]);
  const [alert, setAlert] = useState();

  const sendFeedback = async () => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.FEEDBACK));
      setIsRequestHandling(true);
      const response = await sendFeedbackAPI({ ...formFields, category, attachmentUrls });
      if (response?.status === "failed") {
        throw new Error(response?.error.message);
      }
      setAlert({ type: alertTypes.SUCCESS, message: "Our technical support will get in touch with you soon!" });
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: error?.message });
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      resetForm();
      setIsRequestHandling(false);
      dispatch(loaderActions.stopAppLoader());
      closeForm();
    }
  };

  const listener = eventListenerForKey({ keyValue: "Enter", callback: sendFeedback, isCtrlPress: true });

  useEffect(() => {
    if (isSubmitAvailable) {
      document.addEventListener("keypress", listener, false);
    }
    return () => document.removeEventListener("keypress", listener, false);
  }, [isSubmitAvailable, listener]);

  const invalidMessageByField = useMemo(
    () => ({
      email: snetValidator.validators.validEmail(formFields.email),
      name: !formFields.name ? "name is empty" : undefined,
      feedback: !formFields.feedback ? "feedback is empty" : undefined,
      category: !category ? "category is empty" : undefined,
    }),
    [formFields.email, formFields.name, formFields.feedback, category]
  );

  const invalidMessageByFieldArray = useMemo(() => Object.values(invalidMessageByField), [invalidMessageByField]);
  const isFieldMessageEmty = useMemo(
    () => invalidMessageByFieldArray.reduce((accumulator, invalidMessage) => accumulator && !invalidMessage, true),
    [invalidMessageByFieldArray]
  );

  const checkIsSubmitAvailable = useCallback(() => {
    setIsSubmitAvailable(isFieldMessageEmty && !isRequestHandling);
  }, [isFieldMessageEmty, isRequestHandling]);

  useEffect(() => {
    checkIsSubmitAvailable();
  }, [formFields.name, formFields.feedback, category, checkIsSubmitAvailable]);

  const resetForm = () => {
    setFormFields(initialFormState);
  };

  const SelectCategory = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="select-label">Select a category</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={category}
          label="Select a category"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          {feedbackCategories.map((feedbackCategory) => (
            <MenuItem key={feedbackCategory.value} value={feedbackCategory.value}>
              {feedbackCategory.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const fieldInvalidMessage = (formField) => {
    if (formField?.isValidate && Boolean(formFields[formField.id])) {
      const invalidMessage = invalidMessageByField[formField.id];
      return invalidMessage;
    }
    return null;
  };

  const onInputFormField = (event, formFieldId) => {
    setFormFields({ ...formFields, [formFieldId]: event.target.value });
  };

  return (
    <div className="feedback-form-holder feedback-form">
      <form className="feedback-form">
        <div className="feedback-form-fields">
          <SelectCategory />
          {Object.values(formFieldsMeta).map((formField) => (
            <TextField
              key={formField.id}
              id={formField.id}
              value={formFields[formField.id]}
              variant="outlined"
              required={formField.isRequired}
              label={formField.label}
              placeholder={formField.placeholder}
              onChange={(event) => {
                onInputFormField(event, formField.id);
              }}
              error={!!fieldInvalidMessage(formField)}
              helperText={fieldInvalidMessage(formField)}
            />
          ))}
          <TextField
            key={textAreaField.id}
            id={textAreaField.id}
            value={formFields[textAreaField.id]}
            variant="outlined"
            required={textAreaField.isRequired}
            label={textAreaField.label}
            placeholder={textAreaField.placeholder}
            multiline
            minRows={textAreaField.rows}
            onChange={(event) => {
              onInputFormField(event, textAreaField.id);
            }}
          />
        </div>
        <UploadAttacments email={formFields?.email} setAlert={setAlert} setFilesUrls={setAttachmentUrls} />
        <AlertBox type={alert?.type} message={alert?.message} />
        <div className="submit-btn-container">
          <StyledButton type="transparent" btnText="Cancel" onClick={closeForm} />
          <StyledButton type="blue" btnText="Confirm" disabled={!isSubmitAvailable} onClick={sendFeedback} />
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;

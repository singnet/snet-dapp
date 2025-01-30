export const formFieldsMeta = [
  { id: "name", label: "Name", isRequired: true, placeholder: "Enter your name" },
  { id: "email", label: "Email", isRequired: true, placeholder: "Enter your email", isValidate: true },
];

export const textAreaField = {
  id: "feedback",
  label: "Feedback",
  isRequired: false,
  placeholder: "Enter your feedback",
  rows: 2,
};

export const feedbackCategories = [
  { value: "question", title: "Question" },
  { value: "bug", title: "Bug" },
  { value: "feedback", title: "Feedback" },
];

export const acceptedFileTypes = {
  "image/jpeg": [".jpeg"],
  "image/png": [".png"],
};

export const MAX_FILE_SIZE = 5; // Mb

export const initialFormState = {
  name: "",
  email: "",
  feedback: "",
};

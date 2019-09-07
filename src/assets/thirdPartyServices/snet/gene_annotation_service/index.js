import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import AnnotationForm from "./form";
import AnnotationResult from "./result";
import "./style.css";

function App(props) {
  const [id, setId] = useState(undefined);

  return (
    <div>
      <SnackbarProvider>{id ? <AnnotationResult id={id} /> : <AnnotationForm onResponse={setId} />}</SnackbarProvider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

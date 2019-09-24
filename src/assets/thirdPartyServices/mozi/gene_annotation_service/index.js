import React, { useState } from "react";
import { SnackbarProvider } from "notistack";
import AnnotationForm from "./form";
import AnnotationResult from "./result";
import "./style.css";

const App = props => {
  const [id, setId] = useState(undefined);

  return (
    <div>
      <SnackbarProvider>
        {id ? <AnnotationResult id={id} /> : <AnnotationForm serviceClient={props.serviceClient} onResponse={setId} />}
      </SnackbarProvider>
    </div>
  );
};

export default App;

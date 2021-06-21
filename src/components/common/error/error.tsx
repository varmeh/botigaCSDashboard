import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import appContext from "../../../contexts/AppContext";
import { errorType } from "../../../types/error";

import "./error.scss";

type errorProps = {
  err: errorType;
};

const getErrorMessage = (err: errorType): string => {
  const defaultErrorMessage: string =
    "Something went wrong. Try again or reach out to Botiga Team.";
  if (typeof err === "string") {
    return err;
  }
  if (err) {
    const { response: { data: { message = "" } = {} } = {} } = err;
    return message || defaultErrorMessage;
  }
  return defaultErrorMessage;
};

function Alert(props: any): JSX.Element {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Error = ({ err }: errorProps): JSX.Element => {
  const { setError } = useContext(appContext);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  return (
    <div className="error">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={"bottom right"}
        open
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={"error"}>
          <div className="error-heading">ERROR!</div>
          <div className="error-secondary">{getErrorMessage(err)}</div>
        </Alert>
      </Snackbar>
    </div>
  );
};

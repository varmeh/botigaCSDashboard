import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import appContext from "../../../contexts/AppContext";
import { errorType } from "../../../types/error";

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
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open
      autoHideDuration={3000}
      onClose={handleClose}
      message={getErrorMessage(err)}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

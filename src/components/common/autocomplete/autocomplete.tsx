import React from "react";
import BotigaTextField from "../botiga-text-field/botiga-text-filed";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_) => ({
  input: {
    "& label.Mui-focused": {
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: "400",
      color: "#179F57",
    },
    "& .MuiInput-underline:after": {
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: "400",
      borderBottomColor: "#179F57",
    },
    "& .MuiOutlinedInput-root": {
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: "400",
      "&.Mui-focused fieldset": {
        borderColor: "#179F57",
      },
      "&.Mui-disabled": {
        backgroundColor: "#F7F7F7",
      },
    },
    "& label.Mui-error": {
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: "400",
    },
  },
}));

type autoCompleteProps = {
  id: string;
  optionsList: {
    key: string;
    value: string;
  }[];
  error: string | false | undefined;
  helperText: string | undefined;
  label: string;
  variant: string;
  onChange: (e: any, v: any) => void;
};

export default function BotigaAutoComplete({
  optionsList,
  id,
  error,
  helperText,
  label,
  variant,
  onChange,
}: autoCompleteProps) {
  const classes = useStyles();
  return (
    <Autocomplete
      id={id}
      fullWidth
      options={optionsList}
      getOptionLabel={(option) => option.key}
      renderOption={(option) => (
        <React.Fragment>
          <span>{option.key}</span>
        </React.Fragment>
      )}
      onChange={onChange}
      className={classes.input}
      renderInput={(params) => (
        <BotigaTextField
          {...params}
          label={label}
          variant={variant}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}

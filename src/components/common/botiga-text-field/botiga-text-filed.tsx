import TextField from "@material-ui/core/TextField";
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

type botigaTextFieldProps = {
  [x: string]: any;
  requiresCounterValidation?: any;
  helperText?: any;
  className?: any;
  value?: any;
  inputProps?: any;
};

export default function BotigaTextField(
  props: botigaTextFieldProps
): JSX.Element {
  const classes = useStyles();
  const { className = "", requiresCounterValidation, ...otherProps } = props;

  function getHelperText(): string {
    if (props.requiresCounterValidation) {
      const { value = "", inputProps: { maxLength = 0 } = {} } = props;
      return `(${value.length}/${maxLength})`;
    }
    return props.helperText;
  }

  const classNameToApply: string = [classes.input, className].join(" ");

  const finalPropsToPass: botigaTextFieldProps = {
    className: classNameToApply,
    ...otherProps,
    helperText: getHelperText(),
  };

  return <TextField {...finalPropsToPass} />;
}

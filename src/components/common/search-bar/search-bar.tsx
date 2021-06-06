import { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import "./search-bar.scss";

const useStyles = makeStyles((_) => ({
  input: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      width: "335px",
      height: "44px",
      background: "#FFFFFF",
      borderRadius: "4px",
      fontFamily: "Montserrat",
    },
    "& .MuiInputAdornment-positionStart": {
      marginRight: "0px",
    },
  },
}));

type searchBarProps = {
  screenName: string;
  reset: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  placeHolder: string;
  onEnter?: () => void | null | undefined;
};

export default function SearchBar({
  screenName,
  reset,
  handleChange,
  searchValue,
  placeHolder,
  onEnter,
}: searchBarProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className="search-bar">
      <div className="screen-title">{screenName}</div>
      <TextField
        value={searchValue}
        onChange={handleChange}
        id="search"
        placeholder={placeHolder}
        variant="outlined"
        className={classes.input}
        onKeyDown={(event) => {
          if (typeof onEnter === "function" && event.key === "Enter") {
            onEnter();
          }
        }}
        InputProps={{
          endAdornment: searchValue ? (
            <InputAdornment position="start">
              <IconButton aria-label="delete" size="small" onClick={reset}>
                <Close />
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

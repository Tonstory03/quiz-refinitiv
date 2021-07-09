/* eslint-disable react-hooks/rules-of-hooks */

import { makeStyles, alpha } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    marginBottom: 20,
  } 
}));


export function SearchingText(props) {
  const classes = useStyles();
  const { handleInputSearch } = props; 


  return (
      <TextField
        id="filled-full-width"
        className= {classes.root}
        placeholder="Search" 
        fullWidth 
        InputLabelProps={{
          shrink: true,
        }} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        //value={textSearch}
        onChange={handleInputSearch}
      />
  );
}

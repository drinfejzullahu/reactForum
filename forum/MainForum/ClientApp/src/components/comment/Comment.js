import React from "react";
import { Box, TextField, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  textField: {
    width: "80%"
  },
  commentButton: {
    borderRadius: "6px",
    width: "20%",
    color: "white",
    backgroundColor: "#222423",
    height: "55px",
    marginTop: "16px"
  }
});

export default function Comment(props) {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" flexDirection="row">
        <TextField
          onChange={e => props.setCommentHandler(e)}
          component={"span"}
          id="outlined-basic"
          className={classes.textField}
          label="Comment"
          margin="normal"
          variant="outlined"
          color="primary"
        />
        <Button onClick={props.handleClick} className={classes.commentButton}>
          Post
        </Button>
      </Box>
    </div>
  );
}

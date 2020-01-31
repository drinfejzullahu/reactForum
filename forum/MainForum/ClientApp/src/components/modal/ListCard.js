import React from "react";
import { withStyles, Box, Typography } from "@material-ui/core";
import Komenti from "../comment/Comment";

import Comment from "./Comment";

const styles = theme => ({
  textField: {
    width: "100%"
  },
  root: {
    width: "100%",
    height: "100%"
  },
  header: {
    margin: "10px 0"
  },
  commentButton: {
    borderRadius: "6px",
    width: "20%",
    color: "white",
    backgroundColor: "#222423",
    height: "55px",
    marginTop: "16px",
    marginLeft: "1%"
  },
  includes: {
    border: "1px solid #dcdfe0",
    padding: "7px",
    borderRadius: "25px",
    backgroundColor: "#F7FBFF"
  },
  x: {
    float: "right",
    marginLeft: "7px",
    cursor: "pointer",
    display: "block"
  }
});

function ListCard(props) {
  const classes = props.classes;
  console.log(props, "listcard");
  return (
    <div className={classes.root}>
      <div className={classes.x} onClick={props.handleClose}>
        X
      </div>
      <Box display="flex" flexDirection="column">
        <div className={classes.includes}>
          <div style={{ margin: "10px 0px 0px 10px" }}>
            <Typography component="span">{props.name}</Typography>
          </div>
          <div style={{ margin: "5px 0px 0px 10px" }}>
            <Typography
              component="span"
              variant="body1"
              style={{ margin: "10px 0" }}
            >
              {props.username} :
            </Typography>
            <Typography
              component="span"
              variant="body2"
              style={{ marginLeft: "20px " }}
            >
              {props.body}
            </Typography>
          </div>
        </div>

        <div
          className={classes.includes}
          style={{
            marginTop: "10px ",
            height: "400px",
            overflowY: "scroll"
          }}
        >
          <Typography component="span">
            <Comment comments={props.comments} body={props.body} />
          </Typography>
        </div>

        <div>
          <Komenti
            handleClick={props.handleClick}
            setCommentHandler={props.setCommentHandler}
          />
        </div>
      </Box>
    </div>
  );
}

export default withStyles(styles)(ListCard);

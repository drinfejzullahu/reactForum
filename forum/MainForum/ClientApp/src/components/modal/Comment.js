import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  listitem: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    // margin: "10px 0px 10px 0px",
    borderRadius: "20px",
    textAlign: "center",
    marginTop: "4px"
  },
  listitemtext: {
    float: "left"
  }
}));
const Comment = props => {
  const classes = useStyles();
  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      {props.comments.map(comment => {
        return (
          <ListItem key={comment.id} button className={classes.listitem}>
            <Grid container>
              <Grid item xs={2}>
                <ListItemText
                  className={classes.listitemtext}
                  component={"span"}
                >
                  {comment.username} :
                </ListItemText>
              </Grid>

              <Grid item xs={10}>
                <ListItemText
                  className={classes.listitemtext}
                  component={"span"}
                >
                  {comment.comment}
                </ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Comment;

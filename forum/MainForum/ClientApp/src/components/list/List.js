import React from "react";
import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
// import TextField from "@material-ui/core/TextField";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import Modal from "../modal/Modal";
import axios from "axios";
import Comment from "../comment/Comment";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360
  },
  likecomment: {
    marginRight: "8px",
    cursor: "pointer",
    borderRadius: "10px",
    padding: "8px",
    color: "black",
    backgroundColor: "#e9edf0"
  },

  inline: {
    display: "inline"
  },
  div: {
    backgroundColor: "white",
    border: "1px solid #dcdfe0",
    borderRadius: "25px",
    margin: "5px 20px 10px 20px"
  },
  divInside: {
    backgroundColor: "#F7FBFF",
    borderRadius: "25px",
    padding: "10px"
  },
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

function AlignItemsList(props) {
  const classes = props.classes;
  const [showComment, setShowComment] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = useState("");
  const [type, setType] = useState("");
  //
  const [comments, setComments] = useState([]);

  const userEmail = useSelector(state => state.email);

  const handleOpen = () => {
    setOpen(true);
    setShowComment(false);
    setType("list");
  };

  const setCommentHandler = e => {
    setComment(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeTextFld = () => {
    setShowComment(true);
  };

  const handleUpvote = () => {
    let data = {};
    axios.get("/api/post/" + props.id).then(res => {
      console.log(res, "rs");
      data = {
        id: props.id,
        title: props.title,
        question: props.question,
        username: res.data.username,
        votes: res.data.votes + 1,
        roomid: props.roomId,
        userid: props.userId
      };
      axios
        .put("/api/post/" + props.id, data)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    });
  };

  const getComments = () => {
    var array = [];
    axios
      .get(`/api/message`)
      .then(res => {
        res.data.forEach(element => {
          if (element.postId === props.id) {
            array.push(element);
          }
        });
        if (array.length > 0) {
          setComments(array);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(comments);

  console.log(props, "props");

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete ? ")) {
      axios
        .delete(`/api/post/${props.id}`)
        .then(res => {
          console.log(res);
          props.history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
    }
  };

  const handleEdit = () => {
    if (showComment === true) {
      setShowComment(false);
    }
    setOpen(true);
    setType("post");
  };

  const handleClick = () => {
    if (userEmail === "") {
      props.history.push("/login");
    } else {
      let data = {};
      let userid = null;
      let postid = null;
      let username = null;

      axios
        .get(`/api/user/email/${userEmail}`)
        .then(res => {
          userid = res.data.id;
          username = res.data.username;
          axios
            .get("/api/post/" + props.id)
            .then(res => {
              postid = res.data.id;
              data = {
                userid,
                comment,
                postid,
                username
              };
              axios
                .post("/api/message", data)
                .then(res => {
                  console.log(res);
                  setShowComment(false);
                  setOpen(false);
                  getComments();
                })
                .catch(err => console.log(err));
              setShowComment(false);
              setOpen(false);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };
  let textFld = null;
  if (showComment === true) {
    textFld = (
      <Comment
        handleClick={handleClick}
        setCommentHandler={setCommentHandler}
      />
    );
  } else {
    textFld = null;
  }
  return (
    <div>
      <List className={classes.div}>
        <ListItem className={classes.listItem} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" />
          </ListItemAvatar>
          <ListItemText
            className={classes.divInside}
            primary={props.username}
            secondary={
              <React.Fragment>
                <Box display="flex" flexDirection="column" marginTop={1}>
                  <Typography
                    component={"span"}
                    variant="h6"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {props.title}
                  </Typography>
                  <Typography
                    component={"span"}
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {props.question}
                  </Typography>
                  <hr />
                </Box>
                <Box display="flex" flexDirection="row" marginTop={1}>
                  <Typography
                    component={"span"}
                    variant="body2"
                    onClick={handleUpvote}
                    className={classes.likecomment}
                  >
                    Upvote
                  </Typography>
                  <Typography
                    component={"span"}
                    onClick={changeTextFld}
                    variant="body2"
                    className={classes.likecomment}
                  >
                    Comment
                  </Typography>
                  <Typography
                    component={"span"}
                    onClick={handleOpen}
                    variant="body2"
                    className={classes.likecomment}
                  >
                    Show Post
                  </Typography>
                  {window.location.pathname === "/my-profile" ? (
                    <Typography
                      component={"span"}
                      onClick={handleDelete}
                      variant="body2"
                      className={classes.likecomment}
                    >
                      Delete
                    </Typography>
                  ) : null}
                  {window.location.pathname === "/my-profile" ? (
                    <Typography
                      component={"span"}
                      onClick={(e, id) => handleEdit(e, id)}
                      variant="body2"
                      className={classes.likecomment}
                    >
                      Edit
                    </Typography>
                  ) : null}
                </Box>
                {textFld}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      {showComment === true ? null : (
        <Modal
          getComments={getComments}
          comments={comments}
          id={props.id}
          type={type}
          handleClick={handleClick}
          setCommentHandler={setCommentHandler}
          open={open}
          username={props.username}
          body={props.question}
          name={props.title}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default withRouter(withStyles(styles)(AlignItemsList));

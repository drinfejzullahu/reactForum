import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListCard from "./ListCard";
import Question from "../question/Question";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: " 0 17px 50px 0 rgba(0,0,0,.19), 0 12px 15px 0 rgba(0,0,0,.24)"
  },
  paper: {
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    width: "83%",
    border: "1px solid #dcdfe0",
    borderRadius: "25px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TransitionsModal(props) {
  // const [comments, setComments] = useState([]);

  useEffect(() => {
    // getComments();
    props.getComments();
  }, []);

  // const getComments = () => {
  //   var array = [];
  //   axios
  //     .get(`/api/message`)
  //     .then(res => {
  //       res.data.forEach(element => {
  //         if (element.postId === props.id) {
  //           array.push(element);
  //         }
  //       });
  //       if (array.length > 0) {
  //         setComments(array);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // console.log(comments);

  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        disableAutoFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            {props.type === "list" ? (
              <ListCard
                comments={props.comments}
                handleClick={props.handleClick}
                setCommentHandler={props.setCommentHandler}
                handleClose={props.handleClose}
                username={props.username}
                name={props.name}
                body={props.body}
              />
            ) : (
              <Question id={props.id} />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

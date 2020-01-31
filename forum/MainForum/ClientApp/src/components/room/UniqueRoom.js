import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import List from "../list/List";
import axios from "axios";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
const useStyles = makeStyles({
  rootDiv: {
    width: "98%%",
    height: "100%",
    margin: "15px",
    border: "1px solid #dcdfe0",
    borderRadius: "25px",
    paddingTop: "8px",
    backgroundColor: "#F7FBFF",
    overflowY: "scroll"
  },
  link: {
    color: "black",
    margin: "15px 0px 0px 20px"
  },
  typography: {
    textAlign: "center"
  }
});

const UniqueRoom = props => {
  const [roomName, setRoomName] = useState(" ");
  const [posts, setPosts] = useState([]);

  const arr = props.location.pathname.split("/");
  const id = arr[2];
  useEffect(() => {
    axios
      .get(`/api/room/${id}`)
      .then(res => setRoomName(res.data.name))
      .catch(err => console.log(err));
  });

  useEffect(() => {
    getRoomPosts();
  }, []);

  const getRoomPosts = () => {
    let arr = [];
    axios
      .get(`/api/post`)
      .then(res => {
        setPosts(res.data);

        // res.data.forEach(post => {
        //   if (post.roomId === id) {
        //   }
        // });
      })
      .catch(err => {
        console.log(err);
      });
    // if (arr.length > 0) {
    // setPosts(arr);
    // }
  };
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={8} lg={8} xs={12} style={{ margin: "0px auto" }}>
        <Link to="/" className={classes.link}>
          <KeyboardBackspaceIcon fontSize="large" style={{ color: "black" }} />
        </Link>
        <div className={classes.typography}>
          <Typography component="span" variant="h5">
            {roomName}
          </Typography>
        </div>
        <div className={classes.rootDiv}>
          <div style={{ height: "700px" }}>
            {posts.map(cm => {
              if (cm.roomId == id) {
                return (
                  <List
                    username={cm.username}
                    userId={cm.userId}
                    roomId={cm.roomId}
                    key={cm.id}
                    id={cm.id}
                    title={cm.title}
                    question={cm.question}
                  />
                );
              } else {
                <Typography style={{ margin: "15px" }} variant="body1">
                  There are no posts on this room
                </Typography>;
              }
            })}

            {/* <List />
            <List />
            <List /> */}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default UniqueRoom;

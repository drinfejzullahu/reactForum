import React, { useState, useEffect } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  box: {
    height: "340px",
    marginTop: "50px"
  },
  button: {
    backgroundColor: "#222423",
    marginTop: "30px",
    color: "white"
  },
  error: {
    backgroundColor: "#fafafa ",
    marginTop: "30px",
    color: "white"
  }
});

const Question = props => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedRoom, setSelectedRoomId] = useState();
  const [rooms, setRooms] = useState([]);

  const [errorTitle, setErrorTitle] = useState(true);
  const [errorQuestion, setErrorQuestion] = useState(true);
  const [errorSelectedRoom, setErrorSelctedRoom] = useState(true);

  const userEmail = useSelector(state => state.email);

  const matches = useMediaQuery("(min-width: 750px)");

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get("/api/room")
      .then(res => {
        setRooms(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    stringValidator("title");
    stringValidator("question");
    if (selectedRoom) {
      setErrorSelctedRoom(false);
    } else {
      setErrorSelctedRoom(true);
    }

    if (title.length <= 0) {
      setErrorTitle(true);
    }
    if (question.length <= 0) {
      setErrorQuestion(true);
    }
  });

  useEffect(() => {
    if (props.id) {
      axios
        .get(`/api/post/${props.id}`)
        .then(res => {
          setPost(res.data);
          setTitle(res.data.title);
          setQuestion(res.data.question);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  if (post) {
    console.log(post);
  }

  console.log(props.id);

  const inputChangeTitle = e => {
    setTitle(e.target.value);
  };
  const inputChangeQuestion = e => {
    setQuestion(e.target.value);
  };

  const handleBtnClick = () => {
    // axios.get("/api/room").then(res => {
    //   console.log(res);
    // });
    axios
      .get(`/api/user/email/${userEmail}`)
      .then(userRes => {
        console.log(selectedRoom.id);
        const roomid = selectedRoom.id;
        const data = {
          title,
          question,
          roomid,
          userid: userRes.data.id,
          username: userRes.data.username
        };
        axios
          .post("/api/post", data)
          .then(res => {
            console.log(res);
            props.history.push("/");
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const stringValidator = text => {
    var regex = new RegExp("^[a-zA-Z]{1,}");
    if (text === "title") {
      if (regex.test(title)) {
        setErrorTitle(false);
      }
    } else if (text === "question") {
      if (regex.test(question)) {
        setErrorQuestion(false);
      }
    }
  };

  const editHandleBtnClick = () => {
    axios
      .get(`/api/user/email/${userEmail}`)
      .then(userRes => {
        console.log(selectedRoom.id);
        const roomid = selectedRoom.id;
        const data = {
          id: props.id,
          title,
          question,
          roomid,
          userid: userRes.data.id,
          username: userRes.data.username
        };
        axios
          .put(`/api/post/${props.id}/`, data)
          .then(res => {
            console.log(res);
            props.history.push("/");
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(errorSelectedRoom, errorTitle, errorQuestion);
  const classes = useStyles();

  return (
    <div>
      {matches ? (
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Box className={classes.box}>
              <TextField
                onChange={inputChangeTitle}
                id="standard-full-width"
                placeholder="Title of your question"
                helperText=""
                value={title}
                fullWidth
                // value={post !== null ? post.title : null}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                onChange={inputChangeQuestion}
                id="outlined-textarea"
                placeholder="Body of your question"
                multiline
                value={question}
                // value={post !== null ? post.question : null}
                fullWidth
                margin="normal"
                rows={5}
                variant="outlined"
              />
              <Autocomplete
                id="combo-box-demo"
                options={rooms}
                getOptionLabel={option => option.name}
                style={{ width: "100%" }}
                onChange={(event, value) => setSelectedRoomId(value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Rooms"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <Button
                className={
                  errorQuestion || errorTitle || errorSelectedRoom
                    ? classes.error
                    : classes.button
                }
                onClick={post !== null ? editHandleBtnClick : handleBtnClick}
                fullWidth
                disabled={errorQuestion || errorTitle || errorSelectedRoom}
              >
                Send
              </Button>
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Box className={classes.box}>
              <TextField
                onChange={inputChangeTitle}
                id="standard-full-width"
                placeholder="Title of your question"
                helperText=""
                value={title}
                fullWidth
                // value={post !== null ? post.title : null}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                onChange={inputChangeQuestion}
                id="outlined-textarea"
                placeholder="Body of your question"
                multiline
                value={question}
                // value={post !== null ? post.question : null}
                fullWidth
                margin="normal"
                rows={5}
                variant="outlined"
              />
              <Autocomplete
                id="combo-box-demo"
                options={rooms}
                getOptionLabel={option => option.name}
                style={{ width: "100%" }}
                onChange={(event, value) => setSelectedRoomId(value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Rooms"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <Button
                className={
                  errorQuestion || errorTitle || errorSelectedRoom
                    ? classes.error
                    : classes.button
                }
                onClick={post !== null ? editHandleBtnClick : handleBtnClick}
                fullWidth
                disabled={errorQuestion || errorTitle || errorSelectedRoom}
              >
                Send
              </Button>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      )}
    </div>
  );
};
export default withRouter(Question);

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Grid, Typography, TextField, Box, Button } from "@material-ui/core";
import RoomList from "./RoomsList";

const useStyles = makeStyles({
  rootDiv: {
    margin: "20px"
  },
  listRootDiv: {
    width: "100%",
    height: "500px",
    border: "1px solid #dcdfe0",
    borderRadius: "25px",
    overflowY: "scroll",
    backgroundColor: "#F7FBFF"
  },
  lista: {
    margin: "10px 0px 0px 0px"
  },
  submit: {
    width: "60%",
    color: "white",
    margin: "10px auto",
    backgroundColor: "#222423"
  }
});

const Room = props => {
  const [showInput, setshowInput] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const setRoomTitle = e => {
    setName(e.target.value);
  };

  const setRoomDescription = e => {
    setDescription(e.target.value);
  };

  const addRoom = () => {
    const data = {
      name,
      viewers: 200,
      description
    };
    console.log(data);
    axios
      .post("/api/room", data)
      .then(res => {
        console.log(res);
        setshowInput(false);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div className={classes.rootDiv}>
            <div style={{ marginBottom: "20px" }}>
              <Typography
                onClick={() => {
                  setshowInput(true);
                }}
                align="center"
                variant="h6"
                style={{ cursor: "pointer" }}
              >
                Create a new Room
              </Typography>
              {showInput === true ? (
                <Box
                  display="flex"
                  style={{
                    border: "1px solid #dcdfe0",
                    borderRadius: "15px",
                    padding: "10px"
                  }}
                  flexDirection="column"
                >
                  <span
                    style={{ alignSelf: "flex-end", cursor: "pointer" }}
                    onClick={() => setshowInput(false)}
                  >
                    x
                  </span>
                  <TextField
                    onChange={setRoomTitle}
                    id="standard-full-width"
                    placeholder="Room name"
                    fullWidth
                    helperText=""
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    onChange={setRoomDescription}
                    id="outlined-textarea"
                    placeholder="Description"
                    multiline
                    fullWidth
                    margin="normal"
                    rows={5}
                    variant="outlined"
                  />
                  <Button
                    className={classes.submit}
                    disabled={name && description ? false : true}
                    onClick={addRoom}
                  >
                    Add
                  </Button>
                </Box>
              ) : null}
            </div>
            <Typography align="center" variant="h6">
              All Rooms
            </Typography>

            <div className={classes.listRootDiv}>
              <div className={classes.lista}>
                <RoomList />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Room;

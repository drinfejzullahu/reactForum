import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  listitem: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    borderRadius: "20px",
    textAlign: "center",
    marginTop: "4px"
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
}));

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get("/api/room")
      .then(res => {
        console.log(res.data);
        setRooms(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  const classes = useStyles();
  console.log(rooms);

  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      {rooms.length > 0
        ? rooms.map(room => {
            return (
              <ListItem key={room.id} button className={classes.listitem}>
                <ListItemText>
                  <Link className={classes.link} to={`/room/${room.id}`}>
                    <ListItemText primary={room.name} />
                  </Link>
                </ListItemText>
              </ListItem>
            );
          })
        : "There are no rooms"}
    </List>
  );
}

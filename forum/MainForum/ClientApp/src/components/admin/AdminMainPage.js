import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import LockIcon from "@material-ui/icons/Lock";
import RoomIcon from "@material-ui/icons/Room";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/action";
import Table from "./Table";
import axios from "axios";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: "#222423",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  listitem: {
    cursor: "pointer"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function AdminMainPage(props) {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.comments);
  const users = useSelector(state => state.users);
  const rooms = useSelector(state => state.rooms);

  console.log(rooms);
  useEffect(() => {
    dispatch(actions.getDataAsync());
    dispatch(actions.getUsersAsync());
    dispatch(actions.getRoomsAsync());

    dispatch(actions.hideNavBar());
    return () => {
      dispatch(actions.showNavBar());
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/admin") {
      dispatch(actions.hideNavBar());
    }
  });

  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const deleteRow = (type, id) => {
    axios
      .delete(`/api/${type}/${id}`)
      .then(() => {
        axios
          .get(`/api/${type}`)
          .then(res => {
            setData(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  };

  const editRow = (oldData, newData) => {
    axios
      .put(`/api/${type}/${oldData.id}`, newData)
      .then(res => {
        axios
          .get(`/api/${type}`)
          .then(res => {
            setData(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  };

  const handleUsers = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("user");
    setData(users);
  };

  const handlePosts = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("post");
    setData(posts);
  };

  const handleRooms = () => {
    if (data.length > 0) {
      setData([]);
    }
    if (type) {
      setType("");
    }
    setType("room");
    setData(rooms);
  };

  const handleLogOut = () => {
    dispatch(actions.logOut());
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Typography variant="h6" noWrap>
        <Link
          to="/"
          style={{
            color: "black",
            textDecoration: "none",
            marginLeft: "10px"
          }}
        >
          Home
        </Link>
      </Typography>

      <Divider />

      <List>
        <ListItem className={classes.listitem} onClick={handleUsers}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText>Users</ListItemText>
        </ListItem>

        <ListItem className={classes.listitem} onClick={handlePosts}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Posts</ListItemText>
        </ListItem>

        <ListItem className={classes.listitem} onClick={handleRooms}>
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText>Rooms</ListItemText>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem className={classes.listitem} onClick={handleLogOut}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Page
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Table
          editRow={editRow}
          deleteRow={deleteRow}
          type={type}
          data={data}
        />
      </main>
    </div>
  );
}

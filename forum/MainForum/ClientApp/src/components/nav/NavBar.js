import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Divider, Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Room, LiveHelp } from "@material-ui/icons";
import MoreIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import * as actions from "../../store/actions/action";
import { Link } from "react-router-dom";
import { home } from "react-icons-kit/icomoon/home";
import Icon from "react-icons-kit";
// import MenuItems from "./MenuItem";
import IconTabs from "./MenuItem";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  appbar: {
    backgroundColor: "#222423"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "655px"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputi: "",
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleInputChange = e => {
    this.setState({ inputi: e.target.value });
    // this.props.onBackwards();
  };
  handleInputAndDispatch = e => {
    // if (e.keyCode === 32) {
    // this.handleInputChange(e);
    // }

    if (this.state.inputi !== null) {
      this.handleInputChange(e);
    }

    if (this.state.inputi) {
      if (e.keyCode === 13) {
        let input = this.state.inputi;
        this.props.getInput(input);
      }
    }
  };

  // handleInputAndDispatch = e => {
  //   this.handleInputChange(e);
  //   this.props.getInput(this.state.inputi);
  // };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleLogOut = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
    this.props.logOut();
    this.props.history.push("/");
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  render() {
    const classes = this.props.classes;
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    // const dispatch = useDispatch();
    console.log(this.props.email, "email");
    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {this.props.isLogedIn ? (
          <div>
            <MenuItem onClick={this.handleMenuClose}>
              <Link
                to="/my-profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={this.handleMenuClose}>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "black" }}
              >
                Sign Up
              </Link>
            </MenuItem>
            <MenuItem onClick={this.handleMenuClose}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Log In
              </Link>
            </MenuItem>
          </div>
        )}
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Room />
          </IconButton>
          <Link
            className={classes.link}
            to="/rooms"
            onClick={this.handleMobileMenuClose}
          >
            Rooms
          </Link>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <LiveHelp />
          </IconButton>
          <Link
            className={classes.link}
            to={this.props.email === "" ? "/login" : "/askaquestion"}
            onClick={this.handleMobileMenuClose}
          >
            Ask a Question
          </Link>
        </MenuItem>

        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          Profile
        </MenuItem>

        {this.props.email === "admin@drini.adrian" ? (
          <MenuItem>
            <Link
              className={classes.link}
              to="/admin"
              onClick={this.handleMobileMenuClose}
            >
              Admin
            </Link>
          </MenuItem>
        ) : null}
      </Menu>
    );
    return (
      <div className={classes.grow}>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              {/* <MenuIcon /> */}
              <Link to="/" style={{ color: "white" }}>
                <Icon size={32} icon={home} />
              </Link>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Forum
              </Link>
              {this.props.email === "admin@drini.adrian" ? (
                <Link
                  to="/admin"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginLeft: "10px"
                  }}
                >
                  Admin
                </Link>
              ) : null}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onKeyDown={e => this.handleInputAndDispatch(e)}
                // onChange={e => this.handleInputChange(e)}
                fullWidth
                inputProps={{ "aria-label": "search" }}
                // onChange={e => this.handleInputAndDispatch(e)}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Divider />

        <AppBar className={classes.appbar} position="static">
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-around"
          >
            {/* <MenuItems />
            <MenuItems />
            <MenuItems /> */}
            <IconTabs />
          </Box>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogedIn: state.isLogedIn,
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInput: inp => dispatch(actions.inputSearchData(inp)),
    logOut: () => dispatch(actions.logOut())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PrimarySearchAppBar))
);

import React, { useState, useEffect } from "react";
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/action";
import { useSelector } from "react-redux";
import axios from "axios";
// import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#222423",
    color: "white"
  },
  link: {
    color: "black",
    textDecoration: "none"
  }
}));

export default function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEM, setErrorEM] = useState(true);
  const [errorPV, setErrorPV] = useState(true);

  const [typedEM, setTypedEM] = useState(false);
  const [typedPV, setTypedPV] = useState(false);

  const [error, setError] = useState(false);

  const userEmail = useSelector(state => state.email);
  // const isLogedIn = useSelector(state => state.isLogedIn);

  // const showNavBarState = useSelector(state => state.showNavBar);

  useEffect(() => {
    validateEmail();
    validatePassword();
  });

  useEffect(() => {
    dispatch(actions.hideNavBar());
    return () => {
      dispatch(actions.showNavBar());
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/login") {
      dispatch(actions.hideNavBar());
    }
  });

  const dispatch = useDispatch();

  const inputChangeEmail = e => {
    setEmail(e.target.value);
    setTypedEM(true);
  };

  const inputChangePassword = e => {
    setPassword(e.target.value);
    setTypedPV(true);
  };

  const enterPressed = e => {
    if (e.keyCode === 13) {
      console.log(e);
      loginClickHandler();
    }
  };

  const validatePassword = () => {
    if (password.length > 5) {
      setErrorPV(false);
    } else {
      setErrorPV(true);
    }
  };

  const validateEmail = () => {
    var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      setErrorEM(false);
    } else {
      setErrorEM(true);
    }
  };

  const loginClickHandler = () => {
    const data = {
      email,
      password
    };
    console.log(data);
    axios
      .post("/api/auth/token", data)
      .then(res => {
        console.log(res);
        dispatch(actions.logInAction(data));
        props.history.push("/");
      })
      .catch(err => {
        console.log(err.message);
        setError(true);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {error === true ? (
          <h4 style={{ marginTop: "20px" }}>Email or password is invalid</h4>
        ) : null}
        <form className={classes.form} noValidate>
          <TextField
            error={errorEM && typedEM}
            onChange={inputChangeEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onKeyDown={e => enterPressed(e)}
            error={errorPV && typedPV}
            onChange={inputChangePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={loginClickHandler}
            disabled={errorEM || errorPV}
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item style={{ margin: "auto" }}>
              <Link className={classes.link} to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

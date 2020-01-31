import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/action";
import { Link } from "react-router-dom";

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
  link: {
    marginTop: "10px",
    color: "black",
    textDecoration: "none"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#222423",
    color: "white"
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorFN, setErrorFN] = useState(true);
  const [errorUN, setErrorUN] = useState(true);
  const [errorEM, setErrorEM] = useState(true);
  const [errorPV, setErrorPV] = useState(true);

  const [typedFN, setTypedFN] = useState(false);
  const [typedUN, setTypedUN] = useState(false);
  const [typedEM, setTypedEM] = useState(false);
  const [typedPV, setTypedPV] = useState(false);

  useEffect(() => {
    fullnameValidator();
    usernameValidat();
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
    if (window.location.pathname === "/signup") {
      dispatch(actions.hideNavBar());
    }
  });

  const inputChangeFullname = e => {
    setFullname(e.target.value);
    setTypedFN(true);
  };

  const fullnameHandler = e => {
    inputChangeFullname(e);
    // fullnameValidator();
  };

  const inputChangeUsername = e => {
    setUsername(e.target.value);
    setTypedUN(true);
    // usernameValidat();
  };
  const inputChangeEmail = e => {
    setEmail(e.target.value);
    setTypedEM(true);

    // validateEmail();
  };
  const inputChangePassword = e => {
    setPassword(e.target.value);
    setTypedPV(true);
    // validatePassword();
  };
  const enterPressed = e => {
    if (e.keyCode === 13) {
      console.log(e);
      signUpRequest();
    }
  };

  const signUpRequest = () => {
    const data = {
      fullname,
      username,
      email,
      password,
      isadmin: false
    };

    axios
      .post("/api/user", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    props.history.push("/login");
  };

  const fullnameValidator = () => {
    var regex = new RegExp("^[a-zA-Z]{4,}");
    if (regex.test(fullname)) {
      setErrorFN(false);
    } else {
      setErrorFN(true);
    }
  };

  const usernameValidat = () => {
    var re = new RegExp("^([a-z0-9]{5,})$");
    if (re.test(username)) {
      setErrorUN(false);
    } else {
      setErrorUN(true);
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={errorFN && typedFN}
            onInput={e => fullnameHandler(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            id="fullname"
            label="FullName"
            name="fullname"
            autoFocus
          />
          <TextField
            error={errorUN && typedUN}
            onChange={e => inputChangeUsername(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            error={errorEM && typedEM}
            onChange={e => inputChangeEmail(e)}
            variant="outlined"
            margin="normal"
            type="email"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            onKeyDown={e => enterPressed(e)}
            error={errorPV && typedPV}
            onChange={e => inputChangePassword(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />

          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={signUpRequest}
            disabled={errorEM || errorFN || errorPV || errorUN ? true : false}
          >
            Sign Up
          </Button>
          <div style={{ textAlign: "center" }}>
            <Link className={classes.link} to="/login">
              Already have an account ? Log In
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}

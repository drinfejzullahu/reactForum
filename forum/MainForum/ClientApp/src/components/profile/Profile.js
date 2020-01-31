import React, { useEffect, useState } from "react";
import { Grid, Drawer } from "@material-ui/core";
import {
  Button,
  Typography,
  CardContent,
  CardActionArea,
  Card,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import List from "../list/List";

const useStyles = makeStyles({
  profile: {
    margin: "20px 0px 20px 20px"
  },
  lista: {
    margin: "15px 0px 0px 0px"
  },
  typography: {
    // border: "1px solid #dcdfe0",
    // borderRadius: "10px",
    padding: "5px",
    marginTop: "10px"
  }
});

export default function Profile() {
  const matches = useMediaQuery("(min-width: 750px)");
  const userEmail = useSelector(state => state.email);

  const [data, setData] = useState(null);
  const posts = useSelector(state => state.comments);
  console.log(posts);

  useEffect(() => {
    if (userEmail !== "") {
      getUser();
    }
  }, []);

  const getUser = () => {
    if (userEmail !== "") {
      axios
        .get(`/api/user/email/${userEmail}`)
        .then(res => {
          // console.log(res);
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  console.log(data);

  const classes = useStyles();
  return (
    <div>
      {matches ? (
        <Grid container>
          <Grid item xs={4}>
            <div className={classes.profile}>
              {data !== null ? (
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        align="center"
                        gutterBottom
                        variant="h4"
                        component="h6"
                      >
                        Profile
                      </Typography>
                      <hr />

                      <Typography
                        className={classes.typography}
                        gutterBottom
                        variant="h6"
                        component="h6"
                      >
                        <b>Full Name:</b> {data.fullName}
                      </Typography>
                      <Typography
                        className={classes.typography}
                        gutterBottom
                        variant="h6"
                        component="h6"
                      >
                        <b>Email:</b> {data.email}
                      </Typography>
                      <Typography
                        className={classes.typography}
                        gutterBottom
                        variant="h6"
                        component="h6"
                      >
                        <b>Username:</b> {data.username}
                      </Typography>
                      <Typography
                        className={classes.typography}
                        gutterBottom
                        variant="h6"
                        component="h6"
                      >
                        <b>Admin:</b> {data.admin === true ? "Yes" : "No"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : (
                "Loading..."
              )}
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className={classes.lista}>
              {posts.map(cm => {
                if (data !== null) {
                  if (cm.userId === data.id) {
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
                  }
                }
              })}
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <div style={{ margin: "15px" }}>
              {data !== null ? (
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        align="center"
                        gutterBottom
                        variant="h4"
                        component="h6"
                      >
                        Profile
                      </Typography>
                      <hr />

                      <Typography
                        className={classes.typography}
                        gutterBottom
                        variant="h6"
                        component="h6"
                      >
                        <b>Full Name:</b> {data.fullName}
                      </Typography>
                      <Typography
                        className={classes.typography}
                        gutterBottom
                        variant="h6"
                        component="h6"
                      >
                        <b>Email:</b> {data.email}
                      </Typography>
                      <Typography
                        className={classes.typography}
                        gutterBottom
                        variant="h6"
                        component="h6"
                      >
                        <b>Username:</b> {data.username}
                      </Typography>
                      <Typography
                        className={classes.typography}
                        gutterBottom
                        variant="h6"
                        component="h6"
                      >
                        <b>Admin:</b> {data.admin === true ? "Yes" : "No"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : (
                "Loading..."
              )}
            </div>

            <div className={classes.lista}>
              {posts.map(cm => {
                if (data !== null) {
                  if (cm.userId === data.id) {
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
                  }
                }
              })}
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import List from "../list/List";
import * as actions from "../../store/actions/action";
import { connect } from "react-redux";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Room from "../room/RoomsList";
import Pagination from "../pagination/Pagination";
import Media from "react-media";

const styles = theme => ({
  button: {
    display: "block",
    width: "115px",
    height: "25px",
    background: "#222423",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    textDecoration: "none"
  },
  box: {
    margin: "10px",
    // border: "1px solid #dcdfe0",
    padding: "20px"
    // borderRadius: "25px",
    // backgroundColor: "#F7FBFF"
  },
  rooms: {
    height: "100%",
    width: "94%",
    border: "1px solid #dcdfe0",
    borderRadius: "25px",
    margin: "5px 20px 20px 0px",
    backgroundColor: "#F7FBFF"
  },
  belowNavbar: {
    width: "100%",
    marginTop: "10px"
  },
  pagination: {
    margin: "20px 0",
    border: "1px solid #dcdfe0",
    borderRadius: "25px",
    backgroundColor: "#F7FBFF"
  }
});

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postsPerPage: 15
    };
  }

  componentDidMount() {
    this.props.getDataAsync();
  }

  paginate = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };
  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.props.comments.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const classes = this.props.classes;
    let showing = null;

    showing =
      this.props.filtered.length > 0 ? this.props.filtered : currentPosts;

    return (
      <div>
        <Media
          queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 850px)",
            large: "(min-width: 850px)"
          }}
        >
          {matches => (
            <Fragment>
              {matches.small && (
                <div>
                  <Grid container>
                    <Grid item xs={12}>
                      {showing !== null ? (
                        showing.map(cm => {
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
                        })
                      ) : (
                        <h4>This post doesnt exist</h4>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item className={classes.pagination} xs={12}>
                      <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.props.comments.length}
                        paginate={this.paginate}
                      />
                    </Grid>
                  </Grid>
                </div>
              )}
              {matches.medium && (
                <div>
                  <Grid container direction="row">
                    <Grid item xs={8}>
                      {showing !== null ? (
                        showing.map(cm => {
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
                        })
                      ) : (
                        <h4>This post doesnt exist</h4>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <div className={classes.rooms}>
                        <Room />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item xs={2}></Grid>
                    <Grid item className={classes.pagination} xs={8}>
                      <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.props.comments.length}
                        paginate={this.paginate}
                      />
                    </Grid>
                    <Grid xs={2}></Grid>
                  </Grid>
                </div>
              )}
              {matches.large && (
                <div>
                  <Grid container direction="row">
                    <div className={classes.belowNavbar}>
                      <Box
                        className={classes.box}
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                      >
                        <Typography
                          variant="h6"
                          align="center"
                          color="textPrimary"
                        >
                          Most frequently asked questions{" "}
                        </Typography>
                        <Link
                          className={classes.button}
                          to={
                            this.props.email === "" ? "/login" : "/askaquestion"
                          }
                        >
                          Ask a question
                        </Link>
                        <Link className={classes.button} to="/rooms">
                          Go to Rooms
                        </Link>
                        <Typography
                          variant="h6"
                          align="center"
                          color="textPrimary"
                        >
                          Best Rooms
                        </Typography>
                      </Box>
                    </div>
                    <Grid item xs={8}>
                      {showing !== null
                        ? showing.map(cm => {
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
                          })
                        : null}
                    </Grid>
                    <Grid item xs={4}>
                      <div className={classes.rooms}>
                        <Room />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item xs={3}></Grid>
                    <Grid item className={classes.pagination} xs={6}>
                      <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.props.comments.length}
                        paginate={this.paginate}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                </div>
              )}
            </Fragment>
          )}
        </Media>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filtered: state.filtered,
    comments: state.comments,
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataAsync: () => dispatch(actions.getDataAsync())
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);

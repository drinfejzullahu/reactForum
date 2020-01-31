import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import PersonPinIcon from "@material-ui/icons/PersonPin";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import WhatshotIcon from "@material-ui/icons/Whatshot";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    backgroundColor: "#222423"
  },
  icon: {
    color: "white"
  }
});

export default function IconTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        className={classes.icon}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        // textColor="white"
        aria-label="icon tabs example"
      >
        <Tab
          label="Most voted"
          icon={<CheckCircleOutlineIcon className={classes.icon} />}
          aria-label="phone"
        />
        <Tab
          label="Hotest this week"
          icon={<WhatshotIcon className={classes.icon} />}
          aria-label="favorite"
        />
        {/* <Tab
          icon={<PersonPinIcon className={classes.icon} />}
          aria-label="person"
        /> */}
      </Tabs>
    </Paper>
  );
}

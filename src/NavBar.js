import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Usuarios from "./Usuarios";
import UserDetails from "./UserDetails";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  contained: {
    width: "100%",
    height: "100%",
    padding: 0,
    backgroundColor: "#DEDEDE",
  },
  soft: {
    color: "lightgray",
  },
  active: {
    color: "#000",
  },
  container: {
    backgroundColor: theme.palette.common.ligthGray,
    height: "100%",
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };
  useEffect(() => {
    fetch("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const object = {
          A: [],
          B: [],
          C: [],
          D: [],
          E: [],
          F: [],
          G: [],
          H: [],
          I: [],
          J: [],
          K: [],
          L: [],
          M: [],
          N: [],
          O: [],
          P: [],
          Q: [],
          R: [],
          S: [],
          T: [],
          U: [],
          V: [],
          W: [],
          X: [],
          Y: [],
          Z: [],
        };
        const ordered = data.results[0].sort((a, b) => {
          if (a.first < b.first) {
            return -1;
          }
          if (a.first > b.first) {
            return 1;
          }
          return 0;
        });

        ordered.forEach((d) => {
          const key = d.first.charAt(0).toString();

          object[key] = [...object[key], d];
        });
        setUsers(object);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            className={value === 0 ? classes.active : classes.soft}
            label="Pros"
            {...a11yProps(0)}
          />
          <Tab
            className={value === 1 ? classes.active : classes.soft}
            label="Customers"
            {...a11yProps(1)}
          />
          <Tab
            className={value === 2 ? classes.active : classes.soft}
            label="Invites"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        className={classes.container}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          value={value}
          className={classes.contained}
          index={0}
          dir={theme.direction}
        >
          {!view ? (
            <Usuarios users={users} loading={loading} handleView={handleView} />
          ) : (
            <UserDetails handleView={handleView} />
          )}
        </TabPanel>
        <TabPanel
          value={value}
          className={classes.contained}
          index={1}
          dir={theme.direction}
        >
          {!view ? (
            <Usuarios users={users} loading={loading} handleView={handleView} />
          ) : (
            <UserDetails handleView={handleView} />
          )}
        </TabPanel>
        <TabPanel
          value={value}
          className={classes.contained}
          index={2}
          dir={theme.direction}
        >
          {!view ? (
            <Usuarios users={users} loading={loading} handleView={handleView} />
          ) : (
            <UserDetails handleView={handleView} />
          )}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

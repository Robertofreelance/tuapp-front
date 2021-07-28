import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  ListItem,
  Button,
  Typography,
  ListItemText,
  Divider,
  ListItemIcon,
  Box,
  Grid,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { makeStyles } from "@material-ui/core/styles";

import { RoomOutlined, Star, Phone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#F5F5F7",
    borderRadius: 8,
  },
  upper: {
    backgroundColor: theme.palette.secondary.main,
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 12,
    paddingRight: 12,

    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  bottom: {
    backgroundColor: theme.palette.secondary.second,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  divider: {
    height: 1,
  },
  img: {
    width: "17vw",
    height: "17vw",
  },
  imgTall: {
    width: 130,
    height: 130,
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    wordBreak: "break-all",
  },
  subTitle: {
    fontSize: 22,
    color: "#f3f2f2",
    wordBreak: "break-all",
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
  },
  icon: {
    fontSize: 28,
    color: theme.palette.secondary.main,
  },
  text: {
    fontSize: 20,
  },
}));

export default function Usuarios(props) {
  const { handleView } = props;
  const matches = useMediaQuery("(max-width: 660px)");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUser(data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) return "loading...";
  return (
    <div className={classes.container}>
      <Box p={2} className={classes.root}>
        <Box>
          <Grid className={classes.upper} container>
            <Grid container alignItems="center" justifyContent="center" xs={3} item>
              <Avatar
                src={!matches ? user.picture.large : user.picture.thumbnail}
                className={matches ? classes.img : classes.imgTall}
              />
            </Grid>
            <Grid
              container
              style={{ lineBreak: "all-break" }}
              direction="column"
              justifyContent="center"
              xs={9}
              item
            >
              <Typography className={classes.title}>
                {user.name.first + " " + user.name.last}
              </Typography>
              <Typography className={classes.subTitle}>{user.email}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.bottom} container>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              xs={4}
              item
            >
              <Typography className={classes.title}>112</Typography>
              <Typography className={classes.subTitle}>Contacts</Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              xs={4}
              item
            >
              <Typography className={classes.title}>48</Typography>
              <Typography className={classes.subTitle}>Favorites</Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              xs={4}
              item
            >
              <Typography className={classes.title}>8</Typography>
              <Typography className={classes.subTitle}>Groups</Typography>
            </Grid>
          </Grid>
          <br />
          <List className={classes.list}>
            <ListItem onClick={handleView}>
              <ListItemIcon>
                <Star className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ className: classes.text }}
                primary="Add to Favorite"
              />
            </ListItem>
            <Divider
              className={classes.divider}
              variant="inset"
              component="li"
            />
            <ListItem onClick={handleView}>
              <ListItemIcon>
                <Phone className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ className: classes.text }}
                primary={user.phone}
              />
              <Button
                variant="contained"
                style={{ color: "#fff" }}
                size="small"
                color="secondary"
              >
                CALL
              </Button>
            </ListItem>
            <Divider
              className={classes.divider}
              variant="inset"
              component="li"
            />
            <ListItem onClick={handleView}>
              <ListItemIcon>
                <RoomOutlined className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ className: classes.text }}
                primary={
                  user.location.street.name + ", " + user.location.street.number
                }
              />
            </ListItem>
          </List>
          <br />
          <Button
            variant="contained"
            style={{ color: "#fff" }}
            size="large"
            color="secondary"
            onClick={handleView}
          >
            Back
          </Button>
        </Box>
      </Box>
    </div>
  );
}

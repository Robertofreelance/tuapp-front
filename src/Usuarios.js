import React, {  Fragment } from "react";
import {
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { VerifiedUser, Star } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
  },
  divider: {
    height: 1,
  },
}));

export default function Usuarios(props) {
  const {handleView, users, loading} = props
  
  const classes = useStyles();

  
  if (!loading) return "loading...";
  return (
    <div>
      {Object.entries(users).map(([key, value], i) => {
        if (value.length > 0) {
          return (
            <Fragment key={i}>
              <Typography
                style={key !== "A" ? { marginTop: 5, marginBottom: 3 } : {}}
              >
                {key}
              </Typography>
              <List key={i} className={classes.root}>
                {Object.values(value).map((user, i) => (
                  <Fragment key={i}>
                    <ListItem key={i} style={{cursor: "pointer"}} onClick={handleView}>
                      <ListItemAvatar>
                        <Avatar>
                          <VerifiedUser />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.first + " " + user.last}
                        secondary={user.email}
                        secondaryTypographyProps={{style: {fontSize: 14, wordBreak: "break-all"}}}
                      />
                      <ListItemIcon>
                        <Star />
                      </ListItemIcon>
                    </ListItem>
                    {value[i] !== value[value.length - 1] && (
                      <Divider
                        className={classes.divider}
                        variant="inset"
                        component="li"
                      />
                    )}
                  </Fragment>
                ))}
              </List>
            </Fragment>
          );
        } else {
          return <Fragment key={i}></Fragment>;
        }
      })}
    </div>
  );
}

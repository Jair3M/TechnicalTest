import React from 'react';
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AlbumsComponent from './Albums'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline-block',
    width: '50%'
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

export default function UserAlbumComponent({UserInfo}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></div>
      <AlbumsComponent UserInfo={UserInfo} toggleDrawer={toggleDrawer('right',false)} />
      </>
  );

  return (
    <>
      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
     <div className={classes.root}>
      <Paper className={classes.paper} key={UserInfo.id} onClick={toggleDrawer('right', true)}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={UserInfo.avatar} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {UserInfo.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {UserInfo.first_name} {UserInfo.last_name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
    </>
  );
}

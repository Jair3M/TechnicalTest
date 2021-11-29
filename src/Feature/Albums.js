import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 2, 2),
  },
}));

export default function AlbumsComponent({UserInfo}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [infoPosts, setInfoPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users/"+UserInfo.id+"/albums").then(response => {
      setInfoPosts(response?.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h6" className={classes.title}>
            Albums by User
          </Typography>
          <div className={classes.demo}>
            <List>
              {infoPosts.map(action => (
                <ListItem>
                  <ListItemText
                    primary={action.title}
                    secondary='Album'
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

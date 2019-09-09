import React from 'react';

import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Profile from './Profile';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '2rem',
    [theme.breakpoints.up('lg')]: {
      marginBottom: '5rem'
    }
  }
});

function ProfileHero({ classes, profile, ...props }) {
  return profile.length === 1 ? (
    <Profile classes={{ root: classes.root }} geoId={profile[0]} {...props} />
  ) : (
    <Grid className={classes.root} container direction="row" spacing={1}>
      <Profile
        item
        md={6}
        alignItems="flex-start"
        geoId={profile[0]}
        {...props}
      />
      <Profile
        item
        md={6}
        alignItems="flex-start"
        geoId={profile[1]}
        {...props}
      />
    </Grid>
  );
}

ProfileHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  profile: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default withStyles(styles)(ProfileHero);

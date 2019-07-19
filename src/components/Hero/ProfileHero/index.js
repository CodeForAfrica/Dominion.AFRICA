import React from 'react';

import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Profile from './Profile';

const styles = {
  root: {}
};

function ProfileHero({ profile, anotherProfile, ...props }) {
  return (
    <Grid container direction="row">
      <Grid item md={anotherProfile ? 6 : 12}>
        <Profile profile={profile} {...props} />
      </Grid>
      {anotherProfile && (
        <Grid item md={6}>
          <Profile profile={anotherProfile} {...props} />
        </Grid>
      )}
    </Grid>
  );
}

ProfileHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  anotherProfile: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ProfileHero);

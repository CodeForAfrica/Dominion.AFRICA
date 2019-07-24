import React from 'react';

import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Profile from './Profile';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '0 9.375rem',
    [theme.breakpoints.down('md')]: {
      margin: '0 3.125rem'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    }
  }
});

function ProfileHero({ classes, profile, ...props }) {
  return !profile || !profile.comp_geography ? (
    <Profile classes={{ root: classes.root }} profile={profile} {...props} />
  ) : (
    <Grid className={classes.root} container direction="row" spacing={1}>
      <Profile
        item
        md={6}
        alignItems="flex-start"
        profile={{
          ...profile,
          total_population: profile.total_population.this
        }}
        {...props}
      />
      <Profile
        item
        md={6}
        alignItems="flex-start"
        profile={{
          ...profile,
          geography: profile.comp_geography,
          total_population:
            profile.total_population[profile.comp_geography.this.full_name]
        }}
        {...props}
      />
    </Grid>
  );
}

ProfileHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(ProfileHero);

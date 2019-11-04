import React from 'react';

import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Profile from './Profile';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '2rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: '5rem'
    }
  }
});

function ProfileHero({ classes, profiles, geoId, comparisonGeoId, ...props }) {
  return !comparisonGeoId ? (
    <Profile
      classes={{ root: classes.root }}
      isLoading={profiles.isLoading}
      profile={profiles.profile}
      geoId={geoId}
      {...props}
    />
  ) : (
    <Grid className={classes.root} container direction="row" spacing={1}>
      <Profile
        item
        md={6}
        alignItems="flex-start"
        isLoading={profiles.isLoading}
        profile={profiles.profile}
        geoId={geoId}
        {...props}
      />
      <Profile
        item
        md={6}
        alignItems="flex-start"
        isLoading={profiles.isLoading}
        profile={profiles.comparison}
        geoId={comparisonGeoId}
        {...props}
      />
    </Grid>
  );
}

ProfileHero.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dominion: PropTypes.shape({}).isRequired,
  profiles: PropTypes.shape({}).isRequired,
  geoId: PropTypes.string.isRequired,
  comparisonGeoId: PropTypes.string
};

ProfileHero.defaultProps = {
  comparisonGeoId: undefined
};

export default withStyles(styles)(ProfileHero);

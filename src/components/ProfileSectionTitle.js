import React from 'react';
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  grid: {
    height: '5rem',
    margin: '2rem 0 !important',
    width: '100%'
  },
  title: {
    textDecoration: 'none',
    display: 'inline'
  },
  icon: {
    display: 'inline',
    padding: '1rem',
    borderRadius: '50%',
    border: '1px solid',
    marginTop: '-4px'
  },
  fa: {
    fontSize: '1.5rem'
  }
});

library.add(faUser, faEnvelope);

function ProfileSectionTitle({ classes, tab: { name, href } }) {
  return (
    <Grid item className={classes.grid}>
      <div className={classes.icon}>
        <FontAwesomeIcon className={classes.fa} icon="envelope" size="sm" />
      </div>
      <Typography variant="h3" id={href} className={classes.title}>
        {' '}
        {name}
      </Typography>
    </Grid>
  );
}

ProfileSectionTitle.propTypes = {
  classes: PropTypes.shape().isRequired,
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(ProfileSectionTitle);

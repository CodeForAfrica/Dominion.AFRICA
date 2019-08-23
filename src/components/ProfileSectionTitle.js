import React from 'react';
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLeaf,
  faUsers,
  faBookOpen,
  faChartBar,
  faBuilding,
  faCoins,
  faCity,
  faImage,
  faBriefcase
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  grid: {
    height: '5rem',
    marginTop: '4rem',
    marginBottom: '0.5rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    textDecoration: 'none',
    display: 'inline',
    marginLeft: '2rem',
    textTransform: 'uppercase',
    fontFamily: 'Sans Serif'
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    borderRadius: '50%',
    border: '1px solid',
    marginTop: '-4px',
    width: '5rem',
    height: '5rem'
  },
  fa: {
    fontSize: '2.6rem'
  }
});

library.add(
  faLeaf,
  faBuilding,
  faUsers,
  faBookOpen,
  faChartBar,
  faCoins,
  faCity,
  faImage,
  faBriefcase
);

function ProfileSectionTitle({ classes, tab: { name, icon } }) {
  return (
    <Grid item className={classes.grid}>
      <span className={classes.icon}>
        <FontAwesomeIcon className={classes.fa} icon={icon} size="sm" />
      </span>
      <Typography variant="h4" className={classes.title}>
        {name}
      </Typography>
    </Grid>
  );
}

ProfileSectionTitle.propTypes = {
  classes: PropTypes.shape().isRequired,
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(ProfileSectionTitle);

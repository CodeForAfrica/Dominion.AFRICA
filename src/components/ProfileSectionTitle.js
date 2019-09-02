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
import { ContentLoader } from '@codeforafrica/hurumap-ui';

const styles = () => ({
  root: {
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

function ProfileSectionTitle({ classes, loading, tab: { name, icon } }) {
  return (
    <Grid item className={classes.root}>
      {loading ? (
        <ContentLoader primaryOpacity={1} secondaryOpacity={0.5} height="5rem">
          <circle cx="2.5rem" cy="2.5rem" r="2.5rem" />
          <rect
            x="5.5rem"
            y="1.25rem"
            rx="0.125rem"
            ry="0.125rem"
            height="2.5rem"
            width="20rem"
          />
        </ContentLoader>
      ) : (
        <>
          <span className={classes.icon}>
            <FontAwesomeIcon className={classes.fa} icon={icon} size="sm" />
          </span>
          <Typography variant="h4" className={classes.title}>
            {name}
          </Typography>
        </>
      )}
    </Grid>
  );
}

ProfileSectionTitle.propTypes = {
  classes: PropTypes.shape().isRequired,
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  loading: PropTypes.bool
};

ProfileSectionTitle.defaultProps = {
  loading: false
};

export default withStyles(styles)(ProfileSectionTitle);

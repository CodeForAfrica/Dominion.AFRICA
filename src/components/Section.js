import React from 'react';

import { PropTypes } from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '2rem',
    backgroundColor: 'white',
    [theme.breakpoints.up('md')]: {
      padding: '3.125rem'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '3.125rem 9.125rem'
    }
  },
  description: {
    margin: '2rem 0',
    [theme.breakpoints.up('md')]: {
      marginTop: 0
    }
  },
  light: {
    backgroundColor: theme.palette.primary.light
  }
});

function Section({ classes, light, title, subtitle, description, children }) {
  return (
    <div className={classNames(classes.root, { [classes.light]: light })}>
      <Typography variant="h3">{title}</Typography>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography className={classes.description}>{description}</Typography>
          <div>{children}</div>
        </Grid>
      </Grid>
    </div>
  );
}

Section.propTypes = {
  light: PropTypes.bool,
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Section.defaultProps = {
  light: false,
  children: null
};

export default withStyles(styles)(Section);

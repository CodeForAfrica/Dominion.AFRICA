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
      maxWidth: '71.1875rem',
      margin: '0 auto',
      padding: '5rem 0'
    }
  },
  light: {
    backgroundColor: theme.palette.primary.light
  }
});

function Section({ id, classes, light, title, subtitle, children }) {
  return (
    <div
      id={id}
      className={classNames(classes.root, { [classes.light]: light })}
    >
      <Grid container>
        <Grid item xs={12} md={4} style={{ marginBottom: '1.25rem' }}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <div>{children}</div>
        </Grid>
      </Grid>
    </div>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  light: PropTypes.bool,
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Section.defaultProps = {
  id: undefined,
  light: false,
  children: null
};

export default withStyles(styles)(Section);

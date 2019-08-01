import React from 'react';

import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '2rem',
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.up('md')]: {
      padding: '3.125rem'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '3.125rem 9.125rem'
    }
  }
});

function ChartsContainer({ classes, children }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {children}
      </Grid>
    </div>
  );
}

ChartsContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ChartsContainer.defaultProps = {
  children: null
};

export default withStyles(styles)(ChartsContainer);

import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
  root: {
    width: 'auto',
    padding: '1.43rem 2.143rem 0',
    [theme.breakpoints.up('md')]: {
      padding: 0
    }
  }
});

function Header({ classes, children }) {
  return (
    <div className={classes.root}>
      <Typography variant="h2">{children}</Typography>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default withWidth()(withStyles(styles)(Header));

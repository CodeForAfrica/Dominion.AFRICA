import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    padding: '1.43rem 2.143rem 0',
    [theme.breakpoints.up('md')]: {
      padding: 0
    }
  }
}));

function Header({ children, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography variant="h2">{children}</Typography>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Header;

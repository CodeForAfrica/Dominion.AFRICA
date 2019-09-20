import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '20px 30px',
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      paddingLeft: '1rem',
      paddingRight: '2rem'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '30rem',
      padding: 0
    }
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    lineHeight: 1.92
  },
  body: {
    marginTop: '1rem',
    lineHeight: 1.92
  }
}));

function InfoSubtitle({ children, ...props }) {
  const classes = useStyles(props);

  return (
    <Typography component="div" variant="body2" className={classes.subtitle}>
      {children}
    </Typography>
  );
}

InfoSubtitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

function InfoBody({ children, ...props }) {
  const classes = useStyles(props);

  return (
    <Typography component="span" variant="body2" className={classes.body}>
      {children}
    </Typography>
  );
}

InfoBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { InfoBody, InfoSubtitle };

function Info({ children, ...props }) {
  const classes = useStyles(props);

  return <div className={classes.root}>{children}</div>;
}

Info.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Info;

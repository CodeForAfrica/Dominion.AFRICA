import React from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '2rem',
    backgroundColor: 'white',
    [theme.breakpoints.up('md')]: {
      padding: '5rem 0'
    }
  },
  wrapper: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem',
      margin: '0 auto'
    }
  },
  light: {
    backgroundColor: theme.palette.primary.light
  },
  gridMargin: {
    marginBottom: '1.4286rem'
  },
  subtitle: {},
  content: {}
}));

function Section({
  children,
  id,
  light,
  title,
  subtitle,
  titleVariant,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <div
      id={id}
      className={classNames(classes.root, { [classes.light]: light })}
    >
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} md={4} className={classes.gridMargin}>
          <Typography variant={titleVariant}>{title}</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} className={classes.content}>
          <div>{children}</div>
        </Grid>
      </Grid>
    </div>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  light: PropTypes.bool,
  title: PropTypes.string.isRequired,
  titleVariant: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Section.defaultProps = {
  children: null,
  id: undefined,
  light: false,
  titleVariant: 'h3'
};

export default Section;

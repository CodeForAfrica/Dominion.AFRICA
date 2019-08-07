import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import ArrowButton from '../ArrowButton';

const styles = theme => ({
  root: {
    flexGrow: 1,
    pointerEvents: 'all',
    height: '65vh',
    overflow: 'hidden'
  },
  titleTextGrid: {
    pointerEvents: 'all',
    zIndex: '100',
    color: 'white',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      margin: '2rem',
      marginTop: 0
    }
  },
  h2hTitleGrid: {
    pointerEvents: 'all',
    order: 2,
    paddingTop: theme.spacing(),
    margin: 0,
    marginTop: '2rem'
  },
  title: {
    color: 'white',
    pointerEvents: 'all',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
      width: '60%'
    }
  },
  titleFontSmall: {
    pointerEvents: 'all',
    fontSize: '3.125em'
  },
  titleWordBreak: {
    pointerEvents: 'all',
    width: 'min-content'
  },
  detail: {
    pointerEvents: 'all',
    color: 'white',
    fontFamily: 'Lora',
    fontSize: '1.875em',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.056em'
  },
  detailFontSmall: {
    fontSize: '1.25em'
  },
  detailLabel: {
    pointerEvents: 'all',
    color: '#8d8d8c',
    fontSize: '0.688em',
    fontWeight: 500,
    lineHeight: 2.09
  },
  body2: {
    pointerEvents: 'all',
    color: 'white',
    textAlign: 'left',
    width: '80%',
    paddingTop: '2rem',
    opacity: '0.5',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  detailComponent: {
    pointerEvents: 'all',
    width: '100%',
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  buttonRoot: {}
});

function HeroTitleGridComponent({ classes, children, quater, head2head }) {
  return (
    <Grid
      container
      item
      xs={12}
      sm={12}
      md={quater ? 4 : 8}
      lg={quater ? 4 : 8}
      alignContent="center"
      className={classNames(classes.titleTextGrid, {
        [classes.h2hTitleGrid]: head2head
      })}
    >
      {children}
    </Grid>
  );
}

HeroTitleGridComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  quater: PropTypes.bool,
  head2head: PropTypes.bool
};

HeroTitleGridComponent.defaultProps = {
  quater: false,
  head2head: false
};

const HeroTitleGrid = withStyles(styles)(HeroTitleGridComponent);

function HeroTitleComponent({ classes, children, breakWord, small }) {
  return (
    <Typography
      variant="h1"
      className={classNames(
        classes.title,
        { [classes.titleWordBreak]: breakWord },
        { [classes.titleFontSmall]: small }
      )}
    >
      {children}
    </Typography>
  );
}

HeroTitleComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.string.isRequired,
  breakWord: PropTypes.bool,
  small: PropTypes.bool
};

HeroTitleComponent.defaultProps = {
  breakWord: false,
  small: false
};

const HeroTitle = withStyles(styles)(HeroTitleComponent);

function HeroDescriptionComponent({ classes, children }) {
  return (
    <Typography variant="body1" className={classes.body2}>
      {children}
    </Typography>
  );
}

HeroDescriptionComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const HeroDescription = withStyles(styles)(HeroDescriptionComponent);

function HeroDetailComponent({ classes, children, label, small }) {
  return (
    <Grid className={classes.detailComponent}>
      <Typography
        variant="h2"
        className={classNames(classes.detail, {
          [classes.detailFontSmall]: small
        })}
      >
        {children}
      </Typography>
      {label && (
        <Typography variant="h3" className={classes.detailLabel}>
          {label}
        </Typography>
      )}
    </Grid>
  );
}

HeroDetailComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired
};

const HeroDetail = withStyles(styles)(HeroDetailComponent);

function HeroButtonComponent({ classes, children, onClick }) {
  return (
    <ArrowButton
      secondary
      classes={{ root: classes.buttonRoot }}
      onClick={onClick}
    >
      {children}
    </ArrowButton>
  );
}

HeroButtonComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func.isRequired
};

const HeroButton = withStyles(styles)(HeroButtonComponent);

function HeroComponent({ classes, children, ...props }) {
  return (
    <Grid container className={classes.root} {...props}>
      {children}
    </Grid>
  );
}

HeroComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const Hero = withStyles(styles)(HeroComponent);

export default Hero;

export { HeroTitle, HeroDescription, HeroButton, HeroTitleGrid, HeroDetail };

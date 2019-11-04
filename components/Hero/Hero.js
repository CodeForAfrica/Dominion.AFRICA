import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import ContentLoader from '@codeforafrica/hurumap-ui/core/ContentLoader';

import ArrowButton from '../ArrowButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    pointerEvents: 'all',
    height: 'auto',
    overflow: 'hidden'
  },
  titleTextGrid: {
    pointerEvents: 'all',
    zIndex: '100',
    color: 'white',
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
    marginTop: '2rem !important'
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
    fontSize: theme.typography.h2.fontSize
  },
  titleWordBreak: {
    pointerEvents: 'all',
    width: 'min-content'
  },
  detail: {
    pointerEvents: 'all',
    color: 'white',
    fontFamily: 'Lora',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.056em'
  },
  detailFontSmall: {
    fontSize: theme.typography.h5.fontSize
  },
  detailLabel: {
    pointerEvents: 'all',
    color: '#8d8d8c',
    fontWeight: 500,
    lineHeight: 2.09
  },
  body2: {
    pointerEvents: 'all',
    color: 'white',
    textAlign: 'left',
    width: '100%',
    paddingTop: '2rem',
    opacity: '0.8',
    fontSize: '0.786rem',
    lineHeight: 2.09,
    [theme.breakpoints.up('md')]: {
      width: '80%'
    }
  },
  detailComponent: {
    pointerEvents: 'all',
    width: '100%',
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  heroButton: {},
  heroButtonArrow: {}
}));

function HeroTitleGrid({ children, quarter, head2head, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid
      container
      item
      xs={12}
      md={quarter ? 4 : 8}
      wrap="nowrap"
      direction="column"
      alignContent="center"
      className={classNames(classes.titleTextGrid, {
        [classes.h2hTitleGrid]: head2head
      })}
    >
      {children}
    </Grid>
  );
}

HeroTitleGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  quarter: PropTypes.bool,
  head2head: PropTypes.bool
};

HeroTitleGrid.defaultProps = {
  quarter: false,
  head2head: false
};

function HeroTitle({
  loaderWidth,
  loading,
  children,
  breakWord,
  small,
  ...props
}) {
  const classes = useStyles(props);

  if (loading) {
    return (
      <ContentLoader style={{ width: loaderWidth, height: 100 }}>
        <rect x="0" y="0" rx="2px" ry="2px" width="100%" height="45%" />
        <rect x="0" y="50%" rx="2px" ry="2px" width="50%" height="45%" />
      </ContentLoader>
    );
  }
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

HeroTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  breakWord: PropTypes.bool,
  small: PropTypes.bool,
  loading: PropTypes.bool,
  loaderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

HeroTitle.defaultProps = {
  children: undefined,
  breakWord: false,
  small: false,
  loading: false,
  loaderWidth: '100%'
};

function HeroDescription({ children, ...props }) {
  const classes = useStyles(props);

  return (
    <Typography variant="body1" className={classes.body2}>
      {children}
    </Typography>
  );
}

HeroDescription.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

function HeroDetail({
  hidden,
  loading,
  children,
  label,
  small,
  loader,
  ...props
}) {
  const classes = useStyles(props);
  if (hidden) {
    return null;
  }

  if (loading) {
    return (
      <ContentLoader
        className={classes.detailComponent}
        style={{ height: small ? 61 : 74 }}
      >
        <rect
          x="0"
          y="0"
          rx="2px"
          ry="2px"
          width={loader.detailWidth}
          height="50%"
        />
        <rect
          x="0"
          y="60%"
          rx="2px"
          ry="2px"
          width={loader.detailLabelWidth}
          height="30%"
        />
      </ContentLoader>
    );
  }
  return (
    <Grid className={classes.detailComponent}>
      <Typography
        variant="h4"
        className={classNames(classes.detail, {
          [classes.detailFontSmall]: small
        })}
      >
        {children}
      </Typography>
      {label && (
        <Typography variant="subtitle1" className={classes.detailLabel}>
          {label}
        </Typography>
      )}
    </Grid>
  );
}

HeroDetail.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string.isRequired,
  small: PropTypes.bool,
  loading: PropTypes.bool,
  hidden: PropTypes.bool,
  loader: PropTypes.shape({
    detailWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    detailLabelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

HeroDetail.defaultProps = {
  small: false,
  children: undefined,
  loading: false,
  hidden: false,
  loader: {
    detailWdith: 100,
    detailLabelWidth: 50
  }
};

function HeroButton({ children, onClick, ...props }) {
  const classes = useStyles(props);

  return (
    <ArrowButton
      secondary
      onClick={onClick}
      {...props}
      classes={{ root: classes.heroButton, arrow: classes.heroButtonArrow }}
    >
      {children}
    </ArrowButton>
  );
}

HeroButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func.isRequired
};

function Hero({ children, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root} {...props}>
      {children}
    </Grid>
  );
}

Hero.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { HeroTitle, HeroDescription, HeroButton, HeroTitleGrid, HeroDetail };
export default Hero;

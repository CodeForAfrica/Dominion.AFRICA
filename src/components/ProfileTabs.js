import React from 'react';
import PropTypes from 'prop-types';

import { AppBar, Tabs, Tab } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import ContentLoader from './ContentLoader';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    scrollBehavior: 'smooth',
    paddingLeft: '1.875rem',
    paddingRight: '1.875rem',
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      padding: 0
    },
    [theme.breakpoints.up('lg')]: {
      padding: 0
    }
  },
  content: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      maxWidth: '66.5875rem'
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto',
      maxWidth: '81.3571429rem'
    }
  },
  appbar: {
    boxShadow: 'none'
  },
  loader: {
    width: '100%',
    height: '6.25rem' // 100px / 16
  },
  indicator: {
    height: '.25rem', // 4px / 16
    backgroundColor: '#7f9442'
  },
  tab: {
    height: '6.25rem', // 100px / 16
    fontFamily: theme.typography.subtitle2.fontFamily,
    fontSize: theme.typography.subtitle2.fontSize,
    textTransform: 'none',
    [theme.breakpoints.up('md')]: {
      minWidth: 0
    }
  },
  tabSelected: {
    fontWeight: 700
  },
  labelContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
});

function LinkTab(props) {
  return <Tab component="a" {...props} />;
}

class ProfileTabs extends React.Component {
  constructor(props) {
    super(props);

    const { tabs } = props;
    let value;
    if (tabs.length) {
      const [{ href }] = tabs;
      value = href;
    }
    this.state = { value };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    const { switchToTab } = this.props;
    this.setState({ value });
    if (switchToTab) {
      switchToTab(value);
    }
  }

  render() {
    const { classes, tabs, width, loading } = this.props;
    const { value } = this.state;

    const centered = isWidthUp('md', width); // centered is only for md and up
    const variant = centered ? 'standard' : 'scrollable';

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {loading ? (
            <ContentLoader
              className={classes.loader}
              primaryOpacity={0.5}
              secondaryOpacity={1}
              width={1200}
            >
              <rect x="0" y="45%" width="55px" height="21px" />
              <rect x="84px" y="45%" width="55px" height="21px" />
              <rect x="168px" y="45%" width="55px" height="21px" />
              <rect x="252px" y="45%" width="95px" height="21px" />
              <rect x="371px" y="45%" width="95px" height="21px" />
              <rect x="490px" y="45%" width="110px" height="21px" />
              <rect x="624px" y="45%" width="95px" height="21px" />
              <rect x="753px" y="45%" width="221px" height="21px" />
              <rect x="998px" y="45%" width="55px" height="21px" />
            </ContentLoader>
          ) : (
            <AppBar
              color="inherit"
              position="static"
              className={classes.appbar}
            >
              <Tabs
                value={value}
                variant={variant}
                scrollButtons="off" // Never show scroll buttons
                classes={{ indicator: classes.indicator }}
                onChange={this.handleChange}
              >
                {tabs.map(tab => (
                  <LinkTab
                    key={tab.href}
                    value={tab.href}
                    href="#dominionProfileTabs" // Always show the tabs on click
                    label={tab.name}
                    className={classes.tab}
                    classes={{
                      selected: classes.tabSelected,
                      labelContainer: classes.labelContainer
                    }}
                  />
                ))}
              </Tabs>
            </AppBar>
          )}
        </div>
      </div>
    );
  }
}

ProfileTabs.propTypes = {
  classes: PropTypes.shape().isRequired,
  switchToTab: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ).isRequired,
  width: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

ProfileTabs.defaultProps = {
  loading: false
};

export default withWidth()(withStyles(styles)(ProfileTabs));

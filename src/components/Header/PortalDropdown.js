import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, MenuItem, MenuList } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import AppContext from '@/dominion/AppContext';
import Link from 'components/Link';

const styles = theme => ({
  root: {
    width: '100%',
    paddingTop: '3.25rem',
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(20),
      marginRight: theme.spacing(10),
      paddingTop: 0
    }
  },
  button: {
    border: 0,
    textTransform: 'none',
    padding: 0,
    minWidth: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  p: {
    color: '#fff',
    textDecoration: 'none',
    fontFamily: theme.typography.fontFamily,
    fontWeight: '600',
    letterSpacing: '0.195rem',
    fontSize: '0.7143rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'left',
      lineHeight: '7em'
    }
  },
  KeyboardArrowDown: {
    paddingLeft: '0.625rem',
    cursor: 'pointer'
  },
  menuList: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: '2rem',
      paddingBottom: '3rem'
    }
  },
  menuListItem: {
    padding: 0,
    minHeight: '2rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontFamily: theme.typography.fontHeading,
    fontSize: '1.7143rem',
    fontWeight: 400,
    lineHeight: '1.17px',
    '&:hover': {
      color: '#e7e452',
      textDecoration: 'none'
    }
  },
  selected: {
    '&>*': {
      color: '#e7e452',
      textDecoration: 'none'
    }
  }
});

function CountriesButtonComponent({ classes, onClick, isOpen }) {
  return (
    <Button disableRipple className={classes.button} onClick={onClick}>
      <span className={classes.p}>Countries</span>
      {isOpen ? (
        <KeyboardArrowUp
          fontSize="large"
          className={classes.KeyboardArrowDown}
        />
      ) : (
        <KeyboardArrowDown
          fontSize="large"
          className={classes.KeyboardArrowDown}
        />
      )}
    </Button>
  );
}

CountriesButtonComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export const CountriesButton = withStyles(styles)(CountriesButtonComponent);

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isDropdownOpen: false };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState(prevState => ({ isDropdownOpen: !prevState.isDropdownOpen }));
  }

  render() {
    const { classes, countries } = this.props;
    const { isDropdownOpen } = this.state;
    const {
      state: { selectedCountry }
    } = this.context;

    return (
      <Grid container className={classes.root}>
        <CountriesButton
          onClick={this.toggleDropdown}
          isOpen={isDropdownOpen}
        />
        {isDropdownOpen ? (
          <MenuList className={classes.menuList}>
            {Object.keys(countries).map(countrySlug => (
              <MenuItem
                key={countrySlug}
                item
                className={classes.menuListItem}
                classes={{ selected: classes.selected }}
                selected={selectedCountry.slug === countrySlug}
              >
                <Link
                  href="/[countrySlug]"
                  as={`/${countrySlug}`}
                  className={classes.link}
                >
                  {countries[countrySlug].name}
                </Link>
              </MenuItem>
            ))}
          </MenuList>
        ) : null}
      </Grid>
    );
  }
}

Dropdown.contextType = AppContext;

Dropdown.propTypes = {
  classes: PropTypes.isRequired,
  countries: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Dropdown);

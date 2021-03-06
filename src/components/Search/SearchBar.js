import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Grid,
  IconButton,
  InputBase
} from '@material-ui/core';

import back from 'assets/images/icons/back.svg';
import search from 'assets/images/icons/location.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      borderBottom: '2px solid white'
    }
  },
  searchField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    color: 'white',
    width: '100%',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: 'bold',
    [theme.breakpoints.up('md')]: {
      padding: '1rem 0 0.5rem 1rem',
      borderBottom: '2px solid white'
    }
  },
  searchFieldInput: {
    '&::placeholder': {
      fontFamily: theme.typography.fontFamily,
      color: 'white',
      opacity: 1
    }
  },
  rootBorderBottom: {
    borderBottom: '2px solid white !important'
  },
  searchFieldNoBorderBottom: {
    borderBottom: 'none !important'
  },
  searchFieldNoMargin: {
    marginLeft: 0,
    marginRight: 0
  },
  iconButton: {
    padding: 0
  },
  iconButtonDropdown: {
    marginLeft: -theme.spacing(4)
  },
  resultsContainer: {
    [theme.breakpoints.up('sm')]: {
      padding: '47px'
    }
  }
}));

function SearchBar({
  primary,
  placeholder,
  value,
  width,
  icon,
  handleIconClick,
  handleValueChange,
  isComparisonSearch,
  autoFocus,
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isMdAndUp = useMediaQuery(theme.breakpoints.up('md'));
  let searchBarIcon = icon;
  if (!searchBarIcon) {
    searchBarIcon = isMdAndUp ? back : search;
  }

  return (
    <Grid
      container
      wrap="nowrap"
      className={classNames(classes.root, {
        [classes.rootBorderBottom]: primary
      })}
    >
      <InputBase
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder}
        classes={{ input: classes.searchFieldInput }}
        className={classNames(
          classes.searchField,
          { [classes.searchFieldNoBorderBottom]: primary },
          { [classes.searchFieldNoMargin]: isComparisonSearch }
        )}
        onChange={event => {
          const { value: searchTerm } = event.target;
          if (handleValueChange) {
            handleValueChange(searchTerm);
          }
        }}
      />
      <IconButton
        disableRipple
        disableTouchRipple
        focusRipple={false}
        style={{ backgroundColor: 'transparent' }}
        className={classNames(classes.iconButton, {
          [classes.iconButtonDropdown]: isComparisonSearch
        })}
        aria-label="Search"
        onClick={handleIconClick}
      >
        <img alt="Search" src={searchBarIcon} className={classes.searchIcon} />
      </IconButton>
    </Grid>
  );
}

SearchBar.propTypes = {
  handleValueChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  handleIconClick: PropTypes.func,
  width: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  isComparisonSearch: PropTypes.bool
};

SearchBar.defaultProps = {
  autoFocus: false,
  handleIconClick: null,
  placeholder: '',
  isComparisonSearch: false,
  primary: true,
  icon: null
};

export default SearchBar;

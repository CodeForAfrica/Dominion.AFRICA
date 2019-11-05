import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Grid,
  IconButton,
  Link as MuiLink,
  MenuItem,
  MenuList
} from '@material-ui/core';

import backIcon from 'assets/images/icons/back.svg';
import logo from 'assets/images/logos/dominion-logo.png';
import logoWithCountrySpace from 'assets/images/logos/dominion-logo-country.png';
import menuIcon from 'assets/images/icons/menu.svg';
import searchIcon from 'assets/images/icons/location.svg';
import useToggleModal from 'components/Modal/useToggleModal';
import ContactUs from 'components/Modal/ContactUs';
import Link from 'components/Link';
import Modal from 'components/Modal';
import PortalChooser from 'components/Modal/PortalChooser';
import Search from 'components/Search';

import Dropdown, { CountriesButton } from './PortalDropdown';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  wrapper: {
    padding: '1.875rem',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      padding: '1.875rem 0',
      maxWidth: '81.3571429rem',
      margin: '0 auto'
    }
  },
  topMenuNav: {
    flexWrap: 'nowrap',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      position: 'absolute',
      top: '6.25rem',
      left: 0,
      display: 'none'
    }
  },
  topMenuIcon: {
    color: 'white',
    display: 'inline-block',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  topMenuIconImg: {
    marginRight: '-0.625rem'
  },
  menuList: {
    width: '100%',
    display: 'flex',
    letterSpacing: '0.175rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: '0.625rem'
    }
  },
  menuListItem: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  img: {
    height: '2.572rem',
    marginTop: '0.3rem',
    maxWidth: 'unset'
  },
  logoLink: {
    position: 'relative',
    marginRight: '5.6rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontFamily: theme.typography.fontFamily,
    fontWeight: '600',
    fontSize: '0.7143rem',
    '&:hover': {
      color: '#e7e452',
      textDecoration: 'none'
    }
  },
  logoCountryName: {
    position: 'absolute',
    color: 'white',
    top: '1.75rem',
    left: '2.9rem',
    margin: 0,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    fontSize: 'x-small',
    textTransform: 'uppercase'
  }
}));

function Navigation({ dominion, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const { countries, selectedCountry } = dominion;
  const { open: openPortal, toggleModal: togglePortal } = useToggleModal(
    'portal'
  );
  const { open: openSearch, toggleModal: toggleSearch } = useToggleModal(
    'search'
  );
  const { open: openMenu, toggleModal: toggleMenu } = useToggleModal('menu');
  const { open: openContact, toggleModal: toggleContact } = useToggleModal(
    'contact'
  );

  const renderMenuList = () => (
    <MenuList className={classes.menuList}>
      {[
        { title: 'About', link: '/about' },
        { title: 'Showcase', link: '/#showcase' },
        { title: 'Resources', link: '/resources' },
        { title: 'Contact', onClick: toggleContact }
      ].map(menu => (
        <MenuItem key={menu.title} className={classes.menuListItem}>
          {menu.link ? (
            <Link variant="body1" className={classes.link} href={menu.link}>
              {menu.title}
            </Link>
          ) : (
            <MuiLink
              variant="body1"
              className={classes.link}
              onClick={menu.onClick}
            >
              {menu.title}
            </MuiLink>
          )}
        </MenuItem>
      ))}
    </MenuList>
  );

  const renderBrand = () => (
    <Link
      component="a"
      href={selectedCountry ? `/${selectedCountry.slug}` : '/'}
      style={{ position: 'relative', marginRight: '50px' }}
    >
      <img
        alt="Dominion Logo"
        src={selectedCountry ? logoWithCountrySpace : logo}
        className={classes.img}
      />
      {selectedCountry ? (
        <p className={classes.logoCountryName}>{selectedCountry.name}</p>
      ) : null}
    </Link>
  );

  const renderMobileMenu = () => {
    const Topbar = () => (
      <Grid
        container
        direction="row"
        wrap="nowrap"
        justify="space-between"
        alignItems="center"
        className={classes.root}
      >
        {renderBrand()}
        <IconButton
          disableRipple
          aria-label="Menu"
          onClick={openContact ? toggleContact : toggleMenu}
        >
          <img alt="Menu" src={openMenu || openContact ? backIcon : menuIcon} />
        </IconButton>
      </Grid>
    );

    return (
      <>
        <Topbar />

        <Modal isOpen={openMenu} onEscapeKeyDown={toggleMenu}>
          <Grid container className={classes.wrapper}>
            <Topbar />
            <Search dominion={dominion} placeholder="Search">
              <Dropdown countries={countries} />
              {renderMenuList()}
            </Search>
          </Grid>
        </Modal>
      </>
    );
  };

  const renderDesktopMenu = () => (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      {renderBrand()}
      <Grid
        container
        direction="row-reverse"
        justify="flex-start"
        wrap="nowrap"
        alignItems="center"
        className={classes.topMenuNav}
      >
        <IconButton
          disableRipple
          aria-label="Search"
          onClick={toggleSearch}
          style={{
            marginLeft: 60
          }}
        >
          <img alt="Search" src={searchIcon} />
        </IconButton>
        <CountriesButton
          countries={countries}
          onClick={togglePortal}
          isOpen={openPortal}
        />
        {renderMenuList()}
      </Grid>
    </Grid>
  );

  const nav = useMediaQuery(theme.breakpoints.up('md'))
    ? renderDesktopMenu()
    : renderMobileMenu();

  return (
    <>
      <Grid container className={classes.wrapper}>
        {nav}
      </Grid>
      <Modal isOpen={openSearch} onEscapeKeyDown={toggleSearch}>
        <Grid container className={classes.wrapper}>
          {nav}
          <Search handleIconClick={toggleSearch} dominion={dominion} />
        </Grid>
      </Modal>
      <Modal isOpen={openPortal} onEscapeKeyDown={togglePortal}>
        <Grid container className={classes.wrapper}>
          {nav}
          <PortalChooser handleClose={togglePortal} countries={countries} />
        </Grid>
      </Modal>
      <Modal isOpen={openContact} onEscapeKeyDown={toggleContact}>
        <Grid container className={classes.wrapper}>
          {nav}
          <ContactUs handleClose={toggleContact} />
        </Grid>
      </Modal>
    </>
  );
}

Navigation.propTypes = {
  dominion: PropTypes.shape({}).isRequired
};

export default Navigation;

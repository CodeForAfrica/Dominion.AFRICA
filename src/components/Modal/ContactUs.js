import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import {
  Grid,
  Typography,
  MenuList,
  MenuItem,
  ButtonBase
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import cross from '../../assets/images/icons/close.svg';

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: 'white',
    height: '31.25rem',
    [theme.breakpoints.up('md')]: {
      marginRight: '6.5625rem', // align with countries dropdown button
      alignItems: 'flex-end'
    }
  },
  closeButton: {
    display: 'none',
    marginBottom: '6.25rem',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  title: {
    fontSize: '2.5rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '4.375rem'
    }
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    '&:hover': {
      '& > *': {
        color: '#e7e452'
      }
    }
  },
  listIndex: {
    color: 'white',
    marginRight: '1.875rem',
    width: 'fit-content',
    fontSize: '0.6875rem',
    opacity: 0.5,
    lineHeight: 4.55,
    fontWeight: 500,
    textAlign: 'right',
    [theme.breakpoints.up('md')]: {
      marginRight: '3.75rem',
      width: '3.3125rem'
    }
  },
  listItemLink: {
    color: 'white',
    fontFamily: '"Lora"',
    textDecoration: 'none',
    visibility: 'visible',
    fontSize: '1.25rem',
    lineHeight: 1.25,
    span: {
      display: 'block'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.5rem'
    }
  }
});

function ContactUs({ classes, handleClose }) {
  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      wrap="wrap"
      justify="center"
    >
      <ButtonBase onClick={handleClose} className={classes.closeButton}>
        <img alt="Close" src={cross} />
      </ButtonBase>
      <Grid container direction="row">
        <Grid item xs={12} md={6}>
          <Typography className={classes.title}>Contact us</Typography>
          <Typography style={{ opacity: 0.5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <MenuList>
            {[
              { name: 'CodeForAfrica', href: 'mailto:hello@dominion.africa' },
              { name: 'Twitter', href: 'https://twitter.com/Code4Africa' },
              {
                name: 'Facebook',
                href: 'https://web.facebook.com/CodeForAfrica'
              }
            ].map((contact, index) => (
              <MenuItem button key={contact} className={classes.listItem}>
                <span className={classes.listIndex}>
                  <NumberFormat
                    value={index + 1}
                    displayType="text"
                    prefix="0"
                  />
                </span>
                <a className={classes.listItemLink} href={`${contact.href}`}>
                  {contact.name}
                </a>
              </MenuItem>
            ))}
          </MenuList>
        </Grid>
      </Grid>
    </Grid>
  );
}

ContactUs.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(ContactUs);

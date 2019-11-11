import React from 'react';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import A from '@codeforafrica/hurumap-ui/core/A';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: '3.125em',
    [theme.breakpoints.up('md')]: {
      padding: '3.125em 0'
    }
  },
  wrapper: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem'
    }
  },
  description: {
    order: 2,
    [theme.breakpoints.up('md')]: {
      order: 1
    }
  },
  releaseSelector: {
    order: 1,
    [theme.breakpoints.up('md')]: {
      order: 2
    }
  },
  descriptionTitle: {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.43,
    letterSpacing: 'normal',
    color: '#2c2c2a',
    padding: '8px 0'
  },
  descriptionText: {
    fontFamily: 'Montserrat',
    fontSize: '11px',
    fontStyle: 'normal',
    fontWeight: 500,
    fontStretch: 'normal',
    lineHeight: 2.22,
    letterSpacing: 'normal',
    color: '#2c2c2a',
    opacity: 0.5
  },
  link: {
    opacity: 0.5,
    color: '#2c2c2a !important'
  },
  changeReleaseButton: {
    fontFamily: 'Montserrat',
    fontSize: '0.688em',
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 2.09,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#abca4f',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    width: '9.375rem',
    paddingLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: '50px'
    }
  },
  releasesMenuItem: {
    width: '9.375rem',
    maxWidth: '9.375rem'
  }
}));

function ProfileRelease(props) {
  const classes = useStyles(props);

  const citationLink = link => (
    <A className={classes.link} href={link}>
      {link}
    </A>
  );

  return (
    <div className={classes.root}>
      <Grid container className={classes.wrapper}>
        <Grid item className={classes.description}>
          <Typography className={classes.descriptionTitle}>
            Citations
          </Typography>
          <Typography className={classes.descriptionText}>
            Workers&apos; Hostel Data, General Household Survey Hostel 2018{' '}
            {citationLink(
              'http://www.statssa.gov.za/publications/P0318/P03182018.pdf'
            )}
            <br />
            Agricultural Land Sales in South Africa by landbou.com{' '}
            {citationLink('http://land.agrids.co.za/')}
            <br />
            Land Audit Report from Department of Rural Development & Land Reform
            in South Africa{' '}
            {citationLink(
              'http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126'
            )}
            <br />
            Census 2009: Electoral Commission of South Africa (IEC), Municipal
            election results{' '}
            {citationLink(
              'https://wazimap.co.za/profiles/province-EC-eastern-cape'
            )}
            <br />
            Community Survey 2016: Statistics South Africa (2016) South African
            Community Survey 2016. Indicators derived from the full population
            Community Survey.{' '}
            {citationLink(
              'https://wazimap.co.za/profiles/province-EC-eastern-cape'
            )}
            <br />
            Census 2011: Statistics South Africa (2011) South African Population
            Census 2011. Indicators derived from the full population Census{' '}
            {citationLink(
              'https://wazimap.co.za/profiles/province-EC-eastern-cape'
            )}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileRelease;

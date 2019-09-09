import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DocumentsContent from './DocumentsContents';
import DatasetsContent from './DatasetsContent';

import databg from '../../assets/images/bg/databg.png';
import background from '../../assets/images/kaitlyn-baker-422999-unsplash.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    backgroundImage: `url(${databg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
    backgroundSize: '80% 70%',
    marginBottom: '4.57rem',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0, // 30px / 16
      backgroundSize: '65% 100%',
      marginBottom: '9.143rem'
    }
  },
  wrapper: {
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '66.59rem' // .75 of lg
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '81.3571429rem'
    }
  },
  dataWrapper: {
    paddingTop: '4.2rem',
    height: '35.713rem', // 500px / 16
    paddingLeft: '2.143rem',
    paddingRight: '2.143rem',
    [theme.breakpoints.up('md')]: {
      width: '35.7143rem',
      marginLeft: '-9.07143rem',
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  highlight: {
    marginLeft: 0,
    height: '2.858rem',
    background: '#e7e452',
    [theme.breakpoints.up('md')]: {
      width: '24.286rem' // 340px / 16
    }
  },
  img: {
    width: '100%',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.up('md')]: {
      width: '30.7143rem',
      height: '28.5714rem' // 400px / 16
    }
  },
  imageHighlight: {
    width: '60%',
    display: 'flex',
    alignItems: 'flex-end'
  },
  documentData: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '3.5625rem',
      paddingLeft: '5rem'
    }
  },
  datasetData: {
    paddingLeft: '2.143rem',
    paddingRight: '2.143rem',
    marginTop: '-9.143rem',
    [theme.breakpoints.up('md')]: {
      paddingTop: '8.02rem',
      paddingLeft: '11.423rem',
      paddingRight: 0,
      marginTop: 0
    }
  }
});

function Data({ classes }) {
  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.wrapper}>
        <Grid
          container
          direction="row"
          item
          md={9}
          lg={9}
          xl={9}
          className={classes.dataWrapper}
        >
          <Hidden smDown>
            <Grid
              item
              container
              md={8}
              lg={8}
              xl={8}
              direction="column"
              className={classes.imageHighlight}
            >
              <div className={classes.highlight} />
              <div className={classes.img} />
            </Grid>
          </Hidden>
          <Grid item md={4} lg={4} xl={4} className={classes.documentData}>
            <DocumentsContent />
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={3}
          lg={3}
          xl={3}
          className={classes.datasetData}
        >
          <DatasetsContent />
        </Grid>
      </Grid>
    </div>
  );
}

Data.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Data);

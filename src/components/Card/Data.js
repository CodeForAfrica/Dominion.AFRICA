import React from 'react';

import { PropTypes } from 'prop-types';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import A from '../A';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '1.25rem 0'
  },
  preview: {
    width: 'available',
    backgroundColor: '#7b7f7b',
    height: '6.125rem',
    [theme.breakpoints.up('md')]: {
      width: '7rem'
    }
  },
  description: {
    marginTop: '0.625rem'
  },
  xsTitle: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  mdTitle: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
});

function Data({ classes, orgLink, dataLink, title, description, preview }) {
  return (
    <Card className={classes.root}>
      <CardContent>
        <A href={orgLink}>{orgLink}</A>
        <CardActionArea target="_blank" href={dataLink}>
          <Typography className={classes.xsTitle} variant="h4">
            {title}
          </Typography>
          <Grid container direction="row">
            {preview && (
              <Grid item xs={12} md={2}>
                <div className={classes.preview}>{preview}</div>
              </Grid>
            )}
            <Grid item xs={12} md={10}>
              <Typography className={classes.mdTitle} variant="h4">
                {title}
              </Typography>
              <Typography className={classes.description}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}

Data.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  orgLink: PropTypes.string.isRequired,
  dataLink: PropTypes.string.isRequired,
  preview: PropTypes.element
};

Data.defaultProps = {
  preview: null
};

export default withStyles(styles)(Data);

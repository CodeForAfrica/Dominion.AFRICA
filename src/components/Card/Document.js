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

const styles = {
  root: {},
  preview: {
    width: 'available',
    backgroundColor: '#7b7f7b',
    height: '8.0625rem'
  },
  content: {
    padding: '0.625rem 0'
  },
  description: {
    marginTop: '0.625rem'
  }
};

function Document({ classes, title, description, preview }) {
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.content}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4}>
              <div className={classes.preview}>{preview}</div>
            </Grid>

            <Grid item xs={8} container direction="column" justify="center">
              <Typography variant="h4">{title}</Typography>
              <Typography className={classes.description}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Document.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  preview: PropTypes.element
};

Document.defaultProps = {
  preview: null
};

export default withStyles(styles)(Document);
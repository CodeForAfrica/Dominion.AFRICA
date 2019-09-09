import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ContentLoader } from '@codeforafrica/hurumap-ui';

const styles = () => ({
  root: {
    height: '5rem',
    marginTop: '4rem',
    marginBottom: '0.5rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    textTransform: 'capitalize',
    fontFamily: 'Lora, serif'
  }
});

function ProfileSectionTitle({
  classes,
  loading,
  tab: { title, description }
}) {
  return (
    <Grid item className={classes.root}>
      {loading ? (
        <ContentLoader primaryOpacity={1} secondaryOpacity={0.5} height="5rem">
          <circle cx="2.5rem" cy="2.5rem" r="2.5rem" />
          <rect
            x="5.5rem"
            y="1.25rem"
            rx="0.125rem"
            ry="0.125rem"
            height="2.5rem"
            width="20rem"
          />
        </ContentLoader>
      ) : (
        <>
          <Typography variant="h3" className={classes.title}>
            {title}
          </Typography>
          <></>
          <Typography variant="p">{description}</Typography>
        </>
      )}
    </Grid>
  );
}

ProfileSectionTitle.propTypes = {
  classes: PropTypes.shape().isRequired,
  tab: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  loading: PropTypes.bool
};

ProfileSectionTitle.defaultProps = {
  loading: false
};

export default withStyles(styles)(ProfileSectionTitle);

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    paddingBottom: '1rem',
    color: '#293229'
  }
}));

function PartnerText({ title, description, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </div>
  );
}

PartnerText.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default PartnerText;

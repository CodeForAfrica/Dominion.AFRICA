import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import plugicon from '../../assets/images/icons/group-6.png';

import Content from './Content';
import { getOpenAfricaDominionGroupData } from '../../lib/api';

const styles = theme => ({
  root: {
    marginTop: '3rem',
    [theme.breakpoints.up('md')]: {
      marginTop: 0
    }
  }
});

function DataSetsContent({ classes }) {
  const [datasetsCount, setDatasetsCount] = useState('-');

  useEffect(() => {
    getOpenAfricaDominionGroupData().then(({ data: { result } }) => {
      setDatasetsCount(result.length);
    });
  }, []);
  return (
    <div className={classes.root}>
      <Content
        title="openAFRICA"
        contentCount={datasetsCount}
        contentType="Datasets"
        description="
            openAFRICA aims to be the largest independent repository of open
            data on the African continent.
      "
        target="_self"
        link="/resources#data"
      >
        <img src={plugicon} alt="Plug Icon" />
      </Content>
    </div>
  );
}

DataSetsContent.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(DataSetsContent);

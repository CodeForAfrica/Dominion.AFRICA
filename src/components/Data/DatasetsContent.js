import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';

import { getOpenAfricaDominionCount } from 'lib/api';
import plugIcon from 'assets/images/icons/group-6.png';

import Content from './Content';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '3rem',
    [theme.breakpoints.up('md')]: {
      marginTop: 0
    }
  }
}));

function DataSetsContent(props) {
  const classes = useStyles(props);
  const [datasetsCount, setDatasetsCount] = useState('-');

  useEffect(() => {
    getOpenAfricaDominionCount().then(
      ({
        data: {
          result: { package_count: total }
        }
      }) => {
        setDatasetsCount(total);
      }
    );
  }, []);
  return (
    <div className={classes.root}>
      <Content
        title="openAFRICA"
        contentCount={`${datasetsCount}`}
        contentType="Datasets"
        description="
            openAFRICA aims to be the largest independent repository of open
            data on the African continent.
      "
        link="/resources#data"
      >
        <img src={plugIcon} alt="Plug Icon" />
      </Content>
    </div>
  );
}

export default DataSetsContent;

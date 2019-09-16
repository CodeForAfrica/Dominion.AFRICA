import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Page from '../components/Page';
import config from '../config';
import { TitlePageHeader } from '../components/Header';
import ErrorContent from '../components/ErrorContent';

import useToggleModal from '../useToggleModal';

const useStyles = makeStyles({
  link: {
    textDecoration: 'underline'
  }
});

function ServerError() {
  const classes = useStyles();
  const { toggleModal: toggleContact } = useToggleModal('contact');

  return (
    <Page>
      <TitlePageHeader dominion={config} profile={{}} />
      <ErrorContent
        title="500 - Internal Server Error"
        description={[
          'We are having some trouble processing your request.',
          'We have logged the error and will investigate. You can try again later or if the issues persisit, please ',
          <span
            role="link"
            tabIndex={0}
            onClick={toggleContact}
            className={classes.link}
            onKeyDown={toggleContact}
          >
            contact us.
          </span>
        ]}
      />
    </Page>
  );
}

export default ServerError;
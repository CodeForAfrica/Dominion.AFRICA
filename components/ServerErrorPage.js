import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import config from 'dominion.config';
import useToggleModal from 'components/Modal/useToggleModal';
import Page from 'components/Page';
import ErrorContent from 'components/ErrorContent';
import { TitlePageHeader } from 'components/Header';

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

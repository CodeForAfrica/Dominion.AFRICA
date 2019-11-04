import React, { useState, useEffect } from 'react';

import { getSourceAfricaDominionData } from '../../lib/api';
import Content from './Content';

import menuIcon from '../../assets/images/icons/group-7.png';

function DocumentsContent() {
  const [documentsCount, setDocumentsCount] = useState('-');
  useEffect(() => {
    getSourceAfricaDominionData().then(({ data: { documents } }) => {
      setDocumentsCount(documents.length);
    });
  }, []);

  return (
    <Content
      title="sourceAFRICA"
      contentCount={`${documentsCount}`}
      contentType="Documents"
      description="
            sourceAFRICA is Africa's premier repository for actionable
            documents.
      "
      link="/resources#documents"
    >
      <img src={menuIcon} alt="Menu Icon" />
    </Content>
  );
}

export default DocumentsContent;

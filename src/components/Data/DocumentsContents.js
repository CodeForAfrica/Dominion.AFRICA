import React, { useState, useEffect } from 'react';

import { getSourceAfricaDominionData } from 'lib/api';
import menuIcon from 'assets/images/icons/group-7.png';

import Content from './Content';

function DocumentsContent() {
  const [documentsCount, setDocumentsCount] = useState('-');
  useEffect(() => {
    getSourceAfricaDominionData().then(({ data: { total } }) => {
      setDocumentsCount(total);
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

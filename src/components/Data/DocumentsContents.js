import React, { useState, useEffect } from 'react';
import menuicon from '../../assets/images/icons/group-7.png';
import Content from './Content';
import { getSourceAfricaDominionData } from '../../lib/api';

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
      target="_self"
      link="/resources#documents"
    >
      <img src={menuicon} alt="Menu Icon" />
    </Content>
  );
}

export default DocumentsContent;

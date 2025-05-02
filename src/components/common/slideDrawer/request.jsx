import React from 'react';
import SlideDetailsSection from './DetailsSection';

const Request = ({ request }) => {
  const left = [
    { label: 'Request number', value: request.number },
    { label: 'Request owner',   value: request.owner },
  ];

  const right = [
    { label: 'Request date', value: request.date },
    { label: 'Type',         value: request.type },
  ];

  return (
    <SlideDetailsSection
      title="Request details"
      columns={[left, right]}
    />
  );
};

export default Request;

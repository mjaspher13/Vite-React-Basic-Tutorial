// Generated at PH Time: 2025-04-28 23:42
import React, { useEffect, useState } from 'react';
import { fetchRequests } from '@services/requestService';
import RequestCard from './RequestCard';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests()
      .then(data => setRequests(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="my-requests">
      {requests.map(req => (
        <RequestCard key={req.id} request={req} />
      ))}
    </div>
  );
};

export default MyRequests;

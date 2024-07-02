import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function PrivateRoute() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : null;
}

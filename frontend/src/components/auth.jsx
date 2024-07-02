// Auth.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Auth = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!currentUser && !token) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  return null;
};

export default Auth;

import React from 'react';
import {Redirect} from 'react-router';
import {getUsername} from './username.js';

function requireUsername() {
  if (getUsername() == null) {
    return <Redirect to='/'/>;
  }
  return null;
}

export default requireUsername;

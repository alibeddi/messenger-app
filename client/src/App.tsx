import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Chats, Login } from './pages';
import ProtectedLoginRoute from './components/ProtectedRoutes/ProtectedLoginRoute';
import ProtectedUserRoute from './components/ProtectedRoutes/ProtectedUserRoute';
import { DisplayChatImage } from './components';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { useAppContext } from './context/appContext';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedUserRoute>
            <Chats />
          </ProtectedUserRoute>
        }
      />
      <Route
        path='/login'
        element={
          <ProtectedLoginRoute>
            <Login />
          </ProtectedLoginRoute>
        }
      />
    </Routes>

  );
};

export default App;



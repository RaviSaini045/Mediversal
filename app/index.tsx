import React from 'react';
import { View } from 'react-native';
import Start from '../components/Start';
import Login from '../components/Login';
import Signup from '../components/Signup'
import Forgot from '../components/ForgotPassword';
import Home from '../components/Home';

export default function Index() {
  return (
    <View>
      {/* <Start /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <Forgot /> */}
      <Home />
    </View>
  );
}

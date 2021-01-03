import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MainStackNavigator from './MainStackNavigator';

export default function App() {

  return (
    <>
      <StatusBar backgroundColor='lightgrey' />
      <MainStackNavigator />
    </>

  );
}

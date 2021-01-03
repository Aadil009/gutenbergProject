import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import MainStackNavigator from './MainStackNavigator';

export default function App() {

  return (
    <>
      <StatusBar backgroundColor='lightgrey' />
      <MainStackNavigator />
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

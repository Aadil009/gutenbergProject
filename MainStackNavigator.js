import React , {Component} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator } from '@react-navigation/stack'
import Home from './components/Home'
import Details from './components/Details'


const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
              <Stack.Screen  name="Details" component= {Details} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default MainStackNavigator;
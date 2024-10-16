import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PuzzleGame from './screen/jerry'; 
import poo from './screen/poo'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PuzzleGame">
        <Stack.Screen 
          name="PuzzleGame" 
          component={PuzzleGame} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="poo" 
          component={poo} 
          options={{ headerShown: false }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

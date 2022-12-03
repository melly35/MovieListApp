import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavigationService from '../services/NavigationService';
import AppRoutes from '../utils/app-routes';

import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#181A32',
  },
};


const Navigation = ({}) => {
  const HomeStack = createNativeStackNavigator();

  return (
    <NavigationContainer
      theme={MyTheme}
      ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      <HomeStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={AppRoutes.Main.initialRoute}>
        <HomeStack.Screen
          name={AppRoutes.Main.childs.Home.name}
          component={Home}
          options={{headerTitle: AppRoutes.Main.childs.Home.headerTitle}}
        />
        <HomeStack.Screen
          name={AppRoutes.Main.childs.MovieDetail.name}
          component={MovieDetail}
          options={{headerTitle: AppRoutes.Main.childs.MovieDetail.headerTitle}}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;

import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import {useDispatch} from 'react-redux';

import VirtualizedListR from '../components/high-level/virtualized-list/index';
import MovieListItem from '../components/low-level/MovieListItem';

const Home = ({}) => {
  const renderItem = useCallback(({item, index}) => <MovieListItem item={item} />, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
        <VirtualizedListR
          controller="s"
          showSearchBar
          ListEmptyComponent
          renderItem={renderItem}
          testID={'VirtualizedListHome'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

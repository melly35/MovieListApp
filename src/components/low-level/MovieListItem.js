/* eslint-disable react/prop-types */
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppRoutes from '../../utils/app-routes';
import memoize from 'fast-memoize';
import FastImage from 'react-native-fast-image';
import {debounce} from 'lodash';

const MovieListItem = ({item}) => {
  const navigation = useNavigation();

  const goDetail = useCallback(
    debounce(id => {
      navigation.push(AppRoutes.Main.childs.MovieDetail.name, {
        id: id,
      });
    }, 300),
    [],
  );

  const openPageCall = useMemo(() => memoize(id => () => goDetail(id)), []);

  return (
    <TouchableOpacity
      key={item.imdbID}
      activeOpacity={0.7}
      style={[styles.itemContainer]}
      onPress={openPageCall(item.imdbID)}>
      <FastImage
        style={[styles.imageBox]}
        source={{
          uri: item?.Poster
            ? item?.Poster != 'N/A'
              ? item.Poster
              : 'https://via.placeholder.com/150/ccc/808080'
            : 'https://via.placeholder.com/150/ccc/808080',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={[styles.detailBox]}>
        <Text style={[styles.title]}>{item.Title}</Text>
        <Text style={[styles.subText]}>{item.Year}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomColor: '#fff',
    flexDirection: 'row',
  },

  detailBox: {
    flex: 2,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBox: {
    width: 80,
    height: 100,
  },

  title: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },

  subText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default React.memo(MovieListItem);

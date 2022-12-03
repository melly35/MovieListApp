import React, {useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import useParams from '../utils/hooks/use-params';
import Actions from '../redux/actions';
import FastImage from 'react-native-fast-image';
import Header from '../components/low-level/Header';

const MovieDetail = ({navigation}) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const isFocused = navigation.isFocused();
  const moviesCache = useSelector(x =>
    x.moviesReducer.moviesCache.filter(item => item.imdbID == id),
  );
  const isLoading = useSelector(x => x.moviesReducer.isLoading);

  //Select movie from cache
  useEffect(() => {
    if (isFocused) {
      if (moviesCache.length < 1) {
        //cache-not-found
        dispatch(Actions.movieAction.getMovieDetail({id: id}));
      }
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <Header navigation={navigation} />
      {!isLoading  ? (
        <ScrollView style={[styles.container]}>
          <FastImage
            style={[styles.imageContainer]}
            source={{
              uri: moviesCache?.[0]?.Poster
                ? moviesCache?.[0]?.Poster != 'N/A'
                  ? moviesCache?.[0]?.Poster
                  : 'https://via.placeholder.com/150/ccc/808080'
                : 'https://via.placeholder.com/150/ccc/808080',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <Text style={[styles.mainTitle]}>{moviesCache?.[0]?.Title}</Text>

          {moviesCache?.[0]?.Genre && (
            <View style={[styles.detailBoxRow, styles.centered]}>
              <Text style={[styles.rightText]}>{moviesCache?.[0]?.Genre}</Text>
            </View>
          )}

          <View
            style={[styles.detailBoxRow, {justifyContent: 'space-between'}]}>
            {moviesCache?.[0]?.imdbRating && (
              <View style={[styles.detailBoxRow]}>
                <Text style={[styles.leftTitle]}>{'Rating: '}</Text>
                <Text style={[styles.rightText]}>
                  {moviesCache?.[0]?.imdbRating}
                </Text>
              </View>
            )}

            {moviesCache?.[0]?.imdbVotes && (
              <View style={[styles.detailBoxRow]}>
                <Text style={[styles.leftTitle]}>{'Votes: '}</Text>
                <Text style={[styles.rightText]}>
                  {moviesCache?.[0]?.imdbVotes}
                </Text>
              </View>
            )}
          </View>

          <View
            style={[styles.detailBoxRow, {justifyContent: 'space-between'}]}>
            {moviesCache?.[0]?.Director && (
              <View style={[styles.detailBoxRow]}>
                <Text style={[styles.leftTitle]}>{'Director: '}</Text>
                <Text style={[styles.rightText]}>
                  {moviesCache?.[0]?.Director}
                </Text>
              </View>
            )}

            {moviesCache?.[0]?.Writer && (
              <View style={[styles.detailBoxRow]}>
                <Text style={[styles.leftTitle]}>{'Writer: '}</Text>
                <Text style={[styles.rightText]}>
                  {moviesCache?.[0]?.Writer}
                </Text>
              </View>
            )}
          </View>

          <View
            style={[styles.detailBoxRow, {justifyContent: 'space-between'}]}>
            {moviesCache?.[0]?.Released && (
              <View style={[styles.detailBoxRow]}>
                <Text style={[styles.leftTitle]}>{'Released: '}</Text>
                <Text style={[styles.rightText]}>
                  {moviesCache?.[0]?.Released}
                </Text>
              </View>
            )}

            {moviesCache?.[0]?.Runtime && (
              <View style={[styles.detailBoxRow]}>
                <Text style={[styles.leftTitle]}>{'Runtime: '}</Text>
                <Text style={[styles.rightText]}>
                  {moviesCache?.[0]?.Runtime}
                </Text>
              </View>
            )}
          </View>

          <View style={[styles.detailBoxRow, {justifyContent: 'center'}]}>
            {moviesCache?.[0]?.Awards && (
              <View style={[styles.detailBoxRow]}>
                <Text style={[styles.leftTitle]}>{'Awards: '}</Text>
                <Text style={[styles.rightText]}>
                  {moviesCache?.[0]?.Awards}
                </Text>
              </View>
            )}
          </View>

          <View
            style={[styles.detailBoxRow, {justifyContent: 'space-between'}]}>
            {moviesCache?.[0]?.Plot && (
              <View style={[styles.detailBoxRow]}>
                <Text style={[styles.rightText]}>{moviesCache?.[0]?.Plot}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View
          style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
          <ActivityIndicator size="large" color={'#FBBB18'} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingBottom: 20
  },

  centered: {
    justifyContent: 'center',
  },

  imageContainer: {
    width: 300,
    height: 400,
    marginHorizontal: 6,
    marginBottom: 15,
    borderRadius: 25,
    alignSelf: 'center',
  },

  imageBox: {
    width: '100%',
    height: '100%',
  },

  mainTitle: {
    color: '#f2f2f2',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },

  detailBoxRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    color: '#808080',
    marginVertical: 4,
    fontSize: 18,
    flexWrap: 'wrap'
  },

  leftTitle: {
    color: '#cfcfcf',
    fontWeight: '600',
  },

  rightText: {
    color: '#aeafbd',

  },

  description: {
    color: '#808080',
    marginBottom: 10,
    fontSize: 17,
    padding: 16,
  },
});

export default MovieDetail;

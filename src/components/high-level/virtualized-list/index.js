/* eslint-disable react/prop-types */
import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  VirtualizedList as VirtualizedListR,
  ActivityIndicator,
  RefreshControl,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import general from '../../../utils/general';
import useRefState from '../../../utils/hooks/use-ref-state';
import Actions from '../../../redux/actions';
import SearchBox from '../../low-level/SearchBox';
import NotFoundRecord from '../../low-level/NotFoundRecord';

const VirtualizedList = ({
  controller = 's',
  renderItem,
  showSearchBar = true,
  ListEmptyComponent = false,
}) => {
  const dispatch = useDispatch();
  const moviesData = useSelector(x => x.moviesReducer.movies);
  const moviesPageCount = useSelector(x => x.moviesReducer.moviesPageCount);
  const moviesTotalResults = useSelector(
    x => x.moviesReducer.moviesTotalResults,
  );
  const moviesDataLoading = useSelector(x => x.moviesReducer.moviesDataLoading);
  const didMountRef = useRef(false);

  const [searchTimer, searchTimerRef, setSearchTimer] = useRefState(null);

  const [pagingAndSearch, pagingAndSearchRef, setPagingAndSearch] = useRefState(
    {
      page: 1,
      pageSize: 10,
      pageCount: 0,
      searchText: '',
      loadMore: false,
    },
  );
  const [searchTextHook, setSearchTextHook] = useState('');

  useEffect(() => {
    loadData();
    if (!didMountRef.current) didMountRef.current = true;
  }, [pagingAndSearch.page, pagingAndSearch.searchText]);

  const loadData = () => {
    dispatch(
      Actions.movieAction.getMovies({
        controller,
        loadMore: pagingAndSearchRef?.current.loadMore,
        pageSize: pagingAndSearchRef?.current.pageSize,
        pageNumber: pagingAndSearchRef?.current.page,
        searchText: pagingAndSearchRef?.current.searchText,
      }),
    );
  };

  const refresh = useCallback((showRefreshLoading = true) => {
    loadData();
  }, []);

  const loadMore = useCallback(() => {
    if (moviesPageCount > pagingAndSearch.page) {
      setPagingAndSearch(curr => ({
        ...curr,
        page: pagingAndSearch.page + 1,
        loadMore: true,
      }));
    }
  }, [moviesPageCount, pagingAndSearch.page]);

  const keyExtractor = useCallback(
    item =>
      'movie-item-key-' +
      item?.imdbID?.toString() +
      '-' +
      general.generateRandomString(8),
    [],
  );

  // for virtualized
  const getItemCount = useCallback(
    () => moviesData?.length,
    [moviesData?.length],
  );
  const getItem = useCallback((data, index) => data[index], []);

  //for Search with Debounce timer
  const onChangeSearchText = useCallback(
    value => {
      const val = value;
      //Set text
      setSearchTextHook(value);
     
      //wait second and then search
      clearTimeout(searchTimer);
      setSearchTimer(
        setTimeout(() => {
          setPagingAndSearch(curr => ({
            ...curr,
            searchText: val,
            page: 1,
            loadMore: false,
          }));
        }, 650),
      );
    },
    [searchTimer],
  );

  return (
    <View style={{flex: 1, marginBottom: 0, alignSelf: 'stretch'}}>
      {showSearchBar && (
        <SearchBox
          value={searchTextHook}
          onChange={onChangeSearchText}
          style={{marginVertical: 10, marginHorizontal: 10}}
        />
      )}
      <VirtualizedListR
        refreshControl={
          <RefreshControl
            tintColor={'#FBBB18'}
            refreshing={moviesDataLoading}
            onRefresh={refresh}
          />
        }
        style={{flex: 1, marginBottom: 10}}
        keyExtractor={keyExtractor}
        data={moviesData}
        onEndReached={loadMore}
        getItemCount={getItemCount}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !moviesDataLoading && ListEmptyComponent && <NotFoundRecord />
        }
        ListFooterComponent={
          moviesDataLoading && (
            <ActivityIndicator size="large" color={'#FBBB18'} />
          )
        }
        getItem={getItem}
        renderItem={renderItem}
        initialNumToRender={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default VirtualizedList;

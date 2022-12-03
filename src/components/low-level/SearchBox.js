/* eslint-disable react/prop-types */
import {SearchNormal1, CloseCircle} from 'iconsax-react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const SearchBox = ({
  placeholder = 'Search Text',
  value = '',
  onChange,
  disabled,
  style,
}) => {
  const clear = useCallback(() => {
    onChange('');
  });

  return (
    <View
      style={{
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 50,
        flexDirection: 'row',
        marginBottom: 20,
        ...style,
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SearchNormal1 size="24" color="#fff" />
      </View>
      <View style={[styles.searchBoxContainer]}>
        <TextInput
          placeholderTextColor={'#8A94A6'}
          style={{
            color: '#fff',
            borderBottomWidth: 0,
            flex: 1,
            fontSize: 16,
            padding: 0,
            margin: 0,
            minHeight: 29,
            height: 'auto',
            marginTop: 6,
          }}
          value={value?.toString()}
          editable={!disabled} 
          onChangeText={onChange}
          placeholder={placeholder}
          returnKeyType="done"
          testID={'searchBox'}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={clear}>
            <CloseCircle size="32" color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
});

export default React.memo(SearchBox);

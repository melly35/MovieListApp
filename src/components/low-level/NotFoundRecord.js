import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Box2} from 'iconsax-react-native';

const NotFoundRecord = ({}) => {
  return (
    <View style={[styles.notRecord]}>
      <Box2 size="32" color="#FBBB18" />
      <Text style={[styles.notRecordText]}>Not Found Record</Text>
      <Text style={[styles.notRecordText]}>Please search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notRecord: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
  },
  notRecordText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default React.memo(NotFoundRecord);

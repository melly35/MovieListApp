import React from 'react';
import {Text, View, TouchableOpacity, Platform, Dimensions} from 'react-native';
import {ArrowLeft2} from 'iconsax-react-native';
import general from '../../utils/general';
const Header = ({style, height = 40, navigation}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        height: height,
        justifyContent: 'center',
        marginHorizontal: 5,
        width: screenWidth,
        ...style,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingLeft: 15}}>
            <ArrowLeft2 size={25} color={'#fff'} />
          </TouchableOpacity>
        </View>
        
        <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}></View>
      </View>
    </View>
  );
};
export default React.memo(Header);

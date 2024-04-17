import {View, Text, TouchableOpacity, StatusBar, Linking} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import {NavigationProps} from '../../utils/NavigationProps';

export default function Welcome() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View className="flex-1 justify-center items-center ">
      <LinearGradient
        colors={['#1A202C', '#2D3748']}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
      />
      <View className="flex-1 items-center justify-end max-w-[85%]  space-y-4 ">
        <Text
          className="font-bold text-4xl shadow-2xl text-white text-centePr tracking-wider"
          style={{
            fontSize: wp(10),
            fontFamily: 'SpaceGroteskBold',
          }}>
          Stay Ahead of the Curve
        </Text>
        <Text
          className="font-bold text-white text-center max-w-[85%] leading-12 tracking-wider"
          style={{
            fontSize: wp(4),
            fontFamily: 'SpaceGroteskMedium',
          }}>
          Explore the Latest News with Our Seamless Onboarding Experience.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-white rounded-full p-4 justify-center items-center w-[90%] mt-8"
        onPress={() => {
          requestAnimationFrame(() => {
            navigation.navigate('HomeTabs');
          });
        }}>
        <Text className="text-base text-green-900">Get Started</Text>
      </TouchableOpacity>
      {/* Powered by ISOWLUTION
       */}

      <TouchableOpacity
        className=" rounded-full p-4 justify-center items-center w-[90%] mt-8"
        onPress={() => {
          requestAnimationFrame(() => {
            Linking.openURL('https://sowlutions.com/');
          });
        }}>
        <Text className="text-base text-white">Powered by Sowlutions</Text>
      </TouchableOpacity>
    </View>
  );
}

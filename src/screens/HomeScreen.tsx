import {
  View,
  ScrollView,
  NativeModules,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useColorScheme} from 'nativewind';
import Loading from '../components/Loading/Loading';
import Header from '../components/Header/Header';
import NewsSection from '../components/NewsSection/NewsSection';
import {useQuery} from '@tanstack/react-query';
import {
  fetchBreakingNews,
  fetchLocalNews,
  fetchRecommendedNews,
} from '../../utils/NewsApi';
import MiniHeader from '../components/Header/MiniHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BreakingNews from '../components/BreakingNews';
import {getCountry} from 'react-native-localize';

export default function HomeScreen() {
  const {colorScheme, toggleColorScheme} = useColorScheme();

  // Breaking News
  const {data, isLoading: isBreakingLoading} = useQuery({
    queryKey: ['breakingNewss'],
    queryFn: fetchBreakingNews,
  });

  // Recommended News
  const {data: localNews, isLoading: isLocalNewsLoading} = useQuery({
    queryKey: ['localNews'],
    queryFn: fetchLocalNews,
  });

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <View>
        {/* Header */}
        <Header />

        {/* Breaking News */}
        {isBreakingLoading ? (
          <Loading />
        ) : (
          <View className="">
            <MiniHeader label="Breaking News" />
            <BreakingNews label="Breaking News" data={data?.articles} />
          </View>
        )}

        {/* Local News */}
        <View>
          <MiniHeader label="Arabic News" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80),
            }}>
            {isLocalNewsLoading ? (
              <Loading />
            ) : (
              <NewsSection newsProps={localNews?.articles} />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

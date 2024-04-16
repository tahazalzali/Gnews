import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
} from 'react-native';
import {BookmarkSquareIcon} from 'react-native-heroicons/solid';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { NewsItem } from '../../constants/DTO';

type NewsSectionProps = {
  newsProps: any;
};
type NavigationProps = {
  navigate: (screen: string, item: any) => void;
};

export default function NewsSection({newsProps}: NewsSectionProps) {
  const navigation = useNavigation<NavigationProps>();
  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState<Boolean[]>([]);

  // Function to format the date
  function formatDate(isoDate: string) {
    const options = {
      weekday: 'short' as const,
      day: '2-digit' as const,
      month: 'short' as const,
      year: '2-digit' as const,
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  // Hook to set the URL list
  useEffect(() => {
    if (!newsProps){
      return;
    }
    const urls = newsProps.map((item: {url: string}) => item.url);
    setUrlList(urls);
  }, [newsProps]);

  // Function to handle click on an item
  const handleClick = (item: NewsItem) => {
    navigation.navigate('NewsDetails', item);
  };

  // Function to toggle bookmark and save article
  const toggleBookmarkAndSave = async (item: NewsItem, index: number) => {
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles');
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle: {url: string}) => savedArticle.url === item.url,
      );

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(savedArticlesArray),
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        // If the article is already bookmarked, remove it from the list
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle: {url: string}) => savedArticle.url !== item.url,
        );
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(updatedSavedArticlesArray),
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log('Error Saving/Removing Article', error);
    }
  };

  const navigateToSource = (source: string) => {
    if (source) {
      Linking.openURL(source);
    }
  };
  // Effect to load saved articles from AsyncStorage when the component mounts
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem('savedArticles');
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];

          // Check if each URL in 'urlList' exists in the bookmarked list
          const isArticleBookmarkedList = urlList.map(url =>
            savedArticlesArray.some(
              (savedArticle: {url: string}) => savedArticle.url === url,
            ),
          );

          // Set the bookmark status for all items based on the loaded data
          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.log('Error Loading Saved Articles', error);
        }
      };

      loadSavedArticles();
    }, [navigation, urlList]), // Include 'navigation' in the dependencies array if needed
  );

  // Component to render each item in the list
  const renderItem = ({item, index}: {item: NewsItem; index: number}) => {
    return (
      <TouchableOpacity
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}>
        <View className="flex-row justify-start w-[100%]shadow-sm">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri:
                  item.image ||
                  'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
              }}
              style={{width: hp(9), height: hp(10)}}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}

          <View className="w-[70%] pl-4 justify-center space-y-1">
            {/* Author */}
            <Text
              onPress={ 
                () => navigateToSource(item?.source?.url)
              }
              className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item?.source?.name?.length > 20
                ? item.source?.name.slice(0, 20) + '...'
                : item.source?.name}
            </Text>

            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white "
              style={{
                fontSize: hp(1.7),
                fontFamily: 'SpaceGroteskBold',
              }}>
              {item.title.length > 50
                ? item.title.slice(0, 50) + '...'
                : item.title}
            </Text>

            {/* Date */}
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {formatDate(item.publishedAt)}
            </Text>
          </View>

          {/* Bookmark */}
          <View className="w-[10%] justify-center"/>
                  </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900 pb-40 ">
      {/* Header */}

      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

// useEffect(() => {

//   const loadSavedArticles = async () => {
//     try {
//       const savedArticles = await AsyncStorage.getItem("savedArticles");
//       const savedArticlesArray = savedArticles
//         ? JSON.parse(savedArticles)
//         : [];

//       // Check if each URL in 'urlList' exists in the bookmarked list
//       const isArticleBookmarkedList = urlList.map((url) =>
//         savedArticlesArray.some((savedArticle) => savedArticle.url === url)
//       );

//       // Set the bookmark status for all items based on the loaded data
//       setBookmarkStatus(isArticleBookmarkedList);
//       console.log("Check if the current article is in bookmarks");
//     } catch (error) {
//       console.log("Error Loading Saved Articles", error);
//     }
//   };

//   loadSavedArticles();
// }, [urlList]);

// contentContainerStyle={{
//         paddingBottom: hp(110),
//       }}

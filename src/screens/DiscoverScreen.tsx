import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import Loading from "../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../constants";
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { fetchDiscoverNews } from "../../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../utils/NavigationProps";

export default function DiscoverScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("general");
  const navigation = useNavigation<NavigationProps>();
  const [withoutRemoved, setWithoutRemoved] = useState([]);


  const { data: discoverNew, isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  const handleChangeCategory = (category:string) => {
    setActiveCategory(category);

  };

  return (
    <SafeAreaView className="pt-8 bg-white dark:bg-neutral-900">
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View>
        {/* Header */}
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-green-800 dark:text-white"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Discover
          </Text>

          <Text
            className="text-base text-gray-600 dark:text-neutral-300 "
            style={{
              fontFamily: "SpaceGroteskMedium",
            }}
          >
            News from all over the world
          </Text>
        </View>

        {/* Search */}
        <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
          <TouchableOpacity className="pl-2">
            <MagnifyingGlassIcon size="25" color="gray" />
          </TouchableOpacity>
          <TextInput
            onPressIn={() => navigation.navigate("Search")}
            placeholder="Search for news"
            placeholderTextColor={"gray"}
            className="pl-4 flex-1 font-medium text-black tracking-wider"
          />
        </View>

        {/* Categories */}
        <View className="flex-row mx-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View className="h-full">
          {/* Header Title */}
          <View className="my-4 mx-4 flex-row justify-between items-center">
            <Text
              className="text-xl dark:text-white"
              style={{
                fontFamily: "SpaceGroteskBold",
              }}
            >
              Discover
            </Text>

          
          </View>

          {isDiscoverLoading ? (
            <View className="justify-center items-center">
              <Loading />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
              }}
            >
              <NewsSection newsProps={discoverNew?.articles} />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

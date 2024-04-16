import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TextInputProps,
} from "react-native";
import React, { useCallback, useState, useRef} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fetchSearchNews } from "../../utils/NewsApi";
import { debounce } from "lodash";
import NewsSection from "../components/NewsSection/NewsSection";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NavigationProps } from "../../utils/NavigationProps";



export default function SearchScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<TextInput>(null); 


  useFocusEffect(
    useCallback(() => {
      searchInputRef.current?.focus();
    }, [])
  );


  const handleSearch = async (search:string) => {
    if (search && search?.length > 2) {
      setLoading(true);
      setResults([]);
      setSearchTerm(search);

      try {
        const data = await fetchSearchNews(search);

        setLoading(false);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      {/* Search Input */}

      <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg  dark:bg-neutral-900">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your news"
          placeholderTextColor={"gray"}
          ref={searchInputRef}        
          className=" font-medium text-black dark:bg-white tracking-wider p-3 py-1 w-[90%] "
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size="25" color="green" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View className="mx-4 mb-4 ">
        <Text
          className="text-xl dark:text-white"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          {results?.length} News for {searchTerm}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        <NewsSection newsProps={results} />
      </ScrollView>
    </View>
  );
}

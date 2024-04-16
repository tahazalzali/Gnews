import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Carousal from "react-native-snap-carousel";
import BreakingNewsCard from "./BreakingNewsCard";
import { NewsItem } from "../../constants/DTO";

var { width } = Dimensions.get("window");
//  add item with navigation
type NewType = {
  navigate: (screen: string,item:NewsItem) => void;
}

type NavigationProps = NewType;

export default function BreakingNews({ data, label }: { data: NewsItem[]; label: string } = { data: [], label: "Breaking News" }) {
  const navigation = useNavigation<NavigationProps>();

  const handleClick = (item :NewsItem) => {
    navigation.navigate("NewsDetails", item);
  };

  return (
    <View>
      {/* Carousal */}
      <Carousal
        data={data}
        renderItem={({ item }:any) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{ display: "flex", alignItems: "center" }}
        vertical={false}
      />
    </View>
  );
}

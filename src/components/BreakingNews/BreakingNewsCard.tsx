import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { navigateToSource } from "../../../utils/Functions";
import { NewsItem } from "../../constants/DTO";

var { width, height } = Dimensions.get("window");

export default function BreakingNewsCard({ item, handleClick }:
  {
    item: NewsItem;
    handleClick: (item: any) => void;
  } 
) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="relative">
        <Image
          source={{
            uri:
              item.image ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
          }}
          resizeMode="cover"
          className="rounded-3xl"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Title and Author */}
        <View className="absolute bottom-6 left-4 justify-end h-[80%]">
          <View className=" space-y-1">
            <View className=" max-w-[98%]">
              <Text className="text-white text-base font-semibold capitalize">
                {item.title.length > 60
                  ? item.title.slice(0, 58) + "..."
                  : item.title.split("-")[0] || "N/A"}
              </Text>
            </View>

            <View className="">
              <Text  
              onPress={()=>navigateToSource(item?.source?.url)}
              className="text-neutral-300 text-sm font-medium">
                {item?.source?.name?.length > 20
                  ? item?.source?.name?.slice(0, 20) + "..."
                  : item?.source?.name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

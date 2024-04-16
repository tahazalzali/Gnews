import { Linking } from "react-native";

export const navigateToSource = (source: string) => {
    if (source) {
      Linking.openURL(source);
    }
  };
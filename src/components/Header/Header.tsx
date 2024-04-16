import {Switch, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';

interface NavigationProps {
  navigate: (screen: string) => void;
}

export default function Header() {
  const navigation = useNavigation<NavigationProps>();
  const {colorScheme, toggleColorScheme} = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      {/* Switch and Search Icon */}
      <Switch value={colorScheme == 'dark'} onChange={toggleColorScheme} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        className="bg-gray-200 dark:bg-green-800  rounded-full p-2">
        <MagnifyingGlassIcon
          size={25}
          strokeWidth={2}
          color={colorScheme == 'dark' ? 'white' : 'green'}
        />
      </TouchableOpacity>
    </View>
  );
}

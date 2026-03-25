import icons from "@/constants/icons";
import { useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || "");

  function handleSearch(text: string) {
    setSearch(text);
  }

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
        <View className="flex-1 flex-row items-center justify-center z-50 py-2">
          <Image source={icons.search} className="size-5" />
          <TextInput
            placeholder="Search for anything"
            value={search}
            onChangeText={handleSearch}
            className="flex-1 text-sm font-rubik text-black-300 py-0 mt-2 ml-2"
          />
        </View>

        <TouchableOpacity>
          <Image source={icons.filter} className="size-5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Search;

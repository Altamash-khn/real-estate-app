import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../globals.css";

export default function Index() {
  const { user } = useGlobalContext();
  const isValidUrl =
    typeof user?.avatar === "string" && user.avatar.startsWith("http");

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  console.log("params", params);

  const { data: latestProperties, loading: propertiesLoading } = useAppwrite({
    fn: getLatestProperties,
  });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 10,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5 border-b border-gray-200"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={isValidUrl ? { uri: user.avatar } : icons.placeholder}
                  className="size-14 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name || "User"}
                  </Text>
                </View>
              </View>

              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={latestProperties}
                bounces={false}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="mt-5"
                ItemSeparatorComponent={() => <View className="w-5" />}
                renderItem={({ item }) => (
                  <FeaturedCard
                    onPress={() => handleCardPress(item.id)}
                    item={item}
                  />
                )}
              />
            </View>

            <Filters />

            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendations
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Card onPress={() => handleCardPress(item.id)} item={item} />
        )}
      />
    </SafeAreaView>
  );
}

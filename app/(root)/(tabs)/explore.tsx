import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Property } from ".";
import "../../../globals.css";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite<Property[], any>({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
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
      limit: 20,
    });
  }, [params.filter, params.query]);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.85],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        numColumns={2}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-4 px-5 mt-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              className="text-primary-300 mt-10"
              size="large"
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View>
            <LinearGradient
              colors={["#0061FF", "#003D9E", "#001F5B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="px-5 pt-4 pb-4"
            >
              <View className="flex flex-row items-center justify-between mb-5 px-5 py-3">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="bg-white/20 rounded-full p-2"
                >
                  <Image
                    source={icons.backArrow}
                    className="size-5"
                    tintColor="#fff"
                  />
                </TouchableOpacity>

                <Text className="text-white text-base font-rubik-bold tracking-wide">
                  Explore
                </Text>

                <TouchableOpacity className="bg-white/20 rounded-full p-2">
                  <Image
                    source={icons.bell}
                    className="size-5"
                    tintColor="#fff"
                  />
                </TouchableOpacity>
              </View>

              <Text className="text-white text-2xl font-rubik-bold mb-1 text-center">
                Find your ideal home
              </Text>

              <View className="px-5">
                <Search />
              </View>
            </LinearGradient>

            <View className="px-5 mt-4 flex flex-row items-center justify-between">
              <Filters />
            </View>

            {!loading && (
              <View className="px-5 mt-3 flex flex-row items-center gap-2">
                <View className="rounded-full px-3 py-1">
                  <Text className="text-2xl font-rubik-medium  text-[#111]">
                    {properties?.length || 0} results
                  </Text>
                </View>
                {params.query ? (
                  <Text className="text-black-100 text-xs font-rubik">
                    for "{params.query}"
                  </Text>
                ) : null}
                {params.filter && params.filter !== "All" ? (
                  <View className="bg-black-100/10 rounded-full px-3 py-1">
                    <Text className="text-black-300 text-xs font-rubik">
                      {params.filter}
                    </Text>
                  </View>
                ) : null}
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <Card onPress={() => handleCardPress(item.$id)} item={item} />
        )}
      />
    </SafeAreaView>
  );
}

import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../globals.css";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5 border-b border-gray-200"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={images.avatar}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    John Doe
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
                data={[1, 2, 3, 4, 5]}
                keyExtractor={(item) => item.toString()}
                bounces={false}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="mt-5"
                ItemSeparatorComponent={() => <View className="w-5" />}
                renderItem={({ item }) => <FeaturedCard />}
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

            {/* <View className="flex flex-row gap-5 mt-5">
              <Card />
              <Card />
            </View> */}
          </View>
        }
        renderItem={({ item }) => <Card />}
      />
    </SafeAreaView>
  );
}

import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

function Filters() {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All",
  );

  function handleCategoryChange(category: string) {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
    } else {
      setSelectedCategory(category);
      router.setParams({ filter: category });
    }
  }
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-4"
    >
      {categories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategoryChange(cat.category)}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full  border border-primary-200 ${
            selectedCategory === cat.category
              ? "bg-primary-300 "
              : "bg-white/90"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedCategory === cat.category
                ? "text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}
          >
            {cat.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default Filters;

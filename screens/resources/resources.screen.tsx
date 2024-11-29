import {
  FlatList,
  SafeAreaView,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SourceCodeCard from "@/components/cards/source.code.card";
import { verticalScale } from "react-native-size-matters";
import useCases from "@/hooks/fetch/useCases";

export default function ResourcesScreen() {
  const { theme } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { cases } = useCases(); 
  
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.dark ? "#131313" : "#fff",
        flex: 1,
      }}
    >
        <View style={{ paddingBottom: bottomTabBarHeight - 20 }}>
          <FlatList
            data={cases} 
            renderItem={({ item }) => <SourceCodeCard item={item} />}
            showsVerticalScrollIndicator={false}
            style={{
              paddingTop: verticalScale(10),
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
    </SafeAreaView>
  );
}
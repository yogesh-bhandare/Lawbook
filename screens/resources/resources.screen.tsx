import {
  FlatList,
  SafeAreaView,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useJudgments } from "@/configs/constants";
import SourceCodeCard from "@/components/cards/source.code.card";
import {  verticalScale } from "react-native-size-matters";

export default function ResourcesScreen() {
  const { theme } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { judgments } = useJudgments()
  // console.log(judgments)

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.dark ? "#131313" : "#fff",
        flex: 1,
      }}
    >
        <View style={{ paddingBottom: bottomTabBarHeight - 20 }}>
          <FlatList
            data={judgments}
            renderItem={({ item }) => <SourceCodeCard item={item} />}
            showsVerticalScrollIndicator={false}
            style={{
              paddingTop: verticalScale(10),
            }}
          />
        </View>
    </SafeAreaView>
  );
}




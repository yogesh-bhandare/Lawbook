import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { videoLessonsData } from "@/configs/constants";
import SourceCodeCard from "@/components/cards/source.code.card";
import { EvilIcons } from "@expo/vector-icons";
import {
  fontSizes,
  IsAndroid,
  IsHaveNotch,
  IsIPAD,
  windowHeight,
  windowWidth,
} from "@/themes/app.constant";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function ResourcesScreen() {
  const { theme } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.dark ? "#131313" : "#fff",
        flex: 1,
      }}
    >
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Search for Judgments, Cases"
          style={[
            styles.input,
            {
              backgroundColor: theme.dark ? "transparent" : "#fff",
              borderWidth: theme.dark ? 1 : 0,
              borderColor: theme.dark ? "#fff" : "",
              color: theme?.dark ? "#fff" : "#000",
            },
          ]}
          placeholderTextColor={theme.dark ? "#fff" : "#000"}
        />
        <Pressable
          style={{
            position: "absolute",
            right: windowWidth(10),
            top: windowHeight(16),
          }}
        >
          <EvilIcons
            name="search"
            size={IsIPAD ? scale(20) : scale(30)}
            color={theme.dark ? "#fff" : "blue"}
          />
        </Pressable>
      </View>
      
        <View style={{ paddingBottom: bottomTabBarHeight - 20 }}>
          <FlatList
            data={videoLessonsData}
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

const styles = StyleSheet.create({
  input: {
    height: IsHaveNotch ? verticalScale(35) : verticalScale(40),
    backgroundColor: "#fff",
    color: "#000",
    marginTop: verticalScale(12),
    fontSize: IsIPAD ? fontSizes.FONT15 : fontSizes.FONT18,
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(15),
    fontFamily: "Poppins_400Regular",
  },
});

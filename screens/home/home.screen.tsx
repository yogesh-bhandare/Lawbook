import { FlatList, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/theme.context";
import WelcomeHeader from "@/components/home/welcome.header";
import HomeBanner from "@/components/home/home.banner";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import { scale, verticalScale } from "react-native-size-matters";
import GradiantText from "@/components/common/gradient.text";
import SkeltonLoader from "@/utils/skelton";
import useCases from "@/hooks/fetch/useCases";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SourceCodeCard from "@/components/cards/source.code.card";

export default function HomeScreen() {
  const { theme } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { cases, loader } = useCases(); 

  return (
    <LinearGradient
      colors={
        theme.dark ? ["#180D41", "#2A2D32", "#131313"] : ["#fff", "#f7f7f7"]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        flex: 1,
        backgroundColor: theme.dark ? "#101010" : "#fff",
      }}
    >
      <WelcomeHeader />

      <FlatList
        data={loader ? Array(2).fill({}) : cases.slice(0, 2)} 
        renderItem={({ item, index }) =>
          loader ? (
            <SkeltonLoader key={index} /> 
          ) : (
            <SourceCodeCard item={item} />
          )
        }
        ListHeaderComponent={
          <>
            <HomeBanner />
            <View
              style={{
                marginHorizontal: windowWidth(20),
                marginTop: verticalScale(-25),
              }}
            >
              <View
                style={{ flexDirection: "row", marginTop: windowHeight(5) }}
              >
                <Text
                  style={{
                    fontSize: fontSizes.FONT35,
                    fontFamily: "Poppins_500Medium",
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Popular
                </Text>
                <GradiantText
                  text="Cases"
                  styles={{
                    fontSize: fontSizes.FONT35,
                    fontFamily: "Poppins_500Medium",
                    paddingLeft: scale(5),
                  }}
                />
              </View>
            </View>
          </>
        }
        keyExtractor={(item, index) => item.id?.toString() || index.toString()} // Fallback for loader
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottomTabBarHeight + 20,
        }}
        style={{
          paddingTop: verticalScale(10),
        }}
      />
    </LinearGradient>
  );
}

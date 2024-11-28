import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
import {
  fontSizes,
  SCREEN_WIDTH,
  windowHeight,
  windowWidth,
} from "@/themes/app.constant";

export default function SourceCodeCard({
  item,
}: {
  item: {
    id: Number;
    date_added: string; 
    img_url: string; 
    title: string;
  };
}) {
  const { theme } = useTheme();


  return (
    <Pressable
      style={{
        paddingHorizontal: windowWidth(20),
        paddingVertical: windowHeight(7),
      }}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85",
            flexDirection: "row",
            gap: windowWidth(15),
            alignItems: "center",
          },
        ]}
      >
        <Image
          source={{
            uri: item?.img_url,
          }}
          style={{
            width: windowWidth(80),
            height: windowWidth(80),
            borderRadius: windowWidth(40),
            backgroundColor: theme.dark ? "#333" : "#ddd",
          }}
        />
        {/* Text Section */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: fontSizes.FONT18,
              color: theme.dark ? "#fff" : "#3E3B54",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: fontSizes.FONT14,
              color: theme.dark ? "#aaa" : "#6b6b6b",
              paddingTop: windowHeight(5),
            }}
            numberOfLines={2}
          >
           {item.date_added}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: windowWidth(10),
    shadowOpacity: 0.1,
    shadowColor: "#40E0D0",
    shadowRadius: 5,
    padding: windowWidth(15),
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useCases from "@/hooks/fetch/useCases";
import { useTheme } from "@/context/theme.context";
import {
  fontSizes,
  windowWidth,
  windowHeight,
  SCREEN_WIDTH,
} from "@/themes/app.constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { scale, verticalScale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";

export default function CaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCaseById } = useCases();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<
    "summary" | "content" | "documents"
  >("summary");

  const caseItem = getCaseById(Number(id));

  if (!caseItem) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.dark ? "#131313" : "#fff" },
        ]}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "summary":
        return (
          <View style={styles.contentContainer}>
            <Text
              style={[
                styles.contentText,
                { color: theme.dark ? "#ddd" : "#333" },
              ]}
            >
              {caseItem.summary || "No summary available"}
            </Text>
          </View>
        );
      case "content":
        return (
          <View style={styles.contentContainer}>
            <Text
              style={[
                styles.contentText,
                { color: theme.dark ? "#ddd" : "#333" },
              ]}
            >
              {caseItem.content || "No content available"}
            </Text>
          </View>
        );
      case "documents":
        return (
          <View style={styles.contentContainer}>
            <Text
              style={[
                styles.documentText,
                { color: theme.dark ? "#ddd" : "#333" },
              ]}
            >
              No documents attached
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.dark ? "#131313" : "#fff" },
      ]}
    >
      <ScrollView>
        <Pressable
          style={{
            width: scale(35),
            height: scale(35),
            backgroundColor: theme.dark ? "#131313" : "#fff",
            borderRadius: scale(5),
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: verticalScale(10),
            left: scale(10),
            zIndex: 1,
          }}
          onPress={() => router.back()}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color={theme.dark ? "white" : "black"}
          />
        </Pressable>
        <View>
          <Image source={{ uri: caseItem.img_url }} style={styles.caseImage} />

          <View style={styles.detailsContainer}>
            <Text
              style={[
                styles.titleText,
                { color: theme.dark ? "#fff" : "#3E3B54" },
              ]}
            >
              {caseItem.title}
            </Text>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                onPress={() => setActiveTab("summary")}
                style={[
                  styles.tab,
                  activeTab === "summary" && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "summary" && styles.activeTabText,
                  ]}
                >
                  Summary
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab("content")}
                style={[
                  styles.tab,
                  activeTab === "content" && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "content" && styles.activeTabText,
                  ]}
                >
                  Content
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab("documents")}
                style={[
                  styles.tab,
                  activeTab === "documents" && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "documents" && styles.activeTabText,
                  ]}
                >
                  Documents
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentSection}>{renderTabContent()}</View>

          {caseItem.category && (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>
                Category: {caseItem.category}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  caseImage: {
    width: "100%",
    height: windowHeight(150),
    marginBottom: windowHeight(20),
  },
  detailsContainer: {
    paddingHorizontal: windowWidth(20),
  },
  titleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: fontSizes.FONT22,
    marginBottom: windowHeight(15),
  },
  tabContainer: {
    flexDirection: "row",
    width: SCREEN_WIDTH - windowWidth(40),
    justifyContent: "space-between",
    marginBottom: windowHeight(15),
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: windowHeight(10),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#2467EC",
  },
  tabText: {
    fontFamily: "Poppins_500Medium",
    fontSize: fontSizes.FONT16,
    color: "#666",
  },
  activeTabText: {
    color: "#2467EC",
  },
  contentSection: {
    marginTop: windowHeight(10),
  },
  contentContainer: {
    paddingHorizontal: windowWidth(20),
  },
  contentText: {
    fontFamily: "Poppins_400Regular",
    fontSize: fontSizes.FONT14,
    lineHeight: 22,
  },
  documentText: {
    fontFamily: "Poppins_500Medium",
    fontSize: fontSizes.FONT14,
    marginBottom: windowHeight(10),
  },
  categoryContainer: {
    paddingHorizontal: windowWidth(20),
    marginTop: windowHeight(15),
  },
  categoryText: {
    fontFamily: "Poppins_500Medium",
    fontSize: fontSizes.FONT14,
    color: "#888",
  },
});

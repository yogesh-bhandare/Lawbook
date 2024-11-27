import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/theme.context";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes, IsHaveNotch, IsIPAD, windowWidth } from "@/themes/app.constant";
import IconOne from "@/assets/svgs/onboarding/icon-1";
import IconThree from "@/assets/svgs/onboarding/icon-3";
import { BlurView } from "expo-blur";
import { generateSlug } from "random-word-slugs";

const CourtScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [startMeet, setStartMeet] = useState(false);
  const [joinMeet, setJoinMeet] = useState(false);
  const [loader, setLoader] = useState(false);
  const [callId, setCallId] = useState('');
  const [selectedJudge, setSelectedJudge] = useState("Peer");
  const [selectedLawyer, setSelectedLawyer] = useState("Peer");

  const onStartMeeting = () => {
    if (selectedJudge === "Peer" && selectedLawyer === "Peer") {
      const words = generateSlug(3, {
        format: "lower", 
        categories: {
          noun: ["education", "profession", "place"], 
          adjective: ["personality", "condition"], 
        },
      });
  
      const slug = words.split(" ").join("-");
  
      console.log(slug); 
      router.push(`/(routes)/room/${slug}`); 
    } else {
      Alert.alert(
        "Feature Not Available",
        "AI Judge and AI Lawyer options are not implemented yet. Please select 'Peer' for both."
      );
    }
  };

  const handleJoin = () => {
    if (!callId.trim()) {
      Alert.alert("Invalid Key", "Please enter a valid courtroom key to join.");
      return;
    }
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      router.push(`/(routes)/room/${callId.trim()}`);
      setCallId('');
      setJoinMeet(false);
    }, 1000); 
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.dark ? "#131313" : "#fff",
        paddingHorizontal: windowWidth(20),
        flex: 1,
      }}
    >
      <Pressable
        style={{
          height: !IsHaveNotch
            ? verticalScale(65)
            : IsIPAD
            ? verticalScale(80)
            : verticalScale(62),
          backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85",
          borderRadius: scale(10),
          shadowOpacity: 0.1,
          shadowColor: "#40E0D0",
          shadowRadius: 5,
          padding: scale(10),
          marginTop: verticalScale(20),
          flexDirection: "row",
          gap: scale(10),
        }}
        onPress={() => setStartMeet(true)}
      >
        <IconOne />
        <View>
          <Text
            style={{
              color: !theme.dark ? "#000" : "#fff",
              fontSize: fontSizes.FONT22,
              fontFamily: "Poppins_500Medium",
            }}
          >
            Start Trial
          </Text>
          <Text
            style={{
              color: !theme.dark ? "#000" : "#fff",
              fontSize: fontSizes.FONT20,
              fontFamily: "Poppins_400Regular",
              paddingTop: verticalScale(1),
            }}
          >
            Initiate your courtroom practice
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={{
          height: !IsHaveNotch
            ? verticalScale(65)
            : IsIPAD
            ? verticalScale(80)
            : verticalScale(62),
          backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85",
          borderRadius: scale(10),
          shadowOpacity: 0.1,
          shadowColor: "#40E0D0",
          shadowRadius: 5,
          padding: scale(10),
          marginTop: verticalScale(20),
          flexDirection: "row",
          gap: scale(10),
        }}
        onPress={() => setJoinMeet(true)}
      >
        <IconThree />
        <View>
          <Text
            style={{
              color: !theme.dark ? "#000" : "#fff",
              fontSize: fontSizes.FONT22,
              fontFamily: "Poppins_500Medium",
            }}
          >
            Join Hearing
          </Text>
          <Text
            style={{
              color: !theme.dark ? "#000" : "#fff",
              fontSize: fontSizes.FONT20,
              fontFamily: "Poppins_400Regular",
              paddingTop: verticalScale(1),
            }}
          >
            Enter an ongoing trial as counsel
          </Text>
        </View>
      </Pressable>

      {startMeet && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={startMeet}
          onRequestClose={() => {
            setStartMeet(false);
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setStartMeet(false)}>
            <BlurView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              intensity={90}
            >
              <Pressable
                style={{
                  width: scale(300),
                  marginHorizontal: scale(50),
                  backgroundColor: theme.dark ? "#101010" : "#fff",
                  borderRadius: scale(10),
                  padding: scale(15),
                }}
                onPress={(e) => e.stopPropagation()}
              >
                <Text
                  style={{
                    fontSize: fontSizes.FONT35,
                    textAlign: "center",
                    fontFamily: "Poppins_600SemiBold",
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Start Trial
                </Text>

                <View style={{ paddingVertical: verticalScale(10) }}>
                  <Text
                    style={{
                      fontSize: fontSizes.FONT20,
                      fontFamily: "Poppins_500Medium",
                      color: theme.dark ? "#fff" : "#333",
                      paddingBottom: verticalScale(5),
                    }}
                  >
                    Choose Judge
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor:
                          selectedJudge === "AI" ? "#2467EC" : "#ccc",
                        paddingVertical: verticalScale(8),
                        borderRadius: scale(8),
                        marginHorizontal: scale(5),
                      }}
                      onPress={() => setSelectedJudge("AI")}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#FFF",
                          fontSize: fontSizes.FONT18,
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        AI Judge
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor:
                          selectedJudge === "Peer" ? "#2467EC" : "#ccc",
                        paddingVertical: verticalScale(8),
                        borderRadius: scale(8),
                        marginHorizontal: scale(5),
                      }}
                      onPress={() => setSelectedJudge("Peer")}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#FFF",
                          fontSize: fontSizes.FONT18,
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        Peer Judge
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ paddingVertical: verticalScale(10) }}>
                  <Text
                    style={{
                      fontSize: fontSizes.FONT20,
                      fontFamily: "Poppins_500Medium",
                      color: theme.dark ? "#fff" : "#333",
                      paddingBottom: verticalScale(5),
                    }}
                  >
                    Choose Lawyer
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor:
                          selectedLawyer === "AI" ? "#2467EC" : "#ccc",
                        paddingVertical: verticalScale(8),
                        borderRadius: scale(8),
                        marginHorizontal: scale(5),
                      }}
                      onPress={() => setSelectedLawyer("AI")}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#FFF",
                          fontSize: fontSizes.FONT18,
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        AI Lawyer
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor:
                          selectedLawyer === "Peer" ? "#2467EC" : "#ccc",
                        paddingVertical: verticalScale(8),
                        borderRadius: scale(8),
                        marginHorizontal: scale(5),
                      }}
                      onPress={() => setSelectedLawyer("Peer")}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#FFF",
                          fontSize: fontSizes.FONT18,
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        Peer Lawyer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#2467EC",
                    paddingVertical: verticalScale(8),
                    borderRadius: scale(8),
                    marginTop: verticalScale(15),
                  }}
                  onPress={onStartMeeting}
                >
                  {loader ? (
                    <ActivityIndicator size={"small"} />
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#FFFF",
                        fontSize: fontSizes.FONT22,
                        fontFamily: "Poppins_600SemiBold",
                      }}
                    >
                      Start
                    </Text>
                  )}
                </TouchableOpacity>
              </Pressable>
            </BlurView>
          </Pressable>
        </Modal>
      )}

      {joinMeet && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={joinMeet}
          onRequestClose={() => {
            setJoinMeet(false);
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setJoinMeet(false)}>
            <BlurView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              intensity={90}
            >
              <Pressable
                style={{
                  width: scale(300),
                  marginHorizontal: scale(50),
                  backgroundColor: theme.dark ? "#101010" : "#fff",
                  borderRadius: scale(10),
                  padding: scale(15),
                }}
                onPress={(e) => e.stopPropagation()}
              >
                <Text
                  style={{
                    fontSize: fontSizes.FONT35,
                    textAlign: "center",
                    fontFamily: "Poppins_600SemiBold",
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Join Hearing
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: fontSizes.FONT20,
                      fontFamily: "Poppins_500Medium",
                      color: theme.dark ? "#fff" : "#333",
                      paddingTop: verticalScale(5),
                    }}
                  >
                    Enter Courtroom Key
                  </Text>
                  <TextInput
                    placeholder="'law-court-room'"
                    style={{
                      height: verticalScale(30),
                      borderWidth: 1,
                      borderColor: theme.dark ? "#fff" : "#000",
                      marginVertical: verticalScale(5),
                      color: theme.dark ? "#fff" : "#000",
                      paddingLeft: scale(10),
                      fontSize: fontSizes.FONT18,
                      borderRadius: scale(5),
                    }}
                    value={callId}
                    onChangeText={(text) => setCallId(text)}
                    placeholderTextColor={theme.dark ? "#fff" : "#000"}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#2467EC",
                    paddingVertical: verticalScale(8),
                    borderRadius: scale(8),
                    marginTop: verticalScale(15),
                  }}
                  onPress={handleJoin}
                >
                  {loader ? (
                    <ActivityIndicator size={"small"} />
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#FFFF",
                        fontSize: fontSizes.FONT22,
                        fontFamily: "Poppins_600SemiBold",
                      }}
                    >
                      Join
                    </Text>
                  )}
                </TouchableOpacity>
              </Pressable>
            </BlurView>
          </Pressable>
        </Modal>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}></ScrollView>
    </SafeAreaView>
  );
};


export default CourtScreen;

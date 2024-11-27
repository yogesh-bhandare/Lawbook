import React, { useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { SplashScreen, Stack } from "expo-router";
import { ThemeProvider } from "@/context/theme.context";
import api from "@/constants/api";


const apiKey = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!;

function ClerkApp() {
  const { user: clerkUser } = useUser();
  

  const user: User = {
    id: clerkUser?.id || "",
    name: clerkUser?.fullName!,
    image: clerkUser?.imageUrl!,
  };

  const tokenProvider = async () => {
    try {
      const response = await api.post("/stream/token/", {
        userId: clerkUser?.id,
        name: clerkUser?.fullName,
        image: clerkUser?.imageUrl,
        email: clerkUser?.primaryEmailAddress?.toString(),
      });
      return response.data.token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };
  
  const client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    user,
    tokenProvider,
  });

  if (!client) {
    return (
      <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/onboarding/index" />
        <Stack.Screen name="(routes)/notification/index" />
        <Stack.Screen name="(routes)/room/[id]" />
      </Stack>
    </ThemeProvider>
    )
  }

  return (
    <StreamVideo client={client}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/onboarding/index" />
          <Stack.Screen name="(routes)/notification/index" />
          <Stack.Screen name="(routes)/room/[id]" />
        </Stack>
      </ThemeProvider>
    </StreamVideo>
  );
}

export default ClerkApp;

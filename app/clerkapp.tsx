import React, { useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/context/theme.context";
import api from "@/constants/api";

const apiKey = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!;

function ClerkApp() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    const initStreamClient = async () => {
      if (isLoaded && isSignedIn && clerkUser?.id) {
        try {
          const user: User = {
            id: clerkUser.id,
            name: clerkUser.fullName ?? '',
            image: clerkUser.imageUrl ?? '',
          };

          const tokenProvider = async () => {
            try {
              const response = await api.post("/stream/token/", {
                userId: clerkUser.id,
                name: clerkUser.fullName,
                image: clerkUser.imageUrl,
                email: clerkUser.primaryEmailAddress?.toString(),
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

          setStreamClient(client);
        } catch (error) {
          console.error("Error creating Stream client:", error);
        }
      }
    };

    initStreamClient();
  }, [isLoaded, isSignedIn, clerkUser]);

  if (!isLoaded || !isSignedIn || !streamClient) {
    return (
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/onboarding/index" />
          <Stack.Screen name="(routes)/notification/index" />
          <Stack.Screen name="(routes)/room/[id]" />
          <Stack.Screen name="(routes)/resources/[id]" />
        </Stack>
      </ThemeProvider>
    );
  }

  return (
    <StreamVideo client={streamClient}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/onboarding/index" />
          <Stack.Screen name="(routes)/notification/index" />
          <Stack.Screen name="(routes)/room/[id]" />
          <Stack.Screen name="(routes)/resources/[id]" />
        </Stack>
      </ThemeProvider>
    </StreamVideo>
  );
}

export default ClerkApp;
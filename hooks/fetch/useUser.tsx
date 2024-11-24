import React, { useEffect, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const setAuthorizationHeader = async () => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export default function useUser() {
  const [user, setUser] = useState<UserType>();
  const [loader, setLoader] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchUserData = useCallback(async () => {
    setLoader(true);
    try {
      await setAuthorizationHeader();
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/me`
      );
      await SecureStore.setItemAsync("name", response.data.user.name);
      await SecureStore.setItemAsync("email", response.data.user.email);
      await SecureStore.setItemAsync("avatar", response.data.user.avatar);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally { 
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    return () => setShouldRefetch(false);
  }, [fetchUserData, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch(true);
  };

  return { user, loader, refetch };
}

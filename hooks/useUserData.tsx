import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function useUserData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const getUserSession = async () => {
      const name = SecureStore.getItem("name");
      const email = SecureStore.getItem("email");
      const avatar = SecureStore.getItem("avatar");
      setName(name!);
      setEmail(email!);
      setAvatar(avatar!);
    };
    getUserSession();
  }, []);

  return { name, email, avatar };
}

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function useUserData() {
  const { user: clerkUser } = useUser();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const getUserSession = async () => {
      const id = clerkUser?.id || "";
      const name = clerkUser?.fullName!;
      const fName = clerkUser?.firstName;
      const lName = clerkUser?.lastName;
      const email = clerkUser?.primaryEmailAddress?.toString();
      const avatar = clerkUser?.imageUrl!;
      setId(id!);
      setName(name!);
      setFirstName(fName!);
      setLastName(lName!);
      setEmail(email!);
      setAvatar(avatar!);
    };
    getUserSession();
  }, []);

  return { id, name, firstName, lastName, email, avatar };
}

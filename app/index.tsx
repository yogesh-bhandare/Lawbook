import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function index() {
  const { isSignedIn } = useAuth();

  return (
    <>
      <Redirect href={!isSignedIn ? "/(routes)/onboarding" : "/(tabs)"} />
    </>
  );
}

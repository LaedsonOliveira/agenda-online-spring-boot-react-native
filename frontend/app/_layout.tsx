import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Slot } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return <Slot />;
}
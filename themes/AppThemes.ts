import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "#fff",
      text: "#fff",
    },
  }

 export const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#f5f5f5",
      text: "#191919",
      border: "#D9D9D9",
      primary: "#00CCBB",
    },
  };
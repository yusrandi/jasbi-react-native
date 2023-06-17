import { DefaultTheme, Theme } from "@react-navigation/native";
import { CustomDefaultTheme } from "../themes/AppThemes";
import { SwitchThemeAction, THEME_ACTION_TYPES, ThemeState } from "./action";
import { createSlice } from '@reduxjs/toolkit'

export const initialState: ThemeState = {
    isDark: false,
    theme: CustomDefaultTheme
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    },
  })

export const { setTheme} = themeSlice.actions
export const selectTheme = (state: ThemeState) => state.theme.theme

export default themeSlice.reducer


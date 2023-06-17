import { Theme } from "@react-navigation/native";

export type LoginState = {
    isDark : boolean,
    theme: Theme
};

export enum THEME_ACTION_TYPES {
    SWITCH_THEME = 'SWITCH_THEME' ,
}

export type SwitchThemeAction = {
    type: string;
    theme: Theme;
}
export const switchTheme = (theme: Theme): SwitchThemeAction => ({
    type: THEME_ACTION_TYPES.SWITCH_THEME,
    theme: theme
});

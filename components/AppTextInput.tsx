import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { useTheme } from "@react-navigation/native";

const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const { colors } = useTheme();

  return (
    <TextInput

      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      returnKeyType="next"
      placeholderTextColor={colors.text}
      style={[
        {
          fontFamily: Font["poppins-regular"],
          fontSize: FontSize.small,
          padding: Spacing * 2,
          backgroundColor: colors.card,
          borderRadius: Spacing * Spacing,
          marginVertical: 4,
          borderWidth: 1,
          borderColor: colors.border,
        },
        focused && {
          borderWidth: 3,
          borderColor: colors.primary,
          shadowOffset: { width: 4, height: Spacing },
          shadowColor: colors.primary,
          shadowOpacity: 0.2,
          shadowRadius: Spacing * Spacing,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/FontAwesome";


const AppTextInputPassword: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [hidePass, setHidePass] = useState(true);
  const { colors } = useTheme();

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIconColor, setRightIconColor] = useState('#0C8A7B');

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);

  };

  return (
    <View style={[
      {
        flexDirection: 'row',
        padding: Spacing * 2,
        backgroundColor: colors.card,
        borderRadius: Spacing * Spacing,
        marginVertical: 4,
      },
      focused && {
        borderWidth: 3,
        borderColor: colors.primary,
        shadowOffset: { width: 4, height: Spacing },
        shadowColor: colors.primary,
        shadowOpacity: 0.2,
        shadowRadius: Spacing * Spacing,
      },
    ]}>
      <TextInput

        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="next"
        placeholderTextColor={colors.text}
        secureTextEntry={passwordVisibility}

        style={[
          {
            flex: 1,
            fontFamily: Font["poppins-regular"],
            fontSize: FontSize.small,
            backgroundColor: colors.card,
            borderRadius: Spacing * Spacing,
          },

        ]}

        {...otherProps}
      />
      <TouchableOpacity
        onPress={handlePasswordVisibility}>
        <Icons name={passwordVisibility ? 'eye' : 'eye-slash'} size={20} color='grey' />
      </TouchableOpacity>
    </View>

  );
};

export default AppTextInputPassword;

const styles = StyleSheet.create({});

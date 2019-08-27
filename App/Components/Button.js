import React from "react";
import { Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./Styles/ButtonStyle";

const Button = React.memo(({ text, colors, onPress, disabled, ...rest }) => (
  <TouchableOpacity
    disabled={disabled}
    activeOpacity={0.4}
    onPress={() => {
      onPress();
    }}
    {...rest}
  >
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientButton}
      colors={colors || ["#8ea2ff", "#557ac7"]}
    >
      <Text style={styles.gradientButtonText}>{text}</Text>
    </LinearGradient>
  </TouchableOpacity>
));

export default Button;

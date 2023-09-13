import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useTheme, TouchableRipple} from 'react-native-paper';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  buttonStyle,
  labelStyle,
}) => {
  const theme = useTheme();
  return (
    <TouchableRipple
      rippleColor={theme.colors.inversePrimary}
      onPress={onPress}
      style={[styles.button, {backgroundColor: theme.colors.primary}]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    padding: 40,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;

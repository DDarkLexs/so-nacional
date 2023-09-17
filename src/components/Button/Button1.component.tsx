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
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  buttonStyle,
  labelStyle,
  disabled = false,
}) => {
  const theme = useTheme();
  return (
    <TouchableRipple
      disabled={disabled}
      rippleColor={'white'}
      onPress={onPress}
      style={[
        styles.button,
        {backgroundColor: !disabled ? theme.colors.secondary : 'gray'},
      ]}>
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

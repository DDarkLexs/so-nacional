import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useTheme, TouchableRipple, Surface} from 'react-native-paper';

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
    <Surface style={styles.ButtonContainer}>
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
    </Surface>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: 'blue',
    marginBottom: 26,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 6,
    padding: 12,
  },
  ButtonContainer: {
    borderRadius: 5,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;

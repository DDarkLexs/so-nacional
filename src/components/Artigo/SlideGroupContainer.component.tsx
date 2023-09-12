import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {TouchableRipple, Text, useTheme} from 'react-native-paper';

const SlideGroupContainer = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const theme = useTheme();
  // Array of button labels
  const buttons = ['Frutas', 'Hortaliças', 'Cereais', 'teste', 'teste'];

  const handleButtonPress = (index: number) => {
    setActiveButtonIndex(index);
    // You can add additional logic here when a button is pressed
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {buttons.map((label, index) => (
          <TouchableRipple
            key={index}
            onPress={() => handleButtonPress(index)}
            style={[
              styles.button,
              index === activeButtonIndex ? {backgroundColor: '#f2eee8'} : null,
            ]}>
            <View>
              <Text style={styles.buttonContentText}>{label}</Text>
            </View>
          </TouchableRipple>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  button: {
    width: 'auto', // Set the width and height to make it square
    height: 50,
    padding: 10,
    borderRadius: 8, // Adjust the border radius as needed
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    fontWeight: 'bold',
    // Customize the content style inside the square
  },
  buttonContentText: {
    fontWeight: 'bold',
    color: '#615f5f',
    // Customize the content style inside the square
  },
  activeButton: {
    backgroundColor: '#FFD700', // Change to your desired active button color
  },
});

export default SlideGroupContainer;

import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Card, List, Divider, useTheme, Text} from 'react-native-paper';

const MEncomendaScreen = ({navigation}: any) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text>Minhas Encomendas</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

export default MEncomendaScreen;

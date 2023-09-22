import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MinhaEncomendaDataTable from '../../../Layout/Encomendas/DataTable.component';

const MEncomendaScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Searchbar
          placeholder="procurar"
          mode="view"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <MinhaEncomendaDataTable procurar={searchQuery} navigation={navigation} />
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

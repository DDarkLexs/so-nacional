import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Button, Title, Text, TouchableRipple} from 'react-native-paper';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';

const TransferenciaBancariaScreen = () => {
  return (
    <View style={styles.container}>
      <Card mode="outlined" style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>IBAN:</Text>
          <Text style={styles.value}>XXXX XXXX XXXX XXXX</Text>

          <Text style={styles.label}>Titular:</Text>
          <Text style={styles.value}>Nome do Titular</Text>

          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>{convertToCurrency(1000)}</Text>
        </Card.Content>
      </Card>

      <Text style={styles.instructions}>
        Transfira os valores para o IBAN acima e anexe o comprovativo abaixo
      </Text>

      <TouchableRipple onPress={() => {}} style={styles.uploadButton}>
        <View>
          <Text style={styles.uploadText}>Clique para fazer upload</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  card: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Cor do rótulo em negrito
  },
  value: {
    fontSize: 16,
    color: 'gray', // Cor do valor em cinza
    marginBottom: 8, // Espaçamento entre o rótulo e o valor
  },
  uploadButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderRadius: 5,
    padding: 16,
    // marginBottom: 16,
  },
  uploadText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default TransferenciaBancariaScreen;

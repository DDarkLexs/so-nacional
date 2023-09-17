import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Card, Dialog, IconButton} from 'react-native-paper';
import {Button, Text, useTheme, TouchableRipple} from 'react-native-paper';
import { useAppDispatch } from '../../store/hook/index.hook';

const PagamentoScreen = () => {
  const theme = useTheme();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para controlar a desativação do botão
  const dispatch = useAppDispatch();
  const handleMethodSelect = (index: any) => {
    setSelectedMethod(index);
    setIsButtonDisabled(false); // Ativar o botão quando um método é selecionado
  };

  useEffect(() => {
    if (selectedMethod) {
      console.log(methods[selectedMethod]);
    }
  }, [selectedMethod]);

  const methods = [
    // {
    //   name: 'TPA na entrega',
    //   image: require('../../assets/image/fruits/banana.png'),
    // },
    {
      name: 'Transferência Bancária',
      value: 'Transferência Bancária',
      icon: 'credit-card-wireless',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 16}} variant="titleLarge">
        Selecione uma forma de pagamento
      </Text>

      {methods.map((method, index) => (
        <TouchableRipple
          key={index}
          onPress={() => handleMethodSelect(index)}
          rippleColor={theme.colors.primary}
          style={[
            styles.card,
            selectedMethod === index
              ? {backgroundColor: theme.colors.primary}
              : {backgroundColor: theme.colors.background},
          ]}>
          <Card.Content>
            <View style={styles.cardContent}>
              <IconButton
                iconColor={selectedMethod === index ? 'white' : undefined}
                icon={method.icon}
              />
              <Text
                style={[
                  styles.cardText,
                  selectedMethod === index ? {color: 'white'} : null,
                ]}>
                {method.name}
              </Text>
            </View>
          </Card.Content>
        </TouchableRipple>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  confirmButtonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
  },
  confirmButton: {
    width: '100%',
  },
});

export default PagamentoScreen;

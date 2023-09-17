import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  IconButton,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Import SkeletonPlaceholder
import {EnderecoController} from '../../controller/endereco/endereco.controller';
import {Endereco} from '../../model/endereco.model';
import {showToast} from '../../service/toast.service';
import {useAppDispatch, useAppSelector} from '../../store/hook/index.hook';
import {setEncomendaInfo} from '../../store/reducer/encomenda.store';
import {setEndereco} from '../../store/reducer/endereco.store';

interface MetodoEntrega {
  id: number;
  name: string;
  icon: string;
}

const DadosDeEntrega: React.FC<any> = ({navigation}): JSX.Element => {
  const theme = useTheme();
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [selectedEndereco, setSelectedEndereco] = useState<Endereco>();
  const [loading, setLoading] = useState(false); // Estado para controlar a desativação do botão
  const controller = new EnderecoController();
  const dispatch = useAppDispatch();
  const enderecos = useAppSelector(state => state.endereco.endereco);

  const handleMethodSelect = (index: number) => {
    setSelectedMethod(index);
    switch (index) {
      case 0:
        getEnderecos();
        break;

      default:
        dispatch(setEndereco([]));
        break;
    }
  };

  const methods = [
    {
      id: 1,
      name: 'Entrega ao domicilio',
      icon: 'truck-fast',
    },
  ];

  const getEnderecos = async () => {
    try {
      setLoading(true);
      await controller.getEnderecoAllByUser();
      dispatch(setEndereco(controller.enderecos));
    } catch (error) {
      showToast({
        text1: 'Houve erro!',
        text2: `${error}`,
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const prosseguir = () => {
    if (selectedEndereco) {
      const {id_endereco, id_user} = selectedEndereco;
      dispatch(setEncomendaInfo({id_endereco, id_user}));
      navigation.navigate('ResumoCompra');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{marginBottom: 20}} variant="titleLarge">
        Selecione uma opção de entrega
      </Text>

      {methods.map((method, index) => (
        <Surface
          key={index}
          onTouchStart={() => handleMethodSelect(index)}
          style={[
            styles.card,
            selectedMethod === index
              ? [styles.cardSelected, {borderColor: theme.colors.secondary}]
              : undefined,
          ]}>
          <Card.Content>
            <View style={styles.cardContent}>
              <IconButton size={70} icon={method.icon} />
              <Text variant="titleMedium" style={[styles.cardText]}>
                {method.name}
              </Text>
            </View>
          </Card.Content>
        </Surface>
      ))}

      {selectedMethod == 0 && (
        <Text style={{marginVertical: 20}} variant="titleLarge">
          Selecione um Endereço
        </Text>
      )}

      {selectedMethod == 0 &&
        (loading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="column" marginTop={20}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                marginTop={0}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                marginTop={20}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          enderecos.map((method, index) => (
            <Surface
              onTouchStart={() => {
                setSelectedEndereco(method);
              }}
              key={index}
              style={[
                styles.card1,
                enderecos.findIndex(
                  state => state.id_endereco === selectedEndereco?.id_endereco,
                ) === index
                  ? [styles.cardSelected, {borderColor: theme.colors.secondary}]
                  : undefined,
              ]}>
              <Card.Content>
                <View>
                  <Text variant="bodyMedium" style={[styles.cardText1]}>
                    Bairro: {method.bairro}
                  </Text>
                  <Text variant="bodyMedium" style={[styles.cardText1]}>
                    designação: {method.designacao}
                  </Text>
                  <Text variant="bodyMedium" style={[styles.cardText1]}>
                    morada: {method.nome_morada}
                  </Text>
                  <Text variant="bodyMedium" style={[styles.cardText1]}>
                    Referência: {method.ponto_ref}
                  </Text>
                  {/* <Text variant='bodyMedium' style={[styles.cardText]}></Text> */}
                </View>
              </Card.Content>
            </Surface>
          ))
        ))}

      <View style={styles.confirmButtonContainer}>
        <Button
          style={styles.confirmButton}
          mode="contained-tonal"
          buttonColor={theme.colors.secondary}
          textColor="white"
          disabled={loading || !selectedEndereco}
          onPress={prosseguir}>
          Continuar
        </Button>
      </View>
    </ScrollView>
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
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#a2a0a08c',
    borderStyle: 'solid',
  },
  card1: {
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#a2a0a08c',
    borderStyle: 'solid',
  },
  cardSelected: {
    borderWidth: 3,
    borderStyle: 'solid',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardText: {
    padding: 10,
  },
  cardText1: {
    padding: 3,
  },
  confirmButtonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
  },
  confirmButton: {
    marginBottom: 50,
    width: '100%',
  },
});

export default DadosDeEntrega;

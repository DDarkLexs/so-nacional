import * as React from 'react';
import {View, StyleSheet, Alert, Image, Animated} from 'react-native';
import {Card, IconButton, Text, TouchableRipple} from 'react-native-paper';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {useState, useEffect} from 'react';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {extrairTipoDeImagem} from '../../utils/index.utils';
import {showToast} from '../../service/toast.service';
import {Loja} from '../../@types/model/loja.model';
import axiosIns from '../../api/axiosIns.api';
import {useAppDispatch, useAppSelector} from '../../@types/redux/hook/index.hook';
import {setComprovativo} from '../../store/reducer/encomenda.reducer';

const TransferenciaBancariaScreen = () => {
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [loja, setLoja] = useState<Partial<Loja>>({});
  const dispatch = useAppDispatch();
  const encomenda = useAppSelector(state => state.encomenda.encomenda);
  const file = useAppSelector(state => state.encomenda.comprovativo);
  const loading = useAppSelector(state => state.encomenda.loading);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        presentationStyle: 'pageSheet',
        allowMultiSelection: false,
        transitionStyle: 'coverVertical',
      });
      dispatch(setComprovativo(result[0]));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picker cancelled.');

        dispatch(setComprovativo({}));
      } else {
        dispatch(setComprovativo({}));
        showToast({
          text1: 'Houve um erro!',
          text2: `${JSON.stringify(err)}`,
          position: 'bottom',
          type: 'error',
        });
      }
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const dadosLoja = (await axiosIns.get('/dadosloja')).data.data[0];
      setLoja(dadosLoja);
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: `${JSON.stringify(error)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (file.uri) {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        // delay:1000
      }).start();
    }
  }, [file.uri, fadeAnimation]);

  return (
    <View style={styles.container}>
      <Card disabled={loading} mode="outlined" style={styles.card}>
        <Card.Content>
          <Text disabled={loading} style={styles.label}> IBAN </Text>
          <Text disabled={loading} style={styles.value}>{loja.iban}</Text>

          <Text disabled={loading} style={styles.label}> Titular </Text>
          <Text disabled={loading} style={styles.value}>{loja.titular}</Text>

          <Text disabled={loading} style={styles.label}> Valor </Text>
          <Text disabled={loading} style={styles.value}>{convertToCurrency(encomenda.total)}</Text>
        </Card.Content>
      </Card>

      <Text disabled={loading} style={styles.instructions}>
        Transfira os valores para o IBAN acima e anexe o comprovativo abaixo
      </Text>

      <TouchableRipple disabled={loading} onPress={handleDocumentPick} style={styles.uploadButton}>
        <View style={styles.uploadButtonContent}>
          {file.uri && extrairTipoDeImagem(String(file.type)) === 'image' ? (
            <Animated.Image
              source={{uri: file.uri}}
              style={[styles.uploadedDocumentImage, {opacity: fadeAnimation}]}
            />
          ) : (
            !file.uri ||
            (file.type == 'application/pdf' && (
              <IconButton disabled={loading} icon="file-pdf-box" size={60} />
            ))
          )}
          {file.uri && (
            <Animated.Text
              style={[styles.uploadedDocumentText, {opacity: fadeAnimation}]}>
              {file.name}
            </Animated.Text>
          )}
          {!file.uri && (
            <Text style={styles.uploadText}>Clique para fazer upload</Text>
          )}
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  card: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 8,
  },
  uploadButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
  },
  uploadButtonContent: {
    alignItems: 'center',
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
  uploadedDocumentContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadedDocumentImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginBottom: 15,
  },
  uploadedDocumentText: {
    fontSize: 16,
  },
});

export default TransferenciaBancariaScreen;

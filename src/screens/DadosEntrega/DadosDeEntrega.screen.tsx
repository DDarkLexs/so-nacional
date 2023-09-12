import {FC, JSX} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';

const DadosDeEntrega: FC<any> = ({navigation}): JSX.Element => {
  const theme = useTheme();

  return (
    <>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            label="Pessoa de contacto"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Telefone"
            mode="outlined"
            keyboardType='number-pad'
            inputMode="numeric"
            style={styles.input}
          />
          <TextInput
            label="Morada"
            multiline={true}
            numberOfLines={5}
            mode="outlined"
            style={styles.input}
          />
        </View>

        <View style={styles.confirmButtonContainer}>
          <Button
            style={styles.confirmButton}
            mode="contained-tonal"
            buttonColor={theme.colors.primary}
            textColor="white"
            onPress={() => navigation.navigate('ResumoCompra')}>
            Confirmar
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    flex: 1,
    alignSelf: 'center',
    width: '90%',
  },
  confirmButtonContainer: {
    flex: 1,
    alignContent: 'flex-end',
    alignItems: 'stretch',
  },
  input: {
    margin: 5,
  },
  inputContainer: {
    padding: 20,
  },
});
export default DadosDeEntrega;

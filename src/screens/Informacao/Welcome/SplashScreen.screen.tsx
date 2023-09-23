import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useTheme, ActivityIndicator} from 'react-native-paper';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    // Simulate loading process
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000); // 3 segundos de simulação de carregamento
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/image/logo_1.png')} // Substitua pelo caminho da sua imagem
        style={styles.image}
      />
      {isLoading ? (
        <ActivityIndicator  size="large" color={theme.colors.primary} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cdbea9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default SplashScreen;

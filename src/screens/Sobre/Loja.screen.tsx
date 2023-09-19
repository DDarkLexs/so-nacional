import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axiosIns from '../../api/axiosIns.api';

interface LojaInfo {
  taxa_servico: string;
  iban: string;
  nome_loja: string;
  titular: string;
}

const LojaScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [lojaInfo, setLojaInfo] = useState<LojaInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await axiosIns.get('/dadosloja')).data;
        setLojaInfo(response.data[0]);
        // console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {loading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              flexDirection="column"
              alignItems="center">
              <SkeletonPlaceholder.Item
                width={200}
                height={30}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width={300}
                height={20}
                marginBottom={5}
              />
              <SkeletonPlaceholder.Item
                width={300}
                height={20}
                marginBottom={5}
              />
              <SkeletonPlaceholder.Item
                width={300}
                height={20}
                marginBottom={5}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Text style={styles.title}>{lojaInfo?.nome_loja}</Text>
            <Text style={styles.info}>
              Taxa de Serviço: {lojaInfo?.taxa_servico}%{' '}
            </Text>
            <Text style={styles.info}>IBAN: {lojaInfo?.iban}</Text>
            <Text style={styles.info}>Titular: {lojaInfo?.titular}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default LojaScreen;

import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ContactoScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay to show the loading skeleton
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
 <SkeletonPlaceholder>
 <React.Fragment>
   { [1, 2, 3].map((_, index) => (
     <SkeletonPlaceholder.Item
       key={index}
       width="100%"
       height={50}
       marginTop={20}
       marginBottom={20}
       borderRadius={10}
     />
   ))}
 </React.Fragment>
</SkeletonPlaceholder>

  
      ) : (
        <>
          <List.Item
            title="Endereço"
            description="1234 Rua da Amostra, Cidade, País"
            left={() => <List.Icon icon="map-marker" />}
          />
          <List.Item
            title="Telefone"
            description="+1234567890"
            left={() => <List.Icon icon="phone" />}
          />
          <List.Item
            title="Email"
            description="exemplo@dominio.com"
            left={() => <List.Icon icon="email" />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default ContactoScreen;

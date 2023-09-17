import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Text, Paragraph} from 'react-native-paper';

const TermsAndConditionsPage: React.FC<any> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* <Text style={styles.title}>Termos e Condições de Uso</Text> */}
        <Paragraph style={styles.paragraph}>
          Bem-vindo aos nossos Termos e Condições de Uso. Ao acessar ou usar
          nosso aplicativo, você concorda em cumprir estes termos e todas as
          leis e regulamentos aplicáveis.
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est. Qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur. Quis autem vel eum
          iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
          consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
          pariatur
        </Paragraph>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 12,
  },
});

export default TermsAndConditionsPage;

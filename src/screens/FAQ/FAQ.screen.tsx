import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Card, Divider, Paragraph} from 'react-native-paper';

const FAQPage = () => {
  const faqData = [
    {
      question: 'Como faço para criar uma conta?',
      answer:
        'Para criar uma conta, vá para a página de registro e preencha os campos necessários.',
    },
    {
      question: 'Posso alterar minha senha?',
      answer:
        'Sim, você pode alterar sua senha nas configurações da sua conta.',
    },
    {
      question: 'Como faço para redefinir minha senha esquecida?',
      answer:
        'Na tela de login, clique em "Esqueceu a senha?" e siga as instruções para redefinir sua senha.',
    },
    // Adicione mais perguntas e respostas aqui...
  ];

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Perguntas Frequentes" />
      </Appbar.Header>
      <ScrollView style={styles.scrollView}>
        {faqData.map((item, index) => (
          <Card mode="outlined" key={index} style={styles.card}>
            <Card.Content>
              <Card.Title title={item.question} titleStyle={styles.question} />
              <Divider style={styles.divider} />
              <Paragraph style={styles.answer}>{item.answer}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  question: {
    fontWeight: 'bold',
  },
  answer: {
    marginBottom: 12,
  },
  divider: {
    marginVertical: 8,
  },
});

export default FAQPage;

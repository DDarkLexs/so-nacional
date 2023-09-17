import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import {Appbar, Card, Divider, Paragraph, Text} from 'react-native-paper';
import axiosIns from '../../../api/axiosIns.api';
import {showToast} from '../../../service/toast.service';

interface faqProp {
  pergunta: string;
  resposta: string;
}

const FAQPage = (): React.JSX.Element => {
  const [faqs, setFaqs] = useState<faqProp[]>([]);

  const getFAQ = async (): Promise<void> => {
    try {
      const response = (await axiosIns.get('/perguntasfrequentes')).data.data;
      setFaqs(response);
    } catch (error) {
      showToast({
        text1: 'Houve um erro!',
        text2: JSON.stringify(error),
        position: 'bottom',
        type: 'error',
      });
    }
  };
  useEffect(() => {
    getFAQ();
  }, []);
  return (
    <>
      <ScrollView style={styles.scrollView}>
        {faqs.map((faq, index) => (
          <Card mode="outlined" key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.question}>{faq.pergunta}</Text>
              <Divider style={styles.divider} />
              <Paragraph style={styles.answer}>{faq.resposta}</Paragraph>
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

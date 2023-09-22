import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { Appbar, Card, Divider, Paragraph, Text } from 'react-native-paper';
import axiosIns from '../../../api/axiosIns.api';
import { showToast } from '../../../service/toast.service';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Import SkeletonPlaceholder

interface faqProp {
  pergunta: string;
  resposta: string;
}

const FAQPage = (): React.JSX.Element => {
  const [faqs, setFaqs] = useState<faqProp[]>([]);
  const [loading, setLoading] = useState(true);

  const getFAQ = async (): Promise<void> => {
    try {
      const response = (await axiosIns.get('/perguntasfrequentes')).data.data;
      setFaqs(response);
      setLoading(false);
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
        {loading ? (
          <SkeletonPlaceholder>
            <View>

              <Card mode="outlined"  style={styles.card}>
                <Card.Content>
                  {/* <SkeletonPlaceholder.Item width="80%" height={20} /> */}
                  <SkeletonPlaceholder.Item width="100%" height={150} />
                </Card.Content>
              </Card>
              <Card mode="outlined"  style={styles.card}>
                <Card.Content>
                  {/* <SkeletonPlaceholder.Item width="80%" height={20} /> */}
                  <SkeletonPlaceholder.Item width="100%" height={150} />
                </Card.Content>
              </Card>
              <Card mode="outlined"  style={styles.card}>
                <Card.Content>
                  {/* <SkeletonPlaceholder.Item width="80%" height={20} /> */}
                  <SkeletonPlaceholder.Item width="100%" height={150} />
                </Card.Content>
              </Card>
              <Card mode="outlined"  style={styles.card}>
                <Card.Content>
                  {/* <SkeletonPlaceholder.Item width="80%" height={20} /> */}
                  <SkeletonPlaceholder.Item width="100%" height={150} />
                </Card.Content>
              </Card>
              <Card mode="outlined"  style={styles.card}>
                <Card.Content>
                  {/* <SkeletonPlaceholder.Item width="80%" height={20} /> */}
                  <SkeletonPlaceholder.Item width="100%" height={50} />
                </Card.Content>
              </Card>
            </View>

          </SkeletonPlaceholder>
        ) : (
          faqs.map((faq, index) => (
            <Card mode="outlined" key={index} style={styles.card}>
              <Card.Content>
                <Text style={styles.question}>{faq.pergunta}</Text>
                <Divider style={styles.divider} />
                <Paragraph style={styles.answer}>{faq.resposta}</Paragraph>
              </Card.Content>
            </Card>
          ))
        )}
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
    borderRadius: 20
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

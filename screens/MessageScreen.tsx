import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LexendText from '../components/LexendText';
import ManropeText from '../components/ManropeText';
import { COLORS } from '../constants/colors';

const MessageScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LexendText style={styles.header}>
          This Feature Is Coming Soon!
        </LexendText>
        <ManropeText style={styles.content}>
          {`We're currently developing this functionality.\nThank you for your understanding as we work to deliver the best possible experience.`}
        </ManropeText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    textAlign: 'center',
    color: COLORS.violet200,
  },
});
export default MessageScreen;

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, Fragment } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import Button from '../Button';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

type AuthStackParamList = {
  login: undefined;
};

const StepOnboard: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <Fragment>
      <View style={styles.container}>
        <ImageBackground
          style={styles.cardImage}
          source={require('../../assets/images/onboarding-bg.png')}
          resizeMode="contain"
        >
          <LexendText
            style={[styles.title, styles.titleText]}
            fontWeight="bold"
          >
            All Done!
          </LexendText>
          <ManropeText style={styles.subtitle}>
            {`Welcome to limitless \nopportunities!`}
          </ManropeText>
        </ImageBackground>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          style={styles.continueButton}
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </Fragment>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardImage: {
    height: height * 0.75,
    width: width * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 15,
    lineHeight: 48,
  },
  titleText: {
    marginHorizontal: 10,
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    bottom: 10,
    fontSize: 17,
    margin: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.05,
  },
  continueButton: {
    width: '100%',
    marginVertical: 10,
  },
});

export default StepOnboard;

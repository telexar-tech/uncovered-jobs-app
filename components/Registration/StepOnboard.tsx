import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { AuthStackParamList } from '../../navigation/types';
import { scale } from '../../utils/scale';
import { storeData } from '../../utils/storage';
import Button from '../Button';
import LexendText from '../LexendText';
import ManropeText from '../ManropeText';

const StepOnboard: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.cardImage}
        source={require('../../assets/images/onboarding-bg.png')}
        resizeMode="cover"
      >
        <LexendText style={[styles.title, styles.titleText]} fontWeight="bold">
          All Done!
        </LexendText>
        <ManropeText style={styles.subtitle}>
          {`Welcome to limitless 
opportunities!`}
        </ManropeText>
      </ImageBackground>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          style={styles.continueButton}
          onPress={async () => {
            await storeData('onboarded', 'true');
            navigation.navigate('Subscribe');
          }}
        />
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: {
    flex: 1,
    width: width * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    fontSize: scale(36),
    marginTop: 20,
    marginBottom: 15,
      lineHeight: scale(40),
  },
  titleText: {
    marginHorizontal: 10,
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    bottom: 10,
    fontSize: scale(15),
    margin: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 20,
  },
  continueButton: {
    width: '100%',
  },
});

export default StepOnboard;

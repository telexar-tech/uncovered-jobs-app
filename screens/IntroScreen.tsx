import { FC, Fragment, useMemo, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import IntroSlider from '../components/IntroSlider';
import LexendText from '../components/LexendText';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../constants/theme';

const IntroScreen: FC = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  const [showSlider, setShowSlider] = useState(false);
  
  const handleGetStarted = () => {
    setShowSlider(true);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {!showSlider ? (
        <Fragment>
          <View style={styles.cardContainer}>
            <ImageBackground
              style={styles.cardImage}
              source={require('../assets/images/intro-bg.png')}
              resizeMode="contain"
            >
              <LexendText style={styles.title} fontWeight="bold">
                Uncovered Jobs
              </LexendText>
            </ImageBackground>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleGetStarted} title="Get Started" />
          </View>
        </Fragment>
      ) : (
        <IntroSlider onReset={() => setShowSlider(false)} />
      )}
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get('window');

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background.primary,
    },
    cardContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardImage: {
      height: height * 0.9,
      width: width * 0.9,
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      margin: 10,
    },
    buttonContainer: {
      width: '100%',
      paddingHorizontal: width * 0.05,
      paddingBottom: height * 0.05,
    },
    title: {
      fontSize: 36,
      textAlign: 'center',
      marginBottom: 20,
      color: theme.colors.neutral.white,
    },
  });

export default IntroScreen;

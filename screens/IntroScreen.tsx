import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC, useEffect, useMemo, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import IntroSlider from '../components/IntroSlider';
import LexendText from '../components/LexendText';
import { ThemeType } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { AuthStackParamList } from '../navigation/types';
import { scale } from '../utils/scale';
import { retrieveData, storeData } from '../utils/storage';

const IntroScreen: FC = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [showSlider, setShowSlider] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const introShown = await retrieveData('introShown');
        if (introShown === 'true') {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          );
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking intro status:', error);
        setLoading(false);
      }
    };

    checkIntroStatus();
  }, [navigation]);

  const handleGetStarted = () => {
    setShowSlider(true);
  };

  const handleLogin = async () => {
    await storeData('introShown', 'true');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }),
    );
  };

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!showSlider ? (
        <>
          <ImageBackground
            style={styles.cardImage}
            source={require('../assets/images/intro-bg.png')}
            resizeMode="cover"
          >
            <LexendText style={styles.title} fontWeight="bold">
              Uncovered Jobs
            </LexendText>
          </ImageBackground>

          <View style={styles.buttonContainer}>
            <Button onPress={handleGetStarted} title="Get Started" />
            <Button
              onPress={handleLogin}
              title="Login"
              buttonType="light-bordered"
              style={styles.button}
            />
          </View>
        </>
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
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardImage: {
      height: height * 0.8,
      width: width * 0.9,
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 15,
      gap: 10,
    },
    button: { flex: 1 },
    title: {
      fontSize: scale(32),
      lineHeight: scale(48),
      textAlign: 'center',
      marginTop: 50,
      color: theme.colors.neutral.white,
    },
  });

export default IntroScreen;

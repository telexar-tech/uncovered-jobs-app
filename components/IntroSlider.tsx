import { CommonActions, useNavigation } from '@react-navigation/native';
import { FC, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeType } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { storeData } from '../utils/storage';
import Button from './Button';
import LexendText from './LexendText';
import ManropeText from './ManropeText';
import { scale } from '../utils/scale';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: ReturnType<typeof require>;
}

const SLIDE_DATA: Slide[] = [
  {
    id: 1,
    title: 'Find limitless jobs',
    description:
      'No matter the type of work, we offer an endless variety of job categories for you!',
    image: require('../assets/images/intro-slider/slide1.png'),
  },
  {
    id: 2,
    title: 'Post the job and get it done!',
    description:
      'Post a job and connect with countless workers ready to assist you with your job!',
    image: require('../assets/images/intro-slider/slide2.png'),
  },
  {
    id: 3,
    title: 'Instant Jobs, Instant Pay!',
    description:
      'You can directly get your payment for your accounts without any commission',
    image: require('../assets/images/intro-slider/slide3.png'),
  },
  {
    id: 4,
    title: 'Just £5 for Unlimited Jobs!',
    description:
      'Subscribe us only with £5.00 pre monthly to access more than 10000+ jobs',
    image: require('../assets/images/intro-slider/slide4.png'),
  },
  {
    id: 5,
    title: 'Let’s find & post your JOB!',
    description: 'Start your earnings today!',
    image: require('../assets/images/intro-slider/slide5.png'),
  },
];

interface PaginationProps {
  activeIndex: number;
  onPaginationPress: (index: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  activeIndex,
  onPaginationPress,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.paginationContainer}>
      {SLIDE_DATA.map((_, index) => (
        <Pressable
          onPress={() => onPaginationPress(index)}
          key={index}
          style={[
            styles.pagination,
            activeIndex === index
              ? styles.paginationActive
              : styles.paginationInactive,
          ]}
        />
      ))}
    </View>
  );
};

interface IntroSliderProps {
  onReset: () => void;
}

const IntroSlider: FC<IntroSliderProps> = ({ onReset }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const flatListRef = useRef<FlatList>(null);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  const lastSlideIndex = SLIDE_DATA.length - 1;

  const handleBackPress = () => {
    if (activeIndex === 0) {
      onReset();
    } else {
      const newIndex = activeIndex - 1;
      flatListRef.current?.scrollToIndex({ index: newIndex });
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleNextPress = () => {
    if (activeIndex === lastSlideIndex) {
      redirectToRegister();
    } else {
      const newIndex = activeIndex + 1;
      if (newIndex < SLIDE_DATA.length) {
        flatListRef.current?.scrollToIndex({ index: newIndex });
        setActiveIndex(newIndex);
      }
    }
  };

  const handleSkipPress = () => redirectToRegister();

  const redirectToRegister = async () => {
    await storeData('introShown', 'true');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Register' }],
      }),
    );
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const handlePaginationPress = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({ index });
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={[styles.slideContainer, { width }]}>
      <Image
        source={item.image}
        style={styles.slideImage}
        resizeMode="contain"
      />
      <View>
        <LexendText
          fontWeight="bold"
          style={[styles.slideTitle, styles.slideTitleColor]}
        >
          {item.title}
        </LexendText>

        <ManropeText
          style={[styles.slideDescription, styles.slideDescriptionColor]}
        >
          {item.description}
        </ManropeText>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, styles.containerBackground]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon
            name="chevron-back-outline"
            size={24}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>

        {activeIndex < lastSlideIndex ? (
          <TouchableOpacity onPress={handleSkipPress}>
            <ManropeText
              fontWeight="semiBold"
              style={[styles.skipText, styles.skipTextColor]}
            >
              Skip
            </ManropeText>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      <View 
      style={styles.slideWrapper}
      >
        <FlatList
          ref={flatListRef}
          data={SLIDE_DATA}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      <Pagination
        onPaginationPress={handlePaginationPress}
        activeIndex={activeIndex}
      />

      <Button
        title={activeIndex === lastSlideIndex ? 'Get Started' : 'Next'}
        onPress={handleNextPress}
        buttonType="primary"
        style={styles.button}
      />
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 20,
    },
    containerBackground: {
      backgroundColor: theme.colors.background.primary,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    skipText: {
      fontSize: 16,
    },
    skipTextColor: {
      color: theme.colors.text.primary,
    },
    slideWrapper: {flex:1},
    slideContainer: {
      justifyContent: 'space-between',
      alignItems: 'stretch',
      width: '100%',
      padding: 20,
      flex: 1,
    },
    slideImage: {
      height: '65%',
      width: '100%',
      borderRadius: 16,
      overflow: 'hidden',
    },
    slideTitle: {
      fontSize: scale(33),
      lineHeight: scale(38),
      textAlign: 'left',
      marginHorizontal: 8,
    },
    slideTitleColor: {
      color: theme.colors.text.primary,
    },
    slideDescription: {
      fontSize: scale(15),
      marginTop: 20,
      marginHorizontal: 10,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    slideDescriptionColor: {
      color: theme.colors.text.secondary,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
      gap: 10,
    },
    pagination: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    paginationActive: {
      backgroundColor: theme.colors.brand.primary,
    },
    paginationInactive: {
      backgroundColor: '#D9D9D9',
    },
    button: {
      width: 200,
    },
  });

export default IntroSlider;

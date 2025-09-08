import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import LexendText from '../components/LexendText';
import ManropeText from '../components/ManropeText';
import { COLORS } from '../constants/colors';

const FEATURE_LIST = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'];
const PRICE = '£5.00';
const BILLING_CYCLE = 'month';

const FeatureItem: React.FC<{ feature: string }> = ({ feature }) => (
  <View style={styles.featureItem}>
    <Icon name="checkmark-circle-outline" size={18} color={COLORS.violet200} />
    <ManropeText style={styles.featureText}>{feature}</ManropeText>
  </View>
);

type AuthStackParamList = {
  Category: undefined;
};

const SubscribeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <LexendText fontWeight="bold" style={styles.title}>
            Let's Subscribe!
          </LexendText>

          <View style={styles.descriptionContainer}>
            <ManropeText style={styles.subtitle}>
              Let’s subscribe to get transparent details from job creators and
              create your jobs regarding to the
            </ManropeText>
            <TouchableOpacity
              onPress={() => {
                //TODO: Show terms & conditions
              }}
            >
              <ManropeText style={styles.linkText} fontWeight="semiBold">
                terms and conditions.
              </ManropeText>
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <ManropeText style={styles.subtitle}>Only from</ManropeText>
            <View style={styles.priceRow}>
              <LexendText fontWeight="bold" style={styles.priceText}>
                {PRICE}
              </LexendText>
              <LexendText style={styles.billingCycleText}>
                /{BILLING_CYCLE}
              </LexendText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.featuresContainer}>
            <ManropeText style={styles.subtitle}>You can get:</ManropeText>
            {FEATURE_LIST.map((feature, index) => (
              <FeatureItem key={index} feature={feature} />
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              navigation.navigate('Category');
            }}
          >
            <ManropeText style={styles.skipText} fontWeight="medium">
              Skip for now
            </ManropeText>
          </TouchableOpacity>
          <Button
            title={`Pay ${PRICE}`}
            style={styles.continueButton}
            onPress={() => {
              //TODO: Handle next action
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 40,
    marginBottom: 15,
    marginLeft: -4,
  },
  subtitle: {
    color: COLORS.violet300,
    fontSize: 15,
  },
  descriptionContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  priceContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 38,
  },
  billingCycleText: {
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.violet200,
  },
  featuresContainer: {
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  featureText: {
    color: COLORS.violet200,
    fontSize: 15,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  skipButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  skipText: {
    color: COLORS.violet200,
    fontSize: 18,
  },
  continueButton: {
    flex: 1.5,
  },
});

export default SubscribeScreen;

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import LexendText from '../components/LexendText';
import ManropeText from '../components/ManropeText';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/types';

const CATEGORY_LIST = [
  { id: 1, title: 'Accounting & Finance' },
  { id: 2, title: 'Administrative' },
  { id: 3, title: 'Arts and Design' },
  { id: 4, title: 'Business Development' },
  { id: 5, title: 'Customer Service' },
  { id: 6, title: 'Education' },
  { id: 7, title: 'Engineering' },
  { id: 8, title: 'Healthcare' },
  { id: 9, title: 'Human Resources (HR)' },
  { id: 10, title: 'Information Technology (IT)' },
  { id: 11, title: 'Legal' },
  { id: 12, title: 'Marketing' },
  { id: 13, title: 'Project Management' },
  { id: 14, title: 'Sales' },
  { id: 15, title: 'Science and Research' },
];

const CategoryScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    [],
  );

  const [search, setSearch] = React.useState('');

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategories(prevSelected => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter(id => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const filteredCategories = React.useMemo(() => {
    return CATEGORY_LIST.filter(category =>
      category.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <LexendText fontWeight="bold" style={styles.title}>
            Select Preferred Categories
          </LexendText>

          <View style={styles.descriptionContainer}>
            <ManropeText style={styles.subtitle}>
              Select your preferred job categories that you want to get in your
              feed
            </ManropeText>
          </View>
        </View>

        <Searchbar
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          inputMode="search"
          textContentType="jobTitle"
          returnKeyType="search"
          iconColor={COLORS.violet200}
          placeholderTextColor={COLORS.violet200}
          cursorColor={COLORS.primary}
          style={styles.searchBar}
          inputStyle={styles.searchBarInput}
        />
        <ScrollView
          style={styles.categoryScrollView}
          contentContainerStyle={styles.categoryContainer}
        >
          {filteredCategories.map(category => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  isSelected && styles.categoryItemSelected,
                ]}
                onPress={() => handleCategorySelect(category.id)}
              >
                <ManropeText
                  style={[
                    styles.featureText,
                    isSelected && styles.featureTextSelected,
                  ]}
                  fontWeight='semiBold'
                >
                  {category.title}
                </ManropeText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Set & Start"
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'App', params: { screen: 'Explore' } }],
              });
            }}
            style={styles.continueButton}
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
  searchBar: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 99,
    borderColor: COLORS.violet100,
    height: 50,
    marginTop:15,
    marginBottom:10
  },
  searchBarInput: {
    minHeight: 40,
    fontSize: 16,
  },

  categoryScrollView: {
    flexGrow: 1,
    marginVertical: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.violet200,
    marginBottom:5
  },
  categoryItemSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  featureText: {
    fontSize: 16,
  },
  featureTextSelected: {
    color: '#fff',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },

  continueButton: {
    flex: 1,
  },
});

export default CategoryScreen;

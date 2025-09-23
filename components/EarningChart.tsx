import ManropeText from '@/components/ManropeText';
import { ThemeType } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React, { useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const data7Days = {
  labels: ['Sep 9', 'Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15'],
  datasets: [{ data: [20, 35, 30, 50, 40, 25, 50] }],
};

const dataMonthly = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [{ data: [300, 450, 400, 600, 500, 700, 650] }],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  fillShadowGradientFrom: '#649F73',
  fillShadowGradientTo: '#649F73',
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  color: () => '#649F73',
  labelColor: () => '#000',
  barPercentage: 0.5,
  propsForBackgroundLines: {
    stroke: '#e3e3e3',
    strokeDasharray: '',
  },
};

const EarningChart = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [selectedRange, setSelectedRange] = useState<'7days' | 'monthly'>(
    '7days',
  );

  const chartData = selectedRange === '7days' ? data7Days : dataMonthly;

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <ManropeText fontWeight="semiBold" style={styles.title}>
          Earning
        </ManropeText>
        <View style={styles.picker}>
          <Picker
            onValueChange={setSelectedRange}
            selectedValue={selectedRange}
            mode="dropdown"
            dropdownIconColor={theme.colors.text.primary}
          >
            <Picker.Item label="7 days" value="7days" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>
        </View>
      </View>

      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        yAxisLabel=""
        yAxisSuffix=""
        verticalLabelRotation={0}
        fromZero
        withInnerLines={false}
        style={styles.chart}
        flatColor={true}
        showBarTops={false}
      />
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.background.primary,
    },
    title: {
      fontSize: 18,
      color: theme.colors.text.primary,
      marginBottom: 20,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    picker: {
      width: 150,
      borderWidth: 1,
      borderColor: theme.colors.border.secondary,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    chart: {
      borderRadius: 8,
      alignSelf: 'center',
    },
  });

export default EarningChart;

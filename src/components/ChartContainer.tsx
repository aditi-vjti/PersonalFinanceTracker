import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface ChartContainerProps {
  data: number[];
  labels: string[];
}

const ChartContainer: React.FC<ChartContainerProps> = ({ data, labels }) => {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels,
          datasets: [{ data }],
        }}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chart: {
    borderRadius: 8,
  },
});

export default ChartContainer;

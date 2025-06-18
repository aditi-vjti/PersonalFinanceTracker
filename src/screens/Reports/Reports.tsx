import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { TransactionContext } from '../../context/TransactionContext'; // Adjust path if needed
import styles from './Reports.styles';  // Adjust path if needed

// Define the shape of a transaction object
interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
}

const Reports: React.FC = () => {
  const { transactions } = useContext(TransactionContext);  // Correctly access "transactions" from context

  // Ensure `transactions` is an array of `Transaction` objects
  if (!transactions || transactions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Transactions available</Text>
      </View>
    );
  }

  // Prepare data for charts
  const dates: string[] = transactions.map((t: Transaction) => t.date);
  const amounts: number[] = transactions.map((t: Transaction) => t.amount);

  // Calculate income and expenses
  const income: number = transactions
    .filter((t: Transaction) => t.amount > 0)
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const expenses: number = transactions
    .filter((t: Transaction) => t.amount < 0)
    .reduce((sum: number, t: Transaction) => sum + Math.abs(t.amount), 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reports</Text>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Total Income</Text>
          <Text style={styles.value}>${income.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Total Expenses</Text>
          <Text style={styles.value}>${expenses.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Net Savings</Text>
          <Text style={styles.value}>${(income - expenses).toFixed(2)}</Text>
        </View>
      </View>

      {/* Bar Chart for Income/Expenses */}
      <Text style={styles.chartTitle}>Income vs Expenses</Text>
      <BarChart
        data={{
        labels: ['Income', 'Expenses'],  // Data labels
        datasets: [
        {
          data: [income, expenses],  // Data points
        },
        ],
        }}
        width={350}  // Define chart width
        height={220}  // Define chart height
        yAxisLabel="$"  // Y-axis label (currency symbol)
        yAxisSuffix=" USD"  // Add a suffix to the Y-axis values
        chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#f8f9fa',
        backgroundGradientTo: '#f8f9fa',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,  // Bar color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  // Label color
        style: { borderRadius: 16 },
        }}
        style={styles.chart}  // Custom styles for chart
      />


      {/* Line Chart for Spending Trends */}
      <Text style={styles.chartTitle}>Spending Trends</Text>
      <LineChart
        data={{
          labels: dates,  // X-axis labels (dates)
          datasets: [
            {
              data: amounts,  // Y-axis data (amounts)
            },
          ],
        }}
        width={350}  // Define chart width
        height={220}  // Define chart height
        yAxisLabel="$"  // Y-axis label
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#f8f9fa',
          backgroundGradientTo: '#f8f9fa',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,  // Line color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  // Label color
          style: { borderRadius: 16 },
        }}
        style={styles.chart}  // Custom styles for chart
      />
    </ScrollView>
  );
};

export default Reports;

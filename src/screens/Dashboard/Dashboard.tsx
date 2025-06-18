import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ChartContainer from '../../components/ChartContainer';
import TransactionItem from '../../components/TransactionItem';
import CustomButton from '../../components/Custombutton';
import { TransactionContext } from '../../context/TransactionContext';
import styles from './Dashboard.styles'; 

interface transactions {
  id: string;
  date: string;
  amount: number;
  description: string;
}


const Dashboard: React.FC = () => {
  const { transactions, addTransaction } = useContext(TransactionContext);

  // Calculate total income, expenses, and savings
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const savings = income - expenses;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      {/* Overview Section */}
      <View style={styles.overview}>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewLabel}>Income</Text>
          <Text style={styles.income}>${income.toFixed(2)}</Text>
        </View>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewLabel}>Expenses</Text>
          <Text style={styles.expenses}>${expenses.toFixed(2)}</Text>
        </View>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewLabel}>Savings</Text>
          <Text style={styles.savings}>${savings.toFixed(2)}</Text>
        </View>
      </View>

      {/* Chart Section */}
      <ChartContainer
        data={transactions.map((t) => t.amount)}
        labels={transactions.map((t) => t.date)}
      />

      {/* Recent Transactions Section */}
      <Text style={styles.subTitle}>Recent Transactions</Text>
      <FlatList
        data={transactions.slice(0, 5)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            id={item.id}
            description={item.description}
            amount={item.amount}
            date={item.date}
            onEdit={() => console.log(`Edit ${item.id}`)}
            onDelete={() => console.log(`Delete ${item.id}`)}
          />
        )}
      />

      {/* Add Transaction Button */}
      <CustomButton
        title="Add Transaction"
        onPress={() => addTransaction({ id: Date.now().toString(), description: '', amount: 0, date: '' })}
        style={styles.addButton}
      />
    </View>
  );
};

export default Dashboard;

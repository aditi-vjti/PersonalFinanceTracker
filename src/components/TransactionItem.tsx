import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface TransactionItemProps {
  id: string;
  description: string;
  amount: number;
  date: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  description,
  amount,
  date,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.actions}>
        <Button title="Edit" onPress={() => onEdit(id)} />
        <Button title="Delete" onPress={() => onDelete(id)} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 14,
    color: 'green',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default TransactionItem;

import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TransactionItem from '../../components/TransactionItem';
import AddTransactionalModal from '../../components/AddTransactionModal';
import CustomButton from '../../components/Custombutton';
import { TransactionContext } from '../../context/TransactionContext';
import styles from './Transactions.styles';

const Transactions: React.FC = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useContext(TransactionContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState<string | null>(null);

  const handleAddTransaction = (description: string, amount: number, date: string) => {
    if (editTransactionId) {
      updateTransaction(editTransactionId, { description, amount, date });
      setEditTransactionId(null);
    } else {
      addTransaction({ id: Date.now().toString(), description, amount, date });
    }
    setModalVisible(false);
  };

  const handleEditTransaction = (id: string) => {
    setEditTransactionId(id);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            id={item.id}
            description={item.description}
            amount={item.amount}
            date={item.date}
            onEdit={handleEditTransaction}
            onDelete={deleteTransaction}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No transactions found.</Text>}
      />

      {/* Add Transaction Button */}
      <CustomButton
        title="Add Transaction"
        onPress={() => {
          setEditTransactionId(null);
          setModalVisible(true);
        }}
        style={styles.addButton}
      />

      {/* Add/Edit Transaction Modal */}
      <AddTransactionalModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddTransaction}
      />
    </View>
  );
};

export default Transactions;

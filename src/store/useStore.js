import { create } from 'zustand';
import { transactionsData } from '../data/mockData';

export const useStore = create((set) => ({
    role: "viewer",
    transactions: transactionsData,

    setRole: (role) => set({ role }),
// add the new transactions
    addTransaction: (newTransaction) => set((state) => ({
        transactions: [...state.transactions, newTransaction]
    })),

      
  // update existing transactions
  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((item) =>
        item.id === updatedTransaction.id ? updatedTransaction : item
      ),
    })),


}));
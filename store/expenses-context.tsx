import {
  AddExpenseObject,
  ExpenseObject,
} from "@/components/Expenses/ExpensesOutput";
import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [] as ExpenseObject[],
  addExpense: (expense: ExpenseObject) => {},
  setExpenses: (expenses: ExpenseObject[]) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, expense: AddExpenseObject) => {},
});

function expensesReducer(
  state: ExpenseObject[],
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex((expense) => {
        return expense.id === action.payload.id;
      });
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpenseHandler(expense: AddExpenseObject) {
    dispatch({ type: "ADD", payload: expense });
  }

  function setExpenses(expenses: ExpenseObject[]) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpenseHandler(id: string) {
    dispatch({ type: "DELETE", payload: { id: id } });
  }

  function updateExpenseHandler(id: string, expense: AddExpenseObject) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expense } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpenseHandler,
    setExpenses: setExpenses,
    deleteExpense: deleteExpenseHandler,
    updateExpense: updateExpenseHandler,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;

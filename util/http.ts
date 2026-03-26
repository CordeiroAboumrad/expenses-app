import { AddExpenseObject } from "@/components/Expenses/ExpensesOutput";
import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-da22b-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData: AddExpenseObject) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData,
  );
  return response.data;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObject = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObject);
  }

  return expenses;
}

export async function updateExpense(id: string, expenseData: AddExpenseObject) {
  return await axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id: string) {
  return await axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

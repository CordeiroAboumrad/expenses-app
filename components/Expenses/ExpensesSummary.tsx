import { Text, View } from "react-native";
import { ExpensesOutputProps } from "./ExpensesOutput";

function ExpensesSummary({ expenses, periodName }: ExpensesOutputProps) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

import { GlobalStyles } from "@/constants/styles";
import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export interface ExpensesOutputProps {
  expenses: Array<ExpenseObject>;
  periodName?: string;
  fallbackText?: string;
}

export interface AddExpenseObject {
  description: string;
  amount: number;
  date: Date;
}

export interface ExpenseObject {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

function ExpensesOutput({
  expenses,
  periodName,
  fallbackText,
}: ExpensesOutputProps) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} periodName={periodName} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

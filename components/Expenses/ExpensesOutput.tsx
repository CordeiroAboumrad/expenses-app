import { GlobalStyles } from "@/constants/styles";
import { StyleSheet, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export interface ExpensesOutputProps {
  expenses: Array<ExpenseObject>;
  periodName?: string;
}

export interface ExpenseObject {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

function ExpensesOutput({ expenses, periodName }: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} periodName={periodName} />
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
});

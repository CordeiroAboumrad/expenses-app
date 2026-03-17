import { View } from "react-native";
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
    <View>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} periodName={periodName} />
    </View>
  );
}

export default ExpensesOutput;

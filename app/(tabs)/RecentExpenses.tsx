import ExpensesOutput from "@/components/Expenses/ExpensesOutput";
import { DUMMY_EXPENSES } from "./AllExpenses";

function RecentExpenses() {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} periodName="Last 7 Days" />;
}

export default RecentExpenses;

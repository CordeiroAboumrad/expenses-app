import ExpensesOutput from "@/components/Expenses/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { useContext } from "react";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const SevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return expense.date >= SevenDaysAgo && expense.date <= today;
  });

  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" />;
}

export default RecentExpenses;

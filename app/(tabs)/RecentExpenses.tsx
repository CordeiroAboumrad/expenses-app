import ExpensesOutput from "@/components/Expenses/ExpensesOutput";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { ExpensesContext } from "@/store/expenses-context";
import { fetchExpenses } from "@/util/http";
import { useContext, useEffect, useState } from "react";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesContext.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const SevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return expense.date >= SevenDaysAgo && expense.date <= today;
  });

  return isFetching ? (
    <LoadingOverlay />
  ) : (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses found for the selected period"
    />
  );
}

export default RecentExpenses;

import ExpensesOutput from "@/components/Expenses/ExpensesOutput";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { ExpensesContext } from "@/store/expenses-context";
import { fetchExpenses } from "@/util/http";
import { useContext, useEffect, useState } from "react";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const expensesContext = useContext(ExpensesContext);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses.");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

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

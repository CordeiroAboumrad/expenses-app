import ExpensesOutput from "@/components/Expenses/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { fetchExpenses } from "@/util/http";
import { useContext, useEffect, useState } from "react";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  const [fetchedExpenses, setFetchedExpenses] = useState<
    { id: string; amount: any; date: Date; description: any }[]
  >([]);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      setFetchedExpenses(expenses);
    }

    getExpenses();
  }, []);

  const recentExpenses = fetchedExpenses.filter((expense) => {
    const today = new Date();
    const SevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return expense.date >= SevenDaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses found for the selected period"
    />
  );
}

export default RecentExpenses;

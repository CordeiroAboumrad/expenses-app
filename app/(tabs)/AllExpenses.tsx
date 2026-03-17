import ExpensesOutput, {
  ExpenseObject,
} from "@/components/Expenses/ExpensesOutput";

const DUMMY_EXPENSES: ExpenseObject[] = [
  {
    id: "e1",
    description: "Test",
    amount: 60,
    date: new Date("2025-06-07"),
  },
  {
    id: "e2",
    description: "Test 2",
    amount: 19,
    date: new Date("2025-11-26"),
  },
  {
    id: "e3",
    description: "Test 3",
    amount: 630,
    date: new Date("2024-05-14"),
  },
];

function AllExpenses() {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} periodName="Total" />;
}

export default AllExpenses;

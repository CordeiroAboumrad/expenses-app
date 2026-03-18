import { FlatList, ListRenderItemInfo } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { ExpenseObject, ExpensesOutputProps } from "./ExpensesOutput";

function renderExpenseItem(itemData: ListRenderItemInfo<ExpenseObject>) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }: ExpensesOutputProps) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;

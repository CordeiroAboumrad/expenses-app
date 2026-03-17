import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { ExpenseObject, ExpensesOutputProps } from "./ExpensesOutput";

function renderExpenseItem(itemData: ListRenderItemInfo<ExpenseObject>) {
  return <Text>{itemData.item.description}</Text>;
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

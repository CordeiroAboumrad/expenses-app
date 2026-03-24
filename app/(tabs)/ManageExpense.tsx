import { RouteProp } from "@react-navigation/native";
import { Text } from "react-native";
import { RootStackParamList } from "../../App";

type Props = {
  route: RouteProp<RootStackParamList, "ManageExpense">;
};

function ManageExpense({ route }: Props) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  return <Text>Manage Expense Screen</Text>;
}

export default ManageExpense;

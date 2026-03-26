import { AddExpenseObject } from "@/components/Expenses/ExpensesOutput";
import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import IconButton from "@/components/ui/IconButton";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { GlobalStyles } from "@/constants/styles";
import { ExpensesContext } from "@/store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "@/util/http";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";

type Props = {
  route: RouteProp<RootStackParamList, "ManageExpense">;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

function ManageExpense({ route, navigation }: Props) {
  const [isSubmittingState, setIsSubmittingState] = useState(false);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const expenseContext = useContext(ExpensesContext);

  const selectedExpense = expenseContext.expenses.find(
    (expense) => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmittingState(true);
    if (!editedExpenseId) return;
    expenseContext.deleteExpense(editedExpenseId);
    await deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: AddExpenseObject) {
    setIsSubmittingState(true);
    if (isEditing) {
      expenseContext.updateExpense(editedExpenseId, expenseData);
      updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expenseContext.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }

  return isSubmittingState ? (
    <LoadingOverlay />
  ) : (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

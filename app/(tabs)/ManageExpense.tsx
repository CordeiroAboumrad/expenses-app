import { AddExpenseObject } from "@/components/Expenses/ExpensesOutput";
import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
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
  const [error, setError] = useState<string | null>(null);

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
    try {
      expenseContext.deleteExpense(editedExpenseId);
      await deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later.");
      setIsSubmittingState(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmittingState) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: AddExpenseObject) {
    setIsSubmittingState(true);
    if (isEditing) {
      try {
        await updateExpense(editedExpenseId, expenseData);
        expenseContext.updateExpense(editedExpenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError("Could not delete expense - please try again later.");
        setIsSubmittingState(false);
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
        expenseContext.addExpense({ ...expenseData, id: id });
        navigation.goBack();
      } catch (error) {
        setError("Could not edit expense - please try again later.");
        setIsSubmittingState(false);
      }
    }
  }

  if (error && !isSubmittingState) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
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

import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { GlobalStyles } from "@/constants/styles";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";

type Props = {
  route: RouteProp<RootStackParamList, "ManageExpense">;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

function ManageExpense({ route, navigation }: Props) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    console.log("Delete expense with id: " + editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="none" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button mode="none" onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

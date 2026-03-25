import { getFormattedDate } from "@/util/date";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AddExpenseObject } from "../Expenses/ExpensesOutput";
import Button from "../ui/Button";
import Input from "./Input";

type ExpenseFormFields = {
  amount: String;
  date: String;
  description: String;
};

function ExpenseForm({
  defaultValues,
  isEditing,
  onCancel,
  onSubmit,
}: {
  defaultValues: AddExpenseObject | undefined;
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: (expenseData: AddExpenseObject) => void;
}) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    description: defaultValues
      ? defaultValues.description.toString().slice(0, 10)
      : "",
  });

  function inputChangedHandler(
    inputIdentifier: string | number | symbol | any,
    enteredValue: ExpenseFormFields,
  ) {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value: string) =>
              inputChangedHandler(
                "amount",
                value as unknown as ExpenseFormFields,
              ),
            value: inputValues.amount,
          }}
        />
        <Input
          label={"Date"}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value: string) => {
              inputChangedHandler(
                "date",
                value as unknown as ExpenseFormFields,
              );
            },
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label={"Description"}
        textInputConfig={{
          multiline: true,
          onChangeText: (value: string) => {
            inputChangedHandler(
              "description",
              value as unknown as ExpenseFormFields,
            );
          },
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button mode="none" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button mode="none" onPress={submitHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
});

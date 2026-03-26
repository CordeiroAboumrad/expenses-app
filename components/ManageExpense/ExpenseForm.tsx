import { GlobalStyles } from "@/constants/styles";
import { getFormattedDate } from "@/util/date";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AddExpenseObject } from "../Expenses/ExpensesOutput";
import Button from "../ui/Button";
import Input from "./Input";

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
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputs((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  function submitHandler() {
    const expenseData = {
      amount: { value: +inputs.amount.value, isValid: true },
      date: {
        value: inputs.date.value,
        isValid: true,
      },
      description: { value: inputs.description.value, isValid: true },
    };

    const amountIsValid =
      !isNaN(expenseData.amount.value) && expenseData.amount.value > 0;
    const dateIsValid =
      expenseData.date.value !== "" &&
      getFormattedDate(new Date(expenseData.date.value)) !== "" &&
      getFormattedDate(new Date(expenseData.date.value)).length == 10;
    const descriptionIsValid = expenseData.description.value.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      setInputs({
        amount: { value: inputs.amount.value, isValid: amountIsValid },
        date: { value: inputs.date.value, isValid: dateIsValid },
        description: {
          value: inputs.description.value,
          isValid: descriptionIsValid,
        },
      });
      return;
    }

    onSubmit({
      amount: expenseData.amount.value,
      date: new Date(expenseData.date.value),
      description: expenseData.description.value,
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value: string) =>
              inputChangedHandler("amount", value),
            value: inputs.amount.value,
          }}
        />
        <Input
          label={"Date"}
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value: string) => inputChangedHandler("date", value),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (value: string) =>
            inputChangedHandler("description", value),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginHorizontal: 8,
    marginBottom: 16,
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

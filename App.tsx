import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AllExpenses from "./app/(tabs)/AllExpenses";
import ManageExpense from "./app/(tabs)/ManageExpense";
import RecentExpenses from "./app/(tabs)/RecentExpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Recent Expenses" component={RecentExpenses} />
      <BottomTabs.Screen name="All Expenses" component={AllExpenses} />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" translucent={false} />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Expenses Overview"
              component={ExpensesOverview}
            />
            <Stack.Screen name="Manage Expense" component={ManageExpense} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

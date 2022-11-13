import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {routes} from "routes";
import {createStackNavigator} from "@react-navigation/stack";
import {theme} from "../tailwind.config";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TransactionsScreen from "transactions/TransactionsScreen";
import HomeScreen from "HomeScreen/HomeScreen";
import AddTransactionScreen from "transactions/AddTransactionScreen";
import CalendarScreen from "transactions/CalendarScreen";
import CategoryScreen from "transactions/CategoryScreen";
import CategoriesScreen from "categories/CategoriesScreen";
import FlashMessage from "react-native-flash-message";
import React, {useEffect, useState} from "react";
import supabase from "supabase";
import LoginScreen from "auth/LoginScreen";
import RegisterScreen from "auth/RegisterScreen";


const FinanceerTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: theme.colors.primary,
        background: theme.colors.neutral,
        card: theme.colors.neutral,
        text: theme.colors.white,
        border: theme.colors.neutral
    },
};


const Navigation = ({}) => {

    const Tab = createBottomTabNavigator();

    const Stack = createStackNavigator();

    const [session, setSession] = useState({})

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
        })
    }, [session]);

    return (
        <NavigationContainer theme={FinanceerTheme}>
            <FlashMessage position="top"/>
            <Tab.Screen name={"as"} component={LoginScreen}/>

            {session?.user ?
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}}/>
                    <Tab.Screen name="Transactions" component={TransactionsStackScreen} options={{headerShown: false}}/>
                    <Tab.Screen name="Categories" component={CategoriesStackScreen} options={{headerShown: false}}/>
                </Tab.Navigator>

                :
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name={routes.register} component={RegisterScreen}/>
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}

const HomeStackScreen = () => {

    const HomeStack = createStackNavigator();

    return <HomeStack.Navigator>

        <HomeStack.Screen
            name={routes.home}
            options={{title: 'Dashboard'}}
            component={HomeScreen}

        />
        <HomeStack.Screen
            options={{title: 'New Transaction'}}
            name={routes.addTransaction}
            component={AddTransactionScreen}
        />

        <HomeStack.Screen
            name={routes.calendar}
            options={{title: ''}}
            component={CalendarScreen}
        />

        <HomeStack.Screen
            name={routes.categories}
            options={{title: ''}}
            component={CategoryScreen}
        />

    </HomeStack.Navigator>;

};

const TransactionsStackScreen = () => {
    const TransactionsStack = createStackNavigator();

    return <TransactionsStack.Navigator>

        <TransactionsStack.Screen
            name={routes.transactions}
            component={TransactionsScreen}
        />

    </TransactionsStack.Navigator>
}

const CategoriesStackScreen = () => {
    const CategoriesStack = createStackNavigator();

    return <CategoriesStack.Navigator>

        <CategoriesStack.Screen
            name={routes.manageCategories}
            component={CategoriesScreen}
        />

    </CategoriesStack.Navigator>
}

export default Navigation

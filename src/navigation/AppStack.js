import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddPatientScreen from '../screens/AddPatientScreen';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
                name="HomeScreen"
                component={AppStack}
                options={{
                    headerStyle: {
                        backgroundColor: '#BE9013',
                    },
                    headerTitleStyle: {
                        color: 'transparent',
                    },
                }}
            />

        </Stack.Navigator>
    )
}

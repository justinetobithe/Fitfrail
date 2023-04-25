import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from "react-native-vector-icons/Ionicons"
import DrawerStack from './DrawerStack';
import AddPatientScreen from '../screens/AddPatientScreen';
import EditPatientScreen from '../screens/EditPatientScreen';
import AddAppointmentScreen from '../screens/AddAppointmentScreen';
import AddDiseasesScreen from '../screens/AddDiseasesScreen';
import AddSoapScreen from '../screens/AddSoapScreen';

const Stack = createStackNavigator();

export default function AuthStack({ navigation }) {
    return (

        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={DrawerStack}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{
                    title: "Update Profile",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#BE9013",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",

                }}
            /> */}
            <Stack.Screen
                name="AddPatientScreen"
                component={AddPatientScreen}
                options={{
                    title: "Add Patient",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#6DBF97",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",

                }}
            />
            <Stack.Screen
                name="EditPatientScreen"
                component={EditPatientScreen}
                options={{
                    title: "Edit Patient",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#6DBF97",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",

                }}
            />
            <Stack.Screen
                name="AddAppointmentScreen"
                component={AddAppointmentScreen}
                options={{
                    title: "New Appointment",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#6DBF97",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",

                }}
            />
            <Stack.Screen
                name="AddDiseasesScreen"
                component={AddDiseasesScreen}
                options={{
                    title: "Add Disease",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#6DBF97",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",

                }}
            />
            <Stack.Screen
                name="AddSoapScreen"
                component={AddSoapScreen}
                options={{
                    title: "Add Note",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#6DBF97",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",
                }}
            />
            {/* <Stack.Screen
                name="AddDiseasesScreen"
                component={AddDiseasesScreen}
                options={{
                    title: "Add Disease",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#6DBF97",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",

                }}
            /> */}
        </Stack.Navigator>

    )
}

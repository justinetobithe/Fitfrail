import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PatientScreen from '../screens/PatientScreen';
import Ionicons from "react-native-vector-icons/Ionicons"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { TouchableOpacity } from 'react-native';
import CustomDrawer from '../components/CustomDrawer';
import UpcomingAppointmentScreen from '../screens/UpcomingAppointmentScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import TopTabNavigator from './TopTabNavigator';
import DiseasesScreen from '../screens/DiseasesScreen';

const Drawer = createDrawerNavigator();

export default function DrawerStack({ navigation }) {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#6DBF97',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                },
            }}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                initialRouteName="Home"
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#6DBF97',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff"
                }}
            />
            {/* <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "Profile",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="person-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#6DBF97',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff"
                }}
            /> */}
            <Drawer.Screen
                name="Patient"
                component={PatientScreen}
                options={{
                    title: "List of Patients",
                    drawerIcon: ({ color }) => (
                        <Fontisto name="bed-patient" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#6DBF97',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("AddPatientScreen")}>
                            <Ionicons name="person-add-outline" size={22} color={"#fff"} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Drawer.Screen
                name="AppointmentScreen"
                component={TopTabNavigator}
                options={{
                    title: "Appointment",
                    drawerIcon: ({ color }) => (
                        <Fontisto name="date" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#6DBF97',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("AddAppointmentScreen")}>
                            <MaterialIcons name="post-add" size={22} color={"#fff"} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Drawer.Screen
                name="DiseasesScreen"
                component={DiseasesScreen}
                options={{
                    title: "List of Diseases",
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="emoticon-sick-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#6DBF97',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("AddDiseasesScreen")}>
                            <Ionicons name="md-add-circle-outline" size={22} color={"#fff"} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            {/* <Drawer.Screen
                name=""
                component={UpcomingAppointmentScreen}
                options={{
                    title: "List of Patients",
                    drawerIcon: ({ color }) => (
                        <Fontisto name="bed-patient" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        color: '#000',
                    },
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("AddPatientScreen")}>
                            <Ionicons name="person-add-outline" size={22} color={"#000"} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    ),
                }}
            /> */}
        </Drawer.Navigator>
    )
}

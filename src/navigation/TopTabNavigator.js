import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UpcomingAppointmentScreen from '../screens/UpcomingAppointmentScreen';
import PendingAppointmentScreen from '../screens/PendingAppointmentScreen';
import CompletedAppointmentScreen from '../screens/CompletedAppointmentScreen';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />
            }>
            <Tab.Screen name="Upcoming" component={UpcomingAppointmentScreen} />
            <Tab.Screen name="Pending" component={PendingAppointmentScreen} />
            <Tab.Screen name="Completed" component={CompletedAppointmentScreen} />
        </Tab.Navigator>
    )
} 
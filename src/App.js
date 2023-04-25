import React, { useEffect, useReducer, useState } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './core/theme'
import Container from "toastify-react-native"
import AppStack from './navigation/AppStack'
import AuthStack from './navigation/AuthStack'
import { auth } from './firebase'
import { NativeBaseProvider } from "native-base"

export default function App() {

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()


    function onAuthStateChanged(user) {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber
    }, [])


    return (
        <Provider theme={theme}>
            <Container position="top" />
            <NativeBaseProvider>
                <NavigationContainer>
                    {
                        !user ? (
                            <AppStack />
                        ) : (
                            <AuthStack />
                        )
                    }
                </NavigationContainer>
            </NativeBaseProvider>
        </Provider>
    )
}

import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Toast } from "toastify-react-native"
import { auth, db } from '../firebase'
import Layout from '../components/Layout'
import { doc, setDoc } from 'firebase/firestore/lite'

export default function RegisterScreen({ navigation }) {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const register = () => {
        if (name == "") {
            Toast.error("Name cannot be blank!")
        } else if (email == "") {
            Toast.error("Email cannot be blank!")
        } else if (password == "") {
            Toast.error("Password cannot be blank!")
        } else if (confirmPassword == "") {
            Toast.error("Confirm Password cannot be blank!")
        } else if (password != confirmPassword) {
            Toast.error("Password does not match!")
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const user = res.user
                    const addUser = setDoc(doc(db, "users", user.uid), {
                        name: name,
                        email: user.email,
                        uid: user.uid,
                        user_type: "Physical Therapist",
                    })

                    if (addUser) {
                        Toast.success("Sucessfully Register")
                    } else {
                        Toast.error("Something went wrong")
                    }
                }).catch((error) => {
                    if (error.code == 'email-already-in-use') {
                        Toast.error('You already have an account with that email.');
                    } else if (error.code == 'auth/invalid-email') {
                        Toast.error('Please provide a valid email');
                    } else if (error.code == 'auth/weak-password') {
                        Toast.error('The password is too weak.');
                    }
                    Toast.error(error)
                })
        }
    }



    return (
        <Layout>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={require('../assets/img/logo.png')}
                    style={styles.image}
                />
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName(text)}
                    autoCapitalize="words"
                    style={styles.input}
                />
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    label="Confirm Password"
                    returnKeyType="done"
                    value={confirmPassword.value}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ResetPasswordScreen')}
                    >
                        <Text style={styles.forgot}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <Button mode="contained" style={styles.button} onPress={register}>
                    Register
                </Button>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                        <Text style={styles.link}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 80,
        marginBottom: 8,
    },
    input: {
        height: 44,
        backgroundColor: "#F5F5F5",
        color: "#6DBF97",

    },
    button: {
        backgroundColor: "#6DBF97",
        height: 44,
        borderRadius: 15,
        color: "#fff",
        borderColor: "#6DBF97",
        fontWeight: "bold",
        marginBottom: 70
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: "#6DBF97",
    },
})
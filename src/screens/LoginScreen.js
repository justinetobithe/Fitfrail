import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Toast } from "toastify-react-native"
import { auth } from '../firebase'
import Layout from '../components/Layout'


export default function LoginScreen({ navigation }) {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        if (email == '') {
            Toast.error("Email cannot be blank!");
        } else if (password == '') {
            Toast.error("Password cannot be blank!");
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log(res)
                    const user = res.user;
                    Toast.success("Successfully Login");
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Toast.error("That email address is already in use!");
                    }
                    if (error.code === 'auth/invalid-email') {
                        Toast.error("That email address is invalid!");
                    }
                    if (error.code === 'auth/wrong-password') {
                        Toast.error("Invalid Password!");

                    }
                    // alert(error);
                    console.log(error)
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
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail(text)}
                    error={!!email.error}
                    errorText={email.error}
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
                    error={!!password.error}
                    errorText={password.error}
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
                <Button mode="contained" style={styles.button} onPress={login}>
                    Login
                </Button>
                <View style={styles.row}>
                    <Text >Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                        <Text style={styles.link}>Sign up</Text>
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
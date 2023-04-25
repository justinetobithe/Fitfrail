import React, { useState } from 'react'
import { Button, ScrollView } from "react-native"
import Layout from '../components/Layout'
import { FormControl, Select, Center, CheckIcon, Box, Input, TextArea } from "native-base";
import { Toast } from 'toastify-react-native';
import { doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';


export default function AddDiseasesScreen({ navigation }) {

    function makeId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")



    const onSubmit = () => {
        if (name == "") {
            Toast.error("Name cannot be blank!")
        } else if (description == "") {
            Toast.error("Description cannot be blank!")
        } else {

            const diseaseID = makeId(20)

            const addDisease = setDoc(doc(db, "diseases", diseaseID), {
                name: name,
                description: description,
                id: diseaseID
            })

            if (addDisease) {
                Toast.success("Successfully Saved")
                navigation.goBack()
            } else {
                Toast.error("There was an error.")
            }
        }
    }

    return (
        <Layout>
            <ScrollView>
                <Center>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Name</FormControl.Label>
                        <Input autoCapitalize="words" placeholder="Name" value={name.value} onChangeText={(text) => setName(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Description</FormControl.Label>
                        <TextArea autoCapitalize="words" h={20} placeholder="Description" value={description.value} onChangeText={(text) => setDescription(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <Button rounded title="Submit" color={"#6DBF97"} onPress={onSubmit} />
                    </FormControl>
                </Center>
            </ScrollView>
        </Layout>
    )
}

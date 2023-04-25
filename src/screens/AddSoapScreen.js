import React, { useState, useEffect, useContext } from 'react'
import { Button, ScrollView, StyleSheet } from "react-native"
// import Button from '../components/Button'
import Layout from '../components/Layout'
import { FormControl, Select, Center, CheckIcon, Box, Input, TextArea } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay'
import { Toast } from 'toastify-react-native';
import dateFormat from "dateformat";
import { doc, setDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';


export default function AddSoapScreen({ navigation }) {

    function makeId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [subjective, setSubjective] = useState("")
    const [objective, setObjective] = useState("")
    const [assessment, setAssessment] = useState("")
    const [plan, setPlan] = useState("")

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        setSelectedDate(date)
        console.log(date)
        hideDatePicker();
    };


    const onSubmit = () => {
        if (firstname == "") {
            Toast.error("Firstname cannot be blank!")
        } else if (lastname == "") {
            Toast.error("Lastname cannot be blank!")
        } else if (selectedGender == "") {
            Toast.error("Gender cannot be blank!")
        } else if (selectedDate == "" || selectedDate == "No date selected") {
            Toast.error("Birthday cannot be blank!")
        } else if (contactNumber == "") {
            Toast.error("Contact number cannot be blank!")
        } else if (address == "") {
            Toast.error("Address cannot be blank!")
        } else {

            const patientID = makeId(20)

            const addPatient = setDoc(doc(db, "patients", patientID), {
                firstname: firstname,
                lastname: lastname,
                gender: selectedGender,
                birthdate: dateFormat(selectedDate, "yyyy-mm-dd"),
                contactNumber: contactNumber,
                address: address,
                therapistID: auth.currentUser?.uid,
                patientID: patientID
            })

            if (addPatient) {
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
                    {/* <FormControl isInvalid mb="4">
                        <FormControl.Label>First Name</FormControl.Label>
                        <Input autoCapitalize="words" placeholder="First Name" value={firstname.value} onChangeText={(text) => setFirstname(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Last Name</FormControl.Label>
                        <Input autoCapitalize="words" placeholder="Last Name" value={lastname.value} onChangeText={(text) => setLastname(text)} />
                    </FormControl> */}
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Subjective</FormControl.Label>
                        <TextArea autoCapitalize="words" h={20} placeholder="Sibjective" value={subjective.value} onChangeText={(text) => setSubjective(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Objective</FormControl.Label>
                        <TextArea autoCapitalize="words" h={20} placeholder="Objective" value={objective.value} onChangeText={(text) => setObjective(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Assessment</FormControl.Label>
                        <TextArea autoCapitalize="words" h={20} placeholder="Assessment" value={assessment.value} onChangeText={(text) => setAssessment(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Plan</FormControl.Label>
                        <TextArea autoCapitalize="words" h={20} placeholder="Plan" value={plan.value} onChangeText={(text) => setPlan(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <Button rounded title="Submit" color={"#6DBF97"} onPress={onSubmit} />
                    </FormControl>
                </Center>
            </ScrollView>
        </Layout>
    )
}

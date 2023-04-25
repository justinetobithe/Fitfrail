import React, { useState, useEffect, useContext } from 'react'
import { Button, ScrollView, StyleSheet } from "react-native"
// import Button from '../components/Button'
import Layout from '../components/Layout'
import { FormControl, Select, Center, CheckIcon, Box, Input, TextArea } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay'
import { Toast } from 'toastify-react-native';
import dateFormat from "dateformat";
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';


export default function EditPatientScreen({ route, navigation }) {

    const {
        patient
    } = route.params

    console.log(patient)

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
    const [firstname, setFirstname] = useState(patient.firstname)
    const [lastname, setLastname] = useState(patient.lastname)
    const [selectedGender, setSelectedGender] = useState(patient.gender)
    const [selectedDate, setSelectedDate] = useState(patient.birthdate)
    const [address, setAddress] = useState(patient.address)
    const [contactNumber, setContactNumber] = useState(patient.contactNumber)

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


    const onUpdate = () => {
        if (firstname == "") {
            Toast.error("Firstname cannot be blank!")
        } else if (lastname == "") {
            Toast.error("Lastname cannot be blank!")
        } else if (selectedGender == "") {
            Toast.error("Gender cannot be blank!")
        } else if (contactNumber == "") {
            Toast.error("Contact number cannot be blank!")
        } else if (address == "") {
            Toast.error("Address cannot be blank!")
        } else {

            const updatePatient = doc(db, "patients", patient.patientID)
            const q = updateDoc(updatePatient, {
                // firstname: firstname,
                // lastname: lastname,
                gender: selectedGender,
                birthdate: dateFormat(selectedDate, "yyyy-mm-dd"),
                contactNumber: contactNumber,
                address: address,
            })

            if (q) {
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
                        <FormControl.Label>First Name</FormControl.Label>
                        <Input isReadOnly="true" autoCapitalize="words" placeholder="First Name" value={firstname.value} defaultValue={patient.firstname} onChangeText={(text) => setFirstname(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Last Name</FormControl.Label>
                        <Input isReadOnly="true" autoCapitalize="words" placeholder="Last Name" value={lastname} defaultValue={patient.lastname} onChangeText={(text) => setLastname(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Gender</FormControl.Label>
                        <Select selectedValue={selectedGender.value} accessibilityLabel="Select Gender" defaultValue={patient.gender} placeholder="Select Gender" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={4} />
                        }} onValueChange={(item) => setSelectedGender(item)}>
                            <Select.Item label="Male" value="Male" />
                            <Select.Item label="Female" value="Female" />
                        </Select>
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Birthday</FormControl.Label>
                        <Input isReadOnly="true" value={selectedDate.value} defaultValue={selectedDate ? dateFormat(selectedDate, "mmmm dd, yyyy") : "No data selected"}
                            onChangeText={(text) => setSelectedDate(text)} InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={showDatePicker} title="Date" />} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Contact Number</FormControl.Label>
                        <Input keyboardType="numeric" placeholder="Contact Number" value={contactNumber.value} defaultValue={patient.contactNumber} onChangeText={(text) => setContactNumber(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Address</FormControl.Label>
                        <TextArea autoCapitalize="words" h={20} placeholder="Address" value={address.value} defaultValue={patient.address} onChangeText={(text) => setAddress(text)} />
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <Button rounded title="Update" color={"#6DBF97"} onPress={onUpdate} />
                    </FormControl>
                </Center>
            </ScrollView>
        </Layout>
    )
}

import React, { useState, useEffect } from 'react'
import { Button, ScrollView } from "react-native"
import Layout from '../components/Layout'
import { FormControl, Select, Center, CheckIcon, Box, Input, TextArea } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Toast } from 'toastify-react-native';
import dateFormat from "dateformat";
import { collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';


export default function AddAppointmentScreen({ navigation }) {

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
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [selectedPurpose, setSelectedPurpose] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [address, setAddress] = useState("")
    const [contactNumber, setContactNumber] = useState("")

    const [selectedPatient, setSelectedPatient] = useState("")
    const [selectedPatientName, setSelectedPatientName] = useState("")
    const [selectedDisease, setSelectedDisease] = useState("")
    const [selectedTime, setSelectedTime] = useState("")

    const [patients, setPatients] = useState([])
    const [diseases, setDiseases] = useState([])


    async function getPatients() {
        const patientsCol = collection(db, "patients")
        const q = query(patientsCol, where("therapistID", "==", auth.currentUser?.uid))

        const qSnapshot = await getDocs(q);

        if (q) {
            let patients = [];
            qSnapshot.forEach((doc) => {
                patients.push(doc.data())
            })
            setPatients(patients)
        } else {
            console.log("Something went wrong")
        }
    }

    useEffect(() => {
        getPatients()
    }, [])


    async function getDiseases() {
        const diseasesCol = collection(db, "diseases")
        const q = query(diseasesCol, orderBy("name", "asc"));

        const qSnapshot = await getDocs(q)
        if (q) {
            let diseases = [];
            qSnapshot.forEach((doc) => {
                diseases.push(doc.data())
            })
            setDiseases(diseases)
        } else {
            console.log("Something went wrong")
        }
    }

    useEffect(() => {
        getDiseases()
    }, [])


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
        if (selectedPatient == "") {
            Toast.error("Please select a patient!")
        } else if (selectedPurpose == "") {
            Toast.error("Please select a purpose!")
        } else if (selectedDisease == "") {
            Toast.error("Please select a disease!")
        } else if (selectedDate == "" || selectedDate == "No date selected") {
            Toast.error("Please select a date!")
        } else if (selectedTime == "") {
            Toast.error("Please select a time!")
        } else {

            async function getPatientName() {
                const patientsCol = collection(db, "patients")
                const q = query(patientsCol, where("patientID", "==", selectedPatient))

                const qSnapshot = await getDocs(q);
                if (q) {
                    let patients = [];
                    qSnapshot.forEach((doc) => {
                        patients.push(doc.data())
                    })

                    const appointmentID = makeId(20)

                    const addAppointment = setDoc(doc(db, "appointments", appointmentID), {
                        patientID: selectedPatient,
                        patientName: (patients.map(row => row.firstname + " " + row.lastname)).toString(),
                        purpose: selectedPurpose,
                        disease: selectedDisease,
                        dateSchedule: selectedDate,
                        dateFormat: dateFormat(selectedDate, "yyyy-mm-dd"),
                        timeSchedule: selectedTime,
                        therapistID: auth.currentUser?.uid,
                        appointmentID: appointmentID,
                        remarks: "Pending",
                        status: "Active"
                    })

                    if (addAppointment) {
                        Toast.success("Successfully Saved")
                        navigation.goBack()
                    } else {
                        Toast.error("There was an error.")
                    }
                } else {
                    console.log("Something went wrong")
                }
            }
            getPatientName()


        }
    }

    return (
        <Layout>
            <ScrollView>
                <Center>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Patient</FormControl.Label>
                        <Select selectedValue={selectedPatient.value} accessibilityLabel="Choose Patient" placeholder="Choose Patient" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={4} />
                        }} onValueChange={(text) => { setSelectedPatient(text) }}>
                            {
                                patients.length > 0 ?
                                    patients.map((row, index) => ((
                                        <Select.Item key={index + 1} label={row.firstname + " " + row.lastname} value={row.patientID} />
                                    )))
                                    : ""
                            }
                        </Select>
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Purpose</FormControl.Label>
                        <Select selectedValue={selectedPurpose.value} accessibilityLabel="Select Purpose" placeholder="Select Purpose" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={4} />
                        }} onValueChange={(item) => setSelectedPurpose(item)}>
                            <Select.Item label="Diagnosis" value="Diagnosis" />
                            <Select.Item label="Initial Evaluation" value="Initial Evaluation" />
                            <Select.Item label="Self-Management" value="Self-Management" />
                            <Select.Item label="Treatment" value="Treatment" />
                        </Select>
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Disease/Diagnose</FormControl.Label>
                        <Select selectedValue={selectedDisease.value} accessibilityLabel="Choose Patient" placeholder="Choose Patient" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={4} />
                        }} onValueChange={(text) => { setSelectedDisease(text) }}>
                            {
                                diseases.length > 0 ?
                                    diseases.map((row, index) => ((
                                        <Select.Item key={index + 1} label={row.name} value={row.name} />
                                    )))
                                    : ""
                            }
                        </Select>
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <FormControl.Label>Schedule Date</FormControl.Label>
                        <Input isReadOnly="true" value={selectedDate.value} defaultValue={selectedDate ? dateFormat(selectedDate, "mmmm dd, yyyy") : 'No date selected'}
                            onChangeText={(text) => setSelectedDate(text)} InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={showDatePicker} title="Date" />} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            minimumDate={new Date()}
                        />
                    </FormControl>
                    <FormControl isInvalid mb="5">
                        <FormControl.Label>Schedule time</FormControl.Label>
                        <Select selectedValue={selectedTime.value} accessibilityLabel="Choose Time" placeholder="Choose Time" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={4} />
                        }} onValueChange={(item) => setSelectedTime(item)}>
                            <Select.Item label="8:00 AM - 9:00 AM" value="8:00 AM - 9:00 AM" />
                            <Select.Item label="9:00 AM - 10:00 AM" value="9:00 AM - 10:00 AM" />
                            <Select.Item label="10:00 AM to 11:00 AM" value="10:00 AM to 11:00 AM" />
                            <Select.Item label="11:00 AM to 12:00 AM" value="11:00 AM to 12:00 AM" />
                            <Select.Item label="1:00 PM to 2:00 PM" value="1:00 PM to 2:00 PM" />
                            <Select.Item label="2:00 PM to 3:00 PM" value="2:00 PM to 3:00 PM" />
                            <Select.Item label="3:00 PM to 4:00 PM" value="3:00 PM to 4:00 PM" />
                            <Select.Item label="4:00 PM to 5:00 PM" value="4:00 PM to 5:00 PM" />
                            <Select.Item label="5:00 PM to 6:00 PM" value="5:00 PM to 6:00 PM" />
                        </Select>
                    </FormControl>
                    <FormControl isInvalid mb="4">
                        <Button rounded title="Submit" color={"#6DBF97"} onPress={onSubmit} />
                    </FormControl>
                </Center>
            </ScrollView>
        </Layout>
    )
}

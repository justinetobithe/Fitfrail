import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Layout from '../components/Layout'
import { Card, Title, Button } from 'react-native-paper';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import dateFormat from 'dateformat';
import { Toast } from 'toastify-react-native';


export default function PendingAppointmentScreen({ navigation }) {

    const [refreshing, setRefreshing] = useState(false);
    const [appointments, setAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const [combine, setCombine] = useState([])


    async function getAppointments() {
        const appointmentCol = collection(db, "appointments")
        const q = query(appointmentCol,
            where("therapistID", "==", auth.currentUser?.uid),
            where("remarks", "==", "Pending"),
            where("status", "==", "Active"))

        const qSnapshot = await getDocs(q);

        if (q) {
            let appointments = [];
            qSnapshot.forEach((doc) => {
                appointments.push(doc.data())
            })
            setAppointments(appointments)
            // setAppointments(appointments)
        } else {
            console.log("Something went wrong")
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])


    const onDelete = (appointmentID) => {
        const appointmentCol = doc(db, "appointments", appointmentID)
        const q = updateDoc(appointmentCol, {
            status: "Inactive"
        });
        if (q) {
            Toast.success("Successfully Deleted")
        } else {
            console.log("Something went wrong")
        }
    }

    return (
        <Layout  >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getAppointments}
                    />
                }>
                <View>
                    <Title style={styles.titleText}>Pending Appointments</Title>
                    {
                        appointments.length > 0 ? (
                            appointments.map((row, index) => (
                                <Card
                                    key={index + 1}
                                    style={styles.card}
                                >
                                    <Card.Title style={{ marginTop: 10 }} title={row.patientName} subtitle={row.description} subtitleNumberOfLines={40} />
                                    <Card.Content>

                                        <Text style={styles.text}><Text style={{ fontWeight: "bold" }}>Date:</Text> {dateFormat(row.dateFormat, "mmmm dd, yyyy")}</Text>
                                        <Text style={styles.text}><Text style={{ fontWeight: "bold" }}>Time:</Text> {row.timeSchedule}</Text>
                                        <Text style={styles.text}><Text style={{ fontWeight: "bold" }}>Purpose:</Text> {row.purpose}</Text>
                                        <Text style={styles.text}><Text style={{ fontWeight: "bold" }}>Diagnose/Disease:</Text> {row.disease}</Text>
                                        <Text style={[styles.text, { fontWeight: "bold" }]}>Status: <Text style={{ color: "red" }}>{row.remarks}</Text></Text>

                                    </Card.Content>
                                    <Card.Actions style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10, marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => onDelete(row.appointmentID)}><Button style={[styles.button, { backgroundColor: "red" }]} color="#fff">Delete</Button></TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate("AddSoapScreen")}><Button style={styles.button} color="#fff">Complete</Button></TouchableOpacity>
                                    </Card.Actions>
                                </Card>
                            ))
                        ) :
                            <Text>No data</Text>
                    }
                </View>
            </ScrollView>
        </Layout >

    )
}
const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        marginBottom: 10
    },
    card: {
        marginBottom: 20
    },
    text: {
        color: "#000",
        marginBottom: 5
    },
    button: {
        backgroundColor: "#6DBF97",
        height: 38,
        width: 120,
        borderRadius: 15,
        color: "#fff",
        borderColor: "#6DBF97",
        fontWeight: "bold",
        marginLeft: 10,
        marginRight: 10,
    },
})
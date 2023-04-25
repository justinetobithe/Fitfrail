import React, { useEffect, useState } from 'react'
import { RefreshControl, Text, View, ScrollView, StyleSheet } from 'react-native'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { auth, db } from '../firebase'
import Layout from '../components/Layout'
import { Card, Title } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dateFormat from 'dateformat';


export default function HomeScreen() {

    const [user, setUser] = useState()
    const [refreshing, setRefreshing] = useState(false);
    const [appointments, setAppointments] = useState([])

    async function fetchUser() {
        if (auth.currentUser?.uid != null) {
            const userRef = collection(db, "users")
            const q = query(userRef, where("uid", "==", auth.currentUser?.uid))

            const qSnapshot = await getDocs(q)

            if (q) {
                let userDetails = []
                qSnapshot.forEach((doc) => {
                    userDetails.push(doc.data())
                })
                setUser(userDetails[0])
            } else {
                console.log("Something went wrong")
            }
        }
    }

    useEffect(() => {
        if (auth.currentUser?.uid != null) {
            fetchUser()
        }
    }, [])

    console.log(dateFormat(new Date(), "yyyy-mm-dd"))

    // , where("dateFormat" == dateFormat(new Date(), "yyyy-mm-dd"))

    async function getAppointments() {
        const appointmentCol = collection(db, "appointments")
        const q = query(appointmentCol, where("therapistID", "==", auth.currentUser?.uid),
            where("remarks", "==", "Pending"),
            where("dateFormat", "==", dateFormat(new Date(), "yyyy-mm-dd"))
            , where("status", "==", "Active"))

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

    return (
        <Layout>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getAppointments}
                    />
                }>
                <Text style={{ fontSize: 20, color: "#000", marginBottom: 10 }}>Hello,</Text>
                <Title style={{ fontSize: 30, fontWeight: "bold" }}>{!user ? "" : user.name}  <MaterialCommunityIcons name="hand-wave" size={22} color={"#FBC327"} /></Title>
                <View style={{ marginTop: 30 }}>
                    <Title style={{ marginBottom: 20 }}>Appointments Today</Title>
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
    }
})
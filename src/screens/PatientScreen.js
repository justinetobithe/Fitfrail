import React, { useState, useEffect } from 'react'
import { RefreshControl, StyleSheet, View, Text } from "react-native"
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import Layout from '../components/Layout';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import dateFormat from 'dateformat';

export default function PatientScreen({ navigation }) {

    const [refreshing, setRefreshing] = useState(false);
    const [patients, setPatients] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);


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


    return (
        <Layout>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <ScrollView style={styles.scroll}
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getPatients}
                    />
                }
            >
                {
                    patients.length > 0 ? (
                        patients.map((row, index) => (
                            <Card
                                key={index + 1}
                                style={styles.card}
                                onPress={() => {
                                    navigation.navigate("EditPatientScreen", {
                                        patient: row
                                    })
                                }}
                            >
                                <Card.Title title={row.firstname} subtitle={row.lastname} />
                                <Card.Content>
                                    <Text style={{ color: "#000" }}>{row.gender}</Text>
                                    <Text style={{ color: "#000" }}>{
                                        
                                    }</Text>
                                </Card.Content>
                            </Card>
                        ))
                    ) :
                        <Text>No data</Text>
                }


            </ScrollView>
        </Layout>
    )
}


const styles = StyleSheet.create({
    scroll: {
        marginTop: 20
    },
    card: {
        marginTop: 20
    },
    cardView: {
        marginTop: 20, marginBottom: 20, flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cardContent: {
        marginBottom: 20
    }
})
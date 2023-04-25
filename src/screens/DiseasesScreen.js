import React, { useState, useEffect } from 'react'
import { RefreshControl, StyleSheet, Text, ScrollView } from "react-native"
import { Card } from 'react-native-paper';
import Layout from '../components/Layout';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { db } from '../firebase';


export default function DiseasesScreen() {

    const [refreshing, setRefreshing] = useState(false);
    const [diseases, setDiseases] = useState([])



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


    return (
        <Layout>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getDiseases}
                    />
                }
            >
                {
                    diseases.length > 0 ? (
                        diseases.map((row, index) => (
                            <Card
                                key={index + 1}
                                style={styles.card}
                            >
                                <Card.Title style={{ marginTop: 10, marginBottom: 20 }} title={row.name} subtitle={row.description} subtitleNumberOfLines={40} />
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
    card: {
        marginBottom: 20
    }
})
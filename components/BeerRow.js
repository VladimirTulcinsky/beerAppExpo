import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

const BeerRow = ({ beer }) =>
    (
        <View style={styles.row}>
            <Image source={{ uri: "https://beeranking.herokuapp.com/" + beer.path }} style={styles.picture} />
            <Text style={styles.primaryText}>{beer.name}</Text>
        </View>
    );

export default BeerRow;

const styles = StyleSheet.create({
    row: { flexDirection: "row", alignItems: "center", padding: 12 },
    picture: { width: 50, height: 50, borderRadius: 25, marginRight: 18 },
    primaryText: {
        fontWeight: "bold",
        fontSize: 14,
        color: "black",
        marginBottom: 4
    }
});
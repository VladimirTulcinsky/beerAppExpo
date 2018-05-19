import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Rating } from 'react-native-elements';


export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = { beer: this.props.navigation.getParam('beer') };
        console.log(this.state.beer, "state");

    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating);

        fetch('https://beeranking.herokuapp.com/beers/' + this.state.beer._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: rating })
        }).then(res => {
            console.log(res, "succeeded");
        }).catch(console.log)

    }

    render() {

        const ShowAverage = () => {
            let sum = 0;
            this.state.beer.rating.forEach(rating => {
                sum += rating;
            });
            let average = sum / this.state.beer.nbrVotes;
            return <Text>Average: {average.toFixed(2)}</Text>
        };

        return (
            <View style={styles.container}>
                <View style={styles.card}>


                    <Text style={styles.title}>{this.state.beer.name}</Text>
                    <Image source={{ uri: "https://beeranking.herokuapp.com/" + this.state.beer.path }} style={styles.picture} />
                    <View>
                        <Text>Color: {this.state.beer.color}</Text>
                        <Text>Degree: {this.state.beer.degree}</Text>
                        <Text>Taste: {this.state.beer.taste}</Text>
                        <Text>Brewery: {this.state.beer.brewery}</Text>
                        <ShowAverage />
                    </View>

                    <Rating
                        showRating
                        type="star"
                        fractions={1}
                        startingValue={1}
                        imageSize={40}
                        onFinishRating={this.ratingCompleted.bind(this)}
                        style={{ paddingVertical: 10, alignSelf: 'center' }}
                        ratingBackgroundColor='white'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    card: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',

    },
    picture: {
        width: 150,
        height: 150,
        borderRadius: 10,
        alignSelf: 'center',
    }
});

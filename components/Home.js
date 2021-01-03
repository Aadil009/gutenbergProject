import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import GenreCard from './GenreCard';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const genres = ['FICTION',
            'DRAMA',
            'HUMOR',
            'POLITICS',
            'PHILOSOPHY',
            'HISTORY',
            'ADVENTURES',
        ];
        const icons = ['flask',
            'theater-masks',
            'laugh-wink',
            'male',
            'palette',
            'history',
            'clock'
        ]

        const { container, header, body } = styles

        let GenreCards = genres.map((genres, key) => {
            return (
                <TouchableOpacity style={{ top: 20 }} key={key} onPress={() => {
                    this.props.navigation.navigate('Details', { genres: genres })
                }} >
                    <GenreCard genres={genres} icon={icons[key]} />

                </TouchableOpacity>
            )
        })

        return (
            <View style={container}>
                <Text style={header}>Gutenberg Project</Text>
                <Text style={body}>A social cataloging website that allows you to freely search its database of books, annotations, and reviews.</Text>
                {GenreCards}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5,
        padding: 20,
        paddingTop: 10,
        top: StatusBar.currentHeight,
        backgroundColor: '#f0f0f6'
    },
    header: {
        fontSize: 48,
        fontFamily: 'Montserrat-SemiBold',
        color: '#5E56E7'
    },
    body: {
        fontSize: 16,
        marginTop: 20,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold'
    }
})

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5';

const GenreCard = (props) => {
    const { container, cardContainer, genreText } = styles
    return (
        <View style={container}>
            <View style={cardContainer}>
                <Icon name={props.icon} size={20} color="#5e56e7" />
                <Text style={genreText}>{props.genres}</Text>
            </View>
            <Ionicons name="arrow-forward-outline" size={32} color="#5e56e7" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        shadowColor: 'rgba(211,209,238,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        elevation: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#f8f7ff'
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    genreText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft:10
    }

})

export default GenreCard;
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

// import { Container } from './styles';

const BookCard = (props) => {
    return (
        <View style={styles.card}>
            
            <Image
            style={{height:100,width:80,borderRadius:8,top:5}}
                source={{ uri: 'http://www.gutenberg.org/cache/epub/74/pg74.cover.medium.jpg' }}
            />
            <View style={{top:5}}>
            <Text style={{fontSize:12}}>{props.title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        
        width: 114,
        height: 162,
        borderRadius: 8,
        backgroundColor:'#f8f7ff',
        alignItems:'center',
        // justifyContent:'center',
        shadowColor: 'rgba(211,209,238,0.5)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 1,
        elevation: 0,
    }
})
export default BookCard;
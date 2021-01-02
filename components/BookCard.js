import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native';

// import { Container } from './styles';

const BookCard = (props) => {
    const url = props.url

    openeUrlInWebBrowser= ()=>{
        if(!url){
            return (Alert.alert(
                "URL Not Found",
                "Try Different Books",
              ))
        }
        else{
            Linking.openURL(url)
        }
    }
    
    return (
        <TouchableOpacity style={styles.card} onPress={openeUrlInWebBrowser} >
            
            <Image
            style={{height:100,width:80,borderRadius:8,top:5}}
                source={{ uri: props.uri }}
            />
            <View style={{top:5}}>
            <Text numberOfLines={2} style={{fontSize:12,color:'black',flexWrap:'wrap'}}>{props.title}</Text>
            <Text numberOfLines={2} style={{fontSize:12,color:'black',flexWrap:'wrap'}}>{props.author}</Text>

            </View>
        </TouchableOpacity>
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
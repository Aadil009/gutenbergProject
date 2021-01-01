import React from 'react';
import { View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { Ionicons } from '@expo/vector-icons';
// import { Container } from './styles';

const GenreCard = (props) => {

    return (
        <View style={{
            borderRadius: 4, paddingLeft: 10, paddingRight: 10, height: 50, shadowColor: 'rgba(211,209,238,0.5)',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.5,
            shadowRadius: 0,
            elevation: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,

        }}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Ionicons name="flask-outline" size={32} color="green" />
            <Text style={{ fontSize: 20, color:'black' }}>{props.genres}</Text>
            </View>
            <Ionicons name="arrow-forward-outline" size={32} color="green" />
            {/* <Icon style={{left:200}} name="home" size={20} color="black" /> */}

        </View>
    );
}

export default GenreCard;
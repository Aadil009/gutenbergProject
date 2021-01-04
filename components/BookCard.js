import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native';

const BookCard = (props) => {
    const { uri, textFormat, htmlFormat, title, author } = props
    const { card, bookBanner, bookInfoView, bookName, authorName } = styles
    openeUrlInWebBrowser = () => {
        if (htmlFormat) {

            Linking.openURL(htmlFormat)

        }
        else if (textFormat) {

            Linking.openURL(textFormat)
        }
        else {
            return (Alert.alert(
                "URL Not Found",
                "Try Different Books",
            ))
        }
    }

    return (
        <TouchableOpacity style={card} onPress={openeUrlInWebBrowser} >
            <Image
                style={bookBanner}
                source={{ uri: uri }}
            />
            <View style={bookInfoView}>
                <Text numberOfLines={2} style={bookName}>{title}</Text>
                <Text numberOfLines={1} style={authorName}>{author}</Text>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 1,
        width: 114,
        height: 162,
        borderRadius: 8,
        backgroundColor: '#f0f0f6',
        alignItems: 'center',
        shadowColor: 'rgba(211,209,238,0.5)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 1,
        elevation: 2,
    },
    bookBanner: {
        height: 100,
        width: 80,
        borderRadius: 8,
        top: 5
    },
    bookInfoView: {
        top: 5
    },
    bookName: {
        fontSize: 12,
        marginLeft: 5,
        marginRight: 2,
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
    },
    authorName: {
        fontSize: 12,
        marginLeft: 5,
        marginRight: 2,
        color: 'black',
        fontFamily: 'Montserrat-Regular',
    }

})
export default BookCard;
import { GestureHandlerRefContext } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BookCard from './BookCard';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            page: 2,
            data:[],
            isLoading:true,



        };
    }

    apiRequest = (genres) => {
        fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${this.state.page}&search=${genres}`)
            .then((response) => response.json())
            .then((responsesJson) =>{
                 this.setState({data: [...this.state.data, responsesJson.results]}) 
            })
            .catch((error) => console.error(error))
            .finally(() => this.setState({ isLoading: false }))
    }

    handleMore = (genres) => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.apiRequest(genres)
        })
    }

    render() {
        const params = this.props.route.params
        const {genres, data} = params
        this.state.data = data

 
        return (
            <View>
                <View style={{ height: 40, top: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 4, backgroundColor: '#f8f7ff', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons style={styles.searchIcon} name="search-outline" size={20} color="green" />
                    <TextInput
                        placeholder='Search'
                        autoFocus
                        style={styles.serchBar}
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ text: text })}
                        blurOnSubmit={false}

                        onSubmitEditing={() => {
                            { this.getData(this.state.text) }

                        }}

                    />
                </View>
                <View style={{ top: 30, flexWrap: 'wrap' }}>
                    <FlatList
                        numColumns={3}
                        data={this.state.data}
                        keyExtractor={({ id }, index) => id}
                        onEndReached={this.handleMore(genres)}
                        onEndReachedThreshold={200}
                        renderItem={({ item }) => (
                            <BookCard title={item.title} />
                            // <Text style={{ marginTop: 20 }}>{item.title}</Text>
                        )}
                    />

                </View>
                {/* <View style={styles.searchSection}>
                <Ionicons style={{padding:10}} name="search-outline" size={20} color="green" />
                    <TextInput
                    placeholder='Search'
                    autoFocus
                    style={styles.serchBar}
                    value={this.state.text}
                    onChangeText = {(text) =>this.setState({text:text})}
                    blurOnSubmit={false}

                    onSubmitEditing={()=>{
                        {this.getData(this.state.text)}
                    
                    }}
                    
                    />
                </View> */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    serchBar: {
        // height:40,
        // paddingRight:10,
        // paddingLeft:10,
        // borderWidth:1,
        // borderRadius:4,
        // backgroundColor:'#f8f7ff'
        flex: 1,

        borderRadius: 4,
        paddingRight: 10,
        paddingLeft: 10,
        height: 40,
        backgroundColor: '#f8f7ff',
        color: '#424242',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f7ff',
    },
    searchIcon: {
        backgroundColor: '#f8f7ff'
    }
})

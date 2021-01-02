import { GestureHandlerRefContext } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BookCard from './BookCard';
import Loader from './Loader'
// ******************************************
// *********************************************
// **************************************
export default class Details extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            page: 1,
            data: [],
            isLoading: true,
            loading: false,
            next:''

        };
    }
    componentDidMount() {
        this.apiRequest()
    }
    apiRequest = async () => {
        try {
            const response = await fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${this.state.page}&search=${this.props.route.params.genres}`)
            const json = await response.json();


            this.setState({ data: [...this.state.data, ...json.results] ,next:json.next})
            
        }
        catch (err) {
            console.log(err)
        }

    }

    handleMore = async () => {
        // setTimeout(()=>{
        if (this.state.next != null) {
            console.log("***********&&&&&&&&&&&",this.state.next)
            await this.setState({
                page: this.state.page + 1
            }, () => {
                this.apiRequest()
            })
        }
        
        // })},2000)
    }

    ItemView = ({ item }) => {
        return (
            // Flat List Item
            <Text>
                {item.title}

            </Text>
        );
    };


    render() {
        const params = this.props.route.params
        

        return (
            <View>
                <Loader loading={this.state.loading} />
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
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={()=>{ this.handleMore()}}
                        onEndReachedThreshold={0.5}
                        // renderItem={this.ItemView}
                        renderItem={({ item }) => {
                            console.log('heyyyyyf theree fuck you')
                            return (

                                <BookCard title={item.title} />

                            )
                        }
                            // <Text style={{ marginTop: 20 }}>{item.title}</Text>
                        }
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

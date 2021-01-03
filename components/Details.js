import { GestureHandlerRefContext } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BookCard from './BookCard';
import Loader from './Loader'

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            page: 1,
            page2: 1,
            data: [],
            isLoading: true,
            loading: false,
            next: '',
            value: ''

        };
    }
    componentDidMount() {
        this.apiRequest()
    }
    apiRequest = async () => {
        this.setState({loading:true})
        try {
            const response = await fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${this.state.page}&subject=${this.props.route.params.genres}&mime_type=image`)
            const json = await response.json();
            this.setState({ data: [...this.state.data, ...json.results] ,loading:false})
            
        }
        catch (err) {
            console.log(err)
        }

    }

    handleMore = async () => {
        if (!this.state.text) {
            await this.setState({
                page: this.state.page + 1
            }, () => {
                this.apiRequest()
            })
        }
    }


    searchFilterFunction = async (text) => {
        this.setState({
            value: text,
        });
        const response = await fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${this.state.page}&subject=${this.props.route.params.genres}&mime_type=image&search=${this.state.value}`)
        const json = await response.json();
        this.setState({ data: json.results })

    };



    render() {

        const params = this.props.route.params

        return (
            <View style={{top:StatusBar.currentHeight}}>
                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={{ fontSize: 30, marginLeft: 30, fontFamily: 'Montserrat-SemiBold', color: '#5e56e7' }}>{this.props.route.params.genres}</Text>

                </View>
                <View style={{ height: 40, top: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 4, backgroundColor: '#f8f7ff', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons style={styles.searchIcon} name="search-outline" size={20} color="green" />
                    <TextInput
                        // autoFocus={true}
                        placeholder='Search'
                        style={styles.serchBar}
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        value={this.state.value}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            {
                                this.searchFilterFunction(this.state.text)
                            }
                        }}

                    />
                </View>
                <Loader loading={this.state.loading} />
                <View style={{ top: 20, padding: 5, flexWrap: 'wrap' }}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 120 }}
                        numColumns={3}
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={() => { this.handleMore() }}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => {
                            let authorName
                            item.authors.map(name => { authorName = name.name })
                            return (
                                <BookCard title={item.title} author={authorName} uri={item.formats['image/jpeg']} url={item.formats['text/plain']} />
                            )
                        }
                        }
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    serchBar: {
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

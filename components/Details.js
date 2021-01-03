import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BookCard from './BookCard';
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
        this.setState({ loading: true })
        try {
            const response = await fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${this.state.page}&subject=${this.props.route.params.genres}&mime_type=image`)
            const json = await response.json();
            this.setState({ data: [...this.state.data, ...json.results], loading: false, isLoading: false })

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

    indicatorForLoadMore = () => {
        return (
            <View>
                <ActivityIndicator animating size='large' />
            </View>
        )
    }



    render() {

        const params = this.props.route.params
        const { container, header, headerText, backIcon, searchContainer, searchIcon, flastListContainer, searchBar } = styles

        return (
            <View style={container}>
                <View style={header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <Icon style={backIcon} name='arrow-left' size={25} color="#5e56e7" />
                    </TouchableOpacity>
                    <Text style={headerText}>{this.props.route.params.genres}</Text>

                </View>
                <View style={searchContainer}>
                    <Ionicons style={searchIcon} name="search-outline" size={20} color="green" />
                    <TextInput
                        // autoFocus={true}
                        placeholder='Search'
                        style={searchBar}
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
                {this.state.isLoading ? (<ActivityIndicator size={50} color='black' style={{ top: StatusBar.currentHeight + 100 }} />) : (
                    <View style={flastListContainer}>
                        <FlatList
                            contentContainerStyle={{ marginBottom: 120 }}
                            numColumns={3}
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={() => { this.handleMore() }}
                            ListFooterComponent={this.indicatorForLoadMore()}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item }) => {
                                let authorName
                                item.authors.map(name => { authorName = name.name })
                                return (
                                    <BookCard title={item.title} author={authorName} uri={item.formats['image/jpeg']} textFormat={item.formats['text/plain']} htmlFormat={item.formats['text/html']} />
                                )
                            }
                            }
                        />

                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        top: StatusBar.currentHeight,
        backgroundColor: '#f8f7ff'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    backIcon: {
        marginLeft: 10
    },
    headerText: {
        fontSize: 30,
        marginLeft: 30,
        fontFamily: 'Montserrat-SemiBold',
        color: '#5e56e7'
    },
    searchContainer: {
        height: 40,
        top: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        backgroundColor: '#a0a0a0',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 10
    },

    serchBar: {
        flex: 1,
        fontFamily: 'Montserrat-SemiBold',
        borderRadius: 4,
        paddingRight: 10,
        paddingLeft: 10,
        height: 40,
        backgroundColor: '#a0a0a0',
        color: '#424242',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a0a0a0',
    },
    searchIcon: {
        backgroundColor: '#a0a0a0'
    },
    flastListContainer: {
        top: 20,
        padding: 5,
        flexWrap: 'wrap'
    }
})

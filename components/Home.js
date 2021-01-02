import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import GenreCard from './GenreCard';
import Loader from './Loader'




export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: ['FICTION',
                'DRAMA',
                'HUMOR',
                'POLITICS',
                'PHILOSOPHY',
                'HISTORY',
                'ADVENTURES',
            ],
            loading: false,
            isLoading: true,
            data: [],
            page: 1,

        };
    }

    apiRequest = async (genres) => {
        // let tempGenres = genres
        // await this.waitBeforeFetch(tempGenres),
        console.log("***********************")
        
            this.props.navigation.navigate('Details', { genres: tempGenres, data: this.state.data })
    }


    waitBeforeFetch = async (tempGenres) => {
        this.setstate({
            loading: true
        })
        await fetch(`http://skunkworks.ignitesol.com:8000/books?search=${tempGenres}`)
            .then((response) => response.json())
            .then((responsesJson) => {
                this.setState({ data: [...this.state.data, ...responsesJson.results],loading:false })
                // setTimeout(() => {
                //     this.setState({
                //         loading: false,

                //     });
                // })
            })
            .catch((error) => console.error(error))
            .finally(() => this.setState({ isLoading: false }))
    }


    render() {
        let GenreCards = this.state.genres.map((genres, key) => {
            return (
                <TouchableHighlight key={key} onPress={() => {
                    
                    // this.apiRequest(genres)
                    this.props.navigation.navigate('Details', { genres: genres })
                }} >
                    <GenreCard genres={genres} />

                </TouchableHighlight>
            )
        })
        return (
            <View style={{ paddingLeft: 5, padding: 20, paddingTop: 20, backgroundColor: '#f8f7ff' }}>
                <Loader loading={this.state.loading} />
                <Text style={{ fontSize: 48, color: '#5E56E7' }}>Gutenberg Project</Text>
                {/* <Text style={{ fontSize: 48, color: '#5E56E7' }}>Project</Text> */}
                <Text style={{ fontSize: 22, color: 'black' }}>A social cataloging ewebsite that allows you to freely earch its database of books, annotations, and reviews.</Text>
                {GenreCards}
            </View>
        );
    }
}

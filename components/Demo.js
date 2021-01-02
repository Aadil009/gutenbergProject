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
            data:[],
            isLoading:true,
            loading: false,

        };
    }
    componentDidMount(){
        
        this.apiRequest(this.props.route.params.genres)
    }
    apiRequest = async(genres)=>{
        const response = await fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${1}&search=${genres}`)
        const json  = await response.json();
        console.log('HEREE IS SOMETHING GOING WRONG')
        this.setState({data: [...this.state.data, responsesJson.results],loading:false,isLoading:false}) 
        // await fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${this.state.page}&search=${genres}`)
        //     .then((response) => response.json())
        //     .then((responsesJson) =>{
        //         console.log("hellowtherej*****************8")
        //          this.setState({data: [...this.state.data, responsesJson.results],loading:false}) 
        //     })
        //     .catch((error) => console.error(error))
        //     .finally(() => this.setState({ isLoading: false }))
    }

    handleMore = (genres) => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.apiRequest(genres)
        })
    }
    // componentDidMount() {
    //     this._isMounted = true;
      
    //     fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${this.state.page}&search=${this.props.route.params.genres}`)
    //         .then((response) => response.json())
    //         .then((responsesJson) =>{
    //             if(this._isMounted){
    //              this.setState({data: [...this.state.data, responsesJson.results],loading:false}) 
    //         }})
    //         .catch((error) => console.error(error))
          
        
    //   }
    // // componentDidMount(){
    // //     this.setState({
    // //         data:this.props.route.params.data
    // //     })
    // // }

    // componentWillUnmount() {
    //     this._isMounted = false;
    //   }

    // apiRequest = (genres) => {
    //      fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${this.state.page}&search=${genres}`)
    //         .then((response) => response.json())
    //         .then((responsesJson) =>{
    //              this.setState({data: [...this.state.data, responsesJson.results],loading:false}) 
    //         })
    //         .catch((error) => console.error(error))
    //         .finally(() => this.setState({ isLoading: false }))
    // }

    // handleMore = (genres) => {
    //     this.setState({
    //         page: this.state.page + 1
    //     }, () => {
    //         this.apiRequest(genres)
    //     })
    // }

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
                        keyExtractor={({ id }, index) => id}
                        onEndReached={this.handleMore(params.genres)}
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

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api'

import { View,SafeAreaView, Text, TouchableOpacity, TextInput, AsyncStorage, StyleSheet } from 'react-native';

export default class New extends Component {
    static navigationOptions ={
        header: null
    }

    state = {
        newTeet: '',
    }

    goBack = () =>{
        this.props.navigation.pop()
    }

    handleTweet = async () =>{
        const content = this.state.newTeet;
        const author = await AsyncStorage.getItem('username');

        await api.post('tweets', {author, content});

        this.goBack();

    }

    handleInputChange = (newTeet) =>{
        this.setState({newTeet})
    }

  render() {
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <Icon name="close" site={24} color="#4BB0EE" onPress={this.goBack} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.handleTweet}>
                <Text style={styles.buttonText}>Tweetar</Text>
            </TouchableOpacity>
        </View>

        <TextInput 
            style={styles.input}
            multiline
            placeholder="O que está acontecendo?"
            placeholderTextColor="#999"
            value={this.state.newTeet}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleTweet}
        />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  
    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },
  
    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
  });
  
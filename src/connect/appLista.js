

import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Component } from 'react';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // Results
            data: [],
            isLoading: true,
            nome: 'Lista de Produtos'
        };

    };

    componentDidMount = () => {
        fetch('https://accented-strengths.000webhostapp.com/Connect_flink/Login.php')
            .then((response) => response.json())
            .then((json) => {
                this.setState({data: json.result});
            })
            .catch((error) => console.error(error))
            .finally(() => {

                this.state.data.map( (item) => {
                    /*this.setState( { nome: item.Nome} );
                    this.setState( { phone: item.Telefone} );
                    this.setState( { password: item.Senha} );
                    this.setState( { id: item.ID} );*/
                });
            });
    }

    render() {
        return (
            <View style={styles.container} >

                <Text style={styles.flink} > Flink - {this.state.nome} </Text>

                <FlatList 
                    data={ this.state.data } 
                    renderItem={({item}) => <Text>{item.Nome}</Text>
                }/>
                
            </View>
        );
    }

    
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

    flink: {
        color: '#4F4F4F',
        fontSize: 26,
        marginBottom: 50
    },

    inputs: {
        width: 300,
        padding: 10,
        fontSize: 22,
        marginBottom: 30,
        borderColor: '#4F4F4F',
        borderBottomWidth: 2
    },

    btEntrar: {
        width: 250,
        padding: 10,
        backgroundColor: '#7B68EE',
        borderRadius: 10,
        alignItems: 'center'
    },

    btText: {
        fontSize: 24,
        color: '#FFF'
    }

});

export default App;

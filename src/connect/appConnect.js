

import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Component } from 'react';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //Inputs
            inputPhone: '',
            inputPassword: '',

            // Results
            data: [],
            isLoading: true,
            phone: '',
            password: '',
            nome: '',
            id: ''
        };

    };

    login = () => {
        
        var valorPhone = this.state.inputPhone;
        const valorPassword = this.state.inputPassword;
        
        if (valorPhone.localeCompare('') && valorPhone.length >= 8 && valorPassword.localeCompare('') && valorPassword.length >= 6) {
            fetch('https://accented-strengths.000webhostapp.com/Connect_flink/Login.php', {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: this.state.inputPhone,
                    password: this.state.inputPassword,
                }),
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({data: json.result});
            })
            .catch((error) => console.error(error))
            .finally(() => {

                this.state.data.map( (item) => {
                    this.setState( { nome: item.Nome} );
                    this.setState( { phone: item.Telefone} );
                    this.setState( { password: item.Senha} );
                    this.setState( { id: item.ID} );
                });

                // autenticação
                var resultPhone = this.state.phone;
                var resultPassword = this.state.password;

                if (resultPhone == valorPhone) {
                    if (resultPassword == valorPassword) {
                        alert('Logado com sucesso ! \n' + valorPhone + ' == ' + resultPhone + '\n' + valorPassword + ' == ' + resultPassword);
                    }
                }

            });
        }
        
    };

    render() {
        return (
            <View style={styles.container} >

                <Text style={styles.flink} > Flink - {this.state.nome} </Text>

                <TextInput style={styles.inputs} placeholder='Telefone' onChangeText={ (inputPhone) => this.setState({inputPhone})} /*value={this.state.phone}*/ />
                <TextInput style={styles.inputs} placeholder='Senha' onChangeText={ (inputPassword) => this.setState({inputPassword})} /*value={this.state.password}*/ />

                <TouchableOpacity style={styles.btEntrar} onPress={this.login} >
                    <Text style={styles.btText} >ENTRAR</Text>
                </TouchableOpacity>
                
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

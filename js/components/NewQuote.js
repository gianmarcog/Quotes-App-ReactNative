import React, { Component } from 'react'
import {Button, Modal, TextInput, StyleSheet, View } from 'react-native'

export default class NewQuote extends Component {
    state = { content: null, author: null, book: null };

    render() {
        const { visible, onSave } = this.props;
        const { content, author, book } = this.state;
        return(
            <Modal
            visible={visible} 
            onRequestClose={() => {
                this.setState({ content: null, author: null, book: null})
                onSave(null, null, nll)
            }}
            animationType='slide'
            >
            <View style={styles.container}>
                <TextInput 
                style={[styles.input, {height: 150}]} 
                multiline={true}
                placeholder="Inhalt des Zitat" 
                //underlineColorAndroid="transparent" - only by Android
                onChangeText={text => this.setState({ content: text })}
                />
                <TextInput 
                style={styles.input} 
                placeholder="Autor des Zitat"
                //underlineColorAndroid="transparent" - only by Android
                onChangeText={text => this.setState({ author: text })}
                />
                <TextInput 
                style={styles.input} 
                placeholder="Buch des Zitates"
                //underlineColorAndroid="transparent" - only by Android
                onChangeText={text => this.setState({ book: text })}
                />
             <Button title="Speichern" 
             onPress={() => {
                 this.setState({ content: null, author: null, book: null})
                onSave(content, author, book)}}
                />
             </View>
            </Modal> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       alignItems: 'center',
       justifyContent: 'flex-start',
    paddingTop: 40
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        width: '80%',
        marginBottom: 20,
        fontSize: 20,
        padding: 10,
        height: 50
 
    }
});
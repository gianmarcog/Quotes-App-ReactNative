import React, { Component } from 'react'
import {Button, Modal, TextInput, StyleSheet, View } from 'react-native'

export default class NewQuote extends Component {
    //The state say which types the paramters do have - destructuring
    state = { content: null, author: null, book: null };

    render() {
        //With this kind of coding you dont have to add to any visible and onSave 'this.props'
        const { visible, onSave } = this.props;
        const { content, author, book } = this.state;
        return(
            <Modal //With the Modal Tag you can create something which position is over everything else
            visible={visible} 
            onRequestClose={() => {
                this.setState({ content: null, author: null, book: null})
                onSave(null, null, nll)
            }}
            animationType='slide'
            >
            <View style={styles.container}>
                <TextInput  // This Tag is just a field where you can write something inside
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
                 //Whenever you safe a Quote all the TextInput parameters get null again. 
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
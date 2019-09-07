import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Quote extends Component {
    render() {
        const {text, author, book } = this.props; //destructuring
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.author}>&mdash; {author}</Text>
                <Text style={styles.book}>{book}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    text: {
        fontSize: 30,
        fontStyle: 'italic',
        marginBottom: 10
    },
    author: {
        fontSize: 15,
        textAlign: 'right'
    },
    book: {
        fontSize: 15,
        textAlign: 'right'
    }

});
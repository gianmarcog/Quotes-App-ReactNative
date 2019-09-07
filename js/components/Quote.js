import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';

export default class Quote extends Component {
    render() {
        const {text, author, book } = this.props; //destructuring
        return (
            <Fragment>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.author}>&mdash; {author}</Text>
                <Text style={styles.book}>&mdash; {book}</Text>
            </Fragment>
        );
    }
}

const styles = {
    text: {
        fontSize: 36,
        fontStyle: 'italic'
    },
    author: {
        fontSize: 20,
        //textAlign: 'left'
    },
    book: {
        fontSize: 20,
        //textAlign: 'left'
    }

}
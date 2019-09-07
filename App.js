import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Quote from './js/components/Quote';

const data = [
    {
        text: 'Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.',
        author: 'Albus Dumbledore,',
        book: 'Harry Potter and the Prisoner of Azkaban'
    },
    {
        text: 'What you fear most of all is-fear.',
        author: 'Remus Lupin,',
        book: 'Harry Potter and the Prisoner of Azkaban'
    },
{
          text: 'I hope youre pleased with yourselves. We could all have been killed — or worse, expelled. Now if you dont mind, Im going to bed.',
          author: 'Hermione Granger,',
          book: 'Harry Potter and the Sorcerers Stone'
      }
];

export default class App extends Component {
  state = { index: 0 };
  render(){
    let index = this.state.index;
    const quote = data[index];
    let nextIndex =index + 1;
    if(nextIndex === data.length) nextIndex = 0;
    return (
      <View style={styles.container}>
        <View style={styles.newButton}>
        <Button title="neues Zitat"onPress={()=> alert('Neues Zitat')} />
        </View>
        <Quote text={quote.text} author={quote.author} book={quote.book}></Quote>
        <View style={styles.button}>
        <Button title ="next Quote"
          onPress={() => this.setState({index: nextIndex})}
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
        },
    button: {
      position: "absolute",
      bottom: 20
    }
    newButton: {
      position: 'absolute',
      top: 30 
    }
});

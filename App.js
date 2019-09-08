import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

function StyledButton(props) {
  return(
<View style={props.style}>
        <Button 
        title ={props.title}
          onPress={props.onPress}
        />
        </View>
  )};

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
  state = { index: 0, showNewQuoteScreen: false, quotes: data };

_retrieveData = async () => {
  let value = await AsyncStorage.getItem('QUOTES');
    if(value != null){
    value = JSON.parse(value);
    this.setState({quotes: value});
  }
}

_storageData(quotes){
  AsyncStorage.setItem('QUOTES', JSON.stringify(quotes)); // key - value
}

  _addQuote = (text, author, book) => {
   
    let { quotes } = this.state;
    if (text && author && book) {
    quotes.push({text: text, author: author, book: book});
    this._storageData(quotes);
    }
    this.setState({ 
      index: quotes.length-1, 
      showNewQuoteScreen: false, 
      quotes: quotes });
  }

  _displayNextQuote(){
    let { index, quotes } = this.state;
    let nextIndex =index + 1;
    if(nextIndex === quotes.length) nextIndex = 0;
    this.setState({index: nextIndex})
  }

  _deleteButton(){
    let { index, quotes } = this.state;
    quotes.splice(index, 1); //delete the part of the array
    this._storageData(quotes);
    this.setState({index: 0, quotes})
  }

  componentDidMount(){
    this._retrieveData();
  }

  render(){
    let { index, quotes } = this.state
    const quote = quotes[index];
    return (
      <View style={styles.container}>
        <StyledButton 
        style={styles.deleteButton}
        title="Löschen"
        onPress={()=> this._deleteButton()} 
        />
        <StyledButton 
        style={styles.newButton}
        title="Neu"
        onPress={()=> this.setState({showNewQuoteScreen: true })} 
        />
        <NewQuote 
        visible={this.state.showNewQuoteScreen}
        onSave={this._addQuote}
        />
        <Quote text={quote.text} author={quote.author} book={quote.book}></Quote>
        <StyledButton 
        style={styles.nextButton}
        title="next Quote"
        onPress={()=> this._displayNextQuote()} 
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center'
    },
    button: {
      position: "absolute",
      bottom: 20
    },
    newButton: {
      position: 'absolute',
      top: 30 ,
      right: 3
    },
    nextButton: {
      position: 'absolute',
      bottom: 0
    },
    deleteButton: {
      position: 'absolute',
      left: 0,
      top: 30
    }
});

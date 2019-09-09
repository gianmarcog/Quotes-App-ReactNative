//Imports to using the function down below.
import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

//Parent function for the buttons. You can use this function for any Button inside this JS
function StyledButton(props) {
  return(
    //props.style is kind of a placeholder as a definition for the future StyledButtons
<View style={props.style}>
        <Button //The Button is gonnna get is properties
        title ={props.title}
          onPress={props.onPress}
        />
        </View>
  )};

  //Array where are the defaults values
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
//Start from 'App.js'
export default class App extends Component {
  //The state gives the start values. Their only change avaivle with setState
  state = { index: 0, showNewQuoteScreen: false, quotes: data };

//Formatting (async) the String back to a JSON
_retrieveData = async () => {
  //The new Quote is going to be local safed wiht the help from AsyncStorage
  let value = await AsyncStorage.getItem('QUOTES');
    if(value != null){
      //Change the value from a String to an JSON
    value = JSON.parse(value);
    //In the next step the new Quote get safed in the 'quotes' Array
    this.setState({quotes: value});
  }
}

//The Data (new Quote) get stored in a String with the Key 'QUOTES'. This is where you get the data.
_storageData(quotes){
  AsyncStorage.setItem('QUOTES', JSON.stringify(quotes)); // key - value
}

//Here your're adding another Quote
  _addQuote = (text, author, book) => {
   
    let { quotes } = this.state;
    if (text && author && book) {
      //push the new Quote to the array
    quotes.push({text: text, author: author, book: book});
    //The new Quote get safed
    this._storageData(quotes);
    }
    //When you create a new Quote the first Screen/Quote you will see is the newest
    this.setState({ 
      index: quotes.length-1, 
      showNewQuoteScreen: false, 
      quotes: quotes });
  }

  //This Method is their to change the view with the quotes (whenever you will press to button)
  _displayNextQuote(){
    let { index, quotes } = this.state;
    let nextIndex =index + 1;
    if(nextIndex === quotes.length) nextIndex = 0;
    this.setState({index: nextIndex})
  }

  //Here you delete your own written quotes out of the array
  _deleteButton(){
    let { index, quotes } = this.state;
    quotes.splice(index, 1); //delete the part of the array
    this._storageData(quotes);
    this.setState({index: 0, quotes})
  }

  //This Method is from react. This Method is the first Method which get called when the UI get open
  componentDidMount(){
    this._retrieveData();
  }

  //Thus Method shows the UI
  render(){
    let { index, quotes } = this.state //With this kind of coding you dont have to add to any index und quotes 'this.state' - destructuring
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
        {/* With the NewQuote Tag you can communicate with the 'NewQuote.js' file */}
        <NewQuote 
        visible={this.state.showNewQuoteScreen}
        onSave={this._addQuote}
        />
        {/* With the Quote Tag you can communicate with the 'Quote.js' file */}
        <Quote text={quote.text} author={quote.author} book={quote.book}></Quote>
        {/* With the StyleButton Tag you do have a constructer with which one you work */}
        <StyledButton 
        style={styles.nextButton}
        title="next Quote"
        onPress={()=> this._displayNextQuote()} 
        />
      </View>
    )
  }
}

//This const styles is their to create a structured desgin-css copie
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

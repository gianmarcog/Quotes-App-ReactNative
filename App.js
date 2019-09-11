import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
import {SQLite} from 'expo-sqlite';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';
import Firebase from './js/Firebase';
import { firstFromTime } from 'uuid-js';

//Parent function for the buttons. You can use this function for any Button inside this JS
function StyledButton(props) {
  let button = null;
  if(props.visible) //If the button visible boolean is true you can see it.
  button = ( 
       //props.style is kind of a placeholder as a definition for the future StyledButtons
<View style={props.style}>
        <Button //The Button is gonnna get is properties
        title ={props.title}
          onPress={props.onPress}
        />
        </View>
          );
        return button;
  };

export default class App extends Component {
  //The state gives the start values.
  state = { index: 0, showNewQuoteScreen: false, quotes: [], isLoading: true };

//Push the Quotes to Firebase
_retrieveData = async () => {
  let quotes = [];
  let query= await Firebase.db.collection('quotes').get();
  query.forEach(quote => {
    quotes.push({
      id: quote.id,
      text: quote.data().text,
      author: quote.data().author,
      book: quote.data().book
    });
  });
  this.setState({ quotes, isLoading: false });
}

//Save the Quotes inside the database
_saveQuoteDB = async (text, author, book, quotes) => {
  docRef = await Firebase.db.collection('quotes').add({text, author, book});
  quotes[quotes.length -1].id = docRef.id;
}

//Delete the quote 
_removeQuoteToDB(id){
  Firebase.db.collection
  .collection('quotes')
  .doc(id)
  .delete();
};

//Here your're adding another Quote with the three parameters
  _addQuote = (text, author, book) => {
    let { quotes } = this.state; //destructuringä
    //Check if every Textfield isn't null
    if (text && author && book) {
      //push the new Quote to the array
    quotes.push({text: text, author: author, book: book});
    this._saveQuoteDB(text, author, book, quotes);
    }
    //When you create a new Quote the next Screen/Quote is the newest
    this.setState({ 
      index: quotes.length-1, 
      showNewQuoteScreen: false, 
      quotes: quotes });
  }

  //This Method change the view with the quotes (whenever you will press to button)
  _displayNextQuote(){
    let { index, quotes } = this.state;
    let nextIndex =index + 1;
    if(nextIndex === quotes.length) nextIndex = 0; //rest if you at the end of the quotes
    this.setState({index: nextIndex})
  }

  //Here you delete your own written quotes out of the array
  _deleteButton(){
    //Add a delete API 
    Alert.alert('Delete Quote','Do you want to delete this Quote?', [
      {text: 'Break off', style: 'cancel'},
      {text: 'Delete', 
      style:'destructive', 
      onPress: () => this._deleteQuote()}
    ])
  }
//Add a delete function which get used when you click on the delete button
  _deleteQuote(){
    // TODO: new Quote  deleted in SQL
    let { index, quotes } = this.state;
    this._removeQuoteToDB(quotes[index].id)
    quotes.splice(index, 1); //delete the part of the array (1 = this one // 2 = this one and the next ...)
    //Sthe index to 0 so we can rerun the Quotes from the beginning
    this.setState({index: 0, quotes})
  }

  //This is a react Method. This Method is the first Method which get called when the UI get open.
  //It calls the Data out of the storage so you  have the Quotes to beginn of the app 
  componentDidMount(){
    Firebase.init();
    this._retrieveData();
  }

  //This Method shows the UI
  render(){
    //During the quotes are loading the if-statement runs the ActivityIndicator 
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
       <ActivityIndicator size="large" color="black"/>
       </View>
      )
    }
    let { index, quotes } = this.state //With this kind of coding you dont have to add to any index und quotes 'this.state' - destructuring
    const quote = quotes[index]; //This const load the actual index from the Array to show up
    let content = <Text style={{fontSize: 30}}>No Quote</Text> //Create deafult value if their is no data inside the array
    if(quote) { //Check the  quote array
      content = <Quote text={quote.text} author={quote.author} book={quote.book} />;
    }
    return (
      <View style={styles.container}>
        <StyledButton 
        //Here you have to add the paramters of the method wie create above
        style={styles.deleteButton}
        title="Delete"
        onPress={()=> this._deleteButton()} 
        visible={quotes.length >= 1} //If is their atleast one quote inside the array it gets true and is visible
        />
        <StyledButton 
        style={styles.newButton}
        title="New"
        onPress={()=> this.setState({showNewQuoteScreen: true })} 
        visible={true}
        />
        {/* With the NewQuote Tag you can communicate with the 'NewQuote.js' file */}
        <NewQuote 
        visible={this.state.showNewQuoteScreen}
        onSave={this._addQuote}
        />
        {/* With the StyleButton Tag you do have a constructer with which one you work */}
        {content}
        <StyledButton 
        style={styles.nextButton}
        title="next Quote"
        onPress={()=> this._displayNextQuote()} 
        visible={quotes.length >= 2} //only shows up when  their is more then 1 quote
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

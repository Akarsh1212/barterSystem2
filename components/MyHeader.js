import React, { Component} from 'react';
import { Header,Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import  db  from '../config'
import firebase from 'firebase';

export default class MyHeader extends Component{
constructor(props){
  super(props)
  this.state = {
    userId : firebase.auth().currentUser.email,
    value : ""
  }
}
getNumberOfUnreadNotifications(){
  db.collection("allNotification")
  .where('status','==','unread')
  .where('targeted_userId','==',this.state.userId)
  .onSnapshot((snapshot)=>{
    var unreadNotification = snapshot.docs.map((doc)=>doc.data)
    this.setState({
      value : unreadNotifications.length
    })
  })
}
componentDidMount(){
  this.getNumberOfUnreadNotifications()
}
bellIconWithBadge =()=>{
  return(
    <View>
      <Icon name = 'bell' type = 'font-awesome' color = "red" size = {25}
      onPress = {
        ()=>
          this.props.navigation.navigate('notification')
        }/>
  <Badge value = {this.state.value} containerStyle = {{position : 'absolute', top : -4, right : -4}}/>
    </View>
  )
}
render()
{  
  return (
    <Header
    leftComponent = {<Icon name = 'bars' type = "font-awesome" color = "red"
    onPress = {()=>
    this.props.navigation.toggleDrawer()}/>
  }
      centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent = {<this.bellIconWithBadge{...this.props}/>}
      backgroundColor = "#eaf8fe"
    />
    
  );
  }
}


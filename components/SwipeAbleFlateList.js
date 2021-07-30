import React, {Component} from 'react'
import { View , Text, Animated, Dimensions, StyleSheet, TouchableHighlight } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { SwipeListView } from 'react-native-swipe-list-view'
import db from '../config'
export default class SwipeableFlateList extends Component{
    constructor(props){
        super(props)
        this.state = {
            allNotifications : this.props.allNotifications
        }
    }
    updateMarkAsRead=(notification)=>{
        db.collection('allNotifications').doc(notification.doc_id).update({
            "notification_status" : "read"
        })

        
    }
    onSwipeValueChange = swipeData =>{
        var allNotifications = this.state.notification
        const {key,value} = swipeData
        if(value< -Dimensions.get('window').width()){
            const newData = [...allNotifications]
            const prevIndex = allNotifications.findIndex(item=>item.key===key)
            this.updateMarkAsRead(allNotifications[prevIndex])
            newData.splice(prevIndex,1)
            this.setState({allNotifications : newData})
        }

    }
    renderItem = data =>(
        <ListItem
        title = {data.item.item_name}
        titleStyle = {{color : 'black', fontWeight : 'bold', }}
        subtitle  = {data.item.message}
        bottomDivider/>
    )
    renderHiddenItem=()=>{
        <View style = {styles.rowBack}>
            <View style = {[styles.backRightButton, styles.backRightButtonRight]}>
                <Text style = {styles.backTextWhite}></Text>
            </View>
        </View>

    }
    render(){
        return(
            <View style = {styles.container}>
                <SwipteListView
                disableRightSwipe 
                data = {this.state.allNotifications}
                renderItem = {this.renderItem}
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width()}
                previewRowKey = {'0'}
                previewRowKey = {-40}
                previewDelay = {3000}
                onSwipeValueChange = {this.onSwipeValueChange}/>
            </View>
        )
    }
}
const style = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex : 1,
    },
    backTextWhite : {
        color : '#fff',
        fontWeight : 'bold',
        fontSize  : 50,

    }, 
    rowBack : {
        alignItems : 'center',
        backgroundColor : "#29b6f6",
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        paddingLeft : 15,

    }, 
    backRightButton : {
        alignItems : 'center',
        bottom : 0,
        justifyContent : 'center',
        position : 'absolute',
        top : 0,
        width : 100,

    },
    backRightButtonRight : {
        backgroundColor : '#29b6f6',
        right : 0,
        
    }
})

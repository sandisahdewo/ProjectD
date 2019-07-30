import React from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import Modal from "react-native-modal"

const Loading = (props) => {
  // return render(props)
  return (
    <Modal isVisible={props.loading} backdropOpacity={0.4}>
      <View style={styles.modal}>
        <ActivityIndicator 
          size='large' 
          color='#0000ff' 
          style={styles.loading} 
          animating={props.loading}
        >
        {props.children}
        </ActivityIndicator>
      </View>
    </Modal>
  )
}

const render = (props) => {
  if(props.loading) {
    return (
      <View style={styles.container}>
        {(props.loading) &&
          <Modal isVisible={props.loading}>
            <ActivityIndicator 
              size='large' 
              color='#0000ff' 
              style={styles} 
              animating={props.loading}
            >
            {props.children}
            </ActivityIndicator>
          </Modal>
        }
      </View>
    )
  } else {
    return <View></View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center'
  },  
  modal: {
    alignSelf:'center', 
    justifyContent:'center', 
    height:100, 
    width:100, 
    backgroundColor:'#fff',
    borderRadius:8
  },
  loading: {
    justifyContent: 'center',
    alignSelf:'center'
  }
})

export default Loading
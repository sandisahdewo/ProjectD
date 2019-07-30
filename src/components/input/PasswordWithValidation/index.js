import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Item, Label, Input } from 'native-base'

class PasswordWithValidation extends Component {

  static defaultProps = {
    disabled: false,
    onTouchStart: null
  }

  render () {
    const hasError = React.Children.count(this.props.error) > 0 && this.props.error ? true : false;
    const disable = this.props.disabled ? true : false;
    const onTouchStart = this.props.onTouchStart !== undefined ? this.props.onTouchStart : null;

    return(
      <View style={{marginBottom:4}}>
        <Item floatingLabel error={hasError}>
          <Label 
            style={[hasError ? styles.labelError : styles.label]}
          >{this.props.title}</Label>
          <Input 
            value={this.props.value} 
            onTouchStart={onTouchStart} 
            onChangeText={(input) => this.handleChangeText(input)} 
            keyboardType={this.props.keyboardType}
            disabled={disable}
            secureTextEntry
            />

        </Item>
        <Text style={{color:'red', fontSize:10, paddingLeft:3}}>{this.props.error}</Text>
      </View>
    )
  }

  handleChangeText = (input) => {
    this.props.onChangeText !== undefined ? this.props.onChangeText(input) : null;
  } 
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12
  },
  labelError: {
    fontSize: 12,
    color: 'red'
  }
});

export default PasswordWithValidation;
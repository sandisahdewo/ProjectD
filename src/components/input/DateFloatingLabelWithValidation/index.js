import React, { Component } from 'react'
import { View, Text, StyleSheet, DatePickerAndroid } from 'react-native'
import { Item, Label, Input } from 'native-base'
import { format } from 'date-fns'

class DateFloatingLabelWithValidation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value : '',
    }
  }

  // componentDidMount() {
  //   this.props.setDefaultValue ? this.setState({value : format(new Date(), 'DD-MM-YYYY') }) : this.setState({value : '2019-05-04' });
  //   console.log('value props', this.props.value)
  // }

  // componentDidUpdate(prevProps, nextProps) {
  //   console.log('prev', prevProps)
  //   console.log('next', nextProps)
  //   // this.props.setDefaultValue ? this.setState({value : format(new Date(), 'DD-MM-YYYY') }) : this.setState({value : this.props.value });
  // }

  render () {
    const hasError = React.Children.count(this.props.error) > 0 && this.props.error ? true : false;
    
    return(
      <View style={{marginBottom:7}}>
        <Item floatingLabel error={hasError}>
          <Label 
            style={[hasError ? styles.labelError : styles.label]}
          >{this.props.title}</Label>
          <Input value={this.state.value} onTouchStart={() => this.setDateAndroid()} />
        </Item>
        <Text style={{color:'red', fontSize:10, paddingLeft:3}}>{this.props.error}</Text>
      </View>
    )
  }

  setDateAndroid = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
      date: new Date(),
      maxDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let value = format(new Date(year, month, day), 'DD-MM-YYYY')
        this.setState({value : value})
        this.props.onSelected(value)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };
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

export default DateFloatingLabelWithValidation;
import React, {Component} from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Container, Content, Card, Item, Input, Label, Picker, Icon, Toast} from 'native-base';
import { Button } from 'react-native-elements';
import { format } from 'date-fns';
import ServicePitstopSarana from '../../../services/pitstop-sarana';
import InputFloatingLabelWithValidation from '../../../components/input/FloatingLabelWithValidation'
import DateFloatingLabelWithValidation from '../../../components/input/DateFloatingLabelWithValidation'

export default class Create extends Component {

	static navigationOptions = ({ navigation }) => {
    // return {
    //   headerLeft: (
    //     <TouchableHighlight onPress={() => navigation.openDrawer() }>
    //       <View style={{marginLeft: 15}}>
    //         <Icon name="ios-menu" size={28} style={{ color:'white' }}/>
    //       </View>
    //     </TouchableHighlight>
    //   ),
    // }
  };

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      line: '',
      nomor: '',
      // driver: '',
      // fuelman: '',
      tanggal: '',
      shift: 'siang',
      whs_number: '',
      location:'',

      validation: {
        whs_number: '',
        location: '',
      }
    }
  }

  componentDidMount() {
    const id = this.props.navigation.state.params.id;
    this.find(id);
  }

  render() {
    return (
      <Container>
        <Content>
          <KeyboardAvoidingView behavior="padding">
            <Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
                <View style={{margin:5}}>
                  <Text>
                    TAB - SUB TAB
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
								<View style={{paddingVertical:5, paddingHorizontal:7}}>
									<Text style={{fontSize:18, fontWeight:'bold'}}>Pitstop Sarana</Text>
									<Text style={{fontSize:16, fontWeight:'bold'}}>{this.state.line}</Text>
								</View>
							</View>
						</Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										SERVICES
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>

                  {/* <InputFloatingLabelWithValidation title='Driver' value={this.state.driver} onChangeText={(driver) => this.setState({driver})} error={this.state.validation.driver} /> */}
                  {/* <InputFloatingLabelWithValidation title='Fuelman' value={this.state.fuelman} onChangeText={(fuelman) => this.setState({fuelman})} error={this.state.validation.fuelman} /> */}
                  <DateFloatingLabelWithValidation value={this.state.tanggal} title='Tanggal' onSelected={(tanggal) => this.setState({tanggal})} error={this.state.validation.tanggal} />

                  <View style={{marginBottom:7}}>
                    <Item>
											<View style={{flex:1, flexDirection:'column'}}>
                        <Label style={{fontSize:12}}>Shift</Label>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          placeholder="Pilih Shift"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          style={{ width: undefined }}
                          selectedValue={this.state.shift}
                          onValueChange={(shift) => this.setState({shift})}
                        >
                          <Picker.Item label="Siang (07:00 - 17:00)" value="siang" />
                          <Picker.Item label="Malam (17:00 - 07:00)" value="malam" />
                        </Picker>
                      </View>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										LOG SHEET FUEL
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <InputFloatingLabelWithValidation value={this.state.whs_number} title='WHS Number' onChangeText={(whs_number) => this.setState({whs_number})} error={this.state.validation.whs_number} />
                  <InputFloatingLabelWithValidation value={this.state.location} title='Location' onChangeText={(location) => this.setState({location})} error={this.state.validation.location} />
                </View>
              </View>
            </Card>

            <View style={{flex:1, height:100, marginHorizontal:5}}>
              <Button onPress={() => this.update()} title='Perbarui'></Button>
            </View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }

  find = async (id) => {
    await ServicePitstopSarana.findServiceById(id)
      .then(res => {
        this.setState({
          id: id,
          line: res.line,
          // driver: res.driver,
          // fuelman: res.fuelman,
          tanggal: res.tanggal_view,
          shift: res.shift,
          whs_number: res.whs_number,
          location: res.location,
        })

      })
      .catch(err => {
        console.log(err)
      })

  }

  update = () => {
    const formData = {
      line: this.state.line,
      // driver: this.state.driver,
      tanggal: this.state.tanggal,
      shift: this.state.shift,
      whs_number: this.state.whs_number,
      lokasi: this.state.location,
    } 

    ServicePitstopSarana.updateService(formData, this.state.id)
      .then(res => {
        if(res.success) {
          Toast.show({
            text: 'Berhasil memperbarui service pitstop sarana!',
            buttonText: 'Okay',
            type:'success'
          })
          this.props.navigation.navigate('ServicePitstopSaranaIndex')
        }
      })
      .catch(err => {
        const validationMessage = err.response.data.errors;
        this.setState({
          validation: {
            whs_number: validationMessage.whs_number,
            location: validationMessage.lokasi
          }
        })
      });
  }
}
import React, {Component} from 'react'
import {View, Text, TouchableHighlight, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {RNCamera} from 'react-native-camera'
import {Toast, Icon, Button} from 'native-base'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import ServiceUnit from '../../services/unit';
import ScanBarcode from '../../components/camera/scan-barcode'

let _this

export default class Index extends Component{

  static navigationOptions = {
    headerLeft: (
      <TouchableWithoutFeedback onPress={() => _this.props.navigation.navigate('ServicePitstopSaranaIndex', {pitstopSaranaId: _this.props.navigation.state.params.pitstopSaranaId } )} >
        <Icon name='close' style={{color:'white', paddingLeft:20, fontSize:24}} />
      </TouchableWithoutFeedback>
    )
  };

  constructor(props)
  {
    super(props)
    this.state = {
      flashMode: 'RNCamera.Constants.FlashMode.off',
      flashOn: false
    }
  }

  componentDidMount = () => {
    _this = this;
  }

  toggleFlashLight = () => {
    this.setState({flashOn: !this.state.flashOn}, () => {
      if(this.state.flashOn) {
        this.setState({ flashMode: RNCamera.Constants.FlashMode.torch });
      } else {
        this.setState({ flashMode: RNCamera.Constants.FlashMode.off });
      }
    })
  }

  onBarCodeRead = (barcode) => {
    setTimeout(() => {
      console.log('barr', barcode)
      if(barcode.data != null) {
        console.log('barcode', barcode.data)
        alert(`barcode ${barcode.data}`)
        // this.findUnitByKode(barcode.data)
      }
    }, 5000)
  }

  findUnitByKode = (kodeUnit) => {
    ServiceUnit.findByKode(kodeUnit)
    .then(res => {
      if(!res.success) {
        Toast.show({
          text: 'Data Unit tidak ditemukan',
          buttonText: 'Okay',
          type:'danger'
        })
      } else {
        console.log('response', res)
      }
    })
    .catch(err => {
      Toast.show({
        text: err.message,
        buttonText: 'Okay',
        type:'danger'
      })
    })
  }

  render() {
    const flashStatus = this.state.flashOn ? 'On' : 'Off'

    return(
      <View style={{flex:1}}>
        {/* <Button style={{width:200}} onPress={() => this.onBarCodeRead('testing') }>
          <Text>OK</Text>
        </Button> */}
        <ScanBarcode handleSetBarcode={(barcode) => this.onBarCodeRead(barcode)}/>
      </View>
      // <RNCamera
      //   ref={ref => {
      //     this.camera = ref;
      //   }}
      //   style={[StyleSheet.absoluteFill, styles.container]}
      //   type={RNCamera.Constants.Type.back}
      //   flashMode={this.state.flashMode}
      //   onBarCodeRead={(barcode) => 
      //     setTimeout(() => {
      //       console.log('time')
      //       this.onBarCodeRead(barcode) 
      //     }, 3000)
      //   }
      //   barcodeFinderWidth={280}
      //   barcodeFinderHeight={220}
      //   defaultTouchToFocus
      //   androidCameraPermissionOptions={{
      //     title: 'Permission to use camera',
      //     message: 'We need your permission to use your camera',
      //     buttonPositive: 'Ok',
      //     buttonNegative: 'Cancel',
      //   }}
      //   androidRecordAudioPermissionOptions={{
      //     title: 'Permission to use audio recording',
      //     message: 'We need your permission to use your audio',
      //     buttonPositive: 'Ok',
      //     buttonNegative: 'Cancel',
      //   }}
      //   // onGoogleVisionBarcodesDetected={({ barcodes }) => {
      //   //   alert(barcodes.data);
      //   // }}
      // >
      //   <View style={styles.layerTop} />
      //   <View style={styles.layerCenter}>
      //     <View style={styles.layerLeft} />
      //     <View style={styles.focused} />
      //     <View style={styles.layerRight} />
      //   </View>
      //   <View style={styles.layerBottom} />

      //   <View style={{bottom:0, width:'100%'}}>
      //     <TouchableHighlight onPress={() => this.toggleFlashLight()} style={{backgroundColor:'black', height:70, justifyContent:'center', alignItems:'center'}}>
      //       <View style={{alignItems:'center'}}>
      //         <FontAwesomeIcon name='flash' size={32} color='white'/>
      //         <Text style={{color:'white', fontSize:14}}>Flash {flashStatus}</Text>
      //       </View>
      //     </TouchableHighlight>
      //   </View>
      // </RNCamera>
    )
  }

}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 0.3,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10,
    borderColor:'red',
    borderWidth:1
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 0.3,
    backgroundColor: opacity
  },
})
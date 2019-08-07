import React, {useState, useEffect} from 'react'
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native'
import {RNCamera} from 'react-native-camera'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import BarcodeMask  from 'react-native-barcode-mask'

const ScanBarcode = (props) => {
  let [flashStatus, toggleFlashStatus] = useState(false)
  let [flashLightType, setFlashLightType] = useState(RNCamera.Constants.FlashMode.off)
  let [textFlashStatus, setTextFlashStatus] = useState('Off')

  useEffect(() => {

    handleToggleFlashStatus = () => {
      toggleFlashStatus(!flashStatus)
    }

    if(flashStatus) {
      setFlashLightType(RNCamera.Constants.FlashMode.torch)
      setTextFlashStatus('On')
    } else {
      setFlashLightType(RNCamera.Constants.FlashMode.off)
      setTextFlashStatus('Off')
    }

  })

  return (
    <View style={{flex:1}}>
      <RNCamera
        ref={cam => {
          camera = cam;
        }}
        style={[StyleSheet.absoluteFill, styles.container]}
        type={RNCamera.Constants.Type.back}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        flashMode={flashLightType}
        onBarCodeRead={(barcode) => props.handleOnBarCodeRead(barcode)}
        defaultTouchToFocus
        mirrorImage={false}
        barcodeFinderWidth={380}
        barcodeFinderHeight={320}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          props.handleOnBarCodeRead(barcodes)
        }}
      >
        <BarcodeMask width={200} height={200} edgeColor={'#62B1F6'} showAnimatedLine={false}/>
      </RNCamera>
      <View style={{position:'absolute', bottom:0, width:'100%'}}>
        <TouchableHighlight onPress={() => handleToggleFlashStatus()} style={{backgroundColor:'black', height:70, justifyContent:'center', alignItems:'center'}}>
          <View style={{alignItems:'center'}}>
            <FontAwesomeIcon name='flash' size={32} color='white'/>
            <Text style={{color:'white', fontSize:14}}>Flash {textFlashStatus}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
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

export default ScanBarcode
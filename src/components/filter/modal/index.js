import { StyleSheet } from "react-native";
import Modal from "react-native-modal";

const ModalFilter = () => {
  {/* Modal untuk filter di bawah */}
  <Modal isVisible={this.state.isModalVisible} 
    swipeDirection={['right', 'down']}
    style={styles.bottomModal}
    onSwipeComplete={() => this.toggleModal()}
  >
  <View style={{paddingHorizontal:8, paddingBottom:8, backgroundColor:'white'}}>
    <View style={{marginBottom:7}}>
      <View style={{height:40, marginBottom:7}}>
        <Row style={{borderBottomColor:'#808080', justifyContent:'flex-start', alignItems:'center', borderBottomWidth:0.4}}>
          <TouchableWithoutFeedback onPress={() => this.toggleModal()}>
            <Icon name='close' style={{fontSize:30, marginRight:10, color:'black'}} />
          </TouchableWithoutFeedback>
          <Text style={{fontSize:20}}>Filter Data</Text>
        </Row>
      </View>
      <Item floatingLabel>
        <Label style={{fontSize:12}}>Tanggal</Label>
        <Input value='07-05-2019' onTouchStart={() => setDate()} />
      </Item>
      </View>
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
              selectedValue={this.state.selectedJenisPetugas}
            >
              <Picker.Item label="Siang (07:00 - 17:00)" value="key0" />
              <Picker.Item label="Malam (17:00 - 07:00)" value="key1" />
            </Picker>
          </View>
        </Item>
      </View>
      <View style={{marginBottom:7}}>
        <Item>
          <View style={{flex:1, flexDirection:'column'}}>
            <Label style={{fontSize:12}}>Status</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Pilih Status"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.selectedJenisPetugas}
            >
              <Picker.Item label="Approved" value="key0" />
              <Picker.Item label="Rejected" value="key1" />
            </Picker>
          </View>
        </Item>
      </View>
      <Button title="Terapkan" onPress={this.toggleModal} />
    </View>
  </Modal>
}
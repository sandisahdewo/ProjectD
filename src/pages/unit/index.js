import React, {Component} from 'react';
import ServiceUnit from '../../services/unit';
import {Input, ListItem} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import {View, Text, RefreshControl} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      page: 1,
      q: '',
      unit: [],
    }
  }

  componentDidMount = () => {
    this.props.navigation.addListener('willFocus', 
      () => {
        this.handleRefresh();
      }
    )
  }

  getUnit = () => {
    const {page, q, list} = this.state;
    const params = {
      q: q,
      page: page
    }
    ServiceUnit.get(params)
      .then(res => {
        this.setState({
          list: page === 1 ? res.data : [...list, ...res.data],
          isFetching: false
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  handleRefresh = () => {
    this.setState({
      isFetching: true,
      q: '',
      page:1
    }, () => {
      this.getUnit()
    })
  }

  handleLoadMore = () => {
    if(!this.state.isFetching) {
      this.setState({
        isFetching: true,
        page:this.state.page+1
      }, () => {
        this.getUnit()
      })
    }
  }

  handleSearch = (q) => {
    this.setState({
      isFetching: true,
      q: q,
      page:1
    }, () => {
      this.getUnit()
    })
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      onPress={() => this.props.navigation.navigate('UnitEdit', { unitId: item.id })}
      containerStyle={{paddingVertical:4, paddingHorizontal:10}}
      title={item.kode_unit}
      titleProps={{fontSize:11}}
      subtitle={
        <View>
          <Text style={{fontSize:9}}>{item.tipe_unit}</Text>
          <Text style={{fontSize:9}}>{item.no_polisi}</Text>
        </View>
      }
      bottomDivider
    />
  )

  render() {
    return (
      <View style={{flex:1}}>
        <View>
          <Input 
            containerStyle={{width:'100%'}}
            placeholder='Cari unit'
            onChangeText={(q) => this.handleSearch(q)}
            inputStyle={{paddingLeft:10, fontSize:12}}
            value={this.state.q}
            leftIcon={{ type: 'font-awesome', name: 'search', size:19, color:'#696969' }} 
          />
        </View>
        <View style={{paddingTop:7}}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.list}
            renderItem={this.renderItem}
            refreshControl={
              <RefreshControl
                onRefresh={() => this.handleRefresh() }
                refreshing={this.state.isFetching}
              />
            }
            onEndReachedThreshold={0.4}
            onEndReached={() => this.handleLoadMore()}
          />
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('UnitCreate')}/>
      </View>
    );
  }
}

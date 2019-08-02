import React, {Component} from 'react';
import ServiceUnit from '../../services/unit';
import {Input, ListItem} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import {View, Text, RefreshControl} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import User from '../../storages/async-storage/user'
import Loading from '../../components/loading'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      loadMore: false,
      refresh: false,
      page: 1,
      q: '',
      list: [],

      user: {
        petugas: {}
      },
    }
  }

  componentDidMount = () => {
    this.props.navigation.addListener('willFocus', 
      () => {
        this.getUnit();
        this.getUserLogin()
      }
    )
  }

  getUserLogin = async () => {
    const user = await User.getUser()
    this.setState({user})
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
          refresh: false,
          loadMore: false,
          loading:false
        })
      })
      .catch(err => {
        Toast.show({
          text: err.message,
          buttonText: 'Okay',
          type:'danger'
        })
        this.setState({
          refresh: false,
          loadMore: false,
          loading:false
        })
      })
  }

  handleRefresh = () => {
    this.setState({
      refresh: true,
      q: '',
      page:1
    }, () => {
      this.getUnit()
    })
  }

  handleLoadMore = () => {
    if(!this.state.loadMore && this.state.list.length >= 25) {
      this.setState({
        loadMore: true,
        page:this.state.page+1
      }, () => {
        this.getUnit()
      })
    }
  }

  handleSearch = (q) => {
    this.setState({
      loading: true,
      q: q,
      page:1
    }, () => {
      this.getUnit()
    })
  }

  renderFooter = () => {
    if(!this.state.loadMore) return null
    return (
      <View style={{ height:30, justifyContent:'center', alignItems:'center'}}>
        <Text style={{color:'grey'}}>Loading...</Text>
      </View>
    ) 
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
    const rolePengawas = this.state.user.peran == 'pengawas'
    const roleAdmin = this.state.user.peran == 'admin'

    return (
      <View style={{flex:1}}>
        <Loading loading={this.state.loading} />
        <View style={{height:'10%'}}>
          <Input 
            containerStyle={{width:'100%'}}
            placeholder='Cari unit'
            onChangeText={(q) => this.handleSearch(q)}
            inputStyle={{paddingLeft:10, fontSize:12}}
            value={this.state.q}
            leftIcon={{ type: 'font-awesome', name: 'search', size:19, color:'#696969' }} 
          />
        </View>
        <View style={{ height:'90%'}}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.list}
            renderItem={this.renderItem}
            refreshControl={
              <RefreshControl
                onRefresh={() => this.handleRefresh() }
                refreshing={this.state.refresh}
              />
            }
            onEndReachedThreshold={0.1}
            onEndReached={() => this.handleLoadMore()}
            ListFooterComponent={() => this.renderFooter()}
          />
        </View>
        {(roleAdmin || rolePengawas) &&
          <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('UnitCreate')}/>
        }
      </View>
    );
  }
}

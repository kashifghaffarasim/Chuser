import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView, BackHandler } from 'react-native';
import Overlay from 'react-native-modal-overlay';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menu:  require('../../../../assets/btn_menu.png'),
            itemLogo:  require('../../../../assets/invoice.png'),
            logout:  require('../../../../assets/btn_logout.png'),
            close: require('../../../../assets/btn_close_white.png'),
            dashboard: require('../../../../assets/dashboard.png'),
            modalVisible: false,
        }
    }


    componentWillMount() {
          const { getUser, token } = this.props;
          BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
            this.props.navigation.addListener('willFocus', async(payload) => {
                  if(token){
                     getUser(token);
                  }
            })
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
   }

    render() {

        return (
              <ScrollView  contentInsetAdjustmentBehavior="automatic" style={{ paddingTop: 60}}>
                  <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                      <View style={{marginTop: 5, width: '100%',  justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={this.state.dashboard} style={{ width: 120}} resizeMode="contain"/>
                        <TouchableOpacity
                          onPress={() => this._renderDetail()}
                          style={{ position: 'absolute', right: 30, zIndex: 100}}>
                            <Image
                                source={this.state.menu}
                                  style={{ height: 40, width: 40, zIndex: 10 }} resizeMode="contain"/>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginTop: 50 }}>
                        <TouchableOpacity
                        onPress={ () => this._clickInvoice() }
                        style={{ flexDirection: 'row', justifyContent: 'center', width: 300, backgroundColor: '#eee', borderRadius: 10, borderColor: '#ddd', borderWidth: 1, padding: 20}}>
                          <View style={{ width: '20%'}}>
                              <Image
                                  source={this.state.itemLogo}   style={{ height: 50, width: 50 }} resizeMode="contain"
                                  />
                          </View>
                          <View style={{ width: '80%',  justifyContent: 'center' }}>
                              <Text style={{ fontSize: 24, marginLeft: 20}}> Invoices </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                  </View>
                  {this._renderOverlay()}
              </ScrollView>
        );
    }

    _renderDetail = () => {
      this.setState({ modalVisible: true})
    }

    _renderOverlay = () => {
      const { user } = this.props;
      if(user){
        return(
            <Overlay visible={this.state.modalVisible} onClose={this._onClose} closeOnTouchOutside
                  animationType='slideInUp'
                  containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)'  }}
                  childrenWrapperStyle={{ flex: 1,   borderTopLeftRadius: 15, marginTop: 10,
                                          borderTopRightRadius: 15, position: 'absolute',
                                          left: 0, right: 0, bottom: 0, height: '80%', margin: 0,
                                          padding: 0 }}>

                 <View style={{ position: 'absolute', top: -100, right: 5}}>
                   <Image
                       source={this.state.close}
                         style={{ height: 40, width: 40 }} resizeMode="contain"/>
                 </View>

                 <View style={{ justifyContent: 'flex-start', borderRadius: 15, width: '100%', paddingLeft: 30, paddingRight: 10, paddingTop: 20}}>
                      <View>
                          <Text style={{ fontSize: 18, color: '#dddddd'}}>Name</Text>
                          <Text style={{ fontSize: 20, fontWeight: 'bold'}}> { user.username }</Text>
                      </View>
                      <View style={{ marginTop: 10}}>
                          <Text style={{ fontSize: 18, color: '#dddddd'}}>Insititution</Text>
                          <Text style={{ fontSize: 20, fontWeight: 'bold'}}></Text>
                      </View>
                      <View  style={{ marginTop: 10}}>
                          <Text style={{ fontSize: 18, color: '#dddddd'}}>Position</Text>
                          <Text style={{ fontSize: 20, fontWeight: 'bold'}}></Text>
                      </View>
                      <View  style={{ marginTop: 10}}>
                          <Text style={{ fontSize: 18, color: '#dddddd'}}>Email</Text>
                          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{ user.username }</Text>
                      </View>
                      <View  style={{ marginTop: 40, flexDirection: 'row'}}>
                        <TouchableOpacity
                        onPress={() => this._logout()}
                          style={{ width: '20%', justifyContent: 'flex-end'}}>
                          <Image
                              source={this.state.logout}
                                style={{ height: 30, width: 50 }} resizeMode="contain"/>
                        </TouchableOpacity>
                        <View style={{ width: '50%', justifyContent: 'center', marginLeft: -15}}>
                          <Text style={{ fontSize: 18, color: '#dddddd'}}> Exit </Text>
                        </View>
                      </View>
                 </View>
            </Overlay>
        )
      }
    }

    _onClose = () => {
        this.setState({ modalVisible: false})
    }

    _logout = async() => {
        const { logout } = this.props;
        logout()
        this.setState({ modalVisible: false})
        this.props.navigation.navigate('login')
    }

    _clickInvoice = () =>{
      this.props.navigation.navigate('invoices')
    }

}

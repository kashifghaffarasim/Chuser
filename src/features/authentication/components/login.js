import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView, Alert } from 'react-native';

import { styles } from './styles';

export default class Login extends React.Component {

      constructor(props) {
          super(props);

          this.state = {
              bgImage:  require('../../../../assets/login.png'),
              logo:  require('../../../../assets/header.png'),
              clear: require('../../../../assets/clear.png'),
              login: null,
              password: null,
          }
          this.inputs = {}
          AsyncStorage.removeItem('code');

      }


      componentDidMount() {
          const { token , cleanup } = this.props;
          if(token){
              AsyncStorage.removeItem('code');
              this.props.navigation.navigate('code')
          } else {
             cleanup()
             this.setState({ login: null, password: null})
          }
      }

      render() {

          return (
              <ImageBackground source={this.state.bgImage} style={{width: '100%', height: '100%'}}>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic" style={{  height: '100%'}}>
                      <View style={ styles.mainContiner }>
                        { this._renderLoader() }

                        <View style={{justifyContent: 'center',alignItems: 'center', marginTop: 30}}>
                            <Image
                                source={this.state.logo}
                                  style={{ height: 250, width: 250 }} resizeMode="contain"/>
                        </View>

                        <View  style={{justifyContent: 'center',alignItems: 'center'}}>
                            <View style={{ width: '80%', height: 160, marginTop: -35, borderRadius: 10, paddingTop: 5}}>
                              {this._renderInput('email', 'Email', false, 'next', 1)}
                              {this._renderpasswordInput('password', 'Password', false, 'done', 2)}
                            </View>
                        </View>

                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                          <TouchableOpacity
                              onPress={() => this._redirection()}
                            style={{    backgroundColor: '#00c965',
                                        borderRadius: 25,
                                        justifyContent: 'center',alignItems: 'center',
                                        padding: 14,
                                        width: '80%',}}>
                                        <Text style={{color: '#fff',   fontSize: 18}}> Login </Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
              </ImageBackground>
          );

      }

      _renderLoader = () => {
          const {  loading } = this.props;
          if(loading){
            return(
                <View style={styles.wrapperLogin}>
                   <ActivityIndicator size="large" color="#37A000" />
                </View>
            )
          }
      }

      _renderInput = (stateName, placeholder, isPasswordField, type, id) => {
       return(
           <View>
             <TextInput
               ref={(input) => {this.inputs[id] = input}}
               placeholder={placeholder}
               placeholderTextColor = "#ddd"
               keyboardType={'email-address'}
               autoCapitalize='none'
               style={{ color: '#fff', textAlign: 'left',
               borderBottomColor: '#fff',
               borderBottomWidth: 0.5,
               padding: 20, fontSize: 18, borderTopLeftRadius: 10, borderTopRightRadius: 10,  backgroundColor: 'rgba(0,0,0,0.7)'}}
               returnKeyType={type}
               onSubmitEditing={() =>  this._focusNextField()}
               underlineColorAndroid='rgba(0,0,0,0)'
               onChangeText = {(text) => this.setState({email: text })}
               value={this.state[stateName]}
             />
             <TouchableOpacity  onPress={() => this._clearEmail()} style={{ position: 'absolute', right: 8, top: 24}}>
               <Image    source={this.state.clear}    style={{ height: 20, width: 20 }} resizeMode="contain"/>
             </TouchableOpacity>
         </View>
       )
     }

     _renderpasswordInput  = (stateName, placeholder, isPasswordField, type, id) => {
      return(
          <View>
            <TextInput
              ref={(input) => {this.inputs[id] = input}}
              placeholder={placeholder}
              placeholderTextColor = "#ddd"
              autoCapitalize='none'
              secureTextEntry={true}
              style={{ color: '#fff', textAlign: 'left', padding: 20, fontSize: 18, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,  backgroundColor: 'rgba(0,0,0,0.7)'}}
              returnKeyType={type}
              onSubmitEditing={() =>  this._focusNextField()}
              underlineColorAndroid='rgba(0,0,0,0)'
              onChangeText = {(text) => this.setState({password: text })}
              value={this.state[stateName]}
            />
            <TouchableOpacity onPress={() => this._clearPassword()} style={{ position: 'absolute', right: 8, top: 24}}>
              <Image    source={this.state.clear}    style={{ height: 20, width: 20 }} resizeMode="contain"/>
            </TouchableOpacity>
        </View>
      )
    }

     _focusNextField = () => {
       this.inputs["2"].focus()
    }

    _clearPassword = () => {
         this.setState({password: null})
    }

    _clearEmail = () => {
       this.setState({email: null})
    }

    _redirection = async() => {
       this.setState({ isError: false})
       var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if(this.state.email && regex.test(this.state.email) && this.state.password){
         const { authenticate } = this.props;
          var user =  {
            login: this.state.email,
            password: this.state.password,
          }

          await authenticate(user);
          const { error , token, getUser } = this.props;

          if(error){
            this._errorMessage('Invalid Email/Password')
          } else {
            if(token){
              await getUser(token)
              this.props.navigation.navigate('code')
            }
          }

       } else {
           this._errorMessage('Invalid Email/Password')
       }
    }

    _errorMessage = (message) =>{
      Alert.alert(
          'Chuser',
          message,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
      );
    }

}

import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator , TouchableHighlight, Alert } from 'react-native';
import { styles } from './styles';

export default class Verification extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        itemArray: [],
        array: [1,2,3,4],
        numberArray: [1,2,3,4,5,6,7,8,9,10,0,11],
        clearImg: require('../../../../assets/touch.png'),
        backImg: require('../../../../assets/btn_del_code_dark.png'),
        loaderImg: require('../../../../assets/loader.gif'),
        isLoading: false
      }
  }

  componentDidMount() {

  }

  render() {
      return (
          <View style={styles.container }>
              {this._loaderView()}
              <View style={styles.titleView }>
                  <Text style={ styles.titleText }> Code Verification </Text>
              </View>
              <View  style={{ alignItems: 'center', padding: 12}}>
                { this._renderRound() }
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                  { this._renderKeyBoard() }
              </View>

              <TouchableOpacity   onPress={() => this._logout()}
               style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, zIndex: 100}}>
                  <Text style={{ fontFamily: 'Regular', fontSize: 18}}> Logout </Text>
              </TouchableOpacity>
          </View>
      )
  }

  _loaderView = () =>{
    if(this.state.isLoading){
      return(
        <View style={{ position: 'absolute', zIndex: 2, height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                 <ActivityIndicator size="large" color="#37A000" />
            </View>
        </View>
      )
    }
  }

  _renderRound = () => {
    return(
        <View style={styles.rowDirction}>
                {
                      this.state.array.map((y) => {
                        var totalLenght = this.state.itemArray.length;
                        if(totalLenght >= y){
                          return(
                              <View key={y} style={styles.boxPadding}>
                                { this._renderActive() }
                              </View>
                            )
                        } else {
                            return (
                                <View key={y} style={styles.boxPadding}>
                                  { this._renderunActive() }
                                </View>
                            );
                        }

                      })
                  }
        </View>
    )
  }


  _renderActive = () =>{
    return(
        <TouchableHighlight style={ styles.activeCircle}>
          <Text>  </Text>
        </TouchableHighlight>
    )
  }

  _renderunActive = () => {
    return(
      <TouchableHighlight style={styles.circle}>
        <Text> </Text>
      </TouchableHighlight>
    )
  }

  _renderKeyBoard = () => {
     return(
       <View>
          <View style={ styles.rowDirction }>
              {this._renderRow(1)}
              {this._renderRow(2)}
              {this._renderRow(3)}
          </View>
          <View style={ styles.rowDirction }>
              {this._renderRow(4)}
              {this._renderRow(5)}
              {this._renderRow(6)}
          </View>
          <View style={ styles.rowDirction }>
              {this._renderRow(7)}
              {this._renderRow(8)}
              {this._renderRow(9)}
          </View>
          <View style={ styles.rowDirction }>
              {this._renderRow(10)}
              {this._renderRow(0)}
              {this._renderRow(11)}
          </View>
      </View>
     )
  }

  _renderRow = (number) => {
    if(number == 10){
      return(
          <TouchableOpacity style={ styles.circleButton }>
              <Image source={this.state.clearImg} />
          </TouchableOpacity>
      )
    } else if(number == 11){
      return(
          <TouchableOpacity onPress={ () => this._clearText()} style={ styles.circleButton }>
              <Image source={this.state.backImg} />
          </TouchableOpacity>
      )
    } else {
      return(
          <TouchableOpacity style={ styles.circleButton } onPress={ () => this._codeVerification(number)}>
              <Text style={{ color: '#000', fontFamily: 'Heavy', fontSize: 26}}> { number } </Text>
          </TouchableOpacity>
      )
    }

  }


  _codeVerification = async(number) => {

    var array = this.state.itemArray;
    array.push(number)
    this.setState({itemArray: array})

    if(this.state.itemArray.length >= 4) {
        const { code } = this.props;
        var newCode = await this._enterCode()
        if(code){
          if(code == newCode){
              this.setState({isLoading: true})
                setTimeout( () => {
                     this._goHome()
                 },1500);
          } else {
             Alert.alert('Your code not matched.' )
             this.setState({itemArray: []})
          }

        } else {
          await this._saveCode(newCode)
          this.setState({itemArray: []})
        }
    }
  }

  _goHome = async() => {
      this.setState({isLoading: false})
      this.props.navigation.navigate('home')
  }

  _clearText = () => {
      if(this.state.itemArray){
         var array = this.state.itemArray;
         var item = array.pop();
         this.setState({itemArray: array})
      }
  }

  _enterCode = () => {
        var code = ''
        for(var i = 0;  i< this.state.itemArray.length; i++){
           code = code + this.state.itemArray[i]
        }
        return code
  }

  _saveCode = async(code) => {
        this.setState({isBool: false})
        const { getCode, verifyCode } = this.props;
        await verifyCode(code)
        await getCode(code)
        this.setState({isBool: true})
  }

  _logout = async() => {
      const { logout } = this.props;
      await logout()
      this.props.navigation.navigate('login')
  }

}

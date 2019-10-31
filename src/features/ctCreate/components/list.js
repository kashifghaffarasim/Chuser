import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';

import { styles } from './listStyle';

export default class LIST extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            icon:  require('../../../../assets/icon.png'),
            cameraIcon:  require('../../../../assets/btn_scandoc.png'),
        }
    }

    async  componentDidMount() {

    }

    render() {

        return (
          <View style={ styles.container}>
              <View style={ styles.ctPadding }>
                {this._topContainer()}
              </View>

              <View style={{ margin: 10}}>
                { this._renderPages() }
              </View>
              <View style={{ padding: 10}}>
                <Text style={{ color: '#ddd', fontFamily: 'Regular', fontSize: 16}}> Title is here </Text>
                { this._renderContent() }
              </View>

          </View>
        );
    }


    _topContainer = () => {
      return(
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50,  paddingBottom: 5, marginTop: 5}}>
          <TouchableOpacity style={{ width: '35%'}} onPress={ () => this.props.navigation.navigate('home')}>
              <Text style={ styles.topContent }> Back </Text>
          </TouchableOpacity>

          <View style={{ width: '30%', justifycontent: 'center', alignItems: 'center'}}>
          <Image
              source={this.state.icon}   style={{ height: 30, width: 30 }} resizeMode="contain"
              />
          </View>

          <View style={{ width: '35%', alignItems: 'flex-end'}}>
              <Text style={ styles.topContent }> Save </Text>
          </View>
        </View>
      )
    }

    _renderPages = () => {
      return(
        <View style={{ flexDirection: 'row', padding: 10}}>
            <View style={{ height: 40, width: 40, borderRadius: 40/2, borderWidth: 0.6,
              borderColor: '#ddd', }}>
                <Text style={{ textAlign: 'center'}}> 1 </Text>
            </View>
        </View>
      )
    }

    _renderContent = () => {
        return(
          <View style={{ paddingTop: 10, paddingBottom: 10}}>
              <View style={styles.rowDirection}>
                  <View style={{ width: '40%', borderRightWidth: 1, borderRightColor: '#ddd', padding: 10}}>
                      <Text> Text Now</Text>
                  </View>

                  <View style={{ width: '20%', padding: 10,  borderRightWidth: 1, borderRightColor: '#ddd', padding: 10}}>
                      <Text> LW  </Text>
                  </View>

                  <View style={{ width: '40%', padding: 10}}>
                      <View style={{ flexDirection: 'row'}}>
                          <Text> + </Text>
                          <Text> 2 </Text>
                          <Text> - </Text>
                      </View>
                  </View>
              </View>
          </View>
        )

    }

}

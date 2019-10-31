import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';

import { styles } from './styles';


export default class Book extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    async  componentDidMount() {

    }

    render() {

        return (
          <View style={ styles.container}>
              { this._renderTop()}
              { this._renderCreateBtn()}
              { this._renderContent()}
          </View>
        );
    }

    _renderTop = () => {
      return(
        <View  style={ styles.topDirection }>
          <View style={{ width: '30%'}}>
              <Text style={ styles.regularText }> Back   </Text>
          </View>
          <View style={{ width: '45%'}}>
              <Text style={ styles.mediumText }> Create Text  </Text>
          </View>
        </View>
      )
    }

    _renderCreateBtn = () => {
      return(
        <View style={styles.rowContain}>
            <TouchableOpacity style={ styles.touchBtn}>
                <Text style={ styles.boldTex }> Create </Text>
            </TouchableOpacity>
        </View>
      )
    }

    _renderContent = () => {
        return(
          <View style={ styles.rowList }>
              <View>
                    <Text style={styles.titleText}> Title Here </Text>
              </View>
              <View style={styles.rowDirection}>

                    <View style={{ width: '50%'}}>
                        <Text style={styles.dateText}> Kashif is here </Text>
                    </View>

                    <View style={{ width: '47%', marginRight: 4}}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                          <Text style={styles.nameText}> Kashif is here </Text>
                        </View>
                    </View>

                    <View style={{ width: '2%'}}>
                        <Text style={styles.circleColor}>  </Text>
                    </View>

              </View>
          </View>
        )
    }


}

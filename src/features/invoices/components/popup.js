import React from 'react';
import { View, FlatList,  Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './popup_styles';

import Overlay from 'react-native-modal-overlay';

export default class Popup extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          name:  null
      }
    }

    componentDidMount(){

    }

    render() {
      return(
               <View>
                  {this._overLayer()}
               </View>
            )
    }

    _overLayer = () => {
      const { status, loading } = this.props;
      return(
            <Overlay visible={true}
                onClose={this._onClose}
                animationType='slideInUp'
                containerStyle={{ backgroundColor: 'rgba(0,0,0,0.6)'}}
                childrenWrapperStyle={{ borderRadius: 0 , margin: 0, padding: 0}}>
                {this._listContent(loading)}
                <View style={styles.container}>
                    <View style={{ width: '92%'}}>
                        <TextInput
                            placeholder="Search"
                            editable={true}
                            placeholderTextColor="#6a6a6a"
                            onChangeText={text => this._searchItem(text)}
                            value={this.state.name}
                            style={styles.inputText}/>
                    </View>

                    <View style={ styles.subContainer }>
                        <View style={{ height: 200}}>
                          {this._renderList()}
                        </View>
                        <TouchableOpacity onPress={ () => this._onClose()} style={styles.buttonStyle}>
                          <Text style={{ fontSize:  20, color: '#fff'}}> Cancel </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Overlay>
      )
    }

    _listContent = (loading) => {

        if(loading){
          return(
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" color="#37A000" />
            </View>
          )
        }

    }

    _renderList = () => {
      const { type, list } = this.props;
       if(list){
            return(
              <View>
                    <FlatList
                            scrollEnabled={true}
                            data={list}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => this._renderItem(item, index)}
                         />
            </View>
            )
        }
    }

    _renderItem = (item, index) => {
        return(
          <TouchableOpacity style={{ borderBottomWidth: 0.5, marginBottom: 5, borderBottomColor: '#ddd'}} onPress={() => this._setItem(item)}>
            <Text  numberOfLines={1} style={{ fontSize: 18, paddingBottom: 5}}> {item.name} </Text>
          </TouchableOpacity>
        )
    }

    _onClose = () => {
      this.props.onClose()
    }

    _setItem = (item) => {
      this.props.onSelect(item)
    }

    _searchItem = (text) => {
        this.props.onSearch(text)
        this.setState({name: text})
    }

}

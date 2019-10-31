import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView, FlatList } from 'react-native';
import { styles } from './styles'
import Overlay from 'react-native-modal-overlay';

export default class Invoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            camIcon:  require('../../../../assets/btn_scandoc.png'),
            filterIcon:  require('../../../../assets/btn_sort.png'),
            back:  require('../../../../assets/ic_arrow_back_24dp.png'),
            sort: require('../../../../assets/sort.png'),
            isVisible: false,
            startCount: 0,
            endCount: 15,
            sortArray: [
              {name: 'Seller', isSelected: false, value: 'sellerInst.name', order: 'DESCENDING'},
              {name: 'Buyer', isSelected: false, value: 'buyerInst.name',  order: 'DESCENDING'},
              {name: 'Date', isSelected: true,  value: 'date', order: 'DESCENDING'},
              {name: 'Sum', isSelected: false, value: 'sum',  order: 'DESCENDING'},
              {name: 'Status', isSelected: false, value: 'status',  order: 'DESCENDING'},
            ]
        }

    }


    componentDidMount() {
      console.log('here we are now 1')
        this.props.navigation.addListener('willFocus', async(payload) => {
            const { getList , token} = this.props;
            console.log('here we are now 2')
            if(token){
              console.log('here we are now 3')
              await getList(token, 'date', 'DESCENDING')
            }
        })
        console.log('here we are now 4')
    }

    render() {
      const {  loading, lists } = this.props;

        return (
              <View style={ styles.container }>
                  {this._headerTop()}
                  <View style={ styles.centerItem }>
                    {this._documentList()}
                  </View>
                  {this._modalView()}
              </View>
        )
    }

    _headerTop = () => {

      return(
        <View style={styles.rowDirection}>
            <TouchableOpacity style={ styles.topLeft} onPress={() => this.props.navigation.navigate('home')}>
                <Image source={this.state.back}  style={{ height: 30}}  resizeMode="contain"/>
            </TouchableOpacity>

            <View style={ styles.topCenter}>
              <Text style={ styles.textFont}> Invoices </Text>
            </View>

            <View style={ styles.topRight}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this._openModal()} style={{ width: '70%',  alignItems: 'flex-end'}}>
                      <Image source={this.state.filterIcon}  style={{ height: 15}}  resizeMode="contain"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '30%', marginLeft: 8}} onPress={() => this._createSupplier()}>
                      <Image source={this.state.camIcon} style={{ height: 20}} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      )
    }

    _documentList = () => {
        const {  loading, lists } = this.props;
        if(loading){
            return(
                <View style={{ justifyContent: 'center', alignItems: 'center',
                position: 'absolute', top:  200, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                   <ActivityIndicator size="large" color="#37A000" />
                </View>
            )
        } else {
           if(lists){
            return(
                <ScrollView style={{ height: '100%', marginBottom: 160}}  onScroll={(e)=> this._onEndLessScroll(e)} scrollEventThrottle={400}>
                {lists.map((value, index) => {
                    return(
                      <View key={index}>
                          {this._renderItem(value, index)}
                      </View>
                    )
                })}
                </ScrollView>
            )
          }
        }
    }

    _renderItem = (item, index) => {
        return(
            <TouchableOpacity style={ styles.supplierBox } onPress={() => this._invoiceItems(item)}>
                <View>
                    <Text style={ styles.titleText }> Supplier </Text>
                    <Text style={ styles.titleSPContect}> { item.seller.name }  </Text>
                </View>
                <View>
                  {this._doubleRow(item)}
                </View>
                <View>
                  {this._doubleTempRow(item)}
                </View>
            </TouchableOpacity>
        )
    }

    _doubleRow = (item) => {
      return(
          <View style={{ flexDirection: "row", marginTop: 10}}>
            <View style={{ width: '50%'}}>
                <Text style={ styles.titleText }> Customer </Text>
                <Text style={ styles.titleContect}> { item.buyer.name } </Text>
            </View>

            <View style={{ width: '50%'}}>
                <Text style={ styles.titleText }> Date </Text>
                <Text style={ styles.dateContent}> {item.date} </Text>
            </View>

          </View>
      )
    }

    _doubleTempRow = (item) =>{
      return(
          <View style={{ flexDirection: "row", marginTop: 10}}>
            <View style={{ width: '50%'}}>
                <Text style={ styles.titleText }> Sum </Text>
                <Text style={ styles.titleContect}> {item.sum} </Text>
            </View>

            <View style={{ width: '50%'}}>
                <Text style={ styles.titleText }> Status </Text>
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ height: 10, width: 10, borderRadius: 10/2, backgroundColor: 'red',  marginTop: 4}}>
                      <Text> </Text>
                    </View>
                    <Text style={ styles.titleContect }> { item.status } </Text>
                </View>
            </View>

          </View>
      )
    }

    _openModal = () => {

        this.setState({isVisible: true})
    }


    _createSupplier = () => {
        this.props.navigation.navigate('ctSupplier')
    }

    _invoiceItems = (item) => {
      const { getItem } = this.props;
      this.props.navigation.navigate('invoiceItem', {guid: item.guid})
    }

    _onEndLessScroll = async(e) => {

    }

    _modalView = () => {

      if(this.state.isVisible){
        return(
          <Overlay visible={this.state.isVisible}
              onClose={this._onClose} closeOnTouchOutside
              animationType='slideInUp'
              containerStyle={{ backgroundColor: 'rgba(0,0,0,0.1)'}}
              childrenWrapperStyle={{ flex: 0.6,   borderRadius: 15 }}>
              <View style={{ alignItems: 'center', width: '113%'}}>

                  <View style={ styles.topHedding }>
                    <Text style={{ fontSize: 18, color: '#4683ea'}}> Sort By </Text>
                  </View>

                    <View style={styles.mainView}>
                        {
                          this.state.sortArray.map((item, index) => {
                            return(
                              <TouchableOpacity key={index} onPress={() => this._getttingSortData(item.value, 'DESCENDING') } style={ styles.itemView }>
                                <View style={{ flexDirection: 'row'}}>
                                  <View style={{ width: '20%'}}>
                                    <Text style={ styles.textFont }> {item.name} </Text>
                                  </View>
                                  {this._arrowDisplay(item)}
                                </View>
                              </TouchableOpacity>
                            )
                          })
                        }
                  </View>

                  <View style={ styles.bottomBack }>
                    <TouchableOpacity onPress={() => this._onClose()} >
                        <Text style={ styles.okayBtn}> Okay </Text>
                    </TouchableOpacity>
                  </View>
              </View>

          </Overlay>
          )
        }
    }

    _arrowDisplay = (item) => {
      if(item.isSelected){
        return(
          <Image source={this.state.sort}  style={{ height: 30,
            width: 15,}}/>
        )
      }
    }

    _onClose = () =>{
      this.setState({isVisible: false})
    }

    _getttingSortData = (value, order) => {
        const { getList , token} = this.props;
        this._setSelection(value)
        this._onClose()
        if(token){
           getList(token, value, order)
        }

     }

     _setSelection = (value) => {
         var array = []
         for(var i = 0; i < this.state.sortArray.length; i++){
             var item =  this.state.sortArray[i];
             if(item.value == value){
               item.isSelected = true
             } else {
               item.isSelected = false
             }
             array.push(item)
         }
         this.setState({ sortArray: array})
     }

  }

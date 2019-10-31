import React from 'react';
import {View, Image, Text, TextInput, TouchableOpacity, TouchableHighlight, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import { styles } from './styles'
import Overlay from 'react-native-modal-overlay';
import ImagePicker from 'react-native-image-picker';


export default class Invoice extends React.Component {

      constructor(props) {
          super(props);
          this.state = {
              camIcon:  require('../../../../assets/btn_scandoc.png'),
              filterIcon:  require('../../../../assets/btn_sort.png'),
              back:  require('../../../../assets/ic_arrow_back_24dp.png'),
              addIcon: require('../../../../assets/btn_add_green.png'),
              plusIcon: require('../../../../assets/btn_add.png'),
              minsIcon: require('../../../../assets/btn_del.png'),
              deleteIcon: require('../../../../assets/btn_delete_big.png'),
              isVisible: false,
              item: null,
              isPopup: false,
              files: []
          }
      }


    async  componentDidMount() {
        const { guid } = this.props.navigation.state.params;
        var { doc, getItem, token } = this.props;
        if(guid){
          await getItem(token, guid)
        }
    }

      render() {
          const { doc , loading } = this.props;
          if(loading){
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(255,255,255)'}}>
                   <ActivityIndicator size="large" color="#37A000" />
                </View>
            )
          } else {
            return (
                    <View style={ styles.container }>
                        <View>
                          {this._topHeader()}
                        </View>
                        <ScrollView  scrollEventThrottle={400} style={{ height: '80%'}}>
                            <View>
                              {this._textContainer()}
                            </View>

                            <View>
                              {this._listItems()}
                            </View>
                        </ScrollView>
                        <View>
                        {this._renderModal()}
                        {this._renderImagePopup()}
                      </View>
                   </View>
            )
          }
      }

     _topHeader = () => {

          const { doc } = this.props;
          if(doc){
              return(
                  <View style={styles.rowDirection}>
                      <TouchableOpacity style={ styles.topLeft} onPress={() => this.props.navigation.navigate('invoices')}>
                          <Image source={this.state.back}  style={{ height: 30}}  resizeMode="contain"/>
                      </TouchableOpacity>

                      <View style={ styles.topCenter}>
                        <Text style={ styles.textFont}> { doc.seller.name }  </Text>
                      </View>

                      <TouchableOpacity onPress={() => this.setState({ isPopup: true})} style={ styles.topRight}>
                          <Image source={this.state.camIcon} style={{ height: 22}} resizeMode="contain"/>
                      </TouchableOpacity>
                  </View>
              )
          }

      }

      _textContainer = () => {
         const { doc } = this.props;
         if(doc){
             return(
               <View style={ styles.supplierBox }>
                   <View>
                       <Text style={ styles.titleText }> Supplier</Text>
                       <Text style={ styles.titleContect}> { doc.seller.name } </Text>
                   </View>
                   <View>
                     {this._doubleRow(doc)}
                   </View>
                   <View>
                     {this._doubleTempRow(doc)}
                   </View>
                   <View style={{ flexDirection: 'row'}}>
                      <TouchableOpacity style={ styles.btnAccept } onPress={() => this._acceptInvoice()}>
                          <Text> Accept </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={ styles.btnAccept } onPress={ () => this._cancelInvoice()}>
                          <Text> Cancel </Text>
                      </TouchableOpacity>
                   </View>
               </View>
             )
        }
      }

      _doubleRow = (doc) => {
        return(
            <View style={{ flexDirection: "row", marginTop: 10}}>
              <View style={{ width: '50%'}}>
                  <Text style={ styles.titleText }> Customer </Text>
                  <Text style={ styles.titleContectText}> { doc.buyer.name } </Text>
              </View>

              <View style={{ width: '50%', marginLeft: 20}}>
                  <Text style={ styles.titleText }> Date </Text>
                  <Text style={ styles.dateContent}> { doc.date } </Text>
              </View>

            </View>
        )
      }

      _doubleTempRow = (doc) =>{
        return(
            <View style={{ flexDirection: "row", marginTop: 10}}>
                <View style={{ width: '50%'}}>
                    <Text style={ styles.titleText }> Sum </Text>
                    <Text style={ styles.titleContectText}> { doc.sum } </Text>
                </View>

                <View style={{ width: '50%', marginLeft: 20}}>
                    <Text style={ styles.titleText }> Status </Text>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ height: 10, width: 10, borderRadius: 10/2, backgroundColor: 'blue',  marginTop: 5}}>
                          <Text> </Text>
                        </View>
                        <Text style={ styles.titleContectText}> {doc.status} </Text>
                    </View>
                </View>
            </View>
         )
      }

      _listItems = () => {

        return(
          <View>
            <View>
              {this._tableHeader()}
            </View>
            <View>
              { this._rowTable()}
            </View>
          </View>
        )
      }

      _tableHeader = () => {
        return(
          <View style={ styles.tableHeader }>
              <View style={styles.first}>
                  <Text>  </Text>
              </View>

              <View style={styles.sec}>
                <Text style={ styles.txtColor}> Name </Text>
              </View>

              <View style={styles.rest}>
                <Text style={ styles.txtColor}> PL </Text>
              </View>

              <View style={styles.rest}>
                <Text style={ styles.txtColor}> Unit </Text>
              </View>

              <View style={styles.rest1}>
                <Text style={ styles.txtColor}> Price </Text>
              </View>

              <View style={styles.rest}>
                <Text style={ styles.txtColor}>  Qty </Text>
              </View>
          </View>
        )
      }

      _rowTable = () => {
          const { doc } = this.props;
          if(doc && doc.items){
            return(
              <View>
                { doc.items.map((value, index) => {
                    return(
                      <View key={index}>
                          {this._renderItem(value, index)}
                      </View>
                    )
                  })
                }
              </View>
            )
          }
      }

      _bottomFooter = () => {
        return(
          <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFEFEF', paddingLeft: 10}}>
            <View style={{ flexDirection: 'row',  width: '100%'}}>
                <View styles={{ width: '20%'}}>
                  <Image source={this.state.addIcon}  style={{ height: 20, width: 20 }} resizeMode="contain"/>
                </View>

                <View styles={{ width: '77%',  paddingLeft: 20}}>
                    <Text> Add New Item</Text>
                </View>
            </View>
          </View>
        )
      }

      _renderItem = (item, index) => {
        return(
          <View style={ styles.tableContent }>
              <View style={styles.first}>
                    <View style={{ height: 20, width: 20, borderRadius: 20/2, backgroundColor: 'red',
                    justifyContent:'center', alignItems: 'center'}}>
                      <Text style={{ color: '#fff', textAlign: 'center'}}> — </Text>
                    </View>
              </View>

              <View style={styles.sec}>
                <Text > {item.name} </Text>
              </View>

              <TouchableHighlight  style={styles.rest}>
                <Text> {item.amount} </Text>
              </TouchableHighlight>

              <View style={styles.rest}>
                <Text> {item.measure} </Text>
              </View>

              <TouchableHighlight style={styles.rest1} onPress={() => this._openModal(item, 'price', index)}>
                <Text > {item.cost} </Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.rest} onPress={() => this._openModal(item, 'qty', index)}>
                <Text> {item.inspectionAmount} </Text>
              </TouchableHighlight>
          </View>
        )
      }

      _acceptInvoice = async() => {
          const { token, doc , acceptInvoice} = this.props;
              if(doc && doc.items){
                var items = doc.items
                var array = []
                for(var  i= 0; i < items.length; i++){
                  var nt = { guid: items[i].guid, cost: items[i].cost,  inspectionAmount: items[i].inspectionAmount}
                  array.push(nt)
                }
                if(array.length > 0){
                    await acceptInvoice(token, doc.guid , array)
                    const { isAccept } = this.props;
                    if(isAccept){
                      this.props.navigation.navigate('invoices')
                    }
                  }
          }
      }

      _cancelInvoice = async() => {
          const { token, doc , cancelInvoice } = this.props;
          await cancelInvoice(token, doc.guid);
          const { isCancel } = this.props;
          if(isCancel){
              this.props.navigation.navigate('invoices')
          }
      }


      _renderModal = () => {

          if(this.state.item >= 0){
            return(
              <Overlay visible={this.state.isVisible}
                  onClose={this._onClose} closeOnTouchOutside
                  animationType='slideInUp'
                  containerStyle={{ backgroundColor: 'rgba(0,0,0,0.1)'}}
                  childrenWrapperStyle={{  borderRadius: 15 ,  margin: 0, paddingBottom: 0}}>
                  <View style={{ alignItems: 'center'}}>
                      <View>
                        <Text style={{ fontSize: 18}} numberOfLines={1}> {this.state.name}  </Text>
                      </View>

                      <View style={styles.rowOverlay}>
                          <View style={styles.rowWidth}>
                              <TouchableOpacity onPress={() => this._minsItem()}>
                                  <Image source={this.state.minsIcon} style={{ height: 50}} resizeMode="contain"/>
                              </TouchableOpacity>
                          </View>

                          <View style={styles.midRowWidth}>
                              <TextInput
                                style={{ height: 100, fontSize: 50, width: '90%'}}
                                autoFocus={true}
                                textAlign={'center'}
                                keyboardType={'decimal-pad'}
                                onChangeText = {(text) => this.setState({item: text})}
                                value={this.state.item}  />
                          </View>

                          <View style={styles.rowWidth}>
                              <TouchableOpacity onPress={() => this._plusItem()} >
                                <Image source={this.state.plusIcon} style={{ height: 50}} resizeMode="contain"/>
                              </TouchableOpacity>
                          </View>
                      </View>

                      <View style={styles.rowOverlayBottom}>

                        <TouchableOpacity onPress = { () => this._saveItem()} style={styles.rowLeftSide}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center'}}> Ok </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._onClose()} style={styles.rowLeftSide}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center'}}> Cancel </Text>
                        </TouchableOpacity>
                      </View>
                  </View>

              </Overlay>
            )
          }
      }

      _openModal = (item, name, index) => {

          if(name == 'qty'){
            this.setState({isVisible: true, item: item.inspectionAmount.toString(), type: name ,name: item.name, index: index})
          } else {
            this.setState({isVisible: true, item: item.cost.toString() , type: name, name: item.name, index: index})
          }
      }

      _onClose = () => {
          this.setState({ isVisible: false});
      }

      _saveItem = () => {

        const { doc } = this.props;

        if(this.state.index >= 0){
            var item = doc.items[this.state.index]

            if(this.state.type == 'qty'){
                var cost = doc.items[this.state.index].cost
                doc.items[this.state.index].inspectionAmount = parseInt(this.state.item);
                var subTotal =  parseInt(this.state.item) * cost ;
                doc.items[this.state.index].totalSum = subTotal
            } else {
                var item = doc.items[this.state.index].inspectionAmount
                doc.items[this.state.index].cost = parseInt(this.state.item);
                var itemTotal =  parseInt(this.state.item) * item ;
                doc.items[this.state.index].totalSum = itemTotal
            }

            if(doc){
                var total = 0;
                for(var i = 0 ; i < doc.items.length; i++){
                    total = total + doc.items[i].totalSum
                }
                doc.sum = total;
            }

        }
        this.setState({ isVisible: false});
      }

      _plusItem = () => {
        var t = parseInt(this.state.item) + 1
        this.setState({item: t.toString()})
      }

      _minsItem = () => {
        if(parseInt(this.state.item) > 0){
            var t = parseInt(this.state.item) - 1
            this.setState({item: t.toString()})
        }
      }


      _renderImagePopup = () => {
          return(
              <Overlay visible={this.state.isPopup}
                  onClose={this._onCloseImg} closeOnTouchOutside
                  animationType='slideInUp'
                  containerStyle={{ backgroundColor: 'rgba(0,0,0,0.1)'}}
                  childrenWrapperStyle={{ flex: 0.8,   borderRadius: 15 }}>
                  <View style={{ marginLeft: 12, marginRight: 12 }}>
                      <View style={{ alignItems: 'center', }}>
                        <Text> Image Picker </Text>
                      </View>
                      <View style={{ height: '84%',  marginLeft: 32, marginRight: 32}}>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                              <View style={{ width: '50%'}}>
                                {this._renderSelectContainer()}
                              </View>
                              { this.state.files.map((value, index) => {
                                return(
                                    <View key={index} style={{  width: '50%' }}>
                                        <View style={ styles.boxContainer }>
                                           {this._itemList(value)}
                                        </View>
                                        <TouchableOpacity onPress={() => this._removeImage(index)} style={{ position: 'absolute',  right: 20, top: 20 }}>
                                            <Image source={this.state.deleteIcon}  style={{ height: 30, width: 30 }} resizeMode="contain"  />
                                        </TouchableOpacity>
                                    </View>
                                )})
                              }
                          </View>


                      </View>

                      <View>
                          <View  style={styles.rowOverlayBottom}>
                              <TouchableOpacity onPress = { () => this._saveImage()} style={styles.rowLeftSide}>
                                  <Text style={{ fontWeight: 'bold', textAlign: 'center'}}> Ok </Text>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => this._onCloseImg()} style={styles.rowLeftSide}>
                                  <Text style={{ fontWeight: 'bold', textAlign: 'center'}}> Cancel </Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>

              </Overlay>
          )
      }

      _onCloseImg = () => {
          this.setState({ isPopup: false});
      }

      _renderSelectContainer = () => {
        return(
          <View style={ styles.boxContainer }>
              <TouchableOpacity onPress={() => this._openCamera()} style={{ justifyContent: 'center',  alignItems: 'center' }}>
                <Image
                    source={this.state.camIcon}  style={{ height: 30, width: 30 }} resizeMode="contain"/>
                  <Text style={{ padding: 10}}> Add Photo </Text>
              </TouchableOpacity>
          </View>
        )
      }

      _renderFiles = () => {
          if(this.state.files.length > 0){
            return(  <View>  </View>)
          }
      }

      _openCamera = () => {

          const options = {
              title: 'Select Avatar',
              customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };

          ImagePicker.launchCamera(options, (response) => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                  var array = this.state.files;
                  var data =  { base: response.data, uri: response.uri}
                  array.push(data)
                  this.setState({files: array})
                }
                this.setState({isPopup: true})
          });
      }

      _itemList = (item) => {
          return(
            <TouchableOpacity style={{ justifyContent: 'center',  alignItems: 'center' }}>
                <Image source={{uri: item.uri}}  style={{ height: 120, width: 120,   borderRadius: 10}} resizeMode="contain"  />
            </TouchableOpacity>
          )
      }

      _removeImage = (index) => {
         var files = this.state.files
         files.splice(index, 1);
         this.setState({files: files})
      }

      _saveImage = async() => {
          if(this.state.files.length > 0){
            var files = [];
            const {  doc , token , uploadImage} = this.props;
              for(var i = 0; i < this.state.files.length; i++){
                   var imageArray = []
                   await uploadImage(token, this.state.files[i].base);
                   const { newfile } = this.props;
                   imageArray.push(newfile.guid)
                   var total = i + 1
                   var name = "chuser_" + total + ".jpg"
                   var a = {name: name, chunks: imageArray}
                   files.push(a)
              }

              const { saveData } = this.props;

              for(var i=0; i < files.length; i++){
                  saveData(token, doc.guid, files[i])
              }
              this.setState({ isPopup: false})
          }
      }

  }

import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView, Alert, ProgressBarAndroid } from 'react-native';
import { styles } from './styles';

import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Popup from './popup';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Overlay from 'react-native-modal-overlay';

export default class CreatSupplier extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            icon:  require('../../../../assets/icon.png'),
            cameraIcon:  require('../../../../assets/btn_scandoc.png'),
            addIcon: require('../../../../assets/btn_add_green.png'),
            deleteIcon: require('../../../../assets/btn_delete_big.png'),
            progress: 0,
            progressLoader: false,
            seller: null,
            warehouse: null,
            buyer: null,
            files: [],
            date: null,
            number: null,
            invoiceText: null,
            isSupplier: false,
            spArray: [],
            slArray: [],
            waArray: [],
            dateValue: 'Date',
            show: false,
            date: new Date(),
            activeGreen: false
        }
    }

    async componentDidMount() {
        const { token , getResturant} = this.props;
        await getResturant(token)
        await this._institueData()
    }

    _institueData = () => {
        const { institution } = this.props;
        var array = []
        if(institution){
          for(var i=0; i < institution.length; i++){
            var a = {item: i, name: institution[i].name}
            array.push(a)
          }
        }
        this.setState({spArray: array })
    }

    _supplierData = (supplier) => {
        var array = []
        if(supplier){
          for(var i=0; i < supplier.length; i++){
            var a = { item: i, name: supplier[i].name}
            array.push(a)
          }
        }
        this.setState({slArray: array })
    }

    _warehouseData = (warehouse) => {
        var array = []
        if(warehouse){
          for(var i=0; i < warehouse.length; i++){
            var a = { item: i, name: warehouse[i].name}
            array.push(a)
          }
        }
        this.setState({waArray: array })
    }

    render() {

        return (
            <View style={ styles.container }>
                <View style={ styles.ctPadding }>
                  {this._topContainer()}
                </View>
                <ScrollView style={styles.ctPadding}  contentInsetAdjustmentBehavior="automatic">
                  {this._checkLoader()}
                  {this._bottomContainer()}
               </ScrollView>
          </View>
        )
    }

    _topContainer = () => {
      return(
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50,  paddingBottom: 5, marginTop: 10}}>
          <TouchableOpacity style={{ width: '35%'}} onPress={ () => this.props.navigation.navigate('invoices')}>
              <Text style={ styles.topContent }> Cancel </Text>
          </TouchableOpacity>
          <View style={{ width: '30%', justifycontent: 'center', alignItems: 'center'}}>
            <Image   source={this.state.icon}   style={{ height: 30, width: 30 }} resizeMode="contain"  />
          </View>
          {this._renderSave()}
        </View>
      )
    }

    _renderSave = () => {
      if(this.state.activeGreen){
        return(
          <TouchableOpacity  onPress={() => this._createInvoice()} style={{ width: '35%', alignItems: 'flex-end'}}>
              <Text style={ styles.topContentGreen }> Push </Text>
          </TouchableOpacity>
        )
      } else {
        return(
          <TouchableOpacity  style={{ width: '35%', alignItems: 'flex-end'}}>
              <Text style={ styles.topContent }> Push </Text>
          </TouchableOpacity>
        )
      }
    }

    _checkLoader = () => {
        const { saveLoading } = this.props;
        return(
               <View>
                  {this._midContainer()}
                  {this._progressLoader()}
               </View>
        )
    }

    _progressLoader = () => {
      if(this.state.progress){
        return(
          <Overlay visible={this.state.progressLoader}
              onClose={this._onClose}
              animationType='slideInUp'
              containerStyle={{ backgroundColor: 'rgba(0,0,0,0.4)'}}
              childrenWrapperStyle={{ flex: 0.2,   borderRadius: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'center'}}>

                  <View>
                      <Text> Data Upload </Text>
                  </View>

                  <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <ProgressBarAnimated
                            width={250}
                            value={this.state.progress}
                            backgroundColor="#37A000"
                            backgroundColorOnComplete="#6CC644"/>
                  </View>

              </View>
          </Overlay>
        )
      }
    }

    _midContainer = () => {
      return(
        <View>

          <TouchableOpacity onPress={ () => this._clickOpen('Resturant') }  style={ styles.topMargin }>
              <Text style={ styles.label}> Resturant * </Text>
              <TextInput
                  placeholder="Resturant"
                  editable={false}
                  placeholderTextColor="#6a6a6a"
                  value={this.state.inName}
                  style={styles.inputText}
              />
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => this._clickOpen('Supplier') }   style={ styles.topMargin }>
              <Text style={ styles.label}> Supplier* </Text>
              <TextInput
                  placeholder="Supplier"
                  editable={false}
                  placeholderTextColor="#6a6a6a"
                  value={this.state.spName}
                  style={styles.inputText}
              />
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => this._clickOpen('WareHouse') }  style={ styles.topMargin }>
              <Text style={ styles.label}> WareHouse* </Text>
              <TextInput
                  placeholder="WareHouse"
                  editable={false}
                  placeholderTextColor="#6a6a6a"
                  value={this.state.wpName}
                  style={styles.inputText}
              />
          </TouchableOpacity>



          <TouchableOpacity onPress={() => this._showDatePicker()} style={ styles.topMargin }>
              <Text style={ styles.label}>  Date * </Text>
              <TextInput
                      placeholder="Date 1"
                      editable={false}
                      placeholderTextColor="#000"
                      value={this.state.dateValue}
                      style={styles.inputText}
                  />
          </TouchableOpacity>

          <View  style={ styles.topMargin }>
              <Text style={ styles.label}>  Invoice # </Text>
              <TextInput
                  placeholder=" Invoice #"
                  placeholderTextColor="#6a6a6a"
                  style={styles.inputText}
                  onChangeText={text => this.setState({invoiceText: text})}
                  value={this.state.invoiceText}
              />
          </View>
          {this._datePicker()}
          {this._modalOpen()}
        </View>
      )
    }

    _bottomContainer = () => {
        return(
            <View>
              <View style={{ flexDirection: 'row'}}>
                  <View style={{ width: '50%'}}>
                    {this._renderSelectContainer()}
                  </View>
                  <View style={{ width: '50%'}}>
                    {this._renderGallertSelectContainer()}
                  </View>
              </View>
                <View >
                    {this._renderImages()}
                </View>
            </View>
        )
    }

    _renderSelectContainer = () => {
      return(
        <View style={ styles.boxContainer }>
            <TouchableOpacity onPress={() => this._openCamera()} style={{ justifyContent: 'center',  alignItems: 'center' }}>
              <Image
                  source={this.state.cameraIcon}  style={{ height: 30, width: 30 }} resizeMode="contain"
                  />
                <Text style={{ padding: 10}}> Add Photo </Text>
            </TouchableOpacity>
        </View>
      )
    }

    _renderGallertSelectContainer = () => {
      return(
        <View style={ styles.boxContainer }>
            <TouchableOpacity  onPress={() => this._openGallery()} style={{ justifyContent: 'center',  alignItems: 'center' }}>
              <Image
                  source={this.state.addIcon}  style={{ height: 30, width: 30 }} resizeMode="contain"
                  />
                <Text style={{ padding: 10}}> Select from Gallery </Text>
            </TouchableOpacity>
        </View>
      )
    }

    _renderImages = () => {
        if(this.state.files.length > 0){
          return(
            <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
              { this.state.files.map((value, index) => {
                return(
                    <View key={index} style={{  width: '50%' }}>
                        <View style={ styles.boxContainer }>
                           {this._itemList(value)}
                        </View>
                        <TouchableOpacity onPress={() => this._removeImage(index)} style={{ position: 'absolute', right: 20, top: 20}}>
                            <Image source={this.state.deleteIcon}  style={{ height: 30, width: 30 }} resizeMode="contain"  />
                        </TouchableOpacity>
                    </View>
                )})
              }
            </View>
          )
        }
    }

    _itemList = (item) => {
        return(
          <TouchableOpacity style={{ justifyContent: 'center',  alignItems: 'center' }}>
              <Image source={{uri: item.uri}}  style={{ height: 140, width: 140 }} resizeMode="contain"  />
          </TouchableOpacity>
        )
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
                this._isActive()
                this.setState({files: array})
              }
        });
    }

    _openGallery = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.launchImageLibrary(options, (response) => {
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
                this._isActive()
                this.setState({files: array})
            }
        });
    }



    _datePicker = () => {
      return(
        <View>
            { this.state.show && <DateTimePicker value={this.state.date}
                    mode="date"
                    display="calendar"
                    style={{ color: '#000'}}
                    onChange={this._setDate}  />
            }
        </View>
      )
    }

    _showDatePicker = () => {
        this.setState({show: true})
    }

    _setDate = (event, date) => {
          if(date){
              var day =   ('0' +  date.getDate()).slice(-2)
              var temp = date.getMonth() + 1
              var month =  ('0' +  temp).slice(-2)
              var year =  date.getFullYear()
              var vdate = day + "." + month + "." + year;
              this.setState({date: date, show: false, dateValue: vdate})
              this._isActive()
          }
     }

     _removeImage = (index) => {
        var files = this.state.files
        files.splice(index, 1);
        this.setState({files: files})
        this._isActive()
     }

     _createInvoice = async() => {
           if(!this.state.seller){
             this._error('Select Resturant')
           } else if(!this.state.buyer){
             this._error('Select Supplier')
           } else if(!this.state.warehouse){
             this._error('Select WareHouse')
           } else if(!this.state.dateValue){
             this._error('Select Date')
           } else if(this.state.files.length == 0){
             this._error('Select Files ')
           } else {
                this.setState({ progressLoader:  true})
               const { token,  saveInvoice , uploadImage} = this.props;
               var files = [];
               var length = this.state.files.length + 2;
               var progress = this.state.progress;
               var t = 100/length;
               this.setState({progress: 5})
               for(var i = 0; i < this.state.files.length; i++){
                    var imageArray = []
                    await uploadImage(token, this.state.files[i].base);
                    const { newfile } = this.props;
                    imageArray.push(newfile.guid)
                    var total = i + 1
                    var name = "chuser_" + total + ".jpg"
                    var a = {name: name, chunks: imageArray}
                    files.push(a)
                    this.setState({progress: t})
               }

               var data = {
                             buyer: this.state.buyer,
                             warehouse:this.state.warehouse,
                             seller: this.state.seller,
                             date: this.state.dateValue,
                             incomingNumber: this.state.invoiceText,
                             files: files
                           }
                this.setState({progress: 80})
                await saveInvoice(token , data)
                this.setState({progress: 98})
                const { invoice } = this.props;
                this.setState({progress: 100})
                if(invoice){
                  this.setState({ progressLoader: false})
                  this.props.navigation.navigate('invoices')
                }
           }

     }

     _error = (error) =>{
       Alert.alert(
            'Error',
              error,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
     }

     _isActive = ( seller, warehouse) => {

          var sel = this.state.seller;
          var war = this.state.warehouse;

          if(seller){
            sel = seller
          }
          if(warehouse){
            war = warehouse
          }

          if(sel && war && this.state.buyer &&
              this.state.dateValue && this.state.files.length > 0){
             this.setState({activeGreen: true})
           } else {
             this.setState({activeGreen: false})
           }
     }

     _modalOpen = (type) => {
       const { loading } = this.props;
       if(this.state.isOpen){
          var dataArray = []
          if(this.state.type == 'Resturant'){
              dataArray = this.state.spArray
          } else if(this.state.type == 'Supplier'){
              dataArray = this.state.slArray
          } else if(this.state.type == 'WareHouse'){
              dataArray = this.state.waArray
          }
           return(
                <Popup
                  loading={loading}
                  type={type}
                  list={dataArray}
                  onClose={() => this._clickClose()}
                  onSearch={(text) => this._onSearch(text)}
                  onSelect={(item) => this._chooseSelection(item)}
                />
           )
         }
     }

     _clickOpen = (type) => {
        this.setState({type: type, isOpen: true})
     }
     _clickClose = () => {
        this.setState({isOpen: false})
     }

     _onSearch = (text) => {
       if(this.state.type == 'Resturant'){
          this._resturantSearch(text);
       } else if(this.state.type == 'Supplier'){
          this._supplierSearch(text)
       } else if(this.state.type == 'WareHouse'){
          this._wareHouseSearch(text)
       }

     }

     _chooseSelection = async(item) => {
           if(this.state.type == 'Resturant'){
             await this._getSupplierList(item)
           } else if(this.state.type == 'Supplier'){
             await this._setSupplier(item);
           } else if(this.state.type == 'WareHouse'){
             await this._setWareHouse(item);
           }
           this.setState({isOpen: false})
     }

     _getSupplierList = async(option) => {
             const { token , institution , getSupplier, getWareHouse, clearData} = this.props;
             await clearData()
             const currentIns = institution[option.item]
             this.setState({inName: option.name, buyer: currentIns.guid})
             if(currentIns){
                await getSupplier(token , currentIns.guid)
                await getWareHouse(token , currentIns.guid)
             }

             const { supplier , warehouse} = this.props;
             await  this._supplierData(supplier)
             await  this._warehouseData(warehouse)

             const { loading } = this.props;
             if(loading){
                this._isActive()
                this.setState({isOpen: false})
             }
      }

      _setSupplier = (option) => {
             this.setState({spName: option.name})
             const { supplier } = this.props;
             const currentIns = supplier[option.item]
             this.setState({ seller: currentIns.guid})
             this._isActive(currentIns.guid, this.state.warehouse)
       }

       _setWareHouse = (option) =>{
             this.setState({wpName: option.name})
             const { warehouse } = this.props;
             var currentIns = warehouse[option.item]
             this.setState({warehouse: currentIns.guid})
             this._isActive(this.state.seller,currentIns.guid)
        }

        _resturantSearch = (text) => {
            const { institution } = this.props;

            if(text.length >= 1) {
                  var array = []
                  for(var i=0; i < institution.length; i++){
                      if(institution[i]){
                        var name = institution[i].name
                        console.log(name)
                        console.log(text)
                        if(name.includes(text)){
                            var a = {item: i, name: institution[i].name}
                            array.push(a)
                         }
                      }
                  }

                  this.setState({spArray: array })
            } else {
              this._institueData()
            }
        }

        _supplierSearch = (text) => {
            const { supplier } = this.props;
            if(text.length >= 1){
                var array = []
                if(supplier){
                    for(var i=0; i < supplier.length; i++){
                        if(supplier[i]){
                          var name = supplier[i].name
                          console.log(name)
                          console.log(text)
                          if(name.includes(text)){
                              var a = {item: i, name: supplier[i].name}
                              array.push(a)
                           }
                        }
                    }
                    this.setState({slArray: array })
              }
            } else {
              this._supplierData(supplier)
            }
        }

        _wareHouseSearch = (text) => {
            const { warehouse } = this.props;
            if(text.length >= 1){
              var array = []
              if(warehouse){
                  for(var i=0; i < warehouse.length; i++){
                      if(warehouse[i]){
                        var name = warehouse[i].name
                        if(name.includes(text)){
                            var a = {item: i, name: warehouse[i].name}
                            array.push(a)
                         }
                      }
                  }
                  this.setState({waArray: array })
              }
            } else {
             this._warehouseData(warehouse)
            }
        }
  }

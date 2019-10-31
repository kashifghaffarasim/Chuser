
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet,Dimensions } from 'react-native';
var top = getStatusBarHeight()

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    rowDirection:{
      flexDirection: 'row',
      height: 56,
      padding: 12,
      borderBottomColor: '#ddd',
      borderBottomWidth: 0.6
    },

    topLeft: {
      width: '20%',
      justifyContent: 'center',
    },
    topCenter:{
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    topRight:{
      width: '20%',
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    textFont:{
      fontFamily: 'Regular',
      fontSize: 18
    },

    centerItem:{
      justifyContent:  'center',
      alignItems: 'center'
    },

    centerItem:{
      justifyContent:  'center',
      alignItems: 'center',

    },
    supplierBox: {
      backgroundColor: '#000',
      height: 250,
      width: '100%',
      padding: 15
    },

    titleText: {
      color: '#dddddd',
      fontSize: 16,
      fontFamily: 'Regular'
    },

    titleContect:{
      color: '#fff',
      fontSize: 20,
      fontFamily: 'Regular'
    },
    titleContectText:{
      color: '#fff',
      fontSize: 14,
      fontFamily: 'Regular',
      marginLeft: 2
    },
    dateContent:{
      fontSize: 20,
      fontFamily: 'Regular',
      color: '#ddd'
    },

    btnAccept: {
      width: 110,
      height: 40,
      padding: 5,
      borderRadius: 30,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    },

    tableHeader: {
      flexDirection: 'row',
      borderBottomColor: '#ddd',
      borderBottomWidth: 0.6,
      backgroundColor: '#333333'
    },

    tableContent: {
      flexDirection: 'row',
      borderBottomColor: '#ddd',
      borderBottomWidth: 0.6,
    },

    first: {
      width: '10%',
      padding: 10,
      borderRightColor: '#ddd',
      borderRightWidth: 0.6
    },
    sec: {
      width: '30%',
      padding: 10,
      borderRightColor: '#ddd',
      borderRightWidth: 0.6
    },
    rest: {
        width: '14%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ddd',
        borderRightWidth: 0.6
    },
    rest1:{
      width: '20%',
      padding: 10,
      borderRightColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 0.6
    },
    txtColor: {
      color: '#dddddd'
    },

    rowOverlay:{
       flexDirection: 'row',
       marginTop: 20,
       marginBottom: 20,
       height: 60,
       justifyContent: 'center',
       alignItems: 'center'
    },

    midRowWidth:{
      width: '70%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowWidth:{
      width: '15%',
      alignItems: 'center'
    },

    circleView:{
        height: 42,
        width: 42,
        borderColor: '#ddd',
        borderRadius: 46/2,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    rowOverlayBottom: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },

    rowLeftSide:{
      width: '50%',
      borderRightWidth: 1,
      borderRightColor: '#cccccc',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      marginTop: 10
    },

    boxContainer: {
      marginBottom: 10,
      marginTop: 15,
      height: 120,
      width: 120,
      borderColor: '#4a4a4a',
      borderWidth: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },


})

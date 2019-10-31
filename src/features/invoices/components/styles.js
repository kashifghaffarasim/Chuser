
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet,Dimensions } from 'react-native';
var top = getStatusBarHeight()

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    ctPadding:{
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 5
    },
    topContent:{
      fontSize: 18,
      fontFamily: 'SemiBold',
      color: '#B2B2B2'
    },
    topContentGreen:{
      fontSize: 18,
      fontFamily: 'SemiBold',
      color: '#00c965'
    },

    topMargin: {
      marginTop: 10,
    },

    label: {
      fontSize: 12,
      fontFamily: 'Regular',
      color: '#00c965'
    },

    inputText: {
      fontSize: 16,
      fontFamily: 'Regular',
      marginLeft: 3,
      marginRight: 3,
      color: '#636161'
    },

    boxContainer: {
      marginBottom: 10,
      marginTop: 15,
      height: 150,
      width: 150,
      borderColor: '#4a4a4a',
      borderWidth: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },

    rowDirection:{
      flexDirection: 'row',
      height: 56,
      padding: 12,
      borderBottomColor: '#696F7C',
      borderBottomWidth: 0.6
    },

    topLeft: {
      width: '25%',
      justifyContent: 'center',
    },
    topCenter:{
      width: '45%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    topRight:{
      width: '30%',
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
    supplierBox: {
      borderColor: '#ddd',
      borderWidth: 0.8,
      borderRadius: 10,
      width: '96%',
      marginLeft: 5,
      marginTop: 10,
      padding: 12,
      paddingRight: 0,
    },
    titleText: {
      color: '#B2B2B2',
      fontSize: 12,
      fontFamily: 'Regular'
    },

    titleContect:{
      fontSize: 14,
      fontFamily: 'SemiBold'
    },
    titleSPContect:{
      fontSize: 20,
      fontFamily: 'SemiBold'
    },
    dateContent:{
      fontSize: 14,
      fontFamily: 'Regular',
      color: '#B2B2B2'

    },
    topHedding:{
      marginTop: 0,
      marginBottom: 20,
      paddingBottom: 15,
      paddingLeft: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#ddd',
      width: '100%',
      margin: 0

    },
    mainView:{
      marginTop: -10,
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#ddd',
      width: '100%',
      height: 200
    },
    rowOverlayBottom: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },

    bottomBack:{
      marginTop: 20,
    },
    textFont: {
      fontSize: 18
    },
    okayBtn:{
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18
    },
    itemView:{
       borderBottomColor: '#ddd',
       borderBottomWidth: 1 ,
       paddingBottom: 10,
       paddingLeft: 20,
       marginTop: 5
    }


})

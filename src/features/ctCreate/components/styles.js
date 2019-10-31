
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet,Dimensions } from 'react-native';
var top = getStatusBarHeight()

export const styles = StyleSheet.create({
      container: {
          flex: 1,
          marginTop: (top + 5),
      },

      topDirection: {
        flexDirection: 'row',
        height: 50,
        paddingLeft: 10,
        paddingTop: 8
      },

      mediumText: {
        fontSize: 18,
        fontFamily: 'SemiBold'
      },
      regularText:{
        fontSize: 18,
        fontFamily: 'Regular'
      },
      rowContain: {
        height: 80,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      touchBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        backgroundColor: '#00c965',
        padding: 16,
        borderWidth: 1,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#00c965',
      },
      boldTex: {
        fontSize: 20,
        fontFamily: 'Bold',
        textAlign: 'center',
        color: '#fff'
      },

      rowList: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1
      },

      rowDirection: {
        flexDirection: 'row',
        marginTop: 8,
        paddingLeft: 10,
        paddingRight: 5,
        alignItems: 'center'
      },

      titleText: {
        fontSize: 24,
        fontFamily: 'SemiBold'
      },
      dateText: {
        color: '#dddddd',
        fontSize: 15,
        fontFamily: 'Regular'
      },
      nameText: {
        fontSize: 8,
        fontFamily: 'Regular',
        backgroundColor: '#ddd',
        padding: 5,
        borderRadius: 10
      },

      circleColor: {
        borderRadius: 10/2,
        height: 10,
        width: 10,
        backgroundColor: 'red'
      },


  })

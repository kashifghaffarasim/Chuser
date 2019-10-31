import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet,Dimensions } from 'react-native';
var top = getStatusBarHeight()
var {height, width} = Dimensions.get('window');

console.log(height)

export const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#ddd'
    },
    titleView:{
       alignItems: 'center',
       marginTop: 20
    },
    titleText: {
      textAlign: 'center',
      fontFamily: 'Regular',
      fontSize: 22
    },

    rowDirction: {
      flexDirection: 'row',
      alignItems: 'center'
    },

    boxPadding:{
      paddingTop: 8,
        padding: 10
    },

    circle: {
        width: 13,
        height: 13,
        borderRadius: 13/2,
        backgroundColor: '#5c5a5a'
    },

    activeCircle: {
      width: 13,
      height: 13,
      borderRadius: 13/2,
      backgroundColor: '#00c965'
    },

    circleButton:{
      width: 70,
      height: 70,
      borderRadius: 70/2,
      backgroundColor: '#CCCCCC',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },

    logoutText:{
      fontFamily: 'Regular',
      fontSize: 20
    },
    wrapperLogin:{
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 99
    },
    mainContiner:{
      height: height
    }

})

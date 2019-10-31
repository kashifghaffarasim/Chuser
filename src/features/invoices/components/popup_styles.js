
import { StyleSheet,Dimensions } from 'react-native';

export const styles = StyleSheet.create({

  container: {
        width: '98%',
        backgroundColor:  '#fff',
        alignItems: 'center',
  },
  inputText:{
        borderBottomWidth: 0.5,
        borderBottomColor: '#45b0ce',
        width: '98%',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 15,
        marginTop: 10,
        fontSize: 16
  },

  subContainer:{
        width: '90%',
        padding: 5,
  },
  buttonStyle: {
        backgroundColor: '#45b0ce',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
  },
  loaderStyle:{
       position: 'absolute',
       top: 0,
       bottom:0,
       justifyContent: 'center',
       alignItems: 'center',
       width: '100%',
       height: '100%',
       zIndex: 99,
       backgroundColor: 'rgba(0,0,0,0.7)'
  }

})

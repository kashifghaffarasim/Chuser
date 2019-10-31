
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet,Dimensions } from 'react-native';
var top = getStatusBarHeight()

export const styles = StyleSheet.create({
      container: {
          flex: 1,
          marginTop: (top + 5),
      },
      ctPadding:{
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5
      },

      topContent:{
        fontSize: 18,
        fontFamily: 'SemiBold',
        color: '#cccccc'
      },
      rowDirection: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
      }


})

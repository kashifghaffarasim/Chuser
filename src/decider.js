import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContext } from './context';
import { Main } from './navigation/navigators';

class Decider extends React.Component {

    constructor(props) {
          super(props);
          this.state = { isLoading: true }
    }

    componentDidMount() {

    }


    render() {
      return (
          <AppContext.Provider value={null}>
              <Main />
          </AppContext.Provider>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({

    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(Decider);

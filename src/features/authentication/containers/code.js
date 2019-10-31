import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/verification';
import { getCode, verifyCode, logout } from '../reducers';

const mapStateToProps = state => {
  
    return {
            token: state.sessionData.token,
            codeLoading: state.sessionData.codeLoading,
            code: state.sessionData.code
      }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      getCode,
      verifyCode,
      logout
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

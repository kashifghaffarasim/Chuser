import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/login';
import { authenticate , cleanup, getUser } from '../reducers';

const mapStateToProps = state => {
    return {
          token: state.sessionData.token,
          loading: state.sessionData.loading,
          error: state.sessionData.error,
          user: state.sessionData.user
      }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      getUser,
      authenticate,
      cleanup
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

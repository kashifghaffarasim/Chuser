import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/home';
import { getUser, logout} from '../../authentication/reducers';

const mapStateToProps = state => {
    return {
            token: state.sessionData.token,
            user: state.sessionData.user,
        }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      getUser,
      logout
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

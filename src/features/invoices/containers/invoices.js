import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components';
import { getList } from '../reducers';

const mapStateToProps = state => {
    return {
            token: state.sessionData.token,
            lists: state.invoiceData.list,
            loading: state.invoiceData.loading
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getList
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components';
import { saveData, getItem, acceptInvoice, cancelInvoice } from '../reducers';
import { uploadImage } from '../../invoices/reducers'

const mapStateToProps = state => {
    return {
              token: state.sessionData.token,
              doc: state.invitemData.doc,
              loading: state.invitemData.loading,
              isAccept: state.invitemData.isAccept,
              isCancel: state.invitemData.isCancel,
              isSave: state.invitemData.isSave,
              newfile: state.invoiceData.file,
          }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getItem,
        acceptInvoice,
        cancelInvoice,
        saveData,
        uploadImage
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

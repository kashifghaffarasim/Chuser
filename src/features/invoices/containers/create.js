import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/create';
import { getResturant, getSupplier, getWareHouse , saveInvoice, uploadImage, clearData} from '../reducers';
import { getItem } from '../../invoice_items/reducers';

const mapStateToProps = state => {

    return {
              token: state.sessionData.token,
              institution: state.invoiceData.institution,
              supplier: state.invoiceData.supplier,
              warehouse: state.invoiceData.warehouse,
              newfile: state.invoiceData.file,
              saveLoading: state.invoiceData.saveLoading,
              invoice: state.invoiceData.invoice,
              loading: state.invoiceData.swLoading
      }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      getResturant,
      getSupplier,
      getWareHouse,
      saveInvoice,
      uploadImage,
      getItem,
      clearData
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import axios from 'axios';

export const CLEANUP = 'chuser/CLEANUP';

export const DOCUMENTLIST = 'chuser/DOCUMENTLIST';
export const DOCUMENTLIST_SUCCESS = 'chuser/DOCUMENTLIST_SUCCESS';
export const DOCUMENTLIST_FAIL = 'chuser/DOCUMENTLIST_FAIL';

export const GET_INSTITUION = 'chuser/GET_INSTITUION';
export const GET_INSTITUION_SUCCESS = 'chuser/GET_INSTITUION_SUCCESS';
export const GET_INSTITUION_FAIL = 'chuser/GET_INSTITUION_FAIL';

export const GET_SUPPLIER = 'chuser/GET_SUPPLIER';
export const GET_SUPPLIER_SUCCESS = 'chuser/GET_SUPPLIER_SUCCESS';
export const GET_SUPPLIER_FAIL = 'chuser/GET_SUPPLIER_FAIL';

export const GET_WAREHOUSE = 'chuser/GET_WAREHOUSE';
export const GET_WAREHOUSE_SUCCESS = 'chuser/GET_WAREHOUSE_SUCCESS';
export const GET_WAREHOUSE_FAIL = 'chuser/GET_WAREHOUSE_FAIL';

export const CREATE_INVOICE = 'chuser/CREATE_INVOICE';
export const CREATE_INVOICE_SUCCESS = 'chuser/CREATE_INVOICE_SUCCESS';
export const CREATE_INVOICE_FAIL = 'chuser/CREATE_INVOICE_FAIL';

export const SAVE_IMAGE = 'chuser/SAVE_IMAGE';
export const SAVE_IMAGE_SUCCESS = 'chuser/SAVE_IMAGE_SUCCESS';
export const SAVE_IMAGE_FAIL = 'chuser/SAVE_IMAGE_FAIL';


let initialState = {
    loading: false,
    list: [],
    error: null,
    swLoading: false,
    institution: null,
    supplier: null,
    warehouse: null,
    file: null,
    saveLoading: false,
    invoice: null
  }


export default sessionsReducer = (state = {}, action) => {
    switch (action.type) {
        case CLEANUP:
            return { ...state, error: null ,  loading: false}
        case DOCUMENTLIST:
            return { ...state, error: null ,loading: true , list: []};
        case DOCUMENTLIST_SUCCESS:
            if(action.payload && action.payload.data){
              console.log('success')
              return { ...state, loading: false, list: action.payload.data};
            } else {
              return { ...state, loading: false , list: []};
            }
        case DOCUMENTLIST_FAIL:
            return { ...state, loading: false  };
        case GET_INSTITUION:
            return { ...state, swLoading: false , saveLoading: false };
        case GET_INSTITUION_SUCCESS:
            if(action.payload && action.payload.data){
                return { ...state, swLoading: false , institution: action.payload.data };
            }
        case GET_INSTITUION_FAIL:
            return { ...state, swLoading: false  };

        case GET_SUPPLIER:
            return { ...state, swLoading: true  };
        case GET_SUPPLIER_SUCCESS:
              if(action.payload && action.payload.data){
                return { ...state, swLoading: true , supplier:  action.payload.data};
              } else {
                return { ...state, swLoading: true , supplier: []};
              }
        case GET_SUPPLIER_FAIL:
            return { ...state, swLoading: false  };
        case GET_WAREHOUSE:
              return { ...state, swLoading: true  };
        case GET_WAREHOUSE_SUCCESS:
              if(action.payload && action.payload.data){
                  return { ...state, swLoading: false , warehouse:  action.payload.data};
                } else {
                  return { ...state, swLoading: false , warehouse:  []};
                }
        case GET_WAREHOUSE_FAIL:
              return { ...state, swLoading: false  };
        case SAVE_IMAGE:
              return { ...state, loading: false  };
        case SAVE_IMAGE_SUCCESS:
              if(action.payload && action.payload.data){
                return { ...state, loading: false, file:   action.payload.data };
              }
        case SAVE_IMAGE_FAIL:
              return { ...state, loading: false  };

        case CREATE_INVOICE:
              return { ...state, saveLoading: true , invoice: null };
        case CREATE_INVOICE_SUCCESS:
              if(action.payload && action.payload.data) {
                return { ...state, saveLoading: false , invoice: action.payload.data };
              } else {
                return { ...state, saveLoading: false , invoice: null };
              }
        case CREATE_INVOICE_FAIL:
              return { ...state, saveLoading: false  };
        default:
            return state;
    }
}



export function getList(token, value, sortOrder){
    var url = '/customer/document/active/list?from=0&count=50&sortingField='+ value +'&sortOrder=' + sortOrder;

    return {
        type: DOCUMENTLIST,
        payload: {
            request: {
                      method: 'get',
                      url: url,
                      headers: { 'JWT': token }
                 }
           }
     }

}


export function getResturant(token){
    return {
        type: GET_INSTITUION,
        payload: {
            request: {
                      method: 'get',
                      url: '/customer/document/institution/list',
                      headers: { 'JWT': token }
                 }
           }
     }
}

export function getSupplier(token, guid){
    var url = '/customer/document/institution/' + guid + '/providers'
    return {
        type: GET_SUPPLIER,
        payload: {
            request: {
                      method: 'get',
                      url: url,
                      headers: { 'JWT': token }
                 }
           }
     }
}

export function getWareHouse(token, guid){
    var url = '/customer/document/institution/' + guid + '/warehouses'
    return {
        type: GET_WAREHOUSE,
        payload: {
            request: {
                      method: 'get',
                      url: url,
                      headers: { 'JWT': token }
                 }
           }
     }
}


// Start Save Invoices

export function uploadImage(token, file){
  return {
      type: SAVE_IMAGE,
      payload: {
          request: {
                    method: 'put',
                    url: '/customer/files',
                    headers: { 'JWT': token },
                    data: {
                      data: file
                    }
               }
         }
   }
}


export function saveInvoice(token, data){
  return {
      type: CREATE_INVOICE,
      payload: {
          request: {
                    method: 'PUT',
                    url: '/customer/document/chunk',
                    headers: { 'JWT': token },
                    data: data
               }
         }
   }
}

// End: Save Invoices

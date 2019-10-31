import axios from 'axios';

export const DOCLIST = 'chuser/DOCLIST';
export const DOCLIST_SUCCESS = 'chuser/DOCLIST_SUCCESS';
export const DOCLIST_FAIL = 'chuser/DOCLIST_FAIL';

export const ACCEPT_INVOICE = 'chuser/ACCEPT_INVOICE';
export const ACCEPT_INVOICE_SUCCESS = 'chuser/ACCEPT_INVOICE_SUCCESS';
export const ACCEPT_INVOICE_FAIL = 'chuser/ACCEPT_INVOICE_FAIL';

export const CANCEL_INVOICE = 'chuser/CANCEL_INVOICE';
export const CANCEL_INVOICE_SUCCESS = 'chuser/CANCEL_INVOICE_SUCCESS';
export const CANCEL_INVOICE_FAIL = 'chuser/CANCEL_INVOICE_FAIL';

export const SAVE_IMAGE = 'chuser/SAVE_IMAGE';
export const SAVE_IMAGE_SUCCESS = 'chuser/SAVE_IMAGE_SUCCESS';
export const SAVE_IMAGE_FAIL = 'chuser/SAVE_IMAGE_FAIL';



let initialState = {
    loading: false,
    doc: [],
    error: null,
    isCancel: false,
    isAccept: false,
    isSave: false
}

export default sessionsReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCLIST:
            return { ...state, error: null ,loading: true, isAccept: false, isCancel: false};
        case DOCLIST_SUCCESS:
            if(action.payload && action.payload.data){
              return { ...state, loading: false, doc: action.payload.data};
            } else {
              return { ...state, loading: false };
            }
        case DOCLIST_FAIL:
            return { ...state, loading: false  };
        case ACCEPT_INVOICE:
            return { ...state, isAccept: false, loading: true };
        case ACCEPT_INVOICE_SUCCESS:
            return { ...state, isAccept: true, loading: false };
        case ACCEPT_INVOICE_FAIL:
            return { ...state, isAccept: false, loading: false  };
        case CANCEL_INVOICE:
            return { ...state, isCancel: false, loading: true };
        case CANCEL_INVOICE_SUCCESS:
            return { ...state, isCancel: true , loading: false };
        case CANCEL_INVOICE_FAIL:
            return { ...state, isCancel: false, loading: false  };

        case SAVE_IMAGE:
            return { ...state, isSave: false, loading: true };
        case SAVE_IMAGE_SUCCESS:
            return { ...state, isSave: true, loading: false };
        case SAVE_IMAGE_FAIL:
            return { ...state, isSave: true, loading: false };
        default:
            return state;
    }
}


export function getItem(token, guid){
    var url = "/customer/document/"+ guid;
    return {
        type: DOCLIST,
        payload: {
            request: {
                      method: 'get',
                      baseURL: 'https://platform.chuser.ru/api/rest/mobile',
                      url: url,
                      headers: { 'JWT': token }
                 }
           }
     }
}

export function acceptInvoice(token , guid, array){
   var url = '/customer/document/'+ guid +'/accept';
   return {
       type: ACCEPT_INVOICE,
       payload: {
           request: {
                     method: 'post',
                     baseURL: 'https://platform.chuser.ru/api/rest/mobile/',
                     url: url,
                     headers: { 'JWT': token},
                     data: array
                }
          }
    }

}

export function cancelInvoice(token, guid){
  var url = '/customer/document/'+ guid +'/cancel';
  return {
      type: CANCEL_INVOICE,
      payload: {
          request: {
                    method: 'post',
                    baseURL: 'https://platform.chuser.ru/api/rest/mobile',
                    url: url,
                    headers: { 'JWT': token , }
               }
         }
   }
}


export function saveData(token, guid, data){

    var url = '/customer/document/'+ guid +'/attachment/chunk';

    return {
        type: SAVE_IMAGE,
        payload: {
            request: {
                      method: 'put',
                      baseURL: 'https://platform.chuser.ru/api/rest/mobile',
                      url: url,
                      headers: { 'JWT': token  },
                      data: data
                 }
           }
     }
}

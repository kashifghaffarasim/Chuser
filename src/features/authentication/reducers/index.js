
export const CLEANUP = 'chuser/CLEANUP';

export const AUTHENTICATE = 'chuser/AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = 'chuser/AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL = 'chuser/AUTHENTICATE_FAIL';

export const USERINFO = 'chuser/USERINFO/LOAD';
export const USERINFO_SUCCESS = 'chuser/USERINFO/LOAD_SUCCESS';
export const USERINFO_FAIL = 'chuser/USERINFO/LOAD_FAIL';

export const LOGOUT = 'chuser/LOGOUT';

export const VERIFY_CODE =  'chuser/VERIFY_CODE';
export const GET_CODE = 'chuser/GET_CODE'

let initialState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
    codeLoading: true,
    code: null
  }


export default sessionsReducer = (state = {}, action) => {
    switch (action.type) {
        case CLEANUP:
            return { ...state, error: null , token: null,   isAuthenticated: false,   loading: false, code: null}
        case AUTHENTICATE:
            return { ...state, error: null ,loading: true,   token: null, code: null};
        case AUTHENTICATE_SUCCESS:

            if(action.payload &&  action.payload.request && action.payload.request.status == 200){
              return { ...state, loading: false , error: null , token: action.payload.request._response, code: null};
            } else {
              return { ...state, loading: false , error: 'Invalid Email/Password' , token: null, code: null};
            }

        case AUTHENTICATE_FAIL:
            return { ...state, loading: false , error: 'Invalid Email/Password', token: null , code: null};
        case USERINFO:
            return { ...state, loading: true };
        case USERINFO_SUCCESS:
            if(action.payload && action.payload.data){
              return { ...state, loading: false , user: action.payload.data};
            } else {
              return { ...state, loading: false, user: null };
            }
        case USERINFO_FAIL:
            return { ...state, loading: false };
        case VERIFY_CODE:
            if(action.payload.data){
                return { ...state, codeLoading: false, code:  action.payload.data.code}
            } else {
              return { ...state, codeLoading: false, code: null}
            }
        case GET_CODE:
          if(action.payload.data){
            return { ...state, codeLoading: false, code:  action.payload.data.code}
          } else {
            return { ...state, codeLoading: false, code: null}
          }
        case LOGOUT:
            return { ...state, isAuthenticated: false, token: null , code: null, user: null};

        default:
            return state;
    }
}

// MARK: - Action Creators
export function cleanup() {
    return {
        type: CLEANUP,
        payload: {
        }
    }
}

 export function  authenticate(user) {

    return {
        type: AUTHENTICATE,
        payload: {
          request: {
                    method: 'POST',
                    baseURL: 'https://signin.chuser.ru',
                    url: '/authorize/jwt',
                    responseType: 'json',
                    headers: { 'content-type': 'application/json' },
                    data: { login:  user.login ,
                            password:  user.password,
                            application: '8f133841-d8f2-eb4a-8c4c-a928fce8feca'
                      }
               }
        }
   }

}


export function  logout() {
    return {
        type: LOGOUT,
        payload: {
        }
    }
}


export function getUser(token){
    return {
        type: USERINFO,
        payload: {
            request: {
                      url: '/user/info',
                      headers: { 'JWT': token }
                 }
           }
     }

}


export function verifyCode(code){
    return {
        type: VERIFY_CODE,
        payload: {  code: code  }
    }
}

export function getCode(code){

  return {
      type: GET_CODE,
      payload: {
        data: { code:  code  }
      }
  }
}

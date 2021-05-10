import * as Types from '../constants/actTypeUser';
import Cookies from "js-cookie";
const initialUserState = {
    user: {
        id: 1,
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatarPath: null,
        gender: 1,
        birthday: '',
        score: 0,
        isAdmin: false,
        isConfirm: false,
        isLock: false,
        createdAt: '',
        updatedAt: ''
    },
    auth : false
}

const user = (state = initialUserState , action) => {
    var { user } = action
    switch (action.type) {
        case Types.LOGIN_USER:
            Cookies.set('expireAuth', JSON.stringify(true), { expires: 1 / 24 });
            return{
                ...state,
                user : user,
                auth : true,
            }
        case Types.LOGOUT_USER:
            
            return{
                user : initialUserState,
                auth : false,
            }
        default: return {...state};
    }
}
export default user;
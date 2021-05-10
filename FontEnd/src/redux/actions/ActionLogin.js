import * as Types from '../constants/actTypeUser';
export const actLoginByUser = (user)=>{
    return {
        type: Types.LOGIN_USER,
        user
    }
}
export const actLogoutByUser = () =>{
    return{
        type: Types.LOGOUT_USER

    }
}
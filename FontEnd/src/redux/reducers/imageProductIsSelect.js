import * as Types from '../constants/actTypeProduct';

var discountCodes = {
    imagePathSelect: ''
}

const imagePath = (state = discountCodes, action) => {
    var { imagePath } = action;
    switch(action.type){
        case Types.SELECT_IMAGE_SHOW_TO_PRODUCT_DETAIL:
            return{
                ...state,
                imagePathSelect : imagePath
            }

        
        default : return{...state};
    }
}

export default imagePath;
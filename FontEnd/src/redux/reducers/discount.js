import * as Types from '../constants/ActionType';

var discountPer=[
    {
        id:1,
        code: 'DPSHNDCFHA',
        action: 0.1,
        summary: 'Mã giảm 10%',
        available : true
    },
    {
        id:2,
        code: 'DPSHNDCFHB',
        action: 0.2,
        summary: 'Mã giảm 20%',
        available : true
    },
    {
        id:3,
        code: 'DPSHNDCFHC',
        action: 0.3,
        summary: 'Mã giảm 30%',
        available : true
    },
    {
        id:4,
        code: 'DPSHNDCFHD',
        action: 0.4,
        summary: 'Mã giảm 40%',
        available : true
    },
    {
        id:5,
        code: 'DPSHNDCFHE',
        action: 0.5,
        summary: 'Mã giảm 50%',
        available : true
    },
    {
        id:6,
        code: 'DPSHNDCFHF',
        action: 0.6,
        summary: 'Mã giảm 60%',
        available : true
    },
    {
        id:7,
        code: 'DPSHNDCFHG',
        action: 0.7,
        summary: 'Mã giảm 70%',
        available : true
    },
    {
        id:8,
        code: 'DPSHNDCFHH',
        action: 0.8,
        summary: 'Mã giảm 80%',
        available : true
    },
]
var discountCodes = {
    promotion: [],
    promotionIsSelect: ''
}

const discount = (state = discountCodes, action) => {
    var { promotion, discount, inputDiscount } = action;
    switch(action.type){
        case Types.ON_LOAD_PROMOTION_ON_STATE:
            return{
                ...state,
                promotion : promotion
            }
        case Types.DISCOUNT_IS_SELECT_IN_CART:
            return{
                ...state,
                promotionIsSelect: inputDiscount
            }
        default : return{...state};
    }
}

export default discount;
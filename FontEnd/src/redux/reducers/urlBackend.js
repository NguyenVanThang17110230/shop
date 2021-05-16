var initialUrlBackend = {
    urlBackend: 'http://localhost:5000/'
    //urlBackend: 'https://shop-shoe-backend.herokuapp.com/'
};

const urlBackend = (state = initialUrlBackend, action) =>{
    switch(action.type){

        default: return {...state};
    }
}

export default urlBackend

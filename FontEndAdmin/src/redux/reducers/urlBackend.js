
const initialUrlBackend = {
    urlBackend: 'http://localhost:5000/'
};

const urlBackend = (state = initialUrlBackend, action) =>{
    switch(action.type){
        default: return {...state};
    }
}

export default urlBackend

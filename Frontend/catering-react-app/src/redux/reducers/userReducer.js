import produce from 'immer';


const initialState = {
    connectedUser:{
        managerId:5,
        name:"",
        password:""
    }
}

const reducer = produce((state, action)=>{
    switch(action.type){
        case 'USER_CONNECTION': 
            console.log(action.payload);
            return {...state, connectedUser: action.payload};
        case 'USER_NO_CONNECTION': 
            return {...state, connectedUser: null}
        default:
            return state;
    }
},initialState);

export default reducer;
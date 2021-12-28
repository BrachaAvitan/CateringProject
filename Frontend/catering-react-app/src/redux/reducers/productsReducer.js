import produce from 'immer';

const initialState = {
    products = []
}

const reducer = produce((state, action)=>{
   switch(action.type){
        case 'SET_PRODUCTS':
            return {...state, products: action.payload}
        case 'UPDATE_PRODUCT':
            let updatedProduct = action.payload;
            debugger
            //לבדוק איפה צריך להוסיף קריאת שרת של עדכון איפה מקובל?
            const filtered = state.products.filter((it) => it.productId !== updatedProduct.productId);
            return {...state, products: [...filtered, updatedProduct]}
   }
},initialState);
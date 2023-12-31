
import { configureStore } from '@reduxjs/toolkit'
import { api } from './api';
import { postsApi } from '../features/products/manager/product_services.api';
import auth_slice from '../features/authentication/manager/auth_slice';



const user=localStorage.getItem("user");


const initialState = {
  
// loginUser:{ 
//   user:{
//     "_id": "63544b08de3dfd30e94cc6dc",
//     "name": "Super Admin",
//     "email": "upserAdmin@copet.in",
//     "role": {
//         "_id": "635440b06bb94adbca28d14d",
//         "name": "superAdmin"
//     },
//     "status": "active"
// }
// }
};


const store = configureStore({

  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    auth: auth_slice
    // Define a top-level state field named `todos`, handled by `todosReducer`
    // loginUser:loginUserReducer,
    // driversList:getDriversListReducer,
    // usersList:getUsersListReducer,
    // updateUser:updateUserStatusRedcuer,
    // updateDriverDocumentsStatus:updateDriverDocumentsStatusReducer,
    // userById:getUserByIdReducer,
    // getUserRides:getUserRidesReducer,
    // getRideDetails:getRideDetailsReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(api.middleware);
  },
  preloadedState:initialState
},
)



export default store;


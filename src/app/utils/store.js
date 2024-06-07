
import { configureStore } from '@reduxjs/toolkit'
import auth_slice from '../features/authentication/manager/auth_slice';



const user = localStorage.getItem("user");
console.log(user);

console.log((user != undefined || user != null));

const initialState = {
  "auth": (user != undefined || user != null) ? {user:JSON.parse(user)} : null
};


const store = configureStore({

  reducer: {
    auth: auth_slice
  },

  preloadedState: initialState
},
)



export default store;


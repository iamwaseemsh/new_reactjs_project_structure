import Axios from 'axios';
import appUrl from '../../../constants/appUrl';
import { axiosApi } from '../../../services/axios_api';


const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {},
    extraReducers: (builder) => {
        
        builder
            .addCase(loginUser.pending, (state, action) => {
                return { loading: true }
            })
            .addCase(loginUser.fulfilled, (state, action) => {

                localStorage.setItem("user", JSON.stringify(action.payload));
                localStorage.setItem('accessToken',action.payload.accessToken);
                localStorage.setItem('refreshToken',action.payload.refreshToken);

                return { loading: false, user: action.payload }
            })
            .addCase(loginUser.rejected, (state, action) => {
                return {
                    loading: false,
                    success:false,
                    error: action.payload
                }
            });
    },
});

export default authSlice.reducer;
const parseMenuItem = (item)=>{

    return {
        "label": item.label,
        "icon": item.icon,
        "to": item.route,
        "items": item.children?.map((e)=>parseMenuItem(e))
    };

}

// Thunks
export const loginUser = createAsyncThunk('loginUser/fetch', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        console.log(body);
        const { data } = await axiosApi.post("web/user/login", body);
        console.log(data);
        const rawMenu = data.data.role.pages.menu;
        const menu = rawMenu.map((item)=>parseMenuItem(item));
        
        return fulfillWithValue({
            ...data.data,
            "menu": menu

        });
    } catch (error) {
        console.log(error);
        throw rejectWithValue(error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message)

    }

});


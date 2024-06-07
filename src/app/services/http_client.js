import { axiosApi } from "./axios_api";

const httpClient = async ({
    method,
    url,
    body,
    loadingCallback

}) => {
    try {

        handleLoading(loadingCallback)(true);
        switch (method) {
            case requestType.post:
                return (await apiService.post(url, body)).data;
            case requestType.get:
                return (await apiService.get(url)).data;
            case requestType.put:
                return (await apiService.put(url, body)).data;
            case requestType.delete:
                return (await apiService.delete(url)).data;



        }

    } catch (error) {
        throw new Error(error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message);
    } finally {
        handleLoading(loadingCallback)(false);
    }

}
const handleLoading = (loadingCallback) => (isLoading) => {
    if (loadingCallback) {
        loadingCallback(isLoading);
    }
};


export const requestType = {
    post: "post",
    get: "get",
    put: "put",
    delete: "delete",
}
const apiService = {
    post: (endpoint, data) => {

        return axiosApi.post(`${endpoint}`, data);
    },
    get: (endpoint) => {
        return axiosApi.get(`${endpoint}`);
    },
    put: (endpoint, data) => {
        return axiosApi.put(`${endpoint}`, data);
    },
    delete: (endpoint) => {
        return axiosApi.delete(`${endpoint}`);
    }
};

export default httpClient;

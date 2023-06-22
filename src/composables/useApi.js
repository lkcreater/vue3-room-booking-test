import axios from 'axios';
import { notification } from 'ant-design-vue';

export function useApi() {
    const url = '//localhost:3001/api/';

    const $get = async (path) => {
        try {
            return await axios.get(`${url}${path}`);
        } catch (error) {
            console.log(error);
        }        
    } 

    const $post = async (path, body) => {
        try {
            return await axios.post(`${url}${path}`, body);
        } catch (error) {
            notification['error']({
                message: 'แจ้งเตือน',
                description: error.response.data?.message,
            });
        }        
    } 

    return {
        $get,
        $post
    }
}
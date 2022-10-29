import axios from 'axios';

const baseUrl = 'https://3000-vingitonga-noviumsingle-zqhgqzi4f9o.ws-eu73.gitpod.io/api/users';

export const createUser = async (user) => {
    const response = await axios.post(baseUrl, user);
    return response;
};
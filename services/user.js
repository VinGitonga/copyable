import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/users';

export const createUser = async (user) => {
    const response = await axios.post(baseUrl, user);
    return response;
};
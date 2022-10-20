import axios from 'axios';

export const urls = {
    login: 'http://localhost:8000/api/login/',
    register: 'http://localhost:8000/api/register/',
    posts: '/api/activity-logs/posts/',
    stats: '/api/activity-logs/posts/stats/',
    like: '/api/activity-logs/posts/{postId}/like/',
    view: '/api/activity-logs/posts/{postId}/view/',
};

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
})

export const fetchPosts = (nextUrl = null) => {
    const url = nextUrl !== null ? nextUrl : urls.posts;
    const accessToken = localStorage.getItem("__ACCESS_TOKEN");
    return axiosInstance.get(url, {headers: {"Authorization": `Bearer ${accessToken}`}});
};

export const postLike = (postId) => {
    const accessToken = localStorage.getItem("__ACCESS_TOKEN");
    const likeUrl = urls.like.replace("{postId}", postId);
    return axiosInstance.post(likeUrl, null, {headers: {"Authorization": `Bearer ${accessToken}`}});
};

export const getPost = (postId) => {
    const accessToken = localStorage.getItem("__ACCESS_TOKEN");
    return axiosInstance.get(`${urls.posts}${postId}/`, {headers: {"Authorization": `Bearer ${accessToken}`}});
};

export const registerView = (postId) => {
    const accessToken = localStorage.getItem("__ACCESS_TOKEN");
    const viewUrl = urls.view.replace("{postId}", postId);
    return axiosInstance.post(viewUrl, null, {headers: {"Authorization": `Bearer ${accessToken}`}});
}

export const getStats = () => {
    const accessToken = localStorage.getItem("__ACCESS_TOKEN");
    return axiosInstance.get(urls.stats, {headers: {"Authorization": `Bearer ${accessToken}`}});
}
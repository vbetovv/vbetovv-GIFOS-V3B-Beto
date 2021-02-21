const API_key = 'JAsSvdrs6vTd8bjSwT6bSZHcbOTTbTOa';
const urlPrincipal = 'https://api.giphy.com/v1/gifs';
const urlUpload='';

const  apiGiphy=async (url, params) => {
    try {
        const response = await fetch(url + `?api_key=${API_key}` + params);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};


const  apiGiphyUpload=async (p_gifData) => {
    try {
        const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_key}`,{method:'POST',body:p_gifData});
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};
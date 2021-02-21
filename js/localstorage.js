const getInfoFavorites = (p_key) => {
    return JSON.parse(localStorage.getItem(p_key));
};

const saveSessionStorage = (data) => {
    return sessionStorage.setItem(data.typepage + '-' + data.offset, JSON.stringify(data));
}

const saveLocalStorage = (data) => {
    return localStorage.setItem(data.id, JSON.stringify(data));
};

const saveLocalStorageGifos = (data) => {
    return localStorage.setItem(lsGIFOS+data.id, JSON.stringify(data));
};

const removeLocalStorage = (p_key) => {
    return localStorage.removeItem(p_key);
};

const getBookmark = (p_key, p_id) => {
    let res = JSON.parse(localStorage.getItem(p_id));
    if (res !== null) {
        let favBtnID = p_key.dataset.favoriteActive;
        let btn = elementId(favBtnID) || elementId('FAV:' + p_id);
        btn.classList.toggle("btnactive");
    }
};

const getCountLocalStoragesGifos = () => {
    return Object.keys(localStorage)
          .filter((e)=> e.substring(0,lsGIFOS.length)===lsGIFOS)
          .length;
};

const getCountLocalStoragesFavorites = () => {
    return Object.keys(localStorage)
          .filter((e)=> e.substring(0,lsGIFOS.length)!==lsGIFOS)
          .length;
};

const getLocalStoragesFavorites = () => {
    return Object.keys(localStorage)
          .filter((e)=> e.substring(0,lsGIFOS.length)!==lsGIFOS)
          .flatMap(ls=>JSON.parse(localStorage.getItem(ls)));
};

const getLocalStoragesGifos = () => {
    return Object.keys(localStorage)
          .filter((e)=> e.substring(0,lsGIFOS.length)===lsGIFOS)
          .flatMap(ls=>JSON.parse(localStorage.getItem(ls)));
};

const getInfoFavoritesGifos=(p_idx,p_typePage)=>{
    const array1= p_typePage==='mainFavorites'? (getLocalStoragesFavorites()): (getLocalStoragesGifos());
    
    const iterator=array1.keys();
    let keyLS;
    for(const key of iterator){
        
        if(p_idx===key){
            keyLS= p_typePage==='mainFavorites'? array1[key].id: (lsGIFOS+array1[key].id);
           break;
        }
    }
    const ls=getInfoFavorites(keyLS)
    return ls;
}

const getIndexLocalStorages=(p_key)=>{
    return Object.keys(localStorage).findIndex(item=> item===p_key);
}
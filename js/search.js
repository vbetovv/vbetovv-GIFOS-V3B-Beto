/* const handleGetSearchImgPrevNextOneByOne= async  (pageSearch,pageOffset)=>{
    let url = `${urlPrincipal}/search`
    let param = `&q=${pageSearch}&limit=1&offset=${pageOffset}`;
    const results= await  apiGiphy(url,param);
    console.log('handleGetSearchImgPrevNextOneByOne',results.data);
    return results.data;
} */

const handlerSearchAsync = async (pageSearch, pageOffset) => {

    let gridImg = elementId('search-trending-gifos');


    let url = `${urlPrincipal}/search`
    let param = `&q=${pageSearch}&limit=${pageLimit}&offset=${pageOffset}`;
    //const resSearch = await fetch(url);

    //await resSearch.json();
    const results = apiGiphy(url, param);
    results.then(res => {
            if (res.pagination.total_count === 0) {
                // ocultarVerMas(true);
                removeElementId('stg-grid');
                removeElementId('stg-btnvermas');

                clickCount = 0;
                let p_srcImg = 'images/icon-busqueda-sin-resultado.svg';
                gridImg.appendChild(f_searchNotFound(p_srcImg, 'Intenta con otra búsqueda.'));

            } else {
                if (pageOffset === 0) {
                    //ocultarVerMas(false);
                    removeElementId('img-notfound');
                    paginationTotalCount = res.pagination.total_count;
                }

                f_gridImg(res, pageOffset);
            }
        })
        .catch(error => {
            console.log(error);
        });

};



const handleAutocompleteSearch = (value) => {
    let url = `${urlPrincipal}/search/tags`;
    let param = `&q=${value}`;
    const autoSearch = apiGiphy(url, param);
    removeElementId('ul-autocomplete');
    removeElementId('sg-line-search');
    removeElementId('imgsearch-1');
    removeElementId('imgsearch-lupa');

    let sgContainerSearch = elementId('sg-container-search');
    let divSgLine = handleCreateElement('div', 'sg-line-search', 'sg-line-search');
    sgContainerSearch.appendChild(divSgLine);
    let ulTag = handleCreateElement('ul', 'ul-autocomplete', 'ul-autocomplete');
    let imgSearch = handleCrearImg('images/icon-search-1.svg', 'Lupa', 'Lupa', 'imgsearch-1', 'imgsearch-1', 'lupa');
    imgSearch.addEventListener('click', (e) => {
        let inputSearch = document.getElementById('gifos-header-search').value;
        handleKeyPressIntro(inputSearch);
        removeElementId('ul-autocomplete');
        removeElementId('sg-line-search');
        removeElementId('imgsearch-1');
        removeElementId('imgsearch-lupa');
        elementId('sg-container-search').appendChild(handleCreateImgSearchLupa());
    });

    sgContainerSearch.appendChild(imgSearch);
    
    autoSearch.then(res => res.data)
        .then(data => {

            removeElementId('li-autocomplete');
            for (result of data) {
                let liTag = handleCreateElement('li', 'li-autocomplete', 'li-autocomplete');
                imgSearch = handleCrearImg('images/icon-search-1.svg', result.name, 'Lupa', 'imgsearch', 'imgsearch', 'lupa', 0, 'mainAutocomplete');

                let aTag = handleCreateText('a', 'a-autocomplete', 'a-autocomplete', result.name);
                aTag.addEventListener('click', (e) => {
                    let textValue = e.target.text || e.target.alt || e.target.innerText;
                    handleKeyPressIntro(textValue);
                    removeElementId('ul-autocomplete');
                    removeElementId('sg-line-search');
                    removeElementId('imgsearch-1');
                    removeElementId('imgsearch-lupa');
                    elementId('sg-container-search').appendChild(handleCreateImgSearchLupa());
                    let inputSearch = document.getElementById('gifos-header-search');
                    inputSearch.value = textValue;
                });
                aTag.href = '#';
                aTag.appendChild(imgSearch);
                liTag.appendChild(aTag);
                ulTag.appendChild(liTag)
            };

            return data.length;
        })
        .then(length => {
            if (length === 0) {
                removeElementId('sg-line-search');
                removeElementId('imgsearch-1');
                removeElementId('imgsearch-lupa');
                elementId('sg-container-search').appendChild(handleCreateImgSearchLupa());
               console.log('handleAutocompleteSearch',length); 
            }
        })
        .catch(error => console.log(error));

    sgContainerSearch.appendChild(ulTag);
    return sgContainerSearch;
}


const handleKeyPressIntro = (value) => {

    let stgTitle = elementId('stg-title');
    stgTitle.innerHTML = value
    //document.getElementById('stg-title').innerHTML = values;
    let gridImg = elementId('stg-grid');
    let gridImgNotFound = elementId('img-notfound');
    if (gridImg !== null) gridImg.innerHTML = '';
    if (gridImgNotFound !== null) gridImgNotFound.innerHTML = '';

    handlerSearchAsync(value, 0);
};

const getGiphyID=(p_id)=>{
    let url = `${urlPrincipal}/`;
    let param = p_id;
    const gif=apiGiphy(url+param,'');
    gif.then( res=>res.data)
    .then(data=>  data)
    .catch(error => console.log(error));
    return gif;
}

const getTrendingSuggestions=()=>{
    const url = 'https://api.giphy.com/v1/trending/searches';
    return apiGiphy(url,'');
};

const getTrendingSuggestionsRnd= async (p_divCont)=>{
const quantity=5;
const idx=[0,10,15];
const i = Math.floor(Math.random() * 3);
const min=idx[i];
    try {
        const suggTrend= await  getTrendingSuggestions();
        const res= await suggTrend.data;
        let count=0;
         for(let data of res.slice(min,min+quantity)){
             count++; 
            
             let v_coma=(count===quantity)?'':', ';
             let aTrendSugg=handleCreateText('a','a-trending','a-trending',data+v_coma);
             aTrendSugg.addEventListener('click',(e)=>{
                 const str=e.target.innerHTML.trim();
                 const idx=str.indexOf(',',str.length-1);
                 const searchValue= (idx===-1)? str : str.substring(0,idx);
                 elementId('stg-title').innerHTML=searchValue;
                 removeElementId('stg-grid');
                removeElementId('stg-btnvermas');
                removeElementId('img-notfound');
                handlerSearchAsync(searchValue,0);
            },false);
            p_divCont.appendChild(aTrendSugg);
        } 
      
    } catch (error) {
        console.error(error);
    }
    
};


const getTrendingGifos = (p_id) => {
    const url = `${urlPrincipal}/trending`;
    const param = '&limit=50';

    const trending = apiGiphy(url, param);
    trending.then(res => res.data)
        .then(data => {
            let divTag = elementId(p_id);
            let ulTag = handleCreateElement('ul', 'ul-slider', 'ul-slider');
            ulTag.setAttribute('data-target', 'sliderUL');
            let paginas = 0;
            for (let img of data) {
                let liTag = handleCreateElement('li', 'li-slider', 'li-slider');
                liTag.setAttribute('data-slider', 'sliderFAV');
                paginas += 1;
                let classDataImage = new DataImage(img.id, img.images.original.url, img.title, img.title, img.username, paginas - 1, 'mainTrending');
                saveSessionStorage(classDataImage);
                let addImg = handleCrearImgComplete(img.images.original.url, img.title, img.title, img.id, 'gallery', img.username, paginas - 1, 'mainTrending');
                liTag.appendChild(addImg);
                ulTag.appendChild(liTag);
            }

            divTag.appendChild(ulTag);

            carouselImg();

            return divTag;

        })
        .catch(error => console.log(error));
};

const carouselImg = () => {
    const carousel = document.querySelector("[data-target='sliderUL']");
    const liSlider = carousel.querySelector("[data-slider='sliderFAV']");

    const carouselWidth = carousel.offsetWidth;

    const sliderStyle = liSlider.currentStyle || window.getComputedStyle(liSlider);
    const sliderMarginRight = Number(sliderStyle.marginRight.match(/\d+/g)[0]);

    const sliderCount = carousel.querySelectorAll("[data-slider='sliderFAV'").length;

    let offset = 0;
    const count = isMediaQuerieMobile() === true ? 1 : 3;

    const maxLimit = -((sliderCount / count) * carouselWidth +
        (sliderMarginRight * (sliderCount / count)) -
        carouselWidth - sliderMarginRight);


 

    if (isMediaQuerieMobile() === false) {
        const leftButton = document.querySelector("[data-action='slidePrev']");
        const rightButton = document.querySelector("[data-action='slideNext']");
        leftButton.addEventListener("click", () => {
            if (offset !== 0) {
                offset += carouselWidth + sliderMarginRight;
                carousel.style.transform = `translateX(${offset}px)`;
            }
        });

        rightButton.addEventListener("click", () => {
            if (offset >= maxLimit) {

                offset -= carouselWidth + sliderMarginRight;
                carousel.style.transform = `translateX(${offset}px)`;
            }
        });
    }
};
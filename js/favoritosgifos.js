const numPerPages = 12;
const getNumberOfPages = (p_count) => {
    const allPages = Math.ceil(p_count / numPerPages);
    return allPages
};


const createSectionFavorites = (favGifos) => {
    removeElementId('sec-create-gifos');
    let sectionTag = handleCreateElement('section', 'search-trending-gifos', 'search-trending-gifos');
    let imgGifosHeader;
    let h2Tag = handleCreateElement('h2', 'fav-title', 'fav-title');
    
    const countLocalStorage= favGifos==='GIFOS'? getCountLocalStoragesGifos():getCountLocalStoragesFavorites() ;
    if (favGifos==='GIFOS'){
        imgGifosHeader = handleCrearImg('images/icon-mis-gifos.svg', 'Mis GIFOS', 'Mis GIFOS', 'imgGifos', 'misGifos', 'misGifos');
        h2Tag.innerHTML = 'Mis GIFOS';
    }else{
        imgGifosHeader = handleCrearImg('images/icon-favoritos.svg', 'Favoritos', 'Favoritos', 'imgFavoritos', 'favorites', 'favorites');
        h2Tag.innerHTML = 'Favoritos';
    }

    let divStgGrid = handleCreateElement('div', 'stg-grid', 'stg-grid-favorites');
    let divStgBtnVerMas = handleCreateElement('div', 'stg-btnvermas', 'stg-btnvermas-favorites');
    sectionTag.appendChild(imgGifosHeader);
    sectionTag.appendChild(h2Tag);
    sectionTag.appendChild(divStgGrid);
    sectionTag.appendChild(divStgBtnVerMas);


    let mainTag = document.getElementById('main-gifos');
    if (mainTag === null) {
        removeElementId('foo-gifos');
        mainTag = handleCreateElement('main', 'main-gifos', 'main-gifos');
        let sectionTGS = handleSectionTrendingGifosSlide();
        let footerTag = handleFooter();
        contenedorPrincipal.appendChild(mainTag);
        contenedorPrincipal.appendChild(sectionTGS);
        contenedorPrincipal.appendChild(footerTag);
        getTrendingGifos('div-gallery');
    }

    mainTag.innerHTML = '';
    mainTag.appendChild(sectionTag);
    if (countLocalStorage === 0) {
        removeElementId('stg-grid-favorites');
        removeElementId('stg-btnvermas-favorites');
        let p_textNode;
        if (favGifos==='GIFOS'){
             p_textNode = '"¡Anímate a crear tu primer GIFO!';
        }else{
             p_textNode = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"';
        }
        sectionTag.appendChild(f_searchNotFound('images/icon-fav-sin-contenido.svg', p_textNode));
    } else {
        let divBtnTag = elementId('stg-btnvermas-favorites');
        const typePage=getTypePageGifosFavorites(favGifos);
        let pagination = handleCreateBtnPag(typePage);
        divBtnTag.appendChild(pagination);
        getFavorites('stg-grid-favorites', 'imgGrid', 1,typePage);
        setBtnPaginationActives(1);
    }
};



let handleMouseOver = (e) => {
    e.target.classList.toggle("btnHover");
};
let handleMouseOut = (e) => {
    e.target.classList.toggle("btnHover");
};

const handleCreateBtnPag = (p_typePage) => {
    
let countLocalStorage=0;
    p_typePage==='mainGifos'? (countLocalStorage=getCountLocalStoragesGifos()):(countLocalStorage=getCountLocalStoragesFavorites());
    

    let cantBtn = getNumberOfPages(countLocalStorage);

    let ulBtn = handleCreateElement('ul', 'ul-btn-pag', 'ul-btn-pag');
    ulBtn.setAttribute('data-target', 'cont-pagination');
    
    let liPrev = handleCreateElement('li', 'item-pag', 'item-pag');
    liPrev.setAttribute('data-target', 'item-pagination');
    let btnPrev = handleCreateElement('button', 'btn item-btn-pag', 'item-btn-page-prev');
    btnPrev.setAttribute('data-target', 'btn-pagination');
    btnPrev.innerHTML = '&lt';
    if (getMediaQuerie() === 'DESKTOP') {
        btnPrev.addEventListener('mouseover', handleMouseOver, false);
        btnPrev.addEventListener('mouseout', handleMouseOut, false);
    }

    btnPrev.addEventListener('click', (e) => {
        let idx = getBtnPaginationActivesIndex();
        idx -= 1
        idx === 0 ? 1 : idx;
        getFavorites('stg-grid-favorites', 'imgGrid', idx,p_typePage);
        setBtnPaginationActives(idx);
    }, false);

    liPrev.appendChild(btnPrev);

    let liNext = handleCreateElement('li', 'item-pag', 'item-pag');
    liNext.setAttribute('data-target', 'item-pagination');
    let btnNext = handleCreateElement('button', 'btn item-btn-pag', 'item-btn-page-next');
    btnNext.setAttribute('data-target', 'btn-pagination');
    btnNext.innerHTML = '&gt';
    if (getMediaQuerie() === 'DESKTOP') {
        btnNext.addEventListener('mouseover', handleMouseOver, false);
        btnNext.addEventListener('mouseout', handleMouseOut, false);
    }

    btnNext.addEventListener('click', (e) => {
        let idx = parseInt(getBtnPaginationActivesIndex());
        idx += 1;
        
        getFavorites('stg-grid-favorites', 'imgGrid', idx,p_typePage);
        setBtnPaginationActives(idx);
    }, false);

    liPrev.appendChild(btnPrev);
    ulBtn.appendChild(liPrev);
    for (let i = 0; i < cantBtn; i++) {
        let liBtn = handleCreateElement('li', 'item-pag', 'item-pag');
        liBtn.setAttribute('data-target', 'item-pagination');
        let btnPage = handleCreateElement('button', 'btn item-btn-pag', 'item-btn-page-' + i);
        btnPage.setAttribute('data-target', 'btn-pagination');
        btnPage.innerHTML = i + 1;
        if (getMediaQuerie() === 'DESKTOP') {
            btnPage.addEventListener('mouseover', handleMouseOver, false);
            btnPage.addEventListener('mouseout', handleMouseOut, false);
        }

        btnPage.addEventListener('click', (e) => {
            getFavorites('stg-grid-favorites', 'imgGrid', e.target.innerHTML,p_typePage);
            btnPage.classList.toggle("actives");
            unsetBtnPaginationActives(btnPage.id);
        });
        liBtn.appendChild(btnPage);
        ulBtn.appendChild(liBtn);
    }
    liNext.appendChild(btnNext);
    ulBtn.appendChild(liNext);
    return ulBtn;
};


const getTypePageGifosFavorites=(favGifos)=>{
return favGifos==='GIFOS'? 'mainGifos':'mainFavorites';
};


const getFavorites = (p_id, p_data_target, p_index_position,p_typePage) => {
    let gridImg = elementId(p_id);
    gridImg.innerHTML = '';
    
    let idxPos = (p_index_position * numPerPages) - numPerPages;
    let lengthLS = (p_index_position * numPerPages) - 1; // localStorage.length;
    
    for (let k = idxPos; k <= lengthLS; k++) {
        let res=getInfoFavoritesGifos(k,p_typePage);
        if(res===null) break;
        let addImg = handleCrearImgComplete(res.src, res.alt, res.title, res.id, p_data_target, res.user, k,  p_typePage );
        gridImg.appendChild(addImg);
    }
};


const unsetBtnPaginationActives = (p_id) => {
    return document.querySelectorAll("[data-target='btn-pagination']")
        .forEach((item) => {
            if (item.id !== p_id && (item.classList[3] === 'actives' || item.classList[2] === 'actives'))
                item.classList.remove("actives");
        });
};
const getBtnPaginationActivesIndex = () => {
    let idx
    document.querySelectorAll("[data-target='btn-pagination']").forEach((item) => {
        if (item.classList[3] === 'actives' || item.classList[2] === 'actives')
            idx = item.innerHTML;
    });
    return idx;
};

const setBtnPaginationActives = (p_id) => {
    return document.querySelectorAll("[data-target='btn-pagination']").forEach((item) => {
        if (p_id === parseInt(item.innerHTML)) {
            item.classList.toggle("actives");
            unsetBtnPaginationActives(item.id);
        }
    });
};



/*********************************************************/
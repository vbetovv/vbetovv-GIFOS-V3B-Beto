const lsGIFOS='GIFOS:';
class DataImage {
    constructor(id, src, alt, title, user, offset, typepage) {
        this.id = id;
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.user = user;
        this.offset = offset;
        this.typepage = typepage
    }
};
const f_gridImg = (datosJson, pagination) => {
    if (elementId('stg-grid') === null) handleSTGGRID();
    let gridImg = elementId('stg-grid');
    clickCount = clickCount + parseInt(datosJson.data.length);
    let paginas = pagination;
    for (let res of datosJson.data) {
        paginas += 1;
        let classDataImage = new DataImage(res.id, res.images.original.url, res.title, res.title, res.username, paginas - 1, 'mainSearch');
        saveSessionStorage(classDataImage);
        let imgGrid = handleCrearImgComplete(res.images.original.url, res.title, res.title, res.id, 'imgGrid', res.username, paginas - 1, 'mainSearch');
        gridImg.appendChild(imgGrid);
    }
    if (clickCount >= paginationTotalCount) ocultarVerMas(true);

};

const f_searchNotFound = (p_src, p_textNode) => {
    let divNotFound = handleCreateElement('div', 'img-notfound', 'img-notfound');
    let imagenGrid = handleCrearImg(p_src, 'Not Found', 'Not Found', 'imgNotFound', 'notFound', 'notfound', 0, 'notFound')
    let pTag = handleCreateText('p', 'notFound', 'notFound', p_textNode);
    divNotFound.appendChild(imagenGrid);
    divNotFound.appendChild(pTag);
    return divNotFound;
};


const handleCrearImgComplete = (p_src, p_alt, p_title, p_id, p_data_target, p_user, p_offset, p_typePage) => {
    let divGrid = handleCreateElement('figure', 'stg-container-img', 'stgConImg' + p_id);
    let imagenGrid = handleCrearImg(p_src, p_alt, p_title, p_id, p_data_target, p_user, p_offset, p_typePage);
    if (getMediaQuerie() === 'DESKTOP') {
        divGrid.addEventListener('mouseenter', (e) => {
            handleCreateButtonFDO(divGrid, p_data_target, p_id, p_user, p_title,p_src,p_typePage);
            divGrid.classList.add("imgHover");
        }, false);

        divGrid.addEventListener('mouseleave', (e) => {
            let divCBID = 'stgConBtn' + p_id;
            removeElementId(divCBID);
            divGrid.classList.remove("imgHover");
        }, false);
    }else{
        imagenGrid.addEventListener('click',(e)=>{
            return handleOpen('OPEN:'+p_id);
        },false);
    }
    divGrid.appendChild(imagenGrid);


    return divGrid;
};



/**********************DOWNLOAD**********************************/
const handleDownload = async (e) => {
    let a = document.createElement('a');
    let response = await fetch(e.target.dataset.downloadGif);
    let file = await response.blob();
    a.download = 'SebaCabGif.gif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click(); 
};




/*********************FAVORITOS***************************/
const handleFavorite = (e) => {
    e.classList.toggle("btnactive");
    let id = e.id;
    let btnSTGActive = document.getElementById(id);
    
    if (btnSTGActive.classList[3] === "btnactive"||btnSTGActive.classList[2] === "btnactive") {
        let imgData = document.getElementById(e.dataset.favoriteId);
        let classDataImage = new DataImage(e.dataset.favoriteId, imgData.src, imgData.alt, imgData.title, imgData.dataset.targetUsername, imgData.dataset.targetOffset, 'mainFavorites' /* imgData.dataset.typePage */ );
         saveLocalStorage(classDataImage);
    } else {
        removeLocalStorage(e.dataset.favoriteId);
        removeElementId('modal');
    }
};

/*************************************MODAL*********************/

/*********************BOTON OPEN***************************/
const handleOpen = (p_id) => {
    const OPEN = 'OPEN:';
    let v_key = p_id.substring(OPEN.length, p_id.length);
    let modalImg = getInfoFavorites(v_key);
    let imgModal = elementId(v_key);
    let dataImg = new DataImage(imgModal.id, imgModal.src, imgModal.alt, imgModal.title, imgModal.dataset.targetUsername, imgModal.dataset.targetOffset, imgModal.dataset.typePage);
    modalImg = dataImg;
    handleModal(modalImg, 'modalImage',imgModal.dataset.typePage);
};

const handleGetSearchImgPrevNextOneByOne = (typePageSearch, pageOffset) => {
    return JSON.parse(sessionStorage.getItem(typePageSearch + '-' + pageOffset));
}

const handleModalPrevNext = (offset, typeSearch, p_id, p_button) => {
    let img;

    switch (typeSearch) {
        case "mainSearch":
        case "mainTrending":
            img = handleGetSearchImgPrevNextOneByOne(typeSearch, offset);
            break;
        case "mainFavorites":
            let index = getIndexLocalStorages(p_id);
            p_button === 'Prev' ? index -= 1 : index += 1;
            const v_key = localStorage.key(index);
            img = JSON.parse(localStorage.getItem(v_key));
            break;
        default:
            break;
    }
    removeElementId('modal');
    handleModal(img, 'modalImage',typeSearch);
};

const handleModal = (p_modalImg, p_data_target,p_typePage) => {
    let divmodal = handleCreateElement('div', 'modal', 'modal')
    let divmodalContent = handleCreateElement('div', 'modal-content', 'modal-content');
    let divmodalHeader = handleCreateElement('div', 'modalHeader', 'modalHeader');
    let modalBtnClose = handleCreateElement('button', 'btnModalClose', 'btnModalClose');
    modalBtnClose.addEventListener('click', () => {
        removeElementId('modal');
    });

    let divPrev = handleCreateElement('div', 'modal-btnprev', 'modal-btnprev');
    let divNext = handleCreateElement('div', 'modal-btnnext', 'modal-btnnext');
    let btnPrev = handleCreateElement('button', 'btn btnmodalprev', 'btnprev');
    btnPrev.innerHTML = '&lt;'
    btnPrev.addEventListener('click', (e) => {
        let offsetPrev = parseInt(p_modalImg.offset) - 1;
        if (offsetPrev < 0) offsetPrev = 0;
        handleModalPrevNext(offsetPrev, p_modalImg.typepage, p_modalImg.id, 'Prev');
    });
    divPrev.appendChild(btnPrev);
    let btnNext = handleCreateElement('button', 'btn btnmodalnext', 'btnnext');
    btnNext.innerHTML = '&gt;'
    btnNext.addEventListener('click', (e) => {

        let offsetNext = parseInt(p_modalImg.offset) + 1;
        if (offsetNext < 0) offsetNext = 0;
        handleModalPrevNext(offsetNext, p_modalImg.typepage, p_modalImg.id, 'Next');
    });

    divNext.appendChild(btnNext);
    /***********CREO LA IMAGEN COMPLETA***********/

    let divmodalImg = handleCreateElement('div', 'modalImg', 'modalImg');

    let ImgFav = handleCrearImg(p_modalImg.src, p_modalImg.alt, p_modalImg.title, p_modalImg.id, p_data_target, p_modalImg.user, p_modalImg.offset, p_modalImg.typepage);
    divmodalHeader.appendChild(modalBtnClose);
    divmodalContent.appendChild(divmodalHeader);
    divmodalImg.appendChild(ImgFav);

    let divmodalCaption = handleCreateElement('div', 'modalCaption', 'modalCaption');
    let divMCText = handleCreateElement('div', 'modalCaption-text', 'modalCaption-text');
    let modalUser = handleCreateText('p', 'modalCaption-user', 'modalCaption-user', p_modalImg.user);
    let modalTitle = handleCreateText('p', 'modalCaption-title', 'modalCaption-title', p_modalImg.title);
    divMCText.appendChild(modalUser);
    divMCText.appendChild(modalTitle);
    let divMCButton = handleCreateElement('div', 'modalCaption-btn', 'MCB:' + p_modalImg.id);
    divMCButton.setAttribute('data-favorite-active', 'FAVOPEN:' + p_modalImg.id);
    let btnFavorite = btnFavoriteDelete(p_typePage,p_modalImg.id,true);/* handleBtnFavorite('FAVOPEN:' + p_modalImg.id);
        btnFavorite.setAttribute('data-favorite-id',p_modalImg.id); */

    let btnDownload = handleBtnDownload(p_modalImg.id); //handleCrearBtn('btn-principal btn-download', 'handleDownload(this)', 'DOWNLOAD:' + p_modalImg.id);
        btnDownload.setAttribute('data-download-gif',p_modalImg.src);
    divMCButton.appendChild(btnFavorite);
    divMCButton.appendChild(btnDownload);
    divmodalCaption.appendChild(divMCText);
    divmodalCaption.appendChild(divMCButton);


    /**************************************/

    divmodalContent.appendChild(divPrev);
    divmodalContent.appendChild(divmodalImg);
    divmodalContent.appendChild(divNext);
    divmodalContent.appendChild(divmodalCaption);

    divmodal.appendChild(divmodalContent);

    contenedorPrincipal.appendChild(divmodal);

    document.getElementsByClassName("modal")[0].style.display = "flex";
    getBookmark(divMCButton, p_modalImg.id);

};


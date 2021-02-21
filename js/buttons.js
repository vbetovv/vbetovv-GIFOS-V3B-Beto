const ocultarVerMas = (p_flag_ocultar) => {
    let btnSTG = elementId('stg-btnvermas');
    if (p_flag_ocultar) {
        btnSTG.style.visibility = 'hidden';
    } else {
        btnSTG.style.visibility = 'visible';
    }
};

const handlerVerMas = () => {
    pageOffsetInc = pageOffsetInc + pageLimit;
    
    const valuesSearch = elementId('stg-title').innerHTML;
    console.log(valuesSearch);
    handlerSearchAsync(valuesSearch, pageOffsetInc);
};

const btnFavoriteDelete=(p_typePage,p_id, isModal)=>{
    let btns;
    if(p_typePage==='mainGifos'){
        btns=handleBtnDelete(p_id);          
    }else{
        btns= (isModal===false)? handleBtnFavorite('FAV:' + p_id):handleBtnFavorite('FAVOPEN:' + p_id);
        btns.setAttribute('data-favorite-id',p_id);
    }
    return btns
};
const handleCreateButtonFDO = (divCont, p_data_target, p_id, p_username, p_title,p_url,p_typePage) => {
    let divCBID = 'stgConBtn' + p_id;
    removeElementId(divCBID);

    let divBtn = handleCreateElement('div', 'stg-buttons-fdoe', divCBID);
    divBtn.setAttribute('data-stgcont-btns', p_data_target + 'btn');
    divBtn.setAttribute('data-favorite-active', p_data_target + ':' + p_id);

    let btnFavDel=btnFavoriteDelete(p_typePage,p_id,false);
  
   
    let btnDownload = handleBtnDownload(p_id);
        btnDownload.setAttribute('data-download-gif',p_url);
    const btnOpen = handleBtnOpen(p_id);

    let username = handleCreateText('p', 'p-username', 'p-username', p_username);
    let title = handleCreateText('p', 'p-title', 'p-title', p_title);
    divBtn.appendChild(btnFavDel);
    divBtn.appendChild(btnDownload);
    divBtn.appendChild(btnOpen);
    divBtn.appendChild(username);
    divBtn.appendChild(title);
    divCont.appendChild(divBtn);
    getBookmark(divBtn, p_id);
};

const handleBtnOpen = (p_id) => {
    let btnOpen = handleCreateElement('button', 'btn-principal btn-open', 'OPEN:' + p_id);
    btnOpen.addEventListener('click', (e) => {
        return handleOpen(btnOpen.id)
    });
    return btnOpen;
};

const handleBtnDelete = (p_id) => {
    console.log(p_id);
    let btnDelete = handleCreateElement('button', 'btn-principal btn-delete', lsGIFOS + p_id);
    btnDelete.addEventListener('click', (e) => {
        removeLocalStorage(e.target.id);
        removeElementId('modal');
        createSectionFavorites('GIFOS');
    });
    return btnDelete;
};

const handleBtnDownload = (p_id) => {
    let btnDownload = handleCreateElement('button','btn-principal btn-download', 'DOWNLOAD:' + p_id);
    btnDownload.addEventListener('click', (e) => {
        return handleDownload(e)
    });
    return btnDownload;
};

const handleBtnFavorite = (p_id) => {
    let btnFavorite = handleCreateElement('button', 'btn-principal btn-favorite', p_id);
    btnFavorite.addEventListener('click', (e) => {
        return handleFavorite(btnFavorite)
    },false);
    if (getMediaQuerie() === 'DESKTOP') {
        btnFavorite.addEventListener('mouseover', (e) => {
            btnFavorite.classList.toggle("btn-favorite-hover");
        }, false);
        btnFavorite.addEventListener('mouseout', (e) => {
            btnFavorite.classList.toggle("btn-favorite-hover");
        }, false);
    }
    return btnFavorite;
};
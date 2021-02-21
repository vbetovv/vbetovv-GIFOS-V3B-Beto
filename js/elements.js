const elementId = (p_id) => {
    return document.getElementById(p_id);
};

const removeElementId = (p_id) => {
    let elementremove = elementId(p_id);
    if (elementremove != null) elementremove.remove();
};

const handleCreateText = (p_tag, p_class, p_id, p_text) => {
    let element = handleCreateElement(p_tag, p_class, p_id);
    let textNode = document.createTextNode(p_text);
    element.appendChild(textNode);
    return element;
};


const handleCreateElement = (p_tag, p_class, p_id, ) => {
    let element = document.createElement(p_tag);
    element.setAttribute('id', p_id);
    element.setAttribute('class', p_class);
    return element;
};



const handleCrearBtn = (p_class, p_event, p_id) => {
    let addbtn = document.createElement('button');
    addbtn.setAttribute('id', p_id);
    addbtn.setAttribute('class', p_class);
    addbtn.setAttribute('onclick', p_event);
    return addbtn
};

const handleCrearImg = (p_src, p_alt, p_title, p_id, p_data_target, p_user, p_offset,p_typePage) => {
    let imagenGrid = document.createElement('img');
    imagenGrid.setAttribute('id', p_id);
    imagenGrid.setAttribute('src', p_src);
    imagenGrid.setAttribute('data-target-img', p_data_target);
    imagenGrid.setAttribute('data-target-username', p_user);
    imagenGrid.setAttribute('data-target-offset', p_offset);
    imagenGrid.setAttribute('data-type-page', p_typePage);
    if (p_alt !== null) imagenGrid.alt = p_alt;
    if (p_title !== null) imagenGrid.title = p_title;
    return imagenGrid;
};

const getMediaQuerie=()=>{
 let res=(isMediaQuerieMobile()===true || isMediaQuerieTablet()===true) ? 'MOBILE':'DESKTOP';
return res;
};

const isMediaQuerieMobile=()=>{
   return mediaquerie=window.matchMedia("(min-width: 320px) and (max-width:767px)").matches;
};

const isMediaQuerieTablet=()=>{
    return mediaquerie=window.matchMedia("(min-width: 768px) and (max-width:1199px)").matches;
 };

 const isMediaQuerieDesktop=()=>{
    return mediaquerie=window.matchMedia("(min-width: 1200px)").matches;
 };



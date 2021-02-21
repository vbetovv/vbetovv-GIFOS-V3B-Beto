
const handleItemLi=()=>{
    return ['Modo Nocturno', 'Favoritos', 'Mis GIFOS'];
}

const handleNavToUpperDesktop=()=>{
    let arr=handleItemLi();
return arr.flatMap(el=>el.toUpperCase());
}

const handleNavMediaQuerie=()=>{
    let arr= handleNavToUpperDesktop();
    getMediaQuerie()==='DESKTOP'? arr.push('BOTON') : (arr=handleItemLi());
    return arr;
};


const handleNav = () => {
    const itemLI =handleNavMediaQuerie();
    const navHeader = handleCreateElement('nav', 'nav-gifos', 'nav-gifos');
    const menu = handleCrearItemLi(itemLI);
    navHeader.appendChild(menu);
    return navHeader;

}; 

const handleHeader = () => {
    let headerGifos = handleCreateElement('header', 'header-gifos', 'header-gifos');
    let divLogo = handleCreateElement('div', 'logo', 'logo');
    divLogo.addEventListener('click', (e) => {
        return handleCreateStartPage()
    });
    let divLogoTitle = handleCreateElement('div', 'logotitle', 'logotitle');
    let pGifos = handleCreateText('p', 'p-logo', 'p-logo', 'GIFOS');
    let navTag = handleNav();
    let divBurger = handleCreateElement('div', 'menuburger', 'menuburger');
   divBurger.addEventListener('click',(e)=>{
        let menu=elementId('nav-gifos');
        let divBurger=elementId('menuburger');
        if (menu.style.display===""||menu.style.display==="none")
        {
            divBurger.classList.add("menuClose");
            menu.style.display="grid";

        }else{
            divBurger.classList.remove("menuClose");
            menu.style.display="none";
        }
    },false);

    divLogoTitle.appendChild(pGifos);
    divLogo.appendChild(divLogoTitle);
    headerGifos.appendChild(divLogo);
    headerGifos.appendChild(navTag);
    headerGifos.appendChild(divBurger);
    return headerGifos;
};

const handleCrearItemLi = (arrayItem) => {
    let addul = handleCreateElement('ul', 'ul-gifos', 'ul-gifos');
    let lenArray = arrayItem.length;
    for (let i = 0; i < lenArray; i++) {
        let li = handleCreateElement('li', 'li-gifos', 'li-gifos-'+i);
        let a;
        if (arrayItem[i] === 'BOTON') {

            a = handleCreateElement('button', 'btn btn-create-gifos', 'btn-create-gifos');
            a.innerHTML = '+';
            a.addEventListener('click', () => {
                a.classList.toggle("activeGifos");
                handleCreateGIFOS();
            });

        } else {
            a = handleCreateText('a', 'a-gifos', 'a-gifos' + i, arrayItem[i]);
            a.href = '#';
            switch (i) {
                case 0:
                    a.addEventListener('click', (e)=>{
                        let bodydark=document.body.classList;
                        if(a.innerHTML.toUpperCase()==='MODO NOCTURNO'){
                            getMediaQuerie()==='DESKTOP'? (a.innerHTML='MODO DIURNO'):(a.innerHTML='Modo Diurno');
                            bodydark.remove('theme-dark');
                            bodydark.remove('theme-light');
                            bodydark.add('theme-dark');

                        }else{
                            getMediaQuerie()==='DESKTOP'? (a.innerHTML='MODO NOCTURNO'):(a.innerHTML='Modo Nocturno');
                            bodydark.remove('theme-dark');
                            bodydark.remove('theme-light');
                            bodydark.add('theme-light');
                        }
                    });            
                    break;
                case 1:
                    
                    a.addEventListener('click', (e)=> {
                        
                        createSectionFavorites('FAV');
                        a.classList.toggle('navActives');
                    },false); 
                    break;
                case 2:
                    a.addEventListener('click', (e)=>{
                        createSectionFavorites('GIFOS')},false);            
                        
                    break;

                default:
                    break;
            }
        }

        li.appendChild(a);
        addul.appendChild(li);
    }
    return addul;
};





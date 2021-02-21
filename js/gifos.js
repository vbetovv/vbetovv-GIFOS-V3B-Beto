"use strict";
let cronometro;
let streamCamera;
let form;
let hours = `00`,
    minutes = `00`,
    seconds = `00`;

let recorder;

/*******************************CREAR GIFOS**************************************/

const handleActionButtonGifos = (action) => {
    let btnvideo1 = elementId('btnvideo1');
    let btnvideo2 = elementId('btnvideo2');
    let btnvideo3 = elementId('btnvideo3');
    switch (action) {
        //Activa el boton 1 y habilita el botón 2
        case 'C1':
            btnvideo1.classList.toggle("actives");
            btnvideo2.disabled = false;
            btnvideo2.addEventListener('click', () => {
                getStreamVideo();
            }, false);
            break;
            //Habilita el botón 1 y Activa el botón 2, se agrega el evento click llamando handleCreateGIFOS
        case 'V2':
            if (btnvideo2.classList[2] !== 'actives') {
                btnvideo1.classList.toggle("actives");
                btnvideo2.classList.toggle("actives");
            }

            btnvideo1.disabled = false;
            btnvideo1.addEventListener('click', () => {
                handleCreateGIFOS();
            }, false);

            btnvideo2.disabled = true;
            break;
        case 'Grabar':

            btnvideo1.addEventListener('click', () => {
                handleStartVideo('Grabar');
            }, false);

            break
        case 'SubirGifo':
            btnvideo2.classList.toggle("actives");
            btnvideo3.classList.toggle("actives");
            break;

        default:
            break;
    }
};

const handleCreateGIFOS = () => {
    removeElementId('sec-create-gifos');
    removeElementId('main-gifos');
    removeElementId('sec-tgs');
    removeElementId('foo-gifos');
    let sectionGifos = handleCreateElement('section', 'sec-create-gifos', 'sec-create-gifos');
    let divImgCam = handleCreateElement('div', 'div-img-cam', 'div-img-cam');
    let divImgCon = handleCreateElement('div', 'div-img-container', 'div-img-container');

    let divVideoCont = handleCreateElement('div', 'div-video-container', 'div-video-container');
    let divVideo = handleCreateElement('div', 'div-video-gifos', 'div-video-gifos');
    divVideoCont.appendChild(divVideo);
    let p_text = "Aquí podrás crear tus propios ";
    let textVideo = handleCreateText('h1', 'h1-video', 'h1-video', p_text);
    divVideo.appendChild(textVideo);
    p_text = "¡Crea tu GIFO en sólo 3 pasos! (sólo necesitas una cámara para grabar un video)";
    textVideo = handleCreateText('p', 'p-video', 'p-video', p_text);
    divVideo.appendChild(textVideo);
    let divImgCam2 = handleCreateElement('div', 'div-img-cam2', 'div-img-cam2');
    let divBotones = handleCreateElement('div', 'div-botones', 'div-botones');
    let divline = handleCreateElement('div', 'div-line-gifos', 'div-line-gifos');
    let divbtnVideoAct = handleCreateElement('div', 'div-btnvideo-gifos', 'div-btnvideo-gifos');
    let addImg;

    addImg = handleCrearImg('images/camara.svg', 'Cámara', 'Cámara', 'imgCam', 'camara', '');
    divImgCam.appendChild(addImg);
    addImg = handleCrearImg('images/element-luz-camara.svg', 'Cámara', 'Cámara', 'luzImgCam', 'luzCam', '');

    divImgCam.appendChild(addImg);
    divImgCon.appendChild(divImgCam);

    addImg = handleCrearImg('images/pelicula.svg', 'Cámara', 'Cámara', 'imgCam2', 'camara', '');
    divImgCam2.appendChild(addImg);

    let botonera = handleCreateElement('div', 'botoneraGifos', 'botoneraGifos')
    let btns = handleCreateElement('button', 'btn btnvideo', 'btnvideo1');
    btns.innerHTML = '1';
    btns.disabled = true
    botonera.appendChild(btns);
    btns = handleCreateElement('button', 'btn btnvideo', 'btnvideo2');
    btns.innerHTML = '2';
    btns.disabled = true;
    botonera.appendChild(btns);
    btns = handleCreateElement('button', 'btn btnvideo', 'btnvideo3');
    btns.innerHTML = '3';
    btns.disabled = true;
    botonera.appendChild(btns);
    divBotones.appendChild(botonera);

    btns = handleCreateElement('button', 'btn btnvermas', 'btnvideoact');
    btns.innerHTML = 'COMENZAR';
    btns.addEventListener('click', (e) => {
        handleStartVideo(btns);
    }, false);
    divbtnVideoAct.appendChild(btns);
    sectionGifos.appendChild(divImgCon);
    sectionGifos.appendChild(divVideoCont);
    sectionGifos.appendChild(divImgCam2);
    sectionGifos.appendChild(divBotones);
    sectionGifos.appendChild(divline);
    sectionGifos.appendChild(divbtnVideoAct);
    contenedorPrincipal.appendChild(sectionGifos)
    contenedorPrincipal.appendChild(handleFooter());
};


const getStreamAndRecord = (evt) => {
    removeElementId(evt.id)
    let addBtnSave = elementId('div-btnvideo-gifos');
    let pTagCron = handleCreateElement('div', 'pcronometro', 'pcronometro'); // handleCreateText('p', 'pcronometro', 'pcronometro', '00:00:00');
    pTagCron.textContent = '00:00:00'
    elementId('div-botones').appendChild(pTagCron);



    let btns = btnFinalizar();

    addBtnSave.appendChild(btns);

    startRecording();

};

const btnFinalizar = () => {
    let addBtnSave = elementId('div-btnvideo-gifos');
    let btns = handleCreateElement('button', 'btn btnvermas', 'btnvideofinalizar');
    btns.innerHTML = 'FINALIZAR';
    btns.addEventListener('click', (e) => {
        //handleActionButtonGifos('Finalizar');
        stopRecording();
        removeElementId('pcronometro');
        removeElementId('btnvideofinalizar');
        let btns = btnSubirGifo();

        addBtnSave.appendChild(btns);

        let aRepCap = repetirCaptura();
        elementId('div-botones').appendChild(aRepCap);

    });
    return btns;
};

/* GIF SUBIDOS
NOBGa4aL54rkHkbqhv
kZBkoNchvpPI9qkETX
KUlCDPQe5RauBB9JV6
*/
const btnSubirGifo = () => {
    let btns = handleCreateElement('button', 'btn btnvermas', 'btnvideosubirgifo');
    btns.innerHTML = 'SUBIR GIFO';
    btns.addEventListener('click', (e) => {
        if (recorder) {
            recorder.destroy;
            recorder = null;
        }
        uploadGifoText('images/loader.svg', 'Estamos subiendo tu GIFO.')
        removeElementId('repetircaptura');
        elementId('sec-create-gifos-canvas').classList.toggle("sec-create-gifos-canvas-up");

  /*           const gifs=getGiphyID('kZBkoNchvpPI9qkETX');
            gifs.then(result=> result.data)
            .then(res=>{
                let classDataImage = new DataImage(res.id, res.images.original.url, res.title, res.title, res.username, 0, 'mainGifos');
                saveLocalStorageGifos(classDataImage);
                uploadGifoText('images/ok.svg','GIFO subido con éxito.');
                let btnDownload=btnDownloadGifos(res.id);
                btnDownload.setAttribute('data-download-gif',res.images.original.url);
                elementId('sec-create-gifos-canvas-div').appendChild(btnDownload);
                elementId('sec-create-gifos-canvas-div').appendChild(handleBtnCopyUrl(res.id,res.images.original.url));
                removeElementId('btnvideosubirgifo');
            })
            .catch(error=> console.log(error));   */

         apiGiphyUpload(form)
            .then(res => {
                console.log('btnSubirGifo', res.data.id);
                getGiphyID(res.data.id);
                handleActionButtonGifos('SubirGifo');
                const gifs = getGiphyID(res.data.id);
                gifs.then(result => result.data)
                    .then(res => {
                        let classDataImage = new DataImage(res.id, res.images.original.url, res.title, res.title, res.username, 0, 'mainGifos');
                        saveLocalStorageGifos(classDataImage);
                        uploadGifoText('images/ok.svg', 'GIFO subido con éxito.');
                        let btnDownload = btnDownloadGifos(res.id);
                        btnDownload.setAttribute('data-download-gif', res.images.original.url);
                        elementId('sec-create-gifos-canvas-div').appendChild(btnDownload);
                        elementId('sec-create-gifos-canvas-div').appendChild(handleBtnCopyUrl(res.id, res.images.original.url));
                        removeElementId('btnvideosubirgifo');
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error)); 


    });
    console.log('RETORNA');
    return btns;
};


const handleBtnCopyUrl = (p_id, p_url) => {
    let btnCopyUrl = handleCreateElement('button', 'btn-principal btn-copy-url', 'COPYURL:' + p_id);
    btnCopyUrl.setAttribute('data-copy-url', p_url);
    btnCopyUrl.addEventListener('click', (e) => {
        const copyurl=btnCopyUrl.dataset.copyUrl
        let auxcp=handleCreateText('textarea','txtcp','txtcp',copyurl);
        document.body.appendChild(auxcp);
        auxcp.select();
        document.execCommand("copy");
        removeElementId('txtcp');
    });
    return btnCopyUrl;
};

const btnDownloadGifos = (p_id) => {
    return handleBtnDownload(p_id);
};

const uploadGifoText = (p_src, p_text) => {
    removeElementId('imgLoadOk');
    removeElementId('p-gifos');
    let divCanvas = elementId('sec-create-gifos-canvas-div');
    const imgload = handleCrearImg(p_src, 'loadOK', 'loadOK', 'imgLoadOk', '', '', 0, 'createGifos');
    const textGifos = handleCreateText('p', 'p-gifos', 'p-gifos', p_text);
    divCanvas.appendChild(imgload);
    divCanvas.appendChild(textGifos);
};


const repetirCaptura = () => {
    let aRepCap = handleCreateText('a', 'repetircaptura', 'repetircaptura', 'REPETIR CAPTURA');
    aRepCap.addEventListener('click', (e) => {
        removeElementId('repetircaptura');
        recorder.reset;
        getStreamVideo();
    }, false);
    return aRepCap;
};
const getStreamVideo = () => {
    const constraint = {
        'video': {
            width: {
                max: 480
            },
            height: {
                max: 320
            }
        },
        'audio': false
    };
    navigator.mediaDevices.getUserMedia(constraint)
        .then(stream => {
            streamCamera = stream;
            createSecVideos(streamCamera);
            let addBtnSave = elementId('div-btnvideo-gifos');
            let btns = btnGrabar();
            addBtnSave.appendChild(btns);
            handleActionButtonGifos('V2');
        })
        .catch(err => {
            console.log('ERROR MediaStream', err);
        });

};

const createSecVideos = (stream) => {
    removeElementId('h1-video');
    removeElementId('p-video');
    removeElementId('btnvideosubirgifo');
    removeElementId('btnvideosave');
    removeElementId('sec-create-gifos-videos');
    removeElementId('sec-create-gifos-canvas-cont');
    let video = elementId('div-video-gifos');
    let addVideo = handleCreateElement('video', 'sec-create-gifos-videos', 'sec-create-gifos-videos');

    addVideo.srcObject = stream;
    addVideo.play();
    video.appendChild(addVideo);
}

const createCanvasTag = () => {
    const divCanvas = handleCreateElement('div', 'sec-create-gifos-canvas-cont', 'sec-create-gifos-canvas-cont');
    const canvas = handleCreateElement('canvas', 'sec-create-gifos-canvas', 'sec-create-gifos-canvas');
    const divCan = handleCreateElement('div', 'sec-create-gifos-canvas-div', 'sec-create-gifos-canvas-div');
    divCanvas.appendChild(canvas);
    divCanvas.appendChild(divCan);
    return divCanvas;
};

const captureVideoInCanvas = () => {
    let video = elementId('div-video-gifos');
    video.appendChild(createCanvasTag());
    let canvasCTX = elementId('sec-create-gifos-canvas').getContext('2d');
    let videoCTX = elementId('sec-create-gifos-videos');
    canvasCTX.drawImage(videoCTX, 0, 0, 320, 160);
    removeElementId('sec-create-gifos-videos');
};

const btnGrabar = () => {
    let btns = handleCreateElement('button', 'btn btnvermas', 'btnvideosave');
    btns.innerHTML = 'GRABAR';
    btns.addEventListener('click', (e) => {
        handleActionButtonGifos('Grabar');
        getStreamAndRecord(btns);
    });
    return btns;
}

const handleStartVideo = (p_btn) => {
    removeElementId('h1-video');
    removeElementId('p-video');
    let video = elementId('div-video-gifos');
    let p_text = "¿Nos das acceso a tu cámara? ";
    let textVideo = handleCreateText('h2', 'h1-video', 'h1-video', p_text);
    video.appendChild(textVideo);
    p_text = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    textVideo = handleCreateText('p', 'p-video', 'p-video', p_text);
    video.appendChild(textVideo);
    navigator.mediaDevices.getUserMedia({
        'video': true
    }).then(stream => {
        console.log(stream);
        if (p_btn === 'Grabar') {
            removeElementId('btnvideoact');
        } else {
            p_btn.remove();
        }
        handleActionButtonGifos('C1');
        getStreamVideo();
    })
    .catch(e=> {
        handleCreateGIFOS();
        console.log(e);
    });
}



let getCronometroInit = () => {
    seconds++;
    if (seconds < 10) seconds = `0` + seconds
    if (seconds > 59) {
        seconds = `00`
        minutes++

        if (minutes < 10) minutes = `0` + minutes
    }

    if (minutes > 59) {
        minutes = `00`
        hours++

        if (hours < 10) hours = `0` + hours
    }

    let pTagCron = elementId('pcronometro');
    pTagCron.textContent = `${hours}:${minutes}:${seconds}`;
};

const stopCronometro = () => {


    hours = `00`;
    minutes = `00`;
    seconds = `00`;
    clearInterval(cronometro);
}


const startRecording = () => {

    recorder = RecordRTC(streamCamera, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: () => {
            console.log('Comienza la grabación')
        }
    });

    recorder.startRecording();
    cronometro = setInterval(getCronometroInit, 1000);

};

const stopRecording = () => {
    stopCronometro();
    recorder.stopRecording(() => {
        form = new FormData();
        form.append('file', recorder.getBlob(), 'SebaCabGif.gif');
        console.log('stopRecording', form.get('file'));

    });
    captureVideoInCanvas();
};
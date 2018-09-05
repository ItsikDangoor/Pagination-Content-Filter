let log = console.log;


function constructBlockHTML(arrObjElements) {
    let html = '';
    let arrParentsElm = [];
    for(let i = 0; i < arrObjElements.length; i += 1) {
        /*for(let j = 0; j < Object.keys(arrObjElements[i]).length; j += 1) {
            log(Object.entries(arrObjElements[i])[j]);
        }*/

        /*for(let prop in arrObjElements[i]) {
            html += `<${prop}>`;
            html += `${arrObjElements[i][prop]}`;
        }*/

        html += `<${arrObjElements[i].element}`;
        for(let j = 0 ; j < arrObjElements[i].attributes.length; j += 2) {
            html += ` ${arrObjElements[i].attributes[j]}="${arrObjElements[i].attributes[j + 1]}"`;
        }
        html += `>`;
        if(arrObjElements[i].textContent === '') {
            html += '\n';
        }
        html += `${arrObjElements[i].textContent}`;

        if(arrObjElements[i].isElmParentNextElm && arrObjElements[i].isElmLastChildParentElm) {
            arrParentsElm.push(`</${arrObjElements[i].element}>`);
        } else if(arrObjElements[i].isElmParentNextElm === false &&
            arrObjElements[i].isElmLastChildParentElm === true &&
            arrObjElements[i].isElmLastChildInTree === true) {
            html += `</${arrObjElements[i].element}>`;
            html += '\n';
            html += `${arrParentsElm.pop()}`;
            html += '\n';
            //html += 'entered if--2';
        } else if(arrObjElements[i].isElmParentNextElm === false && arrObjElements[i].isElmLastChildParentElm === true) {
            html += `</${arrObjElements[i].element}>`;
            html += '\n';
            html += `</${arrObjElements[i - 1].element}>`;
            html += '\n';
            //html += 'entered if--2';
        } else if(arrObjElements[i].isElmParentNextElm === false && arrObjElements[i].isElmLastChildParentElm === false) {
            html += `</${arrObjElements[i].element}>`;
            html += '\n';
            //html += `</${arrObjElements[i - 1].element}>`;
        }
        //log('--------');
    }

    html += '\n--P--\n';
    for(let i = arrParentsElm.length - 1; i >= 0 ; i -= 1) {
        html += arrParentsElm[i];
        html += '\n';
    }
    log(html);
}


//=====================================================================================================================
//let log = console.log;

/*log("*********************************");
log(userListStructure);
log("---------");*/

function constructBlockHTML(arrObjElements) {
    let html = '';
    let arrParentsElm = [];
    let element;
    for(let i = 0; i < arrObjElements.length; i += 1) {
        element = arrObjElements[i];
        html += `<${element.element}`;

        for(let attribute in element.attributes) {
            html += ` ${attribute}="${element.attributes[attribute]}"`;
        }
        html += `>`;

        if(element.textContent === '') {
            html += '\n\t';
            if(element.isElmParentNextElm) {
                //html += '\t';
            }
        }
        html += `${element.textContent}`;

        if(element.isElmParentNextElm && element.isElmLastChildParentElm) {
            arrParentsElm.push(`</${element.element}>`);
        } else if(element.isElmParentNextElm === false &&
            element.isElmLastChildParentElm === true &&
            element.isElmLastChildInTree === true) {
            if(element.isEmptyElm === false) {
                html += `</${element.element}>`;
            }
            html += '\n';
            html += `${arrParentsElm.pop()}`;
            html += '\n';
        } else if(element.isElmParentNextElm === false &&
            element.isElmLastChildParentElm === true) {
            if(element.isEmptyElm === false) {
                html += `</${element.element}>`;
            }
            html += '\n';
            html += `</${arrObjElements[i - 1].element}>`;
            html += '\n';
        } else if(element.isElmParentNextElm === false &&
            element.isElmLastChildParentElm === false &&
            element.isEmptyElm === false) {
            html += `</${element.element}>`;
            html += '\n';
        }
    }

    //html += '\n--P--\n';
    //Adding the closing elements tags at the end of the tree block,
    //starting from the outer most tag and closing in to the tree parent element.
    for(let i = arrParentsElm.length - 1; i >= 0 ; i -= 1) {
        html += arrParentsElm[i];
        html += '\n';
    }
    log(html);
    return html;
}


constructBlockHTML(searchHTMLToConstruct2);
log('*********');
constructBlockHTML(searchHTMLToConstruct);
log('*********');
constructBlockHTML(paginationHTMLToConstruct);

log('*********');
let paginationBar = constructBlockHTML(paginationHTMLToConstruct);
let ul = document.getElementsByClassName('student-list');
let arrLi = ul[0].getElementsByTagName('li');
log(arrLi);
//arrLi[arrLi.length-1].appendChild(paginationBar);


/*
function constructListOfUsers(arrObjUsersDetails) {
    let html = '';
    for(let i = 0; i < arrObjUsersDetails.length; i += 1) {
        let user = arrObjUsersDetails[i];
        //user.registered.date structure: YYYY-MM-DDTHH:MM:SSZ
        let date = user.registered.date.split('-');
        date[0] = date[0].substring(2);//only two digits for year
        date[2] = date[2].split('T');
        date[2] = date[2][0];//only the day

        html += `<li class="student-item cf">\n\t`;
        html += `<div class="student-details">\n\t\t`;
        html += `<img class="avatar" src="${user.picture.thumbnail}">\n\t\t`;
        html += `<h3>${user.name.first} ${user.name.last}</h3>\n\t\t`;
        html += `<span class="email">${user.email}</span>\n\t</div>\n\t`;
        html += `<div class="joined-details">\n\t\t`;
        //date structure: MM/DD/YY
        html += `<span class="date">Joined ${date[1]}/${date[2]}/${date[0]}</span>\n\t`;
        html += `</div>\n</li>\n`;
    }
    log(html);
}

log("---------");
constructListOfUsers(listOfUsersDetails);
log("---------");
*/
















function injectDataInUserListArrObjs(data, userLiStructureModule) {
    let usersList = [];//userListStructure;
    //let userListstructureModel = userListStructure;

    //log(data);

    log('---- User List Structure Module----');
    log(userLiStructureModule.length);
    log(userLiStructureModule);
    for(let i = 0; i < data.length; i += 1) {
        let dataUser = data[i];
        /*log('/!*!/!*!/!*!/!*!/!*!/!*!/!*!/!*');*/
        log(dataUser);
        let userLi = userLiStructureModule;
        log('---- User LI Before----');
        log(userLi);
        //user.registered.date structure: YYYY-MM-DDTHH:MM:SSZ
        /*let joinedDate = dataUser.registered.date.split('-');
        joinedDate[0] = joinedDate[0].substring(2);//only two digits for year
        joinedDate[2] = joinedDate[2].split('T');
        joinedDate[2] = joinedDate[2][0];//only the day
*/
        userLi[2].attributes.src = dataUser.picture.thumbnail;
        userLi[3].textContent = `${dataUser.name.first} ${dataUser.name.last}`;
        userLi[4].textContent = dataUser.email;
        //date structure: MM/DD/YY
        //userLi[6].textContent = `Joined ${joinedDate[1]}/${joinedDate[2]}/${joinedDate[0]}`;

        log('---- User LI After----');
        log(userLi);
        usersList.push(userLi);
        //userLi = null;

    }
    log('---- Users list finished----');
    log(usersList);
    return usersList;
}

/*
//constructBlockHTML(userListStructure);
log("--------- Before Sending to function user list structure --------");
log(userListStructure);
log("---------");
//let usersList = injectDataInUserListArrObjs(listOfUsersDetails, userListStructure);
log("---------");
//log(usersList);
log("---------");
*/


//=====================================================================================================================
function injectDataInUserListArrObjs_withLogs(data, userListStructureModule) {
    let usersList = [];

    log('---- User List Structure Module----');
    log(userListStructureModule.length);
    log(userListStructureModule);
    for(let i = 0; i < data.length; i += 1) {
        let tempCopyDataUser = data.slice()[i];
        let dataUser = Object.assign({}, tempCopyDataUser);
        log(dataUser);

        //let userLi = userListStructureModule.slice();

        //let tempObjCopy = userListStructureModule.slice();
        //let userLi = Object.assign({}, tempObjCopy);

        /*let tempObjCopy = userListStructureModule.slice();
        let userLi = tempObjCopy.slice();*/

        //var clonedArray = JSON.parse(JSON.stringify(nodesArray))
        let userLi = JSON.parse(JSON.stringify(userListStructureModule));

        log('---- User LI Before----');
        log(userLi);
        //user.registered.date structure: YYYY-MM-DDTHH:MM:SSZ
        let joinedDate = dataUser.registered.date.split('-');
        joinedDate[0] = joinedDate[0].substring(2);//only two digits for year
        joinedDate[2] = joinedDate[2].split('T');
        joinedDate[2] = joinedDate[2][0];//only the day

        userLi[2].attributes.src = dataUser.picture.thumbnail;
        userLi[3].textContent = `${dataUser.name.first} ${dataUser.name.last}`;
        userLi[4].textContent = dataUser.email;
        //date structure: MM/DD/YY
        userLi[6].textContent = `Joined ${joinedDate[1]}/${joinedDate[2]}/${joinedDate[0]}`;

        log('---- User LI After----');
        log(userLi);
        usersList.push(userLi);

        //userLi = null;

    }
    log('---- Users list finished----');
    log(usersList);
    return usersList;
}



function injectDataInUserListArrObjs2(data, userListStructureModule) {
    let usersList = [];//userListStructure;
    //let userListstructureModel = userListStructure;

    //log(data);

    log('---- User List Structure Module----');
    log(userListStructureModule.length);
    log(userListStructureModule);
    for(let i = 0; i < data.length; i += 1) {
        //let dataUser = data.slice()[i];
        let tempCopyDataUser = data.slice()[i];
        let dataUser = Object.assign({}, tempCopyDataUser);
        log(dataUser);

        //let userLi = userListStructureModule.slice();

        //let tempObjCopy = userListStructureModule.slice();
        //let userLi = Object.assign({}, tempObjCopy);

        /*let tempObjCopy = userListStructureModule.slice();
        let userLi = tempObjCopy.slice();*/


        //var clonedArray = JSON.parse(JSON.stringify(nodesArray))
        //let userLi = JSON.parse(JSON.stringify(userListStructureModule));
        //OR
        let userLi = copyByValueArrayOfObjects(userListStructureModule);

        log('---- User LI Before----');
        log(userLi);
        //user.registered.date structure: YYYY-MM-DDTHH:MM:SSZ
        let joinedDate = dataUser.registered.date.split('-');
        joinedDate[0] = joinedDate[0].substring(2);//only two digits for year
        joinedDate[2] = joinedDate[2].split('T');
        joinedDate[2] = joinedDate[2][0];//only the day

        userLi[2].attributes.src = dataUser.picture.thumbnail;
        userLi[3].textContent = `${dataUser.name.first} ${dataUser.name.last}`;
        userLi[4].textContent = dataUser.email;
        //date structure: MM/DD/YY
        userLi[6].textContent = `Joined ${joinedDate[1]}/${joinedDate[2]}/${joinedDate[0]}`;

        log('---- User LI After----');
        log(userLi);
        usersList.push(userLi);

        //userLi = null;

    }
    log('---- Users list finished----');
    log(usersList);
    return usersList;
}

//=====================================================================================================================




























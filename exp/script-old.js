//let log = console.log;

/*log("*********************************");
log(userListStructure);
log("---------");*/

function constructBlockHTML(arrObjElements) {
    let html = '';
    let arrParentsElm = [];
    let elementModule;
    let element;
    for(let i = 0; i < arrObjElements.length; i += 1) {
        elementModule = arrObjElements[i];

        //html += `<${elementModule.element}`;
        element = document.createElement(elementModule.element);


        for (let attribute in elementModule.attributes) {
            //html += ` ${attribute}="${elementModule.attributes[attribute]}"`;
            element.setAttribute(attribute, elementModule.attributes[attribute]);
        }
        //html += `>`;

        /*if(elementModule.textContent === '') {
            html += '\n\t';
            if(elementModule.isElmParentNextElm) {
                //html += '\t';
            }
        }*/

        //html += `${elementModule.textContent}`;
        element.textContent = elementModule.textContent;

        /*
                if(elementModule.isElmParentNextElm && elementModule.isElmLastChildParentElm) {
                    arrParentsElm.push(`</${elementModule.element}>`);
                } else if(elementModule.isElmParentNextElm === false &&
                                elementModule.isElmLastChildParentElm === true &&
                                elementModule.isElmLastChildInTree === true) {
                    if(elementModule.isEmptyElm === false) {
                        html += `</${elementModule.element}>`;
                    }
                    html += '\n';
                    html += `${arrParentsElm.pop()}`;
                    html += '\n';
                } else if(elementModule.isElmParentNextElm === false &&
                                elementModule.isElmLastChildParentElm === true) {
                    if(elementModule.isEmptyElm === false) {
                        html += `</${elementModule.element}>`;
                    }
                    html += '\n';
                    html += `</${arrObjElements[i - 1].element}>`;
                    html += '\n';
                } else if(elementModule.isElmParentNextElm === false &&
                            elementModule.isElmLastChildParentElm === false &&
                            elementModule.isEmptyElm === false) {
                    html += `</${elementModule.element}>`;
                    html += '\n';
                }
            }*/
        /*if(elementModule.isElmParentNextElm && elementModule.isElmLastChildParentElm) {
            arrParentsElm.push(`</${elementModule.element}>`);
        } else */ if(elementModule.isElmParentNextElm === false &&
            elementModule.isElmLastChildParentElm === true) { /*&&
            elementModule.isElmLastChildInTree === true) {*/
            /*if(elementModule.isEmptyElm === false) {
                html += `</${elementModule.element}>`;
            }
            html += '\n';
            html += `${arrParentsElm.pop()}`;
            html += '\n';*/
            log(element);
            let elmParentNode = element.parentNode;
            log(elmParentNode);
            elmParentNode.appendChild(element);
        } else if(elementModule.isElmParentNextElm === false &&
            elementModule.isElmLastChildParentElm === true) {
            if(elementModule.isEmptyElm === false) {
                html += `</${elementModule.element}>`;
            }
            html += '\n';
            html += `</${arrObjElements[i - 1].element}>`;
            html += '\n';
        } else if(elementModule.isElmParentNextElm === false &&
            elementModule.isElmLastChildParentElm === false &&
            elementModule.isEmptyElm === false) {
            html += `</${elementModule.element}>`;
            html += '\n';
        }
    }
    //html += '\n--P--\n';
    //Adding the closing elements tags at the end of the tree block,
    //starting from the outer most tag and closing in to the tree parent element.
    /*for(let i = arrParentsElm.length - 1; i >= 0 ; i -= 1) {
        html += arrParentsElm[i];
        html += '\n';
    }
    log(html);
    return html;*/

    log(element);
    return element;
}

/*
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

*/



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





function copyByValueArrayOfObjects(arrObjs) {
    let copyArrObjs = [];
    for(let i = 0; i < arrObjs.length; i += 1) {
        let tempObjCopy = arrObjs.slice()[i];
        let obj = Object.assign({}, tempObjCopy);
        copyArrObjs.push(obj);
    }

    return copyArrObjs;
}

function injectDataInUserListArrObjs(data, userListStructureModule) {
    let usersList = [];

    for(let i = 0; i < data.length; i += 1) {
        let tempCopyDataUser = data.slice()[i];
        let dataUser = Object.assign({}, tempCopyDataUser);
        let userLi = JSON.parse(JSON.stringify(userListStructureModule));

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

        usersList.push(userLi);
    }
    return usersList;
}

/*
log("1  --------- Before Sending to function user list structure --------");
log(userListStructure);
log("---------");
let usersList = injectDataInUserListArrObjs(listOfUsersDetails, userListStructure);
log("---------");
log(usersList);
log("---------");
log('listOfUsersDetails');
log(listOfUsersDetails);
log("---------");
*/


function injectDataInUserListArrObjs2(data, userListStructureModule) {
    let usersList = [];

    for(let i = 0; i < data.length; i += 1) {
        //let dataUser = data.slice()[i];
        let tempCopyDataUser = data.slice()[i];
        let dataUser = Object.assign({}, tempCopyDataUser);
        let userLi = copyByValueArrayOfObjects(userListStructureModule);

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

        usersList.push(userLi);
    }
    return usersList;
}


log("2  --------- Before Sending to function user list structure --------");
log(userListStructure);
log("---------");
let usersList2 = injectDataInUserListArrObjs2(listOfUsersDetails, userListStructure);
log("---------");
log(usersList2);
log("---------");
log('listOfUsersDetails');
log(listOfUsersDetails);
log("---------");


























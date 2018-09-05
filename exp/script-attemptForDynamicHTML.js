let log = console.log;

//log("*********************************");

function createElement(elementObj) {

}

function constructBlockHTML(arrObjElements) {
    let arrParentsElm = [];
    let HTMLBlockResult = [];
    let elementAncestor = null;
    let elementModule;
    let element;
    let elementParent;
    let childCounter = 0;

    for(let i = 0; i < arrObjElements.length; i += 1) {
        elementModule = arrObjElements[i];
        element = document.createElement(elementModule.element);
        for (let attribute in elementModule.attributes) {
            element.setAttribute(attribute, elementModule.attributes[attribute]);
        }
        element.textContent = elementModule.textContent;

        if (elementModule.isElmNextElmParent) {
            arrParentsElm.push(element);
            //continue;
        } else if (!elementModule.isElmNextElmParent && !elementModule.isElmLastChildParentElm) {// && arrParentsElm.length) {
            elementParent = element.parentNode;
            elementParent = arrParentsElm.pop();//arrParentsElm[arrParentsElm.length - 1];
            elementParent.appendChild(element);
            arrParentsElm.push(elementParent);
            //childCounter += 1;

            /*if(!elementParent.isElmLastChildParentElm) {
                elementAncestor = elementParent.parentNode;
                elementAncestor = arrParentsElm[arrParentsElm.length - 2];
                elementAncestor.appendChild(elementParent);
                HTMLBlockResult = elementAncestor;
            }
            HTMLBlockResult = elementParent;*/
            /*log(elementParent);
            log(element);*/

            /*arrParentsElm[arrParentsElm.length - 1] = element.parentNode;
            arrParentsElm[arrParentsElm.length - 1].appendChild(element);*/

            //HTMLBlockResult = elementParent;

        } else if (!elementModule.isElmNextElmParent && elementModule.isElmLastChildParentElm) {// && arrParentsElm.length) {
            elementParent = element.parentNode;
            elementParent = arrParentsElm.pop();
            elementParent.appendChild(element);
            HTMLBlockResult = elementParent;
            //HTMLBlockResult.push(elementParent);

            /*arrParentsElm[arrParentsElm.length - 1] = element.parentNode;
            arrParentsElm[arrParentsElm.length - 1].appendChild(element);*/

            /*if(elementParent.isElmLastChildParentElm) {
                elementAncestor = elementParent.parentNode;
                elementAncestor = arrParentsElm.pop();
                elementAncestor.appendChild(elementParent);
                HTMLBlockResult = elementAncestor;
            } else {
            }*/

            /*log(HTMLBlockResult);
            //log(HTMLBlockResult.querySelector('input'));
            log(`${elementParent.nodeName.toLowerCase()}`);
            let HTMLBlockResultSelector = HTMLBlockResult.querySelector(`${elementParent.nodeName.toLowerCase()}`);
            log(HTMLBlockResultSelector);
            HTMLBlockResultSelector.appendChild(elementParent);*/

        }
        //log(element);
    }


    log(arrParentsElm);
    log('------- Final Element -------');
    //log(element);
    log(HTMLBlockResult);
    return HTMLBlockResult;
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
log(searchHTMLToConstruct);
log("*********************************");
let searchBar = constructBlockHTML(searchHTMLToConstruct);
let lastStudent = document.querySelector('ul.student-list li:last-child');
lastStudent.appendChild(searchBar);

log("*********************************");
constructBlockHTML(paginationHTMLToConstruct);

























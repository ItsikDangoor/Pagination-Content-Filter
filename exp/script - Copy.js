let log = console.log;
//According to MDN definitions:
// An empty element is an element from HTML, SVG, or MathML that cannot have any child nodes (i.e., nested elements or text nodes).
//In HTML, using a closing tag on an empty element is usually invalid. For example, <input type="text"></input> is invalid HTML.
let searchHTMLToConstruct = [
    {
        element: 'div',
        attributes: ['class', 'student-search'],
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: true,
        isEmptyElm: false,
    },
    {
        element: 'input',
        attributes: ['placeholder', 'Search for students...'],
        textContent: '',
        isElmParentNextElm: false,
        isElmLastChildParentElm: false,
        isEmptyElm: true,
    },
    {
        element: 'button',
        attributes: [],
        textContent: 'Search',
        isElmParentNextElm: false,
        /*//for testing if we got empty elements
          //but button is not the last element in the block
        isElmLastChildParentElm: false,
        isElmLastChildInTree: false,*/
        isElmLastChildParentElm: true,
        isElmLastChildInTree: true,
        isEmptyElm: false,
    },
    /*{
        element: 'input',
        attributes: ['placeholder', 'Student Name'],
        textContent: '',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isElmLastChildInTree: true,
        isEmptyElm: true,
    },*/
];


let paginationHTMLToConstruct = [
    {
        element: 'div',
        attributes: ['class', 'pagination'],
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: true,
        isEmptyElm: false,
    },
    {
        element: 'ul',
        attributes: [],
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: true,
        isEmptyElm: false,
    },
    {
        element: 'li',
        attributes: [],
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: false,
        isEmptyElm: false,
    },
    {
        element: 'a',
        attributes: ['class', 'active', 'href', '#'],
        textContent: '1',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isEmptyElm: false,
    },
    {
        element: 'li',
        attributes: [],
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: false,
        isEmptyElm: false,
    },
    {
        element: 'a',
        attributes: [],
        textContent: '2',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isEmptyElm: false,
    },
    {
        element: 'li',
        attributes: [],
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: false,
        isEmptyElm: false,
    },
    {
        element: 'a',
        attributes: [],
        textContent: '3',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isEmptyElm: false,
    },
    {
        element: 'li',
        attributes: [],
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: false,
        isEmptyElm: false,
    },
    {
        element: 'a',
        attributes: [],
        textContent: '4',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isEmptyElm: false,
    },
    {
        element: 'li',
        attributes: [],
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: true,//last child of ul
        isEmptyElm: false,
    },
    {
        element: 'a',
        attributes: [],
        textContent: '5',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isElmLastChildInTree: true,
        isEmptyElm: false,
    },

    /*{
        element: 'li',
        attributes: [],
        textContent: '',
        isElmParentNextElm: true,
        isEmptyElm: false,
    },
    {
        element: 'li',
        attributes: [],
        textContent: '',
        isElmParentNextElm: true,
        isEmptyElm: false,
    },*/
];




function constructBlockHTML1(arrObjElements) {
    let html = '';
    let arrParentsElm = [];
    for(let i = 0; i < arrObjElements.length; i += 1) {
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
                    arrObjElements[i].isElmLastChildInTree === true /*&&
                    arrObjElements[i].isEmptyElm === true*/) {
            if(arrObjElements[i].isEmptyElm === false) {
                html += `</${arrObjElements[i].element}>`;
            }
            html += '\n';
            html += `${arrParentsElm.pop()}`;
            html += '\n';
        } else if(arrObjElements[i].isElmParentNextElm === false &&
                    arrObjElements[i].isElmLastChildParentElm === true) {
            if(arrObjElements[i].isEmptyElm === false) {
                html += `</${arrObjElements[i].element}>`;
            }
            //html += `</${arrObjElements[i].element}>`;
            html += '\n';
            html += `</${arrObjElements[i - 1].element}>`;
            html += '\n';
        } else if(arrObjElements[i].isElmParentNextElm === false &&
                    arrObjElements[i].isElmLastChildParentElm === false &&
                    arrObjElements[i].isEmptyElm === false) {
            html += `</${arrObjElements[i].element}>`;
            html += '\n';
        }
    }

    //html += '\n--P--\n';
    for(let i = arrParentsElm.length - 1; i >= 0 ; i -= 1) {
        html += arrParentsElm[i];
        html += '\n';
    }
    log(html);
}





constructBlockHTML(searchHTMLToConstruct);
log('*********');
constructBlockHTML(paginationHTMLToConstruct);
log('*********');




function constructBlockHTML2(arrObjElements) {
    let html = '';
    let arrParentsElm = [];
    let element;
    for(let i = 0; i < arrObjElements.length; i += 1) {
        element = arrObjElements[i];
        html += `<${element.element}`;
        //j += 2, since attribute is key-value pair//old version HTMLBlockData attributres was an array
        for(let j = 0 ; j < element.attributes.length; j += 2) {
            html += ` ${element.attributes[j]}="${element.attributes[j + 1]}"`;
        }
        html += `>`;
        if(element.textContent === '') {
            html += '\n';
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
}

constructBlockHTML2(searchHTMLToConstruct);
log('*********');
constructBlockHTML2(paginationHTMLToConstruct);
log('*********');

//According to MDN definitions:
// An empty element is an element from HTML, SVG, or MathML that cannot have any child nodes (i.e., nested elements or text nodes).
//In HTML, using a closing tag on an empty element is usually invalid. For example, <input type="text"></input> is invalid HTML.
const searchHTMLToConstruct = [
    {
        element: 'div',
        attributes: {class: 'student-search'},
        textContent: '',
        isElmNextElmParent: true,
        isElmLastChildParentElm: true,
    },
    {
        element: 'input',
        attributes: {placeholder: 'Search for students...'},
        textContent: '',
        isElmNextElmParent: false,
        isElmLastChildParentElm: false,
    },
    {
        element: 'button',
        attributes: {},
        textContent: 'Search',
        isElmNextElmParent: false,
        /*//for testing if we got empty elements
          //but button is not the last element in the block
        isElmLastChildParentElm: false,
        isElmLastChildInTree: false,*/
        isElmLastChildParentElm: true,
        isElmLastChildInTree: true, //--------------------------------------question if I need to add this unique property to other objects too? for code integrity.
    },
    /*{
        element: 'input',
        attributes: {'placeholder', 'Student Name'},
        textContent: '',
        isElmNextElmParent: false,
        isElmLastChildParentElm: true,
        isElmLastChildInTree: true,
        isEmptyElm: true,
    },*/
];


const paginationHTMLToConstruct = [
    {
        element: 'div',
        attributes: {'class': 'pagination'},
        textContent: '',
        isElmNextElmParent: true,
        isElmLastChildParentElm: true,
    },
    {
        element: 'ul',
        attributes: {},
        textContent: '',
        isElmNextElmParent: true,
        isElmLastChildParentElm: true,
    },
    {
        element: 'li',
        attributes: {},
        textContent: '',
        isElmNextElmParent: true,
        isElmLastChildParentElm: false,
    },
    {
        element: 'a',
        attributes: {
            class: 'active',
            href: '#'
        },
        textContent: '1',
        isElmNextElmParent: false,
        isElmLastChildParentElm: true,
    },
    {
        element: 'li',
        attributes: {},
        textContent: '',
        isElmNextElmParent: true,
        isElmLastChildParentElm: false,
    },
    {
        element: 'a',
        attributes: {},
        textContent: '2',
        isElmNextElmParent: false,
        isElmLastChildParentElm: true,
    },
    {
        element: 'li',
        attributes: {},
        textContent: '',
        isElmNextElmParent: true,
        isElmLastChildParentElm: false,
    },
    {
        element: 'a',
        attributes: {},
        textContent: '3',
        isElmNextElmParent: false,
        isElmLastChildParentElm: true,
    },
    {
        element: 'li',
        attributes: {},
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: false,
    },
    {
        element: 'a',
        attributes: {},
        textContent: '4',
        isElmNextElmParent: false,
        isElmLastChildParentElm: true,
    },
    {
        element: 'li',
        attributes: {},
        textContent: '',
        isElmNextElmParent: true,
        isElmLastChildParentElm: true,//last child of ul
    },
    {
        element: 'a',
        attributes: {},
        textContent: '5',
        isElmNextElmParent: false,
        isElmLastChildParentElm: true,
        isElmLastChildInTree: true,
    },

    /*{
        element: 'li',
        attributes: {},
        textContent: '',
        isElmParentNextElm: true,
        isEmptyElm: false,
    },
    {
        element: 'li',
        attributes: {},
        textContent: '',
        isElmParentNextElm: true,
        isEmptyElm: false,
    },*/
];



const searchHTMLToConstruct2 = [
    {
        element: 'div',
        attributes: {class: 'student-search'},
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: true,
        isEmptyElm: false,
    },
    {
        element: 'input',
        attributes: {
            class: 'user-input',
            placeholder: 'Search for students...'
        },
        textContent: '',
        isElmParentNextElm: false,
        isElmLastChildParentElm: false,
        isEmptyElm: true,
    },
    {
        element: 'button',
        attributes: {},
        textContent: 'Search',
        isElmParentNextElm: false,
        /*//for testing if we got empty elements
          //but button is not the last element in the block
        isElmLastChildParentElm: false,
        isElmLastChildInTree: false,*/
        isElmLastChildParentElm: true,
        isElmLastChildInTree: true, //--------------------------------------question if I need to add this unique property to other objects too? for code integrity.
        isEmptyElm: false,
    },
    /*{
        element: 'input',
        attributes: {'placeholder', 'Student Name'},
        textContent: '',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isElmLastChildInTree: true,
        isEmptyElm: true,
    },*/
];


let userListStructure = [
    /*{
        element: 'ul',
        attributes: {class: 'student-list'},
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: true,
        //isElmLastChildInTree: false, //--------------------------------------question if I need to add this unique property to other objects too? for code integrity.
        isEmptyElm: false,
    },*/
    {
        element: 'li',
        attributes: {class: 'student-item cf'},
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: null,
        isElmLastChildInTree: null,
        isEmptyElm: false,
    },
    {
        element: 'div',
        attributes: {class: 'student-details'},
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: false,
        isElmLastChildInTree: false,
        isEmptyElm: false,
    },
    {
        element: 'img',
        attributes: {
            class: 'avatar',
            src: '',
        },
        textContent: '',
        isElmParentNextElm: false,
        isElmLastChildParentElm: false,
        isElmLastChildInTree: false,
        isEmptyElm: true,
    },
    {
        element: 'h3',
        attributes: {},
        textContent: '',
        isElmParentNextElm: false,
        isElmLastChildParentElm: false,
        isElmLastChildInTree: false,
        isEmptyElm: false,
    },
    {
        element: 'span',
        attributes: {class: 'email'},
        textContent: '',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isElmLastChildInTree: false,
        isEmptyElm: false,
    },
    {
        element: 'div',
        attributes: {class: 'joined-details'},
        textContent: '',
        isElmParentNextElm: true,
        isElmLastChildParentElm: true,
        isElmLastChildInTree: false,
        isEmptyElm: false,
    },
    {
        element: 'span',
        attributes: {class: 'date'},
        textContent: '',
        isElmParentNextElm: false,
        isElmLastChildParentElm: true,
        isElmLastChildInTree: null,
        isEmptyElm: false,
    },
];
/*log("*********************************");
log(userListStructure);
log("---------");*/

let listOfUsersDetails = [
    {
        name: {
            title: "mr",
            first: "rolf",
            last: "hegdal"
        },
        email: "rolf.hegdal@example.com",
        registered: {
            date: "2015-11-04T22:09:36Z",
            age: 2
        },
        picture: {
            large: "https://randomuser.me/api/portraits/men/65.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/65.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/65.jpg"
        },
    },
    {
        name: {
            title: "mr",
            first: "rolf2",
            last: "hegdal2"
        },
        email: "rolf2.hegdal2@example.com",
        registered: {
            date: "2000-02-29T22:09:36Z",
            age: 222
        },
        picture: {
            large: "https://randomuser.me/api/portraits/men/65.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/65.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/65.jpg"
        },
    },
];

/*
log(userListStructure);
log("---------");*/

const log = console.log;

function calculateNumberOfPages(studentList, studentsPerPage) {
    let modulo, numPages;

    modulo = studentList.length % studentsPerPage;
    numPages = (studentList.length - modulo) / studentsPerPage;
    if(modulo > 0) {
        numPages += 1;
    }

    //log(numPages);
    return numPages;
}
function createSearchSection() {
    let div = document.createElement('div');
    div.setAttribute('class', 'student-search');
    let input = document.createElement('input');
    input.setAttribute('placeholder', 'Search for students...');
    let button = document.createElement('button');
    button.textContent = 'Search';

    div.appendChild(input);
    div.appendChild(button);
    return div;
}

function createPaginationSection(studentList, numPages) {
    let div = document.createElement('div');
    let ul = document.createElement('ul');

    for(let i = 0; i < numPages; i += 1) {
        let a = document.createElement('a');
        let li = document.createElement('li');
        a.setAttribute('href', '#');
        a.textContent = `${i + 1}`;
        li.appendChild(a);
        ul.appendChild(li);
    }

    div.setAttribute('class', 'pagination');
    div.appendChild(ul);
    return div;
}

function hideAllStudents(studentList) {
    for (let i = 0; i < studentList.length; i += 1) {
        if(studentList[i].hidden === false) {
            studentList[i].hidden = true;
        }
    }
}

//function example: page number 3, starting from index 0
//20 = (3 * 10) - 10
function calcStartingStudentsIndex(pageNumber, maxStudentsInPage) {
    return pageNumber * maxStudentsInPage - maxStudentsInPage;
}

function appendRangeStudentsListState(pageNumber, maxStudentsInPage, numRecords, studentListLength) {
    let pageHeader = document.querySelector('.page-header');
    let previousStudentsRange = pageHeader.querySelector('.student-list-range-state');
    //log(previousStudentsRange);
    //first time the page is loading there is no status students range bar
    if(previousStudentsRange) {
        pageHeader.removeChild(previousStudentsRange);
    }

    let startingStudentIndex = calcStartingStudentsIndex(pageNumber, maxStudentsInPage);
    let currentStudentsRangeText = `STUDENTS ${startingStudentIndex + 1}-${startingStudentIndex + numRecords} OUT OF ${studentListLength}`;
    let currentStudentsRange = document.createElement('p');
    currentStudentsRange.setAttribute('class', 'student-list-range-state');
    currentStudentsRange.textContent = currentStudentsRangeText;
    pageHeader.appendChild(currentStudentsRange);
}

function showPage(studentList, pageNumber, maxStudentsInPage) {
    let startingStudentIndex;
    let numRecords = 0;

    hideAllStudents(studentList);
    startingStudentIndex = calcStartingStudentsIndex(pageNumber, maxStudentsInPage);
    for(let i = startingStudentIndex;
            numRecords < maxStudentsInPage && i < studentList.length;
            i += 1, numRecords += 1) {
        studentList[i].hidden = false;
    }

    appendRangeStudentsListState(pageNumber, maxStudentsInPage, numRecords, studentList.length);
}

function appendPageLinks(studentList, studentsPerPage) {
    let numPages = calculateNumberOfPages(studentList, studentsPerPage);
    //log(numPages);
    let paginationDiv = createPaginationSection(studentList, numPages);
    let page = document.querySelector('div.page');

    //****************************************************************
    let paginationSection = page.querySelector('.pagination');
    if(paginationSection) {
        page.removeChild(paginationSection);
    }
    page.appendChild(paginationDiv);
    //****************************************************************


    let ul = paginationDiv.querySelector('ul');
    /*let anchors = paginationDiv.querySelectorAll('a');
    for(let i = 0; i < anchors.length; i += 1) {
        anchors[i].classList.remove('active');
    }*/
    //anchors[0].classList.add('active');


    //****************************************************************
    let active = paginationDiv.querySelector('ul li:first-child a');
    active.classList.add('active');
    //****************************************************************



    ul.addEventListener('click', (event) => {
        if(event.target.tagName === 'A') {
            //the current page is in 'active' markup, remove it first,
            //then add 'active' to the clicked link
            let active = ul.querySelector('a.active');
            active.classList.remove('active');
            event.target.classList.add('active');
            //converting string to a number
            let pageNumber = +event.target.textContent;
            showPage(studentList, pageNumber, studentsPerPage);
        }
    });
}

function searchStudents() {
    let name = document.querySelector('.student-search input').value;
    log(name);
    let studentList = document.querySelectorAll('.student-list li');
    let searchResult = [];

    for(let i = 0; i < studentList.length; i += 1) {
        let studentName = studentList[i].querySelector('.student-details h3').textContent;
        let studentEmail = studentList[i].querySelector('.student-details .email').textContent;
        //since searching student name we need only the first part of the email address.
        // .split method: '@' separator, and 1 for the first split that is the sub string before '@'
        studentEmail = studentEmail.split('@', 1);
        //log(studentName);
        //log(studentEmail);

        if(studentName.includes(name) || studentEmail.includes(name)) {
            searchResult.push(studentList[i]);
        }
    }

    log(searchResult);
    hideAllStudents(studentList);
    let previousResult = document.querySelector('.empty-search-result');
    if(previousResult) {
        let pageHeader = document.querySelector('.page-header');
        pageHeader.removeChild(previousResult);
    }
    if(searchResult.length === 0) {
        let studentsRangeState = document.querySelector('.student-list-range-state');
        log(studentsRangeState.innerHTML);
        studentsRangeState.innerHTML = `STUDENTS 0-0 OUT ${studentList.length}`;

        let message = document.createElement('h1');
        message.setAttribute('class', 'empty-search-result');
        message.textContent = `'${name}' does not exist in student list`;
        let pageHeader = document.querySelector('.page-header');
        pageHeader.appendChild(message);

        //let page = document.querySelector('.page');
        let pagination = document.querySelector('.pagination');
        let parent = pagination.parentNode;
        parent.removeChild(pagination);


    } else {
        showPage(searchResult, 1, 10);
        appendPageLinks(searchResult, 10);
    }
}


function prepareEventListeners() {
    const searchButton = document.querySelector('.student-search button');
    searchButton.addEventListener('click', searchStudents, false);
}





const studentList = document.querySelectorAll('.student-list li');
log(studentList);
//log(studentList[0]);
//showPage(studentList, 5);
//log(calculateNumberOfPages(studentList, 10));

/*
let page = document.querySelector('div.page');
page.appendChild(paginationDiv);*/


//let paginationDiv = createPaginationSection(studentList);
appendPageLinks(studentList, 10);
showPage(studentList, 1, 10);

let searchSection = createSearchSection();
let pageHeader = document.querySelector('.page-header');
pageHeader.appendChild(searchSection);
prepareEventListeners();

/*
let pageHeader = document.querySelector('.page-header');
let textContent = 'STUDENTS 51-54 OUT OF 54';
let studentListState = document.createElement('p');
studentListState.setAttribute('class', 'student-list-range-state');
studentListState.textContent = textContent;
pageHeader.appendChild(studentListState);*/

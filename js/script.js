
//=====================================================================================================================================================================================
//======================================================================== Main Functions =============================================================================================
//=====================================================================================================================================================================================


//presenting the current page by the page number with the students in order of the list/list search result
function showStudents(studentList, pageNumber, maxStudentsInPage) {
    let startingStudentIndex;
    let numRecords = 0;

    hideAllStudents(studentList);
    startingStudentIndex = calcStartingStudentsIndex(pageNumber, maxStudentsInPage);
    for(let i = startingStudentIndex;
            numRecords < maxStudentsInPage && i < studentList.length;
            i += 1, numRecords += 1) {
        studentList[i].hidden = false;
    }

    return numRecords;
}

function addClickEventListenerToPagination(paginationDiv, studentList, studentsPerPage) {
    let ul = paginationDiv.querySelector('ul');
    //when first time creating the page we present the first {studentsPerPage value} students and set 'active' class to it's page link
    let active = paginationDiv.querySelector('ul li:first-child a');
    active.classList.add('active');

    ul.addEventListener('click', (event) => {
        //two conditions for event element to present the requested page:(other page links are NOT the currently presenting page)
        // 1. anchor element is an anchor.
        // 2. anchor element is NOT the current page clicked.
        if(event.target.tagName === 'A' && !event.target.classList.contains('active')) {
            //the current page is in 'active' markup, remove it first,
            //then add 'active' to the clicked link(requested page).
            let active = ul.querySelector('a.active');
            active.classList.remove('active');
            event.target.classList.add('active');
            //converting string to a number
            let pageNumber = +event.target.textContent;
            let numRecords = showStudents(studentList, pageNumber, studentsPerPage);
            updateRangeStudentsListStateBar(pageNumber, studentsPerPage, numRecords, studentList.length);
        }
    }, false);
}

function searchStudents(studentList) {
    let name = document.querySelector('.student-search input').value;
    let searchResult = [];

    for(let i = 0; i < studentList.length; i += 1) {
        let studentName = studentList[i].querySelector('.student-details h3').textContent;
        let studentEmail = studentList[i].querySelector('.student-details .email').textContent;
        /* - since searching student name we need only the first part of the email address, actual email name.
             (last section is: _._@example.com)
           - .split method: '@' separator, and 1 value for the first split section that is the sub string before '@' */
        studentEmail = studentEmail.split('@', 1);
        if(studentName.includes(name) || studentEmail.includes(name)) {
            searchResult.push(studentList[i]);
        }
    }

    /*- returning the search result OR the student name not found in the list.
      - if the searchResult.length === 0 then searched name that was not found will return.
      - JS type coercion, 0 number value to boolean false value while other integer values to true(falsy & truthy value).*/
    return searchResult.length? searchResult: name;
}

function showSearchResult(searchResult, studentList, pageNumber, studentsPerPage) {
    hideAllStudents(studentList);
    let previousZeroResult = document.querySelector('.empty-search-result');
    if(previousZeroResult) {
        let pageHeader = document.querySelector('.page');
        pageHeader.removeChild(previousZeroResult);
    }

    if(typeof searchResult === 'object') {
        formPaginationAndStatusBar(searchResult, pageNumber, studentsPerPage);
    } else {
        // in other cases the searchResult is actually the search name a 'string' type,
        // which was not found at searching in the student list. for clarity assigning name variable.
        let name = searchResult;
        insertStudentRangeStateZeroResult(studentList.length);
        showZeroResultMessage(name);
        removePaginationLinks();
    }
}


function searchAndShowResult(event, studentList, pageNumber, studentsPerPage) {
    /*in case the user got into the input field, hit any insignificant key like Alt+Tab then switch back
      to app page, or like 'F2' or ..., since the cursor is inside the input filed the event is triggered again
      on the same input! --> in this situation the program sequence stop to run to the next step.*/
    let answer = checkIfInsignificantInputKeyEntered(event.key);
    if(answer) {
        return;
    }

    removeErrorIndicationClassAtt();
    //in case user did not entered any value and hit the search button,
    //error indication will appear and program sequence stop to run to the next step.
    if(event.target.tagName === 'BUTTON') {
        if(validateSearchInputValue() === false) {
            return;
        }
    }

    let searchResult = searchStudents(studentList);
    showSearchResult(searchResult, studentList, pageNumber, studentsPerPage);
}

function prepareSearchEventListeners(studentList, pageNumber, studentsPerPage) {
    const searchButton = document.querySelector('.student-search button');
    const searchInput = document.querySelector('.student-search input');

    //if reader wondered why to add click event listener to searchButton if there is already keyup event listener?!
    //it seems there is no need for search button!
    //keyup would be in addition to making the search button click able since
    //pasting text into the search bar with a mouse function wouldn't trigger the keyup event.
    searchInput.addEventListener('keyup', ()=> {searchAndShowResult(event, studentList, pageNumber, studentsPerPage);}, false);
    searchButton.addEventListener('click', ()=> {searchAndShowResult(event, studentList, pageNumber, studentsPerPage);}, false);
    //in case user clicked on the search button without providing name to search and then want and
    //return to the text box to enter search value, the initial state is focus(just the carrot is blinking) and
    //still the user did not entered value, then outline border error indication will be removed.
    searchInput.addEventListener('focus', removeErrorIndicationClassAtt, false);
    //in case the user did not entered value to search and hit the search button then the error indication
    //take place, BUT after that the user do not want to enter value to search!
    //the user can click on any other document elements and the error indication will turn off.
    document.addEventListener('click', removeErrorIndicationOnClick, false);
}

function formPaginationAndStatusBar(studentList, pageNumber, studentsPerPage) {
    let numRecords = showStudents(studentList, pageNumber, studentsPerPage);
    let rangeStudentListBar = createRangeStudentsListStateBar();
    appendRangeStudentsListStateBar(rangeStudentListBar);
    updateRangeStudentsListStateBar(pageNumber, studentsPerPage, numRecords, studentList.length);
    let paginationDiv = createPageLinks(studentList.length, studentsPerPage);
    appendPageLinks(paginationDiv);
    addClickEventListenerToPagination(paginationDiv, studentList, studentsPerPage);
}

function createSearchSectionAndBehavior(studentList, pageNumber, studentsPerPage) {
    let searchSection = createSearchSection();
    let pageHeader = document.querySelector('.page-header');
    pageHeader.appendChild(searchSection);
    prepareSearchEventListeners(studentList, pageNumber, studentsPerPage);
}


//=====================================================================================================================================================================================
//======================================================================== Program Main Function ======================================================================================
//=====================================================================================================================================================================================

function main() {
    const studentsPerPage = 10;
    const pageNumber = 1;
    const studentList = document.querySelectorAll('.student-list li');
    /*- initial page load, presenting the first 10 students from the students list
      - form JS components - pagination and student status range sections and their behaviors.*/
    formPaginationAndStatusBar(studentList, pageNumber, studentsPerPage);
    //adding more JS functionality, search option and behaviours related to searching
    createSearchSectionAndBehavior(studentList, pageNumber, studentsPerPage);
}

main();

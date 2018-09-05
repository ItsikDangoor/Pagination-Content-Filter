const log = console.log;


function createSearchSection() {
    let div = document.createElement('div');
    div.setAttribute('class', 'student-search');
    let input = document.createElement('input');
    input.setAttribute('placeholder', 'Enter name to search');
    let button = document.createElement('button');
    button.textContent = 'Search';

    div.appendChild(input);
    div.appendChild(button);
    return div;
}

function createPaginationSection(numPages) {
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

function createRangeStudentsListStateBar() {
    let currentStudentsRange = document.createElement('p');
    currentStudentsRange.setAttribute('class', 'student-list-range-state');
    return currentStudentsRange;
}

function hideAllStudents(studentList) {
    for (let i = 0; i < studentList.length; i += 1) {
        if(studentList[i].hidden === false) {
            studentList[i].hidden = true;
        }
    }
}

function calculateNumberOfPages(studentListLength, studentsPerPage) {
    let modulo, numPages;

    modulo = studentListLength % studentsPerPage;
    numPages = (studentListLength - modulo) / studentsPerPage;
    if(modulo > 0) {
        numPages += 1;
    }

    return numPages;
}

//starting from index 0,
//function example: for page number 3 starting student index to present in page,
//20 = (3 * 10) - 10
function calcStartingStudentsIndex(pageNumber, maxStudentsInPage) {
    return pageNumber * maxStudentsInPage - maxStudentsInPage;
}

//formatting page status result in for the current page in page header section,
//example: STUDENTS 1-10 OUT OF 54
function updateRangeStudentsListStateBar(pageNumber, maxStudentsInPage, numRecords, studentListLength) {
    let startingStudentIndex = calcStartingStudentsIndex(pageNumber, maxStudentsInPage);
    let currentStudentsRangeText = `STUDENTS ${startingStudentIndex + 1}-${startingStudentIndex + numRecords} OUT OF ${studentListLength}`;
    let studentsRange = document.querySelector('.student-list-range-state');
    studentsRange.textContent = currentStudentsRangeText;
}



function appendRangeStudentsListStateBar(stateBar) {
    let pageHeader = document.querySelector('.page-header');
    pageHeader.appendChild(stateBar);
}

function removePaginationLinks() {
    let pagination = document.querySelector('.pagination');
    if(pagination) {
        let parent = pagination.parentNode;
        parent.removeChild(pagination);
    }
}

function createPageLinks(studentListLength, studentsPerPage) {
    let numPages = calculateNumberOfPages(studentListLength, studentsPerPage);
    return createPaginationSection(numPages);
}

function appendPageLinks(paginationDiv) {
    let page = document.querySelector('div.page');
    removePaginationLinks();
    page.appendChild(paginationDiv);
}

function insertStudentRangeStateZeroResult(studentListLength) {
    let studentsRangeState = document.querySelector('.student-list-range-state');
    studentsRangeState.innerHTML = `STUDENTS 0-0 OUT ${studentListLength}`;
}

function showZeroResultMessage(name) {
    let message = document.createElement('h1');
    message.setAttribute('class', 'empty-search-result');
    message.textContent = `'${name}' does not exist in student list`;
    let page = document.querySelector('.page');
    page.appendChild(message);
}

function removeErrorIndicationClassAtt() {
    let input = document.querySelector('.page-header .student-search input');
    input.classList.remove('errorIndication');
}

function addErrorIndicationClassAtt() {
    let input = document.querySelector('.page-header .student-search input');
    input.classList.add('errorIndication');
}

function validateSearchInputValue() {
    let name = document.querySelector('.student-search input').value;
    if(name === '') {
        //since the browser works very fast and to see the actual reassigning
        //Error Indication Class, setTimeout is called to show the CSS transition effect
        window.setTimeout(addErrorIndicationClassAtt, 400);
        return false;
    }

    return true;
}

function checkIfInsignificantInputKeyEntered(key) {
    //insignificant key strokes by user
    const insignificantKeys = ["Tab", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight",
                       "Escape", "CapsLock", "Home", "End", "PageUp", "PageDown",
                       "Shift", "Control", "Alt", "NumLock", "MediaStop", "MediaTrackNext",
                       "MediaTrackPrevious", "MediaPlayPause", "LaunchMediaPlayer", "LaunchMail",
                       "F2", "F4", "F5", "F7", "F11", "F12", "ScrollLock", "PrintScreen", "ContextMenu"];
    return insignificantKeys.includes(key);
}

/*In case the user did not entered name to search and clicked the search button,
the program check the validation and set Error Indication class to aware the user for it.
After this scenario user click on other elements of the page,
but not the input, search button, then error situation is over and user actions
means user is doing other activities in the page, hence removing the Error Indication.*/
function removeErrorIndicationOnClick(event) {
    if(event.target.tagName !== 'BUTTON' &&
            event.target.tagName !== 'INPUT') {
        let input = document.querySelector('.page-header .student-search input.errorIndication');
        if(input) {
            removeErrorIndicationClassAtt();
        }
    }
}

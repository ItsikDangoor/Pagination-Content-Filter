
//formatting status result in for the current page in page header section,
// example: STUDENTS 1-10 OUT OF 54
//I used this version when I the status bar in css was designed without flex box
/*function appendRangeStudentsListState(pageNumber, maxStudentsInPage, numRecords, studentListLength) {
    let pageHeader = document.querySelector('.page-header');
    let previousStudentsRange = pageHeader.querySelector('.student-list-range-state');
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
}*/


//--- ver 2 ---
/*function appendRangeStudentsListState(pageNumber, maxStudentsInPage, numRecords, studentListLength) {
    let startingStudentIndex = calcStartingStudentsIndex(pageNumber, maxStudentsInPage);
    let currentStudentsRangeText = `STUDENTS ${startingStudentIndex + 1}-${startingStudentIndex + numRecords} OUT OF ${studentListLength}`;

    let pageHeader = document.querySelector('.page-header');
    let studentsRange = pageHeader.querySelector('.student-list-range-state');
    log('--- studentsRange ---');
    log(studentsRange);
    if(studentsRange) {
        studentsRange.textContent = currentStudentsRangeText;
        return;
    }

    //first time the page is loading there is no status students range bar
    let currentStudentsRange = document.createElement('p');
    currentStudentsRange.setAttribute('class', 'student-list-range-state');
    currentStudentsRange.textContent = currentStudentsRangeText;
    pageHeader.appendChild(currentStudentsRange);
}*/

//function is working, didn't check if working with Flex-box, an older version
/*function appendRangeStudentsListState(pageNumber, maxStudentsInPage, numRecords, studentListLength) {
    let startingStudentIndex = calcStartingStudentsIndex(pageNumber, maxStudentsInPage);
    let currentStudentsRangeText = `STUDENTS ${startingStudentIndex + 1}-${startingStudentIndex + numRecords} OUT OF ${studentListLength}`;

    let pageHeader = document.querySelector('.page-header');
    let studentsRange = pageHeader.querySelector('.student-list-range-state');
    log('--- studentsRange ---');
    log(studentsRange);
    if(studentsRange) {
        studentsRange.textContent = currentStudentsRangeText;
        return;
    }

    //first time the page is loading there is no status students range bar
    let currentStudentsRange = document.createElement('p');
    currentStudentsRange.setAttribute('class', 'student-list-range-state');
    currentStudentsRange.textContent = currentStudentsRangeText;
    pageHeader.appendChild(currentStudentsRange);
}*/


function createAndAppendPageLinks(studentList, studentsPerPage) {
    log('create pagiantion div');
    let numPages = calculateNumberOfPages(studentList.length, studentsPerPage);
    log('numPages: ', numPages);
    let paginationDiv = createPaginationSection(studentList, numPages);
    log(paginationDiv);

    let page = document.querySelector('div.page');
    removePaginationLinks();
    page.appendChild(paginationDiv);

    return paginationDiv;
}



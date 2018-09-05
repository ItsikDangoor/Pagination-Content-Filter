
function injectDataInUserListArrObjs(data, userLiStructureModule) {
    let usersList = [];//userListStructure;
    let userLi = [];
    //let userListstructureModel = userListStructure;

    //log(data);

    log('---- User List Structure Module----');
    log(userLiStructureModule.length);
    log(userLiStructureModule);
    for(let i = 0; i < data.length; i += 1) {
        let dataUser = data[i];
        /*log('/!*!/!*!/!*!/!*!/!*!/!*!/!*!/!*');*/
        log(dataUser);

        //shallow copying, to not reference to original compound variable(Object)
        //let userLi = userLiStructureModule.slice();
        /*log('*****Slice\n ' + JSON.stringify(userLi));
        log('*****User li\n' + userLi);*/

        //ES5 methods
        //let userLi = userLiStructureModule.slice();
        let userLi = [].concat(userListStructure);


        //-------------------------------------------------
        // ES6 method
        //userLi = [...userLiStructureModule];
        //OR
        //userLi = Array.from(userLiStructureModule);

        // ES6 method
        //let userLi = Object.assign({}, userLiStructureModule);
        //OR


        log('---- User LI Before----');
        log(userLi);

        //user.registered.date structure: YYYY-MM-DDTHH:MM:SSZ
        /*let joinedDate = dataUser.registered.date.split('-');
        joinedDate[0] = joinedDate[0].substring(2);//only two digits for year
        joinedDate[2] = joinedDate[2].split('T');
        joinedDate[2] = joinedDate[2][0];//only the day
*/
        userLi[2].attributes.src = dataUser.picture.thumbnail;
        //log("src = " + userLiStructureModule[2].attributes.src);
        userLi[3].textContent = `${dataUser.name.first} ${dataUser.name.last}`;
        log('text content: ' + userLi[3].textContent);
        userLi[4].textContent = dataUser.email;
        log('email: ' + userLi[4].textContent);
        //date structure: MM/DD/YY
        //userLi[6].textContent = `Joined ${joinedDate[1]}/${joinedDate[2]}/${joinedDate[0]}`;

        log('---- User LI After----');
        //log(JSON.stringify(userLi));
        log(userLi);

        //log("length 1: " + userLiStructureModule.length);
        /*log('---- END iterate LOOP User List Structure Module----');
        log(userLiStructureModule);*/
        //log('---- User LI structure module After----');
        //usersList.push(userLiStructureModule);
        let copyUserLi = Array.from(userLi);
        log('##### copyUserLi:#####');
        log(copyUserLi);
        usersList.push(copyUserLi);

        /*userLi.length = 0;
        log('---- User LI After LENGTH = 0 ----');
        log(userLi);*/
        //userLi = null;
        //log("length 2: " + userLiStructureModule.length);
        //userLi = null;

    }

    log('**** Parameter userLiStructureModule:\n');
    log(userLiStructureModule);
    log('\n');
    log('---- Users list finished----');
    log(usersList);
    return usersList;
}

//constructBlockHTML(userListStructure);
log("--------- Before Sending to function user list structure --------");
log(userListStructure);
log("---------");
let usersList = injectDataInUserListArrObjs(listOfUsersDetails, userListStructure);
log("---------");
log("--------- After Sending to function user list structure --------");
log(usersList);
log("---------");
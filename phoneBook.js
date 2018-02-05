'use strict';

var phoneBook = [];

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    checkPerson(name, phone, email);

//    var regexpEmail = /^[\wа-я]{1,10}@[\wа-я\-]{1,10}\.?[\wа-я]{0,3}\.[\wа-я]{2,3}/i;
//    var regexpPhone = /\+?\d{0,3}\s?(\(\d{3}?\)|\d{3})?\s?\d{3}[\s\-]?\d[\s\-]?\d{3}$/i;
//
//    if ((name === '') || (!(regexpPhone.test(phone))) || (!(regexpEmail.test(email)))) {
//        return;
//    }
//
//    var person = {
//        name: name,
//        phone: phone,
//        email: email
//    };
//
//    phoneBook.push(person);
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    var searchArray = [];

    for (var i = 0; i < phoneBook.length; i++) {
        scanProperties(i, searchArray, query);
    }

    for (var j = 0; j < searchArray.length; j++) {
        var line = searchArray[j].name + ', ' + searchArray[j].phone + ', ' + searchArray[j].email;
        console.info(line);
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
var amountDeletedElements = 0;
module.exports.remove = function remove(query) {

    for (var i = 0; i < phoneBook.length; i++) {
        delProperties(i, query);
    }

    if (amountDeletedElements === 1) {
        console.info('Удален ' + amountDeletedElements + ' контакт');
    } else if ((amountDeletedElements >= 2) && (amountDeletedElements <= 4)) {
        console.info('Удалено ' + amountDeletedElements + ' контакта');
    } else {
        console.info('Удалено ' + amountDeletedElements + ' контактов');
    }
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var importedArr = data.split('\r\n');

    if (importedArr[importedArr.length] === undefined) {
        importedArr.pop();
    }

    for (var i = 0; i < importedArr.length; i++) {
        var subArr = importedArr[i].split(';');
        checkPerson(subArr[0], subArr[1], subArr[2]);
    }
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    tableTop();

    for (var i = 0; i < phoneBook.length; i++) {
        var line = symb(9474);
        line = line + ' ' + phoneBook[i].name + spaces(maxNameLength(), phoneBook[i].name.length) +
            symb(9474) + ' ' + phoneBook[i].phone +
            spaces(maxPhoneLength(), phoneBook[i].phone.length) + symb(9553) + ' ' +
            phoneBook[i].email + spaces(maxEmailLength(), phoneBook[i].email.length) + symb(9474);
        console.info(line);
    }

    tableBottom();
};

function horizLine(width) {
    var line = '';
    for (var i = 0; i < width; i++) {
        line = line + symb(9472);
    }

    return line;
}

function symb(codeValue) {
    return String.fromCharCode(codeValue);
}

function maxNameLength() {
    var maxLength = '0';
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].name.length > maxLength) {
            maxLength = phoneBook[i].name.length;
        }
    }

    return maxLength + 1;
}

function maxPhoneLength() {
    var maxLength = '0';
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone.length > maxLength) {
            maxLength = phoneBook[i].phone.length;
        }
    }

    return maxLength + 1;
}

function maxEmailLength() {
    var maxLength = '0';
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].email.length > maxLength) {
            maxLength = phoneBook[i].email.length;
        }
    }

    return maxLength + 1;
}

function tableTop() {
    var line = symb(9484) + horizLine(maxNameLength() + 1) + symb(9516);
    line = line + horizLine(maxPhoneLength() + 1) + symb(9573) + horizLine(maxEmailLength() + 1) +
        symb(9488) + '\n' + symb(9474) + ' Имя' + spaces(maxNameLength(), 3) + symb(9474) +
        ' Телефон' + spaces(maxPhoneLength(), 7) + symb(9553) + ' email' +
        spaces(maxEmailLength(), 5) + symb(9474) + '\n' + symb(9500) + horizLine(maxNameLength() +
        1) + symb(9532) + horizLine(maxPhoneLength() + 1) + symb(9579) +
        horizLine(maxEmailLength() + 1) + symb(9508);

    console.info(line);
}

function tableBottom() {
    var bottomLine = symb(9492) + horizLine(maxNameLength() + 1) + symb(9524) +
        horizLine(maxPhoneLength() + 1) + symb(9576) + horizLine(maxEmailLength() + 1) +
        symb(9496);

    console.info(bottomLine);
}

function spaces(maxSpacesAmount, reduceAmount) {
    var spacesAmount = maxSpacesAmount - reduceAmount;
    var line = '';
    for (var i = 0; i < spacesAmount; i++) {
        line = line + ' ';
    }

    return line;
}

function scanProperties(item, arrayName, queryText) {
    for (var key in phoneBook[item]) {
        if (phoneBook[item][key].indexOf(queryText) >= 0) {
            arrayName.push(phoneBook[item]);
            break;
        }
    }
}

function delProperties(item, queryText) {
    for (var key in phoneBook[item]) {
        if (phoneBook[item][key].indexOf(queryText) >= 0) {
            phoneBook.splice(item, 1);
            item--;
            amountDeletedElements++;
            break;
        }
    }
}


function checkPerson(name, phone, email) {
    var regexpEmail = /^[\wа-я]{1,10}@[\wа-я\-]{1,10}\.?[\wа-я]{0,3}\.[\wа-я]{2,3}/i;
    var regexpPhone = /^\+?\d{0,3}\s?(\(\d{3}?\)|\d{3})?\s?\d{3}[\s\-]?\d[\s\-]?\d{3}$/i;

    if ((name === '') || (!(regexpPhone.test(phone))) || (!(regexpEmail.test(email)))) {
        return;
    }

    var person = {
        name: name,
        phone: phone,
        email: email
    };

    phoneBook.push(person);
}

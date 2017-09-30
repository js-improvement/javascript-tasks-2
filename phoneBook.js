'use strict';

var phoneBook = [];

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    if (!validateName(name) || !validatePhone(phone) || !validateEmail(email)) {
        return;
    }

    var person = {
        name: name,
        phone: phone,
        email: email
    };
    phoneBook.push(person);

    function validateName() {
        return typeof name === 'string';
    }

    function validatePhone() {
        var phoneRegExp = /^\+?[0-9]{0,2}\s?(\([0-9]{3}\)|[0-9]{3})[0-9-\s]{7,10}$/;

        return typeof phone === 'string' && phoneRegExp.test(phone) === true;
    }

    function validateEmail() {
        var emailRegExp = /^[a-zа-я0-9-]+@[a-zа-я0-9-]+\.[a-zа-я]+[.a-zа-я]*$/;

        return typeof email === 'string' && emailRegExp.test(email) === true;
    }
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (searchThroughObject(phoneBook[i], query)) {
            console.info(phoneBook[i].name + ', ' + phoneBook[i].phone + ', ' + phoneBook[i].email);
        }
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var counter = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        if (searchThroughObject(phoneBook[i], query)) {
            phoneBook.splice(i, 1);
            counter++;
            break;
        }
    }
    console.info('Removed ' + counter + ' object(s).');
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    console.info(data);
    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    var columnsWidthList = getColumnsWidthList();

    if (columnsWidthList === -1) {
        console.info('There are no contacts in the phone book');

        return 0;
    }

    printTopTableLine(columnsWidthList);
    printTableHeaders(columnsWidthList);
    printMidTableLine(columnsWidthList);
    printTableContent(columnsWidthList);
    printBotTableLine(columnsWidthList);
};

function searchThroughObject(obj, query) {
    var valuesList = getObjectValues(obj);

    for (var i = 0; i < valuesList.length; i++) {
        if (valuesList[i].indexOf(query) !== -1) {
            return true;
        }
    }

    return false;
}

function getObjectValues(obj) {
    var keysList = getObjectKeys(obj);
    var valuesList = keysList.map(function (key) {
        return obj[key];
    });

    return valuesList;
}

function getObjectKeys(obj) {
    return Object.keys(obj);
}

function getTableHeaders() {
    if (phoneBook.length === 0) {
        return -1;
    }

    return getObjectKeys(phoneBook[0]);
}

function getColumnsWidthList() {
    // Fill the array with headers' lengths
    var columnsWidthList = getTableHeaders().map(function (header) {
        return header.length;
    });

    // The width of a column should be either the header's length or
    // the length of the object's value with max string size.
    for (var i = 0; i < phoneBook.length; i++) {
        var valuesList = getObjectValues(phoneBook[i]);
        for (var k = 0; k < valuesList.length; k++) {
            columnsWidthList[k] = Math.max(columnsWidthList[k], valuesList[k].length);
        }
    }

    return columnsWidthList;
}

function printTableLine(linePosition, columnsWidthList) {
    var columnsList = [];
    for (var i = 0; i < columnsWidthList.length; i++) {
        columnsList.push('─'.repeat(columnsWidthList[i]));
    }
    var leftBorderSymbol = '';
    var separatorSymbol = '';
    var rightBorderSymbol = '';

    switch (linePosition) {
        case 'top':
            leftBorderSymbol = '┌';
            separatorSymbol = '┬';
            rightBorderSymbol = '┐';
            break;
        case 'mid':
            leftBorderSymbol = '├';
            separatorSymbol = '┼';
            rightBorderSymbol = '┤';
            break;
        case 'bot':
            leftBorderSymbol = '└';
            separatorSymbol = '┴';
            rightBorderSymbol = '┘';
            break;
        default:
            return;
    }

    var resultString = leftBorderSymbol;

    for (var j = 0; j < columnsWidthList.length - 1; j++) {
        resultString += columnsList[j] + separatorSymbol;
    }

    resultString += columnsList[columnsWidthList.length - 1] + rightBorderSymbol;

    console.info(resultString);
}

function printTopTableLine(columnsWidthList) {
    printTableLine('top', columnsWidthList);
}

function printMidTableLine(columnsWidthList) {
    printTableLine('mid', columnsWidthList);
}

function printBotTableLine(columnsWidthList) {
    printTableLine('bot', columnsWidthList);
}

function printTableHeaders(columnsWidthList) {
    var resultString = '│';
    var j = 0;
    var headersList = getTableHeaders();

    for (var i = 0; i < headersList.length; i++) {
        resultString += headersList[i] + ' '.repeat(columnsWidthList[j] - headersList[i].length);
        resultString += '│';
        j++;
    }

    console.info(resultString);
}

function printTableContent(columnsWidthList) {
    for (var i = 0; i < phoneBook.length; i++) {
        var resultString = '│';
        var valuesList = getObjectValues(phoneBook[i]);
        for (var j = 0; j < valuesList.length; j++) {
            resultString += valuesList[j] + ' '.repeat(columnsWidthList[j] - valuesList[j].length);
            resultString += '│';
        }
        console.info(resultString);
    }
}

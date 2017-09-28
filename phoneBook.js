'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

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

function validateName(name) {
    return typeof name === 'string';
}

function validatePhone(phone) {
    var phoneRegExp = /^\+?[0-9]{0,2}\s?(\([0-9]{3}\)|[0-9]{3})[0-9-\s]{7,10}$/;

    return typeof phone === 'string' && phoneRegExp.test(phone) === true;
}

function validateEmail(email) {
    var emailRegExp = /^[a-zа-я0-9-]+@[a-zа-я0-9-]+\.[a-zа-я]+[.a-zа-я]*$/;

    return typeof email === 'string' && emailRegExp.test(email) === true;
}

function searchThroughObject(obj, query) {
    for (var entry in obj) {
        if (obj[entry].indexOf(query) !== -1) {
            return true;
        }
    }

    return false;
}

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

function getColumnsWidthList() {
    if (phoneBook.length === 0) {
        return -1;
    }

    var columnsWidthList = [];

    // Fill the array with the headers' lengths
    for (var key in phoneBook[0]) {
        columnsWidthList.push(key.length);
    }

    // Find the columns lengths that fit any data
    var j = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        for (var key in phoneBook[i]) {
            columnsWidthList[j] = Math.max(columnsWidthList[j], phoneBook[i][key].length);
            j++;
        }
        j = 0;
    }

    return columnsWidthList;
}

function printTableLine(linePosition, columnsWidthList) {
    var columnsList = [];
    for (var i = 0; i < columnsWidthList.length; i++) {
        columnsList.push('─'.repeat(columnsWidthList[i]));
    }
    var leftBorderSymbol = '';
    var thinSeparatorSymbol = '';
    var thickSeparatorSymbol = '';
    var rightBorderSymbol = '';

    switch (linePosition) {
        case 'top':
            leftBorderSymbol = '┌';
            thinSeparatorSymbol = '┬';
            thickSeparatorSymbol = '╥';
            rightBorderSymbol = '┐';
            break;
        case 'mid':
            leftBorderSymbol = '├';
            thinSeparatorSymbol = '┼';
            thickSeparatorSymbol = '╫';
            rightBorderSymbol = '┤';
            break;
        case 'bot':
            leftBorderSymbol = '└';
            thinSeparatorSymbol = '┴';
            thickSeparatorSymbol = '╨';
            rightBorderSymbol = '┘';
            break;
        default:
            return;
    }

    var resultString = leftBorderSymbol;

    for (var j = 0; j < columnsWidthList.length - 1; j++) {
        resultString += columnsList[j] + thinSeparatorSymbol;
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
    for (var key in phoneBook[0]) {
        resultString += key + ' '.repeat(columnsWidthList[j] - key.length) + '│';
        j++;
    }

    console.info(resultString);
}

function printTableContent(columnsWidthList) {
    var resultString = '│';

    var j = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        for (var key in phoneBook[i]) {
            resultString += phoneBook[i][key] +
                            ' '.repeat(columnsWidthList[j] - phoneBook[i][key].length) + '│';
            j++;
        }
        console.info(resultString);
        resultString = '│';
        j = 0;
    }
}

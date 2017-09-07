// learn oop
'use strict';


var PhoneBook = function () {


    Array.call(this);
    this.phoneBook = [];


};


function validateEmail(email) {
    var regE;
    regE = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-я0-9_-]+(\.[a-я0-9_-]+)*\.[a-zа-я]{2,6}$/.test(email);

    return regE;
}

function validatePhone(phone) {

    return /^\+?([0-9]{1,2}[\- ]?)?((\(\d{3}\))|(\d{3}))[\- ]?[\d\- ]{7,10}$/.test(phone);
}

function print(person) {
    var pstr = '';
    var i = Object.keys(person).length;
    var j = 0;
    for (var key in person) {
        if (j <= i) {
            pstr = pstr + person[key];
            j++;
            pstr = pstr + ', ';
        }
    }
    pstr = pstr.substring(0, pstr.length - 2);
    console.info(pstr);

    return true;
}


PhoneBook.prototype.add = function (name, phone, email) {
    if (!validateEmail(email) || !validatePhone(phone) || name.length === 0) {
        return this;
    }

    var person = {
        name: name,
        phone: phone,
        email: email
    };
    // console.info(person);
    // Ваша невероятная магия здесь
    this.phoneBook.push(person);
    // console.info(this.phoneBook);
    print(person);

    return this;
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.

*/
function findInPerson(person, query) {

    for (var key in person) {
        // if (regexp.test(phoneBook[i][key])) {
        if (person[key].indexOf(query, 0) !== -1) {
            return true;
        }
    }

    return false;
}


function find(pBook, query) {
    // Ваша удивительная магия здесь
    // var i = phoneBook.length;
    var findPersonNum = [];
    console.info('Поиск');
    var arr = pBook;
    for (var i = 0; i < arr.length; i++) {
        var person = arr[i];
        if (findInPerson(person, query)) {
            findPersonNum.push(i);
            print(arr[i]);
        }
    }

    return findPersonNum;
}

PhoneBook.prototype.find = function (query) {
    find(this, query);

    return this;
};

PhoneBook.prototype.remove = function remove(query) {
    console.info('Удаление');
    var findPersonNum = find(query);
    for (var i = 0; i < findPersonNum.length; i++) {

        this.phoneBook.splice(findPersonNum[i], 1);
    }
    // Ваша необьяснимая магия здесь

    return this;
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
PhoneBook.prototype.importFromCsv = function (filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    console.info('Import');
    var fileLines = data.split(/\r?\n+/);
    for (var i = 0; i < fileLines.length; i++) {
        var d = fileLines[i].split(';');
        this.add(d[0], d[1], d[2]);
    }
    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу

    return this;
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
PhoneBook.prototype.showTable = function () {
    var totalLenght = 64;
    var space = Array(20).join(' ');
    var firstLine = Array(64).join('=');
    var secondLine = '|' + Array(62).join(' ') + '|';
    console.info(firstLine);
    console.info(secondLine);
    var arr = this.phoneBook;
    for (var i = 0; i < arr.length; i++) {
        var sline = '|  ' + (arr[i].name + space).substr(0, 18) + '| ';
        sline = sline + (arr[i].phone + space).substr(0, 18) + '| ';
        sline = sline + (arr[i].email + space).substr(0, 18) + ' |';
        console.info(sline.substr(0, totalLenght));
    }
    console.info(secondLine);
    console.info(firstLine);
    // Ваша чёрная магия здесь

    return this;
};

module.exports = new PhoneBook();

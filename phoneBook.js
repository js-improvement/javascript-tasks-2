'use strict';

var phoneBook = new PhoneBook();

module.exports.PhoneBook = function PhoneBook() {

    var pBook = [];
    var self = this;
    function validateEmail(email) {
        var regE;
        regE = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-я0-9_-]+(\.[a-я0-9_-]+)*\.[a-zа-я]{2,6}$/.test(email);

        return regE;
    }

    function validatePhone(phone) {

        return /^\+?([0-9]{1,2}[\- ]?)?((\(\d{3}\))|(\d{3}))[\- ]?[\d\- ]{7,10}$/.test(phone);
    }

    this.print = function (person) {
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
    };

    this.add = function (name, phone, email) {
        if (!validateEmail(email) || !validatePhone(phone) || name.length === 0) {
            return self;
        }

        var person = {
            name: name,
            phone: phone,
            email: email
        };
        // console.info(person);
        // Ваша невероятная магия здесь
        pBook.push(person);
        // console.info(phoneBook);
        self.print(person);

        return self;
    };


} // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/


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


module.exports.find = function find(query) {
    // Ваша удивительная магия здесь
    // var i = phoneBook.length;
    var findPersonNum = [];
    console.info('Поиск');
    for (var i = 0; i < phoneBook.length; i++) {
        var person = phoneBook[i];
        if (findInPerson(person, query)) {
            findPersonNum.push(i);
            print(phoneBook[i]);
        }
    }

    return findPersonNum;
};


/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    console.info('Удаление');
    var findPersonNum = module.exports.find(query);
    for (var i = 0; i < findPersonNum.length; i++) {

        phoneBook.splice(findPersonNum[i], 1);
    }
    // Ваша необьяснимая магия здесь

    return findPersonNum.length;
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    console.info('Import');
    var fileLines = data.split(/\r?\n+/);
    for (var i = 0; i < fileLines.length; i++) {
        var d = fileLines[i].split(';');
        module.exports.add(d[0], d[1], d[2]);
    }
    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    var totalLenght = 64;
    var space = Array(20).join(' ');
    var firstLine = Array(64).join('=');
    var i = 0;
    var secondLine = '|' + Array(62).join(' ') + '|';
    console.info(firstLine);
    console.info(secondLine);
    for (i = 0; i < phoneBook.length; i++) {
        var sline = '|  ' + (phoneBook[i].name + space).substr(0, 18) + '| ';
        sline = sline + (phoneBook[i].phone + space).substr(0, 18) + '| ';
        sline = sline + (phoneBook[i].email + space).substr(0, 18) + ' |';
        console.info(sline.substr(0, totalLenght));
    }
    console.info(secondLine);
    console.info(firstLine);
    // Ваша чёрная магия здесь

};

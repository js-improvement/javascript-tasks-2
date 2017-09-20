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
            console.log(phoneBook[i].name + ', ' + phoneBook[i].phone + ', ' + phoneBook[i].email);
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
    console.log('Removed ' + counter + ' object(s).');
};

function validateName(name) {
    if (typeof name === 'string') {
        return true;
    }

    return false;
}

function validatePhone(phone) {
    var phoneRegExp = /^\+?[0-9]{0,2}\s?(\([0-9]{3}\)|[0-9]{3})[0-9-\s]{7,10}$/;
    if (typeof phone === 'string' && phoneRegExp.test(phone) === true) {
        return true;
    }

    return false;
}

function validateEmail(email) {
    var emailRegExp = /^[a-zа-я0-9-]+@[a-zа-я0-9-]+\.[a-zа-я]+[.a-zа-я]*$/;
    if (typeof email === 'string' && emailRegExp.test(email) === true) {
        return true;
    }

    return false;
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

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {

    console.log(phoneBook);

};

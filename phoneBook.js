'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите
var numberOfDelete;

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    // Ваша невероятная магия здесь
    console.info('Исполняем ADD');
    if (toValidateNumber(phone) && toValidateEmail(email)) {
        var person = {};
        person.name = name;
        person.phone = phone;
        person.email = email;
        phoneBook.push(person);
        console.info('вы ввели', phoneBook[phoneBook.length - 1]);
    } else {
        console.info('неверный формат данных!');
    }

};

function toValidateNumber(phone) {
    var regExp = /^((8|\+?7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    if (regExp.test(phone)) {

        return true;
    }
}


function toValidateEmail(email) {
    var regExp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    if (regExp.test(email)) {
        return true;
    }

}

/*
  Функция поиска записи в телефонную книгу.
  Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    console.info('Исполняем FIND');
    // Ваша удивительная магия здесь
    var i;
    for (i = 0; i <= phoneBook.length - 1; i++) {

        toSearch (i, query);

    }

};

function toSearch(i, query) {

    if (phoneBook[i].name.indexOf(query) !== -1) {
        console.info(phoneBook[i].name + ', ' + phoneBook[i].phone +
                ', ' + phoneBook[i].email);
    }
    if (phoneBook[i].phone.indexOf(query) !== -1) {
        console.info(phoneBook[i].name + ', ' + phoneBook[i].phone +
            ', ' + phoneBook[i].email);
    }
    if (phoneBook[i].email.indexOf(query) !== -1) {
        console.info(phoneBook[i].name + ', ' + phoneBook[i].phone +
            ', ' + phoneBook[i].email);
    }

    return;

}

// Функция удаления записи в телефонной книге.

module.exports.remove = function remove(query) {
    console.info('Исполняем REMOVE');
    // Ваша необьяснимая магия здесь
    var i;

    for (i = 0; i <= phoneBook.length - 1; i++) {

        toSearchDelete (i, query);

        delete phoneBook[numberOfDelete];
    }

};
function toSearchDelete(i, query) {
    if (phoneBook[i].name.indexOf(query) !== -1) {
        console.info(' Контакт ' + phoneBook[i].name + ' был удалён');
        numberOfDelete = i;
    }
    if (phoneBook[i].phone.indexOf(query) !== -1) {
        console.info(' Контакт ' + phoneBook[i].name + ' был удалён');
        numberOfDelete = i;
    }
    if (phoneBook[i].email.indexOf(query) !== -1) {
        console.info(' Контакт ' + phoneBook[i].name + ' был удалён');
        numberOfDelete = i;
    }

    return;
}

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    console.info('Исполняем importFromCsv');
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    var dataParsingPerson = data.split(['\n']);
    for (var i = 0; i <= dataParsingPerson.length - 1; i++) {
        var dataParsingItem = dataParsingPerson[i].split(';');
        console.info(dataParsingItem[0] + '   ' + dataParsingItem[1]);
// - Добавляете каждую запись в книгу
        if (toValidateNumber(dataParsingItem[1]) && toValidateEmail(dataParsingItem[2])) {
            var person = {};
            person.name = dataParsingItem[0];
            person.phone = dataParsingItem[1];
            person.email = dataParsingItem[2];
            phoneBook.push(person);
        } else {
            console.info('неверный формат данных!');
        }

    }

};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    console.info('Исполняем showTable');
// Ваша чёрная магия здесь
    console.info(String('\n┌────────────────────┬────────' +
        '────────────┬─────────────────────────┐\n' +
        '│ Имя                │ Телефон            │ email                   │\n├─' +
        '───────────────────┼────────────────────│───────────────────────' +
        '--┤'));
    var i;
    for (i = 0; i <= phoneBook.length - 1; i++) {
        var space = ' ';

        var countSpaceName = 20 - phoneBook[i].name.length;
        var countSpacePhone = 20 - phoneBook[i].phone.length;
        var countSpaceEmail = 25 - phoneBook[i].email.length;

        console.info('│' + phoneBook[i].name + space.repeat(countSpaceName) +
        '│' + phoneBook[i].phone + space.repeat(countSpacePhone) + '│' +
            phoneBook[i].email + space.repeat(countSpaceEmail) + '│');
    }
    console.info('│' + '_'.repeat(20) + '│' + '_'.repeat(20) + '│' + '_'.repeat(25) + '│');
};

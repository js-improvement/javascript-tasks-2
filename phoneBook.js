'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    // Ваша невероятная магия здесь
    if ((name === '') || (phone === '') || (email === '')) {
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

    // Ваша удивительная магия здесь

};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {

    // Ваша необьяснимая магия здесь

};

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
    tableTop();

    for (var i = 0; i < phoneBook.length; i++) {
        var line = symb(9474);
        line = line + ' ' + phoneBook[i].name + spaces(12, phoneBook[i].name.length) + symb(9474);
        line = line + ' ' + phoneBook[i].phone + spaces(19, phoneBook[i].phone.length) + symb(9553);
        line = line + ' ' + phoneBook[i].email + spaces(17, phoneBook[i].email.length) + symb(9474);
        console.log(line);
    }

    tableBottom();
};

// phoneBook.add('Сергей', '7 999 6667778', 'gs@example.com');
// phoneBook.add('Сергей', '7 999 6667778', 'gs@example.com');
// phoneBook.add('Сергей 2', '999 4433444', 'gs@example.com');
// phoneBook.add('Олег', '+7 (999) 777-7-777', 'just7@yandex-team.ru');
// phoneBook.push(['Name', 'tel', 'email']);
// phoneBook.push(['Name2', 'tel2', 'email2']);

function HLine(width) {
    var line = '';
    for (var i = 0; i < width; i++) {
        line = line + symb(9472);
    }

    return line;
}

function symb(codeValue) {
    return String.fromCharCode(codeValue);
}

function tableTop() {
    console.log(symb(9484) + HLine(13) + symb(9516) + HLine(20) + symb(9573) + HLine(18) + symb(9488));
    console.log(symb(9474) + ' Имя' + spaces(12, 3) + symb(9474) + ' Телефон' + spaces(19, 7) + symb(9553) + ' email' + spaces(17, 5) + symb(9474));
    console.log(symb(9500) + HLine(13) + symb(9532) + HLine(20) + symb(9579) + HLine(18) + symb(9508));
}

function tableBottom() {
    console.log(symb(9492) + HLine(13) + symb(9524) + HLine(20) + symb(9576) + HLine(18) + symb(9496));
}

function spaces(maxSpacesAmount, reduceAmount) {
    var spacesAmount = maxSpacesAmount - reduceAmount;
    var line = '';
    for (var i = 0; i < spacesAmount; i++) {
        line = line + ' ';
    }

    return line;
}

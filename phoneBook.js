'use strict';

/**
 * Класс PhoneBook - телефонная книга.
 * Содержит массив (phoneBook)
 * Телефонная книга состоит из массивов(name:Имя, phone:+7999999, email:email@email.ru
 */
class PhoneBook {

    /**
     * Конструктор PhoneBook.
     *
     * @constructor
     * @this {PhoneBook}
     * @param {PhoneBook} data  Создание PhoneBook на основании другого элемента PhoneBook
     */
    constructor(data) {
        this.phoneBook = [];
        Array.prototype.push.apply(this.phoneBook, data);
    }

    /**
     * Добавление новой записи в телефонную книгу. Добавляются только записи прошедшие проверку
     * @param {String} name Имя.
     * @param {String} phone Телефон.
     * @param {String} email Электронная почта.
     * @returns {PhoneBook}
     */
    add(name, phone, email) {

        /** Валидация Email
         *
         * @param {String} e Адрес почты
         * @returns {boolean|*}
         */
        var validateEmail = function (e) {
            var r;
            r = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-я0-9_-]+(\.[a-я0-9_-]+)*\.[a-zа-я]{2,6}$/.test(e);

            return r;
        };

        /** Валидация номера телефона
         *
         * @param {String} p номер телефона
         * @returns {boolean}
         */
        var validatePhone = function (p) {
            return /^\+?([0-9]{1,2}[\- ]?)?((\(\d{3}\))|(\d{3}))[\- ]?[\d\- ]{7,10}$/.test(p);
        };
        // Проверка
        if (!validateEmail(email) || !validatePhone(phone) || name.length === 0) {
            return this;
        }

        this.phoneBook.push({
            name: name,
            phone: phone,
            email: email
        });
        this.print(this.phoneBook.length - 1);

        return this;
    }

    /**
     * Вывод в консоль строки телефонной книги по идентификатору
     * @param {String}id
     * @returns {PhoneBook}
     */
    print(id) {
        var pstr = this.phoneBook[id];
        console.info(pstr.name + ',' + pstr.phone + ',' + pstr.email);

        return this;
    }

    /**
     * Поиск строк телефонной книги, которые удовлетворяют условию поиска
     * @param {String}query
     * @returns {PhoneBook} Возвращает PhoneBook состоящий из строк, которые удовлетворяют условию.
     */
    find(query) {
        console.info('find start');
        var find = function (person) {
            // Ваша удивительная магия здесь
            // var i = phoneBook.length;
            for (var key in person) {
                // if (regexp.test(phoneBook[i][key])) {
                if (person[key].indexOf(query) !== -1) {
                    return true;
                }
            }

            return false;
        };

        return new PhoneBook(this.phoneBook.filter(find));
    }

    /**
     * Удаление строк PhoneBook которые удовлетворяют условию
     * @param {String}query
     * @returns {PhoneBook}
     */
    remove(query) {
        console.info('Удаление');
        var find = function (person) {
            for (var key in person) {
                if (person[key].indexOf(query) !== -1) {
                    return false;
                }
            }

            return true;
        };
        this.phoneBook = this.phoneBook.filter(find);

        return this;
    }

    /**
     * Отображение телефонной книги в консоли
     * @returns {PhoneBook}
     */
    showTable() {
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

        return this;
    }

    /**
     * Импорт телефонной книги из файла .CSV
     * @param {String}filename
     * @returns {PhoneBook}
     */
    importFromCsv(filename) {
        var data = require('fs').readFileSync(filename, 'utf-8');
        console.info('Import');
        var fileLines = data.split(/\r?\n+/); // Парсим на строки
        for (var i = 0; i < fileLines.length; i++) { // Добавляем кажлую строку отдельно
            var d = fileLines[i].split(';');
            this.add(d[0], d[1], d[2]);
        }

        return this;
    }
}


module.exports = PhoneBook;

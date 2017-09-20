'use strict';

var phoneBook = require('./phoneBook');

// Добавляем записи
phoneBook.addContact('Сергей', '7 999 6667778', 'gs@example.com');
phoneBook.addContact('Сергей 2', '999 4433444', 'gs@example.com');
phoneBook.addContact('MrTrump', '+7 (999) 777-7-777', 'just7@yandex-team.ru');
//console.info(phoneBook.addContact('Честный Хрюндель', 'invalid phone', 'honest-hrundel'));

phoneBook.find('3');
// Выводит построчно записи, все поля через запятую:
// Сергей, +7 (999) 666-7-778, gogolef@yandex-team.ru
// Олег, +7 (999) 777-7-777, just7@yandex-team.ru

phoneBook.remove('3');
// Выводит количество удалённых контактов, которые удовлетворят запросу:
// Удален 1 контакт

// Выводит записи в виде красивой таблички
phoneBook.showTable();
// Выводит
// ┌─────────────┬────────────────────╥──────────────────┐
// │ Имя         │ Телефон            ║ email            │
// ├─────────────┼────────────────────╫──────────────────┤
// │ Сергей      │ +7 (999) 666-77-78 ║ gs@example.com   │
// │ Сергей 2    │ +7 (999) 443-34-44 ║ gs@example.com   │
// └─────────────┴────────────────────╨──────────────────┘


// Экспортируем записи, пример файла рядом
// phoneBook.importFromCsv('./backup.csv');
// Добавлено 4 контакта

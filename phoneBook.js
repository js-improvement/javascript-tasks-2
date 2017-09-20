'use strict';

var phoneBook = [];

// function validContact(name, phone, email) {
// }
/**
 * ФУНКЦИЯ ИЩЕТ МАКСИМАЛЬНУЮ ДЛИННУ ЭЛЕМЕНТА
 * ДЛЯ ПОСЛЕДУЮЩЕГО ВЫВОДА В ВИДЕ ТАБЛИЦЫ
 * С ИСПОЛЬЗОВАНИЕМ СИМВОЛОВ ASCII
 * @param numbOfColumn -НОМЕР КОЛОНКИ
 * 0 -КОЛОНКА ИМЕН
 * 1 -КОЛОНКА ТЕЛЕФОННЫХ НОМЕРОВ
 * 2 -КОЛОНКА ЭЛЕКТРОННОЙ ПОЧТЫ
 * @returns {number} -ВОЗВРАЩАЕТ МАКСИМАЛЬНУЮ ДЛИННУ
 */
function columnMaxLenght(numbOfColumn) {
    var maxLenght = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i][numbOfColumn].length > maxLenght) {
            maxLenght = phoneBook[i][numbOfColumn].length;
        }
    }

    return maxLenght;
}

/**
 * МЕГА ФУНКЦИЯ ПОИСКА
 * КОТОРАЯ БУДЕТ ИСПОЛЬЗОВАНА В ДАЛЬНЕЙШЕМ
 * ДЛЯ ПОИСКА И УДАЛЕНИЯ КОНТАКТОВ
 * @param inputData -ШАБЛОН ПОИСКА В ВИДЕ СТРОКИ
 * @param phoneBook -ТЕЛЕФОННАЯ КНИГА
 * @returns {Array} -МАСИИВ НАЙДЕННЫХ КОНТАКТОВ
 */
function finder(inputData, phoneBook) {
    var searchPattern = new RegExp(inputData, 'i');
    var findedContacts = [];
    if (inputData === undefined || inputData === null) {

        return phoneBook;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (searchPattern.test(phoneBook[i].toString()) === true) {
            findedContacts.push(phoneBook[i]);
        }
    }
    if (findedContacts.length === 0) {

        return false;
    }

    return findedContacts;

}

/**
 * ПОЛНЫЙ ТРЭШ!!!
 * НАПИСАНО В СООАВТОРСТВЕ С САТАНОЙ
 * ГЛУБОКОЙ НОЧЬЮ ПОД ДВУМЯ ДОЗАМИ ДВОЙНОГО ЭСПРЕССО
 * ПЕЧАТАЕМ ГОВНОТАБЛИЧКУ
 * @param arrayToPrint -МАСИИВ ДАННЫХ, ПОСТУПАЮЩИЙ НА ПЕЧАТЬ
 */
function printTable(arrayToPrint) {
    console.info('-'.repeat(columnMaxLenght(0) + columnMaxLenght(1) + columnMaxLenght(2) + 10));
    console.info('| ИМЯ' + ' '.repeat(columnMaxLenght(0) - 2) + '| ТЕЛЕФОН' +
    ' '.repeat(columnMaxLenght(1) - 6) + '| eMAIL' + ' '.repeat(columnMaxLenght(2)-4) + '|');
    console.info('-'.repeat(columnMaxLenght(0) + columnMaxLenght(1) + columnMaxLenght(2) + 10));
    //console.info(arrayToPrint);
    for (var i = 0; i < arrayToPrint.length; i++) {
        console.info('| ' + arrayToPrint[i][0] + ' '.repeat(columnMaxLenght(0) - arrayToPrint[i][0].length + 1) +
            '| ' + arrayToPrint[i][1] + ' '.repeat(columnMaxLenght(1) - arrayToPrint[i][1].length + 1) +
            '| ' + arrayToPrint[i][2] + ' '.repeat(columnMaxLenght(2) - arrayToPrint[i][2].length + 1) + '|');
    }
    console.info('-'.repeat(columnMaxLenght(0) + columnMaxLenght(1) + columnMaxLenght(2) + 10) + '\n');

}

/**
 * ФУНКЦИЯ ДОБАВЛЕНИЯ ЗАПИСИ В ТЕЛЕФОННУЮ КНИГУ
 * В ВИДЕ МАССИВА
 * ЕСЛИ ДАННЫЕ ПРОХОДЯТ ПРОВЕРКУ НА ВАЛИДНОСТЬ
 * @param name - ИМЯ КОНТАКТА
 * @param phone - НОМЕР ТЕЛЕФОНА
 * @param email - ЭЛЕКТРОННАЯ ПОЧТА
 * @returns {Array} - НА ВЫХОДЕ МАССИВ ИЗ КОНТАКТОВ
 **/
module.exports.addContact = function addContact(name, phone, email) {
    var contact = [];
    contact.push(name, phone, email);
    phoneBook.push(contact);

    return phoneBook;
};

/**
 * ФУНКЦИЯ ПОИСКА
 * ПЕЧАТАЕТ ТАБЛИЧКУ С МАССИВОМ
 * РЕЗУЛЬТАТОВ ПОИСКА
 * И КОЛИЧЕСТВО СОВПАДЕНИЙ
 * ИЛИ РУГАТЕЛЬСТВО
 * @param query -ПРИНИМАЕТ СТРОКОВОЕ ЗНАЧЕНИЕ ДЛЯ ПОИСКА
 */
module.exports.find = function find(query) {
    if (finder(query, phoneBook) === false) {
        console.info(query + '  <-----------<  I CAN NOT FIND THIS SHIT!\n');
    } else {
        console.info('НАЙДЕНО КОНТАКТОВ: ' + finder(query, phoneBook).length);
        printTable(finder(query, phoneBook));
    }
};

/**
 * ФУНКЦИЯ УДАЛЕНИЯ КОНТАКТА
 * ПЕЧАТАЕТ ТАБЛИЧКУ УДАЛЕННЫХ КОНТАКТОВ
 * И ИХ КОЛИЧЕСТВО
 * ИЛИ РУГАТЕЛЬСТВО
 * @param query -ПРИНИМАЕТ СТРОКОВОЕ ЗНАЧЕНИЕ ДЛЯ ПОИСКА
 * УДАЛЯЕМЫХ КОНТАКТОВ
 */
module.exports.remove = function remove(query) {
    var findedArr = finder(query, phoneBook);
    if (finder(query, phoneBook) === false) {
        console.info(query + '  <-----------<  I CAN NOT FIND AND DELETE THIS SHIT!\n');
    } else {
        let newBook = phoneBook.filter( x => findedArr.indexOf(x) === -1);//КАК ЗАВЕЩАЛ ЕВСТРОПОВ
        //СТЫРИЛ С STACKOVERFLOW.COM
        phoneBook = newBook;
        console.info('УДАЛЕНО КОНТАКТОВ: ' + findedArr.length);
        printTable(findedArr);
    }
};

module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
};

/**
 * ФУНКЦИЯ ПЕЧАТИ СОДЕРЖИМОГО ТЕЛЕФОННОЙ КНИГИ
 * ПЕЧАТАЕТ ТАБЛИЧКУ С ТЕЛЕФОННОЙ КНИГОЙ
 * БЕЗ УДАЛЕННЫХ КОНТАКТОВ
 * ЕСЛИ, КОНЕЧНО, ЧТО ТО БЫЛО УДАЛЕНО
 */
module.exports.showTable = function showTable() {
    console.info('ПОСЛЕДНЯЯ ВЕРСИЯ ТЕЛЕФОННОЙ КНИГИ :');
    printTable(phoneBook);
};


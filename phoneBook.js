'use strict';

var phoneBook = [];

// function validContact(name, phone, email) {
// }
/**
 * ФУНКЦИЯ ИЩЕТ МАКСИМАЛЬНУЮ ДЛИННУ ЭЛЕМЕНТА
 * ДЛЯ ПОСЛЕДУЮЩЕГО ВЫВОДА В ВИДЕ ТАБЛИЦЫ
 * С ИСПОЛЬЗОВАНИЕМ СИМВОЛОВ ASCII
 * @param numbOfColumn -НОМЕР КОЛОНКИ
 * @param arrayToPrint -МАССИВ ДЛЯ ПЕЧАТИ
 * 0 -КОЛОНКА ИМЕН
 * 1 -КОЛОНКА ТЕЛЕФОННЫХ НОМЕРОВ
 * 2 -КОЛОНКА ЭЛЕКТРОННОЙ ПОЧТЫ
 * @returns {number} -ВОЗВРАЩАЕТ МАКСИМАЛЬНУЮ ДЛИННУ
 */
function columnMaxLenght(numbOfColumn, arrayToPrint) {
    var maxLenght = 0;
    for (var i = 0; i < arrayToPrint.length; i++) {
        if (arrayToPrint[i][numbOfColumn].length > maxLenght) {
            maxLenght = arrayToPrint[i][numbOfColumn].length;
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
 * @param choo - -1 ДЛЯ УДАЛЕНИЯ КОНТАКТОВ, 1 -ДЛЯ ВСЕГО ОСТАЛЬНОГО
 * @returns {Array} -МАСИИВ НАЙДЕННЫХ КОНТАКТОВ
 */
function finder(inputData, phoneBook, choo) {
    var searchPattern = new RegExp(inputData, 'i');
    var findedContacts = [];
    if (inputData === undefined || inputData === null) {

        return phoneBook;
    }
    for (var i = 0; i < phoneBook.length; i++) {
        if (choo < 0 ? searchPattern.test(phoneBook[i].toString()) === true : searchPattern.test(phoneBook[i].toString()) === false) {
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
 * ГОВНОТАБЛИЧКА ИМЕЕТ ШИРИНУ, ЗАВИСЯЩУЮ ОТ
 * ДЛИННЫ ЭЛЕМЕНТОВ ПЕЧАТУЕМОГО МАССТВА
 * @param arrayToPrint -МАСИИВ ДАННЫХ, ПОСТУПАЮЩИЙ НА ПЕЧАТЬ
 */
function printTable(arrayToPrint) {
    var r1name = columnMaxLenght(0, arrayToPrint);
    var r1phone = columnMaxLenght(1, arrayToPrint);
    var r1mail = columnMaxLenght(2, arrayToPrint);
    console.info('-'.repeat(r1name + r1phone + r1mail + 10));
    console.info('| ИМЯ' + ' '.repeat(r1name - 2) + '| ТЕЛЕФОН' + ' '.repeat(r1phone - 6) +
        '| eMAIL' + ' '.repeat(r1mail - 4) + '|');
    console.info('-'.repeat(r1name + r1phone + r1mail + 10));
    for (var i = 0; i < arrayToPrint.length; i++) {
        var nameLenght = columnMaxLenght(0, arrayToPrint) - arrayToPrint[i][0].length;
        var phoneLenght = columnMaxLenght(1, arrayToPrint) - arrayToPrint[i][1].length;
        var mailLenght = columnMaxLenght(2, arrayToPrint) - arrayToPrint[i][2].length;
        console.info('| ' + arrayToPrint[i][0] + ' '.repeat(nameLenght + 1) +
            '| ' + arrayToPrint[i][1] + ' '.repeat(phoneLenght + 1) +
            '| ' + arrayToPrint[i][2] + ' '.repeat(mailLenght + 1) + '|');
    }
    console.info('-'.repeat(r1name + r1phone + r1mail + 10) + '\n');

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
    if (finder(query, phoneBook, -1) === false) {
        console.info(query + '  <-----------<  I CAN NOT FIND THIS SHIT!\n');
    } else {
        console.info('НАЙДЕНО КОНТАКТОВ: ' + finder(query, phoneBook, -1).length);
        printTable(finder(query, phoneBook, -1));
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
    var findedArr = finder(query, phoneBook, -1);
    if (findedArr === false) {
        console.info(query + '  <-----------<  I CAN NOT FIND AND DELETE THIS SHIT!\n');
    } else {
        var newBook = finder(query, phoneBook, 1);
            // phoneBook.filter( x => findedArr.indexOf(x) === -1); //КАК ЗАВЕЩАЛ ЕВСТРОПОВ
        // СТЫРИЛ С STACKOVERFLOW.COM НО, ГАДИНА, ESLINT, РУГАЕТСЯ(((((
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


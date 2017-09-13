'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

module.exports.addContact = function addContact(name, phone, email) {
    var contact = [];
    contact.push(name, phone, email);
    phoneBook.push(contact);

    return phoneBook;
};
module.exports.addContact();

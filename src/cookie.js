/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

const homeworkContainer = document.querySelector('#homework-container');
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
const addNameInput = homeworkContainer.querySelector('#add-name-input');
const addValueInput = homeworkContainer.querySelector('#add-value-input');
const addButton = homeworkContainer.querySelector('#add-button');
const listTable = homeworkContainer.querySelector('#list-table tbody');

let createTableRow = (name, value) => {
    let tableRow = document.createElement('tr');
    let nameElem = document.createElement('td');
    let valueElem = document.createElement('td');
    let deleteElem = document.createElement('td');
    let deleteButton = document.createElement('button');

    nameElem.innerHTML = name;
    valueElem.innerHTML = value;

    tableRow.appendChild(nameElem);
    tableRow.appendChild(valueElem);
    tableRow.appendChild(deleteElem);
    deleteElem.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        deleteCookie(name);
    });
    
    return tableRow;
}

let getCookies = (filter) => {
    let cookies = document.cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');

        !current || prev.push({ name, value });

        return prev;
    }, []);
   
    return cookies.filter(cookie => isMatching(cookie.name, filter) || isMatching(cookie.value, filter));
}

let setCookie = (name, value, expires) => {
    let cookie = `${name}=${value}; expires=${expires || (new Date).getDate() + 1}`;
  
    document.cookie = cookie;
}

let deleteCookie = (name) => {
    document.cookie = `${name}=''; expires='Thu, 01 Jan 1970 00:00:01 GMT'`;

    updateTable();
}

let updateTable = () => {
   
    listTable.innerHTML = '';

    getCookies(filterNameInput.value).forEach(cookie => 
        listTable.appendChild(createTableRow(cookie.name, cookie.value)));
}

filterNameInput.addEventListener('keyup', updateTable);

addButton.addEventListener('click', function() {
    setCookie(addNameInput.value, addValueInput.value);

    // не понимаю почему не работает следующая строка вместо setCookie()
    // document.cookie = `${addNameInput.value}=${addValueInput.value}; expires=${expires || (new Date).getDate() + 1}`;

    updateTable();
});

updateTable();

let isMatching = (full, chunk) => full.toUpperCase().indexOf(chunk.toUpperCase()) !== -1;

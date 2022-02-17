const tablesContainer = document.querySelector('.table-divs-container');
const financeDesc = document.querySelector('#desc-transaction');
const financeValue = document.querySelector('#desc-value');
const financeDate = document.querySelector('#date-value');

const entriesElement = document.querySelector('.card-enter-value');
const negativeEntriesElement = document.querySelector('.card-exit-value');
const totalEntriesElement = document.querySelector('.card-total-value');

let finance = JSON.parse(localStorage.getItem('finances')) || [];
let totalPositiveEntries = [];
let totalNegativeEntries = [];
let totalEntries = [];

const saveFinance = () => {
    if (!financeDesc.value || !financeDate.value || !financeValue.value) {
        alert('Você precisa preencher todos os campos antes de salvar.');
    } else {
        finance.push({
            desc: financeDesc.value,
            value: financeValue.value,
            date: financeDate.value,
        });

        saveOnLocalStorage();
        showFinances();
        refreshElements();
        document.querySelector('.modal-fade').style.display = 'none'
        financeDesc.value = ''
        financeValue.value = ''
        financeDate.value = ''
    }
};

const saveOnLocalStorage = () => {
    localStorage.setItem('finances', JSON.stringify(finance));
};

const createFinance = (desc, value, date, index) => {
    const table = document.createElement('div');
    table.setAttribute('class', 'table');

    if (value.includes('-')) {
        table.innerHTML = `
        <span class="table-desc">${desc}</span>
        <span class="table-value" style=" color: red;">${new Intl.NumberFormat(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL',
            }
        ).format(value)}</span>
        <span class="table-data">${date}</span>
        <span class="table-btn-delete" data-index="${index}"><i class="fa-solid fa-circle-minus"></i></span>
        `;
    } else {
        table.innerHTML = `
        <span class="table-desc">${desc}</span>
        <span class="table-value" style=" color: green;">${new Intl.NumberFormat(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL',
            }
        ).format(value)}</span>
        <span class="table-data">${date}</span>
        <span class="table-btn-delete" data-index="${index}"><i class="fa-solid fa-circle-minus"></i></span>
        `;
    }

    tablesContainer.appendChild(table);
};

const refreshElements = () => {
    const financeValues = finance.map((finance) => finance.value);

    const negativeEntries = financeValues.filter((value) =>
        value.includes('-', '')
    );
    const negativeEntriesTest = negativeEntries.map((value) =>
        Number(value.replace('-', ''))
    );
    totalNegativeEntries = negativeEntriesTest.reduce(
        (prev, next) => prev + next,
        0
    );

    const positiveEntries = financeValues.filter(
        (finance) => !finance.includes('-')
    );
    totalPositiveEntries = positiveEntries
        .map((value) => Number(value))
        .reduce((prev, next) => prev + next, 0);

    entriesElement.innerHTML = `${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(totalPositiveEntries)}`;

    negativeEntriesElement.innerHTML = `-${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(totalNegativeEntries)}`;

    totalEntries = totalPositiveEntries - totalNegativeEntries;
    totalEntriesElement.innerHTML = `${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(totalEntries)}`;
};

const showFinances = () => {
    tablesContainer.innerHTML = '';
    finance.forEach((finance, index) =>
        createFinance(finance.desc, finance.value, finance.date, index)
    );
};

const deleteFinance = (index) => {
    finance.splice(index, 1);
    saveOnLocalStorage();
    refreshElements();
    showFinances();
};

const captureEvent = (event) => {
    const index = event.target.dataset.index;
    deleteFinance(index);
};

tablesContainer.addEventListener('click', captureEvent);

refreshElements();
showFinances();

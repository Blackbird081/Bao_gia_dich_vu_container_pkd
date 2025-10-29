// Chứa các hàm tương tác với Local Storage và quản lý dữ liệu

import { state } from './state.js';
import { elements } from './dom.js';
import { i18n } from './config.js';
import { showToast, parseDateString } from './utils.js';
import { createTableRow, recalculateTotals } from './ui.js';

export function saveProducts() {
    localStorage.setItem(`tanthuan_products_${state.currentLang}`, JSON.stringify(state.products.filter(p => p.name !== i18n.otherOption[state.currentLang])));
}

export function loadProducts() {
    const defaultProducts = {
        vi: [ { name: 'Nâng / Hạ container tại bãi - Cont 20\' có hàng', unit: 'cont', price: 409320 }, { name: 'Nâng / Hạ container tại bãi - Cont 20\' rỗng', unit: 'cont', price: 291600 }, { name: 'Nâng / Hạ container tại bãi - Cont 40\' có hàng', unit: 'cont', price: 690120 }, { name: 'Nâng / Hạ container tại bãi - Cont 40\' rỗng', unit: 'cont', price: 439560 }, { name: 'Bốc xếp Bãi -> Sàlan - Cont 20\' có hàng', unit: 'cont', price: 691740 }, { name: 'Bốc xếp Bãi -> Sàlan - Cont 20\' rỗng', unit: 'cont', price: 353160 }, { name: 'Vận chuyển container nội bộ Cảng - Cont 20\' có hàng', unit: 'cont', price: 162000 }, { name: 'Cân container - Cont 20\' xuất', unit: 'cont', price: 86400 }, { name: 'Vệ sinh container - Cont 20\' quét rửa', unit: 'cont', price: 172800 }, ],
        en: [ { name: 'Lift On/Off at Yard - 20\' Container (Full)', unit: 'cont', price: 409320 }, { name: 'Lift On/Off at Yard - 20\' Container (Empty)', unit: 'cont', price: 291600 }, { name: 'Lift On/Off at Yard - 40\' Container (Full)', unit: 'cont', price: 690120 }, { name: 'Lift On/Off at Yard - 40\' Container (Empty)', unit: 'cont', price: 439560 }, { name: 'Loading from Yard to Barge - 20\' Container (Full)', unit: 'cont', price: 691740 }, ]
    };
    state.products = JSON.parse(localStorage.getItem(`tanthuan_products_${state.currentLang}`)) || defaultProducts[state.currentLang];
    
    const otherOptionName = i18n.otherOption[state.currentLang];
    if (!state.products.find(p => p.name === otherOptionName)) {
        state.products.push({ name: otherOptionName, unit: state.currentLang === 'vi' ? 'cont' : 'Turn', price: 0 });
    }
}

function validateForm() {
    const errors = [];
    const fieldsToValidate = [
        { element: elements.customerName, errorKey: 'toastNoCustomer' },
        { element: elements.invoiceNumber, errorKey: 'toastNoQuoteNo' },
        { element: elements.invoiceDate, errorKey: 'toastInvalidDate', validator: (el) => parseDateString(el.value) }
    ];

    fieldsToValidate.forEach(field => field.element.classList.remove('input-error'));
    fieldsToValidate.forEach(field => {
        const isValid = field.validator ? field.validator(field.element) : field.element.value.trim() !== '';
        if (!isValid) {
            errors.push(i18n[field.errorKey][state.currentLang]);
            field.element.classList.add('input-error');
        }
    });

    if (!Array.from(elements.tableBody.querySelectorAll('.item-row')).some(row => row.querySelector('.product-select').value)) {
        errors.push(i18n.toastNoItems[state.currentLang]);
    }

    if (errors.length > 0) {
        showToast(i18n.toastValidationError[state.currentLang].replace('{fields}', errors.join(', ')), 'error');
        return false;
    }
    return true;
}

export function saveQuotation() {
    if (!validateForm()) return;

    const newQuotation = {
        id: `QT-${Date.now()}`,
        invoiceNumber: elements.invoiceNumber.value,
        invoiceDate: elements.invoiceDate.value,
        customerName: elements.customerName.value,
        customerTaxCode: elements.customerTaxCode.value,
        customerAddress: elements.customerAddress.value,
        customerPhone: elements.customerPhone.value,
        customerNotes: elements.customerNotes.value,
        totalAmount: elements.totalAmount.textContent,
        items: Array.from(elements.tableBody.querySelectorAll('.item-row')).map(row => ({
            name: row.querySelector('.product-select').value,
            quantity: row.querySelector('.qty-input').value,
            price: row.querySelector('.price-input').value
        })).filter(item => item.name)
    };

    let savedQuotations = JSON.parse(localStorage.getItem(`tanthuan_quotations_${state.currentLang}`)) || [];
    savedQuotations.push(newQuotation);
    localStorage.setItem(`tanthuan_quotations_${state.currentLang}`, JSON.stringify(savedQuotations));
    showToast(i18n.toastSaveSuccess[state.currentLang].replace('{name}', newQuotation.customerName));
}

export function loadQuotation(id) {
    let savedQuotations = JSON.parse(localStorage.getItem(`tanthuan_quotations_${state.currentLang}`)) || [];
    const q = savedQuotations.find(q => q.id === id);
    if (!q) { showToast('Quotation not found!', 'error'); return; }
    elements.invoiceNumber.value = q.invoiceNumber;
    elements.invoiceDate.value = q.invoiceDate;
    elements.customerName.value = q.customerName;
    elements.customerTaxCode.value = q.customerTaxCode || '';
    elements.customerAddress.value = q.customerAddress;
    elements.customerPhone.value = q.customerPhone;
    elements.customerNotes.value = q.customerNotes;
    elements.tableBody.innerHTML = '';
    q.items.forEach(item => {
        createTableRow();
        const lastRow = elements.tableBody.lastElementChild;
        const select = lastRow.querySelector('.product-select');
        select.value = item.name;
        select.dispatchEvent(new Event('change'));
        lastRow.querySelector('.qty-input').value = item.quantity;
        if (item.name === i18n.otherOption[state.currentLang]) {
            lastRow.querySelector('.price-input').value = item.price;
        }
    });
    recalculateTotals();
    showToast(i18n.toastLoadSuccess[state.currentLang].replace('{name}', q.customerName));
}

export function deleteQuotation(id) {
    let savedQuotations = JSON.parse(localStorage.getItem(`tanthuan_quotations_${state.currentLang}`)) || [];
    localStorage.setItem(`tanthuan_quotations_${state.currentLang}`, JSON.stringify(savedQuotations.filter(q => q.id !== id)));
    showToast(i18n.toastDeleteSuccess[state.currentLang], 'info');
}

export function generateNextQuoteNumber() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const dateStr = `${day}${month}`;
    let lastQuoteInfo = JSON.parse(localStorage.getItem('lastQuoteInfo')) || { date: '', counter: 0 };
    let counter = (lastQuoteInfo.date === dateStr) ? lastQuoteInfo.counter + 1 : 1;
    localStorage.setItem('lastQuoteInfo', JSON.stringify({ date: dateStr, counter: counter }));
    const prefix = state.currentLang === 'vi' ? 'BG' : 'QT';
    return `${prefix}${dateStr}-${String(counter).padStart(3, '0')}`;
}

export function backupData() {
    const dataToBackup = {
        products_vi: JSON.parse(localStorage.getItem('tanthuan_products_vi') || '[]'),
        products_en: JSON.parse(localStorage.getItem('tanthuan_products_en') || '[]'),
        quotations_vi: JSON.parse(localStorage.getItem('tanthuan_quotations_vi') || '[]'),
        quotations_en: JSON.parse(localStorage.getItem('tanthuan_quotations_en') || '[]'),
        lastQuoteInfo: JSON.parse(localStorage.getItem('lastQuoteInfo') || '{}')
    };
    const blob = new Blob([JSON.stringify(dataToBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tanthuan_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(i18n.toastBackupSuccess[state.currentLang]);
}

export function restoreData(file) {
    if (!confirm(i18n.confirmRestore[state.currentLang])) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.products_vi && data.quotations_vi) {
                localStorage.setItem('tanthuan_products_vi', JSON.stringify(data.products_vi));
                localStorage.setItem('tanthuan_products_en', JSON.stringify(data.products_en || []));
                localStorage.setItem('tanthuan_quotations_vi', JSON.stringify(data.quotations_vi));
                localStorage.setItem('tanthuan_quotations_en', JSON.stringify(data.quotations_en || []));
                localStorage.setItem('lastQuoteInfo', JSON.stringify(data.lastQuoteInfo || {}));
                showToast(i18n.toastRestoreSuccess[state.currentLang], 'success');
                setTimeout(() => window.location.reload(), 2000);
            } else {
                throw new Error("Invalid backup file structure.");
            }
        } catch (error) {
            showToast(i18n.toastInvalidFile[state.currentLang], 'error');
            console.error("Restore error:", error);
        }
    };
    reader.readAsText(file);
}
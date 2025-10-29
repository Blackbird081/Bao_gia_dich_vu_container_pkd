// Chứa các hàm chịu trách nhiệm cập nhật giao diện người dùng (DOM)

import { state } from './state.js';
import { elements } from './dom.js';
import { i18n } from './config.js';
import { formatCurrency, numberToWords_VI, numberToWords_EN, showToast } from './utils.js';
import { generateNextQuoteNumber } from './storage.js';

function initFlatpickr(rowElement) {
    const dateOnlyOptions = { dateFormat: "d/m/Y", onChange: (selectedDates, dateStr, instance) => instance.element.dispatchEvent(new Event('input', { bubbles: true })) };
    const dateTimeOptions = { enableTime: true, dateFormat: "d/m/Y H:i", time_24hr: true, minuteIncrement: 30, onChange: (selectedDates, dateStr, instance) => instance.element.dispatchEvent(new Event('input', { bubbles: true })) };
    rowElement.querySelectorAll('.start-date-input, .end-date-input').forEach(input => flatpickr(input, dateOnlyOptions));
    rowElement.querySelectorAll('.start-datetime-input, .end-datetime-input').forEach(input => flatpickr(input, dateTimeOptions));
}

export function createTableRow() {
    const row = document.createElement('tr');
    row.className = 'item-row';
    const productOptions = state.products.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
    const selectOptionText = i18n.selectOption[state.currentLang];

    row.innerHTML = `
        <td class="px-4 py-2 align-top">
            <select class="product-select mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">
                <option value="">${selectOptionText}</option>
                ${productOptions}
            </select>
            <div class="calculation-picker date-range-picker"><label>${i18n.dateRangeFrom[state.currentLang]}</label><input type="text" class="start-date-input" placeholder="Chọn ngày bắt đầu"><label>${i18n.dateRangeTo[state.currentLang]}</label><input type="text" class="end-date-input" placeholder="Chọn ngày kết thúc"></div>
            <div class="calculation-picker datetime-range-picker"><label>${i18n.dateTimeRangeFrom[state.currentLang]}</label><input type="text" class="start-datetime-input" placeholder="Chọn ngày & giờ bắt đầu"><label>${i18n.dateTimeRangeTo[state.currentLang]}</label><input type="text" class="end-datetime-input" placeholder="Chọn ngày & giờ kết thúc"></div>
        </td>
        <td class="px-4 py-2 align-top"><input type="number" class="qty-input mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" value="1" min="0" step="0.5"></td>
        <td class="px-4 py-2 align-top"><input type="number" class="price-input mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100" value="0" min="0" readonly></td>
        <td class="px-4 py-2 align-top"><span class="line-total font-bold text-gray-900">0 đ</span></td>
        <td class="px-2 py-2 align-top text-center"><button class="remove-row-btn text-red-500 hover:text-red-700 font-bold">×</button></td>
    `;
    elements.tableBody.appendChild(row);
    initFlatpickr(elements.tableBody.lastElementChild);
}

export function recalculateTotals() {
    let grandTotal = 0;
    document.querySelectorAll('.item-row').forEach(row => {
        const price = parseFloat(row.querySelector('.price-input').value) || 0;
        const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
        const lineTotal = qty * price;
        row.querySelector('.line-total').textContent = formatCurrency(lineTotal);
        grandTotal += lineTotal;
    });
    state.rawTotalAmount = grandTotal;
    elements.totalAmount.textContent = formatCurrency(grandTotal);
    const numberToWords = state.currentLang === 'vi' ? numberToWords_VI : numberToWords_EN;
    elements.totalInWords.textContent = numberToWords(grandTotal) + ' ' + i18n.dong[state.currentLang] + '.';
}

export function resetForm(confirmNeeded = true) {
    const doReset = () => {
        elements.customerName.value = '';
        elements.customerTaxCode.value = '';
        elements.customerAddress.value = '';
        elements.customerPhone.value = '';
        elements.customerNotes.value = '';
        elements.tableBody.innerHTML = '';
        
        flatpickr(elements.invoiceDate, { dateFormat: "d/m/Y", defaultDate: "today" });
        elements.invoiceNumber.value = generateNextQuoteNumber();
        createTableRow();
        recalculateTotals();
        showToast(i18n.toastNewQuote[state.currentLang], 'info');
    };

    if (confirmNeeded) {
        if (confirm(i18n.confirmClear[state.currentLang])) doReset();
    } else {
        doReset();
    }
}

export function renderProductManagementTable() {
    elements.productManagementTable.innerHTML = '';
    const otherOptionName = i18n.otherOption[state.currentLang];
    state.products.filter(p => p.name !== otherOptionName).forEach((p) => {
        const originalIndex = state.products.findIndex(op => op.name === p.name);
        const row = elements.productManagementTable.insertRow();
        row.innerHTML = `<td class="p-2">${p.name}</td><td class="p-2 text-center">${p.unit}</td><td class="p-2 text-right">${formatCurrency(p.price)}</td><td class="p-2 text-center"><button class="edit-product-btn px-2 py-1 bg-yellow-500 text-white rounded text-sm" data-index="${originalIndex}">${i18n.view[state.currentLang]}</button> <button class="delete-product-btn px-2 py-1 bg-red-600 text-white rounded text-sm" data-index="${originalIndex}">${i18n.delete[state.currentLang]}</button></td>`;
    });
}

export function renderHistoryTable() {
    let savedQuotations = JSON.parse(localStorage.getItem(`tanthuan_quotations_${state.currentLang}`)) || [];
    savedQuotations.sort((a, b) => b.id.localeCompare(a.id));
    elements.historyTableBody.innerHTML = savedQuotations.length === 0 ? `<tr><td colspan="5" class="text-center p-4">Chưa có dữ liệu.</td></tr>` : '';
    savedQuotations.forEach(q => {
        const row = elements.historyTableBody.insertRow();
        const date = new Date(q.invoiceDate).toLocaleDateString(state.currentLang === 'vi' ? 'vi-VN' : 'en-GB');
        row.innerHTML = `<td class="p-2">${date}</td><td class="p-2">${q.invoiceNumber}</td><td class="p-2">${q.customerName}</td><td class="p-2 text-right">${q.totalAmount}</td><td class="p-2 text-center"><button class="view-history-btn px-2 py-1 bg-blue-500 text-white rounded text-sm" data-id="${q.id}">${i18n.view[state.currentLang]}</button> <button class="delete-history-btn px-2 py-1 bg-red-600 text-white rounded text-sm" data-id="${q.id}">${i18n.delete[state.currentLang]}</button></td>`;
    });
}

export function resetProductForm() {
    elements.productForm.reset();
    elements.editIndex.value = -1;
    elements.cancelEditBtn.style.display = 'none';
}

export function translateUI() {
    document.documentElement.lang = state.currentLang;
    elements.appTitle.textContent = i18n.appTitle[state.currentLang];
    elements.developedByLine.textContent = i18n.developedBy[state.currentLang];
    elements.manageProductsBtn.textContent = i18n.manageServices[state.currentLang];
    elements.historyBtn.textContent = i18n.history[state.currentLang];
    elements.formTitle.textContent = i18n.formTitle[state.currentLang];
    elements.labelQuoteNo.textContent = i18n.quoteNo[state.currentLang];
    elements.labelQuoteDate.textContent = i18n.quoteDate[state.currentLang];
    elements.labelCustomerName.textContent = i18n.customerName[state.currentLang];
    elements.labelTaxCode.textContent = i18n.taxCode[state.currentLang];
    elements.labelAddress.textContent = i18n.address[state.currentLang];
    elements.labelPhone.textContent = i18n.phone[state.currentLang];
    elements.labelNotes.textContent = i18n.notes[state.currentLang];
    elements.thService.textContent = i18n.thService[state.currentLang];
    elements.thQty.textContent = i18n.thQty[state.currentLang];
    elements.thUnitPrice.textContent = i18n.thUnitPrice[state.currentLang];
    elements.thAmount.textContent = i18n.thAmount[state.currentLang];
    elements.addRowBtn.textContent = i18n.addRow[state.currentLang];
    elements.labelTotal.textContent = i18n.total[state.currentLang];
    elements.labelInWords.textContent = i18n.inWords[state.currentLang];
    elements.actionsTitle.textContent = i18n.actionsTitle[state.currentLang];
    elements.newBtn.textContent = i18n.newQuote[state.currentLang];
    elements.saveBtn.textContent = i18n.saveQuote[state.currentLang];
    elements.renderPreviewBtn.textContent = i18n.updatePreview[state.currentLang];
    elements.generatePdfBtn.textContent = i18n.printPdf[state.currentLang];
    elements.previewPlaceholder.textContent = i18n.previewPlaceholder[state.currentLang];
    elements.modalProductTitle.textContent = i18n.modalProductTitle[state.currentLang];
    elements.importExcelBtn.textContent = i18n.importExcel[state.currentLang];
    elements.exportExcelBtn.textContent = i18n.exportExcel[state.currentLang];
    elements.backupDataBtn.textContent = i18n.backupData[state.currentLang];
    elements.restoreDataBtn.textContent = i18n.restoreData[state.currentLang];
    elements.labelModalName.textContent = i18n.modalName[state.currentLang];
    elements.labelModalUnit.textContent = i18n.modalUnit[state.currentLang];
    elements.labelModalPrice.textContent = i18n.modalPrice[state.currentLang];
    elements.btnModalSave.textContent = i18n.btnModalSave[state.currentLang];
    elements.cancelEditBtn.textContent = i18n.btnCancel[state.currentLang];
    elements.thModalName.textContent = i18n.modalName[state.currentLang];
    elements.thModalUnit.textContent = i18n.modalUnit[state.currentLang];
    elements.thModalPrice.textContent = i18n.modalPrice[state.currentLang];
    elements.thModalAction.textContent = i18n.action[state.currentLang];
    elements.modalHistoryTitle.textContent = i18n.modalHistoryTitle[state.currentLang];
    elements.thHistoryDate.textContent = i18n.date[state.currentLang];
    elements.thHistoryNo.textContent = i18n.quoteNo[state.currentLang];
    elements.thHistoryCustomer.textContent = i18n.customer[state.currentLang];
    elements.thHistoryTotal.textContent = i18n.total[state.currentLang];
    elements.thHistoryAction.textContent = i18n.action[state.currentLang];
    recalculateTotals();
}
// Chứa các hàm xử lý sự kiện (event handlers)

import { state } from './state.js';
import { elements } from './dom.js';
import { i18n } from './config.js';
import { showToast, hideModal, showModal } from './utils.js';
import { recalculateTotals, resetForm, renderProductManagementTable, renderHistoryTable, resetProductForm, translateUI } from './ui.js';
import { saveProducts, loadProducts, saveQuotation, loadQuotation, deleteQuotation, backupData, restoreData } from './storage.js';
import { renderPreviewToCanvas, generatePdf } from './pdf.js';

export function handleTableRowInput(e) {
    const row = e.target.closest('.item-row');
    if (!row) return;
    const qtyInput = row.querySelector('.qty-input');
    if (e.target.classList.contains('start-date-input') || e.target.classList.contains('end-date-input')) {
        const fpStart = row.querySelector('.start-date-input')._flatpickr;
        const fpEnd = row.querySelector('.end-date-input')._flatpickr;
        if (fpStart && fpEnd && fpStart.selectedDates.length > 0 && fpEnd.selectedDates.length > 0) {
            const startDate = new Date(fpStart.selectedDates[0]);
            const endDate = new Date(fpEnd.selectedDates[0]);
            if (endDate >= startDate) {
                startDate.setHours(0, 0, 0, 0); endDate.setHours(0, 0, 0, 0);
                qtyInput.value = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            } else { qtyInput.value = 1; }
        }
    }
    if (e.target.classList.contains('start-datetime-input') || e.target.classList.contains('end-datetime-input')) {
        const fpStart = row.querySelector('.start-datetime-input')._flatpickr;
        const fpEnd = row.querySelector('.end-datetime-input')._flatpickr;
        if (fpStart && fpEnd && fpStart.selectedDates.length > 0 && fpEnd.selectedDates.length > 0) {
            const startTime = fpStart.selectedDates[0].getTime();
            const endTime = fpEnd.selectedDates[0].getTime();
            if (endTime >= startTime) {
                const totalHours = Math.round(((endTime - startTime) / (1000 * 60 * 60)) * 2) / 2;
                qtyInput.value = totalHours > 0 ? totalHours : 0.5;
            } else { qtyInput.value = 0; }
        }
    }
    recalculateTotals();
}

export function handleTableRowChange(e) {
    if (e.target.classList.contains('product-select')) {
        const row = e.target.closest('.item-row');
        const priceInput = row.querySelector('.price-input');
        const qtyInput = row.querySelector('.qty-input');
        const datePickerDiv = row.querySelector('.date-range-picker');
        const dateTimePickerDiv = row.querySelector('.datetime-range-picker');
        const selectedValue = e.target.value;
        const selectedProduct = state.products.find(p => p.name === selectedValue);
        const isStorageService = selectedValue.toLowerCase().includes(i18n.storageKeywords[state.currentLang]);
        const isPowerService = selectedValue.toLowerCase().includes(i18n.powerKeywords[state.currentLang]);

        datePickerDiv.classList.toggle('visible', isStorageService);
        dateTimePickerDiv.classList.toggle('visible', isPowerService);
        qtyInput.readOnly = isStorageService || isPowerService;
        qtyInput.classList.toggle('bg-gray-100', isStorageService || isPowerService);

        if (selectedValue === i18n.otherOption[state.currentLang]) {
            priceInput.value = 0;
            priceInput.readOnly = false;
            priceInput.classList.remove('bg-gray-100');
            priceInput.focus();
        } else {
            priceInput.value = selectedProduct ? selectedProduct.price : 0;
            priceInput.readOnly = true;
            priceInput.classList.add('bg-gray-100');
        }
        recalculateTotals();
    }
}

export function handleTableRowClick(e) {
    if (e.target.classList.contains('remove-row-btn')) {
        e.target.closest('.item-row').remove();
        recalculateTotals();
    }
}

export function handleLangToggle() {
    state.currentLang = state.currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('appLang', state.currentLang);
    loadProducts();
    resetForm(false);
    translateUI();
}

export function handleProductFormSubmit(e) {
    e.preventDefault();
    const name = elements.productName.value, unit = elements.productUnit.value, price = parseFloat(elements.productPrice.value), index = parseInt(elements.editIndex.value);
    if (index === -1) { state.products.unshift({ name, unit, price }); } else { state.products[index] = { name, unit, price }; }
    saveProducts();
    renderProductManagementTable();
    showToast(i18n.toastTariffUpdated[state.currentLang]);
    resetProductForm();
}

export function handleProductTableClick(e) {
    const index = e.target.dataset.index;
    if (!index) return;
    if (e.target.classList.contains('delete-product-btn')) {
        if (confirm(i18n.confirmDeleteService[state.currentLang].replace('{name}', state.products[index].name))) {
            state.products.splice(index, 1);
            saveProducts();
            renderProductManagementTable();
            showToast(i18n.toastTariffUpdated[state.currentLang]);
        }
    }
    if (e.target.classList.contains('edit-product-btn')) {
        const p = state.products[index];
        elements.productName.value = p.name; elements.productUnit.value = p.unit; elements.productPrice.value = p.price;
        elements.editIndex.value = index;
        elements.cancelEditBtn.style.display = 'inline-block';
    }
}

export function handleExcelImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            if (!json || json.length === 0) { showToast(i18n.toastImportNoData[state.currentLang], 'error'); return; }
            const newProducts = json.map(item => ({ name: item['Name'], unit: item['Unit'], price: parseFloat(item['Price']) || 0 }));
            if (confirm(i18n.confirmImport[state.currentLang].replace('{count}', newProducts.length))) {
                state.products = newProducts;
                state.products.push({ name: i18n.otherOption[state.currentLang], unit: state.currentLang === 'vi' ? 'cont' : 'Turn', price: 0 });
                saveProducts();
                renderProductManagementTable();
                showToast(i18n.toastTariffUpdated[state.currentLang]);
            }
        } catch (error) { showToast(i18n.toastError[state.currentLang], 'error'); console.error("Excel import error:", error); } 
        finally { event.target.value = ''; }
    };
    reader.readAsArrayBuffer(file);
}

export function handleExcelExport() {
    const dataToExport = state.products.filter(p => p.name !== i18n.otherOption[state.currentLang]).map(p => ({ 'Name': p.name, 'Unit': p.unit, 'Price': p.price }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Services');
    XLSX.writeFile(workbook, 'Service_List_TanThuan.xlsx');
    showToast(i18n.toastExportSuccess[state.currentLang]);
}

export function handleHistoryTableClick(e) {
    const id = e.target.dataset.id;
    if (!id) return;
    if (e.target.classList.contains('view-history-btn')) {
        loadQuotation(id);
        hideModal(elements.historyModal);
    }
    if (e.target.classList.contains('delete-history-btn')) {
        if (confirm(i18n.confirmDeleteQuote[state.currentLang])) {
            deleteQuotation(id);
            renderHistoryTable();
        }
    }
}

export function handleWindowClick(event) {
    if (event.target == elements.productModal) { hideModal(elements.productModal); resetProductForm(); }
    if (event.target == elements.historyModal) { hideModal(elements.historyModal); }
}

export function handleRestoreData(event) {
    const file = event.target.files[0];
    if (!file) return;
    restoreData(file);
    event.target.value = ''; // Reset input
}
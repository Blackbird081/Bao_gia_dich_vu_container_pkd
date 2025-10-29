// File chính - Điểm khởi đầu của ứng dụng

import { elements } from './dom.js';
import { showToast, showModal } from './utils.js';
import { loadProducts, saveQuotation, backupData } from './storage.js';
import { translateUI, createTableRow, recalculateTotals, resetForm, renderProductManagementTable, renderHistoryTable, resetProductForm } from './ui.js';
import { renderPreviewToCanvas, generatePdf } from './pdf.js';
import * as handlers from './handlers.js';

function bindEvents() {
    elements.langToggleBtn.addEventListener('click', handlers.handleLangToggle);
    elements.addRowBtn.addEventListener('click', createTableRow);
    elements.tableBody.addEventListener('click', handlers.handleTableRowClick);
    elements.tableBody.addEventListener('input', handlers.handleTableRowInput);
    elements.tableBody.addEventListener('change', handlers.handleTableRowChange);
    elements.newBtn.addEventListener('click', () => resetForm(true));
    elements.saveBtn.addEventListener('click', saveQuotation);
    elements.renderPreviewBtn.addEventListener('click', renderPreviewToCanvas);
    elements.generatePdfBtn.addEventListener('click', generatePdf);
    elements.manageProductsBtn.onclick = () => { showModal(elements.productModal); renderProductManagementTable(); };
    elements.closeProductModalBtn.onclick = () => { handlers.hideModal(elements.productModal); resetProductForm(); };
    elements.cancelEditBtn.onclick = resetProductForm;
    elements.productForm.addEventListener('submit', handlers.handleProductFormSubmit);
    elements.productManagementTable.addEventListener('click', handlers.handleProductTableClick);
    elements.importExcelBtn.onclick = () => elements.excelImporter.click();
    elements.exportExcelBtn.addEventListener('click', handlers.handleExcelExport);
    elements.excelImporter.addEventListener('change', handlers.handleExcelImport);
    elements.backupDataBtn.addEventListener('click', backupData);
    elements.restoreDataBtn.onclick = () => elements.jsonImporter.click();
    elements.jsonImporter.addEventListener('change', handlers.handleRestoreData);
    elements.historyBtn.onclick = () => { showModal(elements.historyModal); renderHistoryTable(); };
    elements.closeHistoryModalBtn.onclick = () => { handlers.hideModal(elements.historyModal); };
    elements.historyTableBody.addEventListener('click', handlers.handleHistoryTableClick);
    window.addEventListener('click', handlers.handleWindowClick);
}

function init(showWelcome = true) {
    loadProducts();
    translateUI();
    resetForm(false); // Dùng resetForm để khởi tạo form ban đầu
    if (showWelcome) {
        showToast('Sẵn sàng tạo báo giá', 'success');
    }
}

// --- APP ENTRY POINT ---
document.addEventListener('DOMContentLoaded', () => {
    init();
    bindEvents();
});
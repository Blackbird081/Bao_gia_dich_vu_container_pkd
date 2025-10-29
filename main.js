// File chính - Điểm khởi đầu của ứng dụng

// [SỬA LỖI] Thêm lại 2 dòng import quan trọng đã bị xóa nhầm
import { i18n } from './config.js';
import { state } from './state.js';

import { elements } from './dom.js';
import { showToast, showModal, hideModal } from './utils.js';
import { loadProducts, saveQuotation, backupData } from './storage.js';
import { translateUI, createTableRow, recalculateTotals, resetForm, renderProductManagementTable, renderHistoryTable, resetProductForm } from './ui.js';
import { renderPreviewToCanvas, generatePdf } from './pdf.js';
import {
    handleLangToggle,
    handleTableRowClick,
    handleTableRowInput,
    handleTableRowChange,
    handleProductFormSubmit,
    handleProductTableClick,
    handleExcelExport,
    handleExcelImport,
    handleHistoryTableClick,
    handleWindowClick,
    handleRestoreData
} from './handlers.js';

function bindEvents() {
    elements.langToggleBtn.addEventListener('click', handleLangToggle);
    elements.addRowBtn.addEventListener('click', createTableRow);
    elements.tableBody.addEventListener('click', handleTableRowClick);
    elements.tableBody.addEventListener('input', handleTableRowInput);
    elements.tableBody.addEventListener('change', handleTableRowChange);
    elements.newBtn.addEventListener('click', () => resetForm(true));
    elements.saveBtn.addEventListener('click', saveQuotation);
    elements.renderPreviewBtn.addEventListener('click', renderPreviewToCanvas);
    elements.generatePdfBtn.addEventListener('click', generatePdf);

    // --- Modal Events ---
    elements.manageProductsBtn.onclick = () => { showModal(elements.productModal); renderProductManagementTable(); };
    elements.closeProductModalBtn.onclick = () => { hideModal(elements.productModal); resetProductForm(); };
    elements.closeHistoryModalBtn.onclick = () => { hideModal(elements.historyModal); };
    elements.cancelEditBtn.onclick = resetProductForm;
    elements.productForm.addEventListener('submit', handleProductFormSubmit);
    elements.productManagementTable.addEventListener('click', handleProductTableClick);
    
    // --- Import/Export/Backup Events ---
    elements.importExcelBtn.onclick = () => elements.excelImporter.click();
    elements.exportExcelBtn.addEventListener('click', handleExcelExport);
    elements.excelImporter.addEventListener('change', handleExcelImport);
    elements.backupDataBtn.addEventListener('click', backupData);
    elements.restoreDataBtn.onclick = () => elements.jsonImporter.click();
    elements.jsonImporter.addEventListener('change', handleRestoreData);

    // --- History Events ---
    elements.historyBtn.onclick = () => { showModal(elements.historyModal); renderHistoryTable(); };
    elements.historyTableBody.addEventListener('click', handleHistoryTableClick);
    
    // --- Global Events ---
    window.addEventListener('click', handleWindowClick);
}

function init(showWelcome = true) {
    loadProducts();
    translateUI();
    // Dùng resetForm để khởi tạo form ban đầu một cách nhất quán
    resetForm(false); 
    if (showWelcome) {
        // Dòng này giờ sẽ hoạt động vì i18n và state đã được import
        showToast(i18n.toastReady[state.currentLang], 'success');
    }
}

// --- APP ENTRY POINT ---
// Sử dụng DOMContentLoaded để đảm bảo tất cả HTML đã được tải trước khi chạy script
document.addEventListener('DOMContentLoaded', () => {
    init();
    bindEvents();
});

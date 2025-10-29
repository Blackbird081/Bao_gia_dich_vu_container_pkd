// [CẢI TIẾN] Bọc toàn bộ code trong một IIFE để tránh làm ô nhiễm global scope
(function() {
    'use strict';

    // --- 1. STATE & CONFIG ---
    const staticQrCode = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAoACgDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAYHCAUEAwL/xAAyEAABAwMCAwUGBwAAAAAAAAABAgMEAAUGBxESIQgTMRQiMkFRYXEVFiQzNEJygZGx/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAfEQEAAgICAwEBAAAAAAAAAAAAAQIDERIhMQRBYVH/2gAMAwEAAhEDEQA/APcUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgP/Z";
    const PLACEHOLDER_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    const i18n = {
        appTitle: { vi: 'Báo giá dịch vụ', en: 'Service Quotation' },
        developedBy: { vi: 'Phát triển bởi: Tiền/Cảng Tân Thuận', en: 'Developed by: Tien/Tan Thuan Port' },
        manageServices: { vi: 'Phương án (Tariff)', en: 'Manage Services (Tariff)' },
        history: { vi: 'Lịch sử báo giá', en: 'Quotation History' },
        formTitle: { vi: 'Thông tin chung', en: 'Informations' },
        quoteNo: { vi: 'Số báo giá', en: 'Quotation No.' },
        quoteDate: { vi: 'Ngày báo giá', en: 'Date' },
        customerName: { vi: 'Tên khách hàng', en: 'Customer Name' },
        taxCode: { vi: 'Mã số thuế', en: 'Tax Code' },
        address: { vi: 'Địa chỉ', en: 'Address' },
        phone: { vi: 'Điện thoại', en: 'Phone' },
        notes: { vi: 'Ghi chú', en: 'Notes' },
        thService: { vi: 'Phương án', en: 'Service' },
        thQty: { vi: 'Số lượng', en: 'Quantity' },
        thUnitPrice: { vi: 'Đơn giá', en: 'Unit Price' },
        thAmount: { vi: 'Thành tiền', en: 'Amount' },
        addRow: { vi: '+ Thêm dòng', en: '+ Add Row' },
        total: { vi: 'Tổng cộng:', en: 'Total:' },
        inWords: { vi: 'Bằng chữ:', en: 'In words:' },
        actionsTitle: { vi: 'Xem trước', en: 'Preview' },
        newQuote: { vi: 'Tạo mới', en: 'New' },
        saveQuote: { vi: 'Lưu báo giá', en: 'Save Quotation' },
        updatePreview: { vi: 'Cập nhật', en: 'Update Preview' },
        printPdf: { vi: 'In / Xuất PDF', en: 'Print / Export PDF' },
        previewPlaceholder: { vi: 'Bản xem trước (A4)', en: 'A4 preview' },
        modalProductTitle: { vi: 'Quản lý phương án (Tariff)', en: 'Manage Services (Tariff)' },
        importExcel: { vi: 'Import Excel', en: 'Import Excel' },
        exportExcel: { vi: 'Export Excel', en: 'Export Excel' },
        backupData: { vi: 'Sao lưu Dữ liệu', en: 'Backup Data' },
        restoreData: { vi: 'Phục hồi Dữ liệu', en: 'Restore Data' },
        modalName: { vi: 'Tên', en: 'Name' },
        modalUnit: { vi: 'ĐVT', en: 'Unit' },
        modalPrice: { vi: 'Đơn giá', en: 'Price' },
        btnModalSave: { vi: 'Lưu', en: 'Save' },
        btnCancel: { vi: 'Hủy', en: 'Cancel' },
        modalHistoryTitle: { vi: 'Dữ liệu báo giá', en: 'Quotation Data' },
        action: { vi: 'Hành động', en: 'Action' },
        date: { vi: 'Ngày', en: 'Date' },
        customer: { vi: 'Khách hàng', en: 'Customer' },
        view: { vi: 'Xem', en: 'View' },
        delete: { vi: 'Xóa', en: 'Delete' },
        dong: { vi: 'đồng', en: 'Dong' },
        powerKeywords: { vi: 'chạy điện', en: 'power supply' },
        dateRangeFrom: { vi: 'Từ ngày:', en: 'From date:' },
        dateRangeTo: { vi: 'Đến ngày:', en: 'To date:' },
        dateTimeRangeFrom: { vi: 'Từ lúc:', en: 'From:' },
        dateTimeRangeTo: { vi: 'Đến lúc:', en: 'To:' },
        otherOption: { vi: 'Phương án khác', en: 'Other Service' },
        selectOption: { vi: '-- Chọn phương án --', en: '-- Select a service --' },
        storageKeywords: { vi: 'lưu bãi', en: 'storage' },
        confirmClear: { vi: 'Tạo báo giá mới sẽ xóa toàn bộ thông tin hiện tại. Bạn có chắc chắn?', en: 'This will clear all current quotation data. Are you sure?' },
        confirmDeleteService: { vi: 'Xóa phương án "{name}"?', en: 'Delete service "{name}"?' },
        confirmDeleteQuote: { vi: 'Bạn có chắc muốn xóa báo giá này không?', en: 'Are you sure you want to delete this quotation?' },
        confirmImport: { vi: 'Tìm thấy {count} phương án. Bạn có muốn thay thế danh sách hiện tại?', en: 'Found {count} services. Do you want to replace the current list?' },
        confirmRestore: { vi: 'Phục hồi dữ liệu sẽ ghi đè lên toàn bộ danh sách phương án và lịch sử báo giá hiện tại. Bạn có chắc chắn muốn tiếp tục?', en: 'Restoring data will overwrite all current services and quotation history. Are you sure you want to continue?' },
        toastReady: { vi: 'Sẵn sàng tạo báo giá', en: 'Ready to create quotations' },
        toastNewQuote: { vi: 'Đã tạo báo giá mới', en: 'New quotation created' },
        toastSaveSuccess: { vi: 'Đã lưu báo giá cho "{name}"!', en: 'Quotation saved for "{name}"!' },
        toastLoadSuccess: { vi: 'Đã tải báo giá của "{name}".', en: 'Loaded quotation for "{name}".' },
        toastDeleteSuccess: { vi: 'Đã xóa báo giá.', en: 'Quotation deleted.' },
        toastTariffUpdated: { vi: 'Danh sách phương án (Tariff) đã được cập nhật.', en: 'Service list (Tariff) has been updated.' },
        toastExportSuccess: { vi: 'Đã xuất file Excel thành công!', en: 'Excel file exported successfully!' },
        toastBackupSuccess: { vi: 'Đã sao lưu dữ liệu thành công!', en: 'Data backed up successfully!' },
        toastRestoreSuccess: { vi: 'Đã phục hồi dữ liệu thành công! Vui lòng tải lại trang.', en: 'Data restored successfully! Please reload the page.' },
        toastError: { vi: 'Có lỗi xảy ra. Vui lòng thử lại.', en: 'An error occurred. Please try again.' },
        toastValidationError: { vi: 'Vui lòng kiểm tra các trường sau: {fields}', en: 'Please check the following fields: {fields}'},
        toastNoCustomer: { vi: 'Tên khách hàng', en: 'Customer Name' },
        toastNoQuoteNo: { vi: 'Số báo giá', en: 'Quotation No.' },
        toastInvalidDate: { vi: 'Ngày báo giá', en: 'Quotation Date' },
        toastNoItems: { vi: 'Báo giá phải có ít nhất một phương án.', en: 'Quotation must have at least one service item.' },
        toastImportNoData: { vi: 'Không tìm thấy dữ liệu trong file Excel.', en: 'No data found in the Excel file.'},
        toastInvalidFile: { vi: 'File không hợp lệ hoặc bị lỗi.', en: 'Invalid or corrupted file.' },
        pdf: {
            companyName: { vi: 'TTĐH KHAI THÁC TÂN THUẬN', en: 'TAN THUAN OPERATIONS CENTER' },
            companyAddress: { vi: 'Địa chỉ: 18B Lưu Trọng Lư, Phường Tân Thuận, TP. HCM', en: 'Address: 18B Luu Trong Lu, Tan Thuan Ward, Ho Chi Minh City' },
            phone: { vi: 'Điện thoại', en: 'Phone' },
            address: { vi: 'Địa chỉ', en: 'Address' },
            email: { vi: 'Email', en: 'Email' },
            quoteNo: { vi: 'Số', en: 'No.' },
            date: { vi: 'Ngày', en: 'Date' },
            title: { vi: 'BÁO GIÁ', en: 'QUOTATION' },
            vatIncluded: { vi: '(Đã bao gồm 8% thuế VAT)', en: '(Includes 8% VAT)' },
            customerName: { vi: 'Tên khách hàng', en: 'Customer Name' },
            taxCode: { vi: 'Mã số thuế', en: 'Tax Code' },
            notes: { vi: 'Ghi chú', en: 'Notes' },
            thNo: { vi: 'STT', en: 'No.' },
            thService: { vi: 'Phương án', en: 'Service' },
            thUnit: { vi: 'ĐVT', en: 'Unit' },
            thQty: { vi: 'SL', en: 'QTY' },
            thUnitPrice: { vi: 'Đơn giá', en: 'Unit Price' },
            thAmount: { vi: 'Thành tiền', en: 'Amount' },
            totalPayment: { vi: 'Tổng cộng tiền thanh toán:', en: 'Total payment:' },
            inWords: { vi: 'Số tiền viết bằng chữ:', en: 'In words:' },
            paymentInfo: { vi: 'THÔNG TIN THANH TOÁN', en: 'PAYMENT INFORMATION' },
            bank: { vi: 'Ngân hàng', en: 'Bank' },
            accountName: { vi: 'Tên tài khoản', en: 'Account Name' },
            accountNumber: { vi: 'Số tài khoản', en: 'Account Number' },
            taxNote: { vi: 'QUÝ KHÁCH HÀNG VUI LÒNG CUNG CẤP MÃ SỐ THUẾ, ĐỊA CHỈ VÀ EMAIL ĐỂ NHẬN HÓA ĐƠN.', en: 'PLEASE PROVIDE YOUR TAX CODE, ADDRESS AND EMAIL TO RECEIVE THE INVOICE.' },
            otherOptionNote: { vi: '(Chi tiết trong Ghi chú)', en: '(Details in Notes)' },
            quoteNotesTitle: { vi: 'Lưu ý:', en: 'Notes:' },
            quoteNotesContent: { 
            vi: `<li style="margin-bottom: 4px;">Chúng tôi báo giá theo thông tin khách hàng cung cấp, vui lòng kiểm tra lại phương án.</li><li style="margin-bottom: 4px;">Đối với phương án đóng/rút/sang container, chúng tôi không chịu trách nhiệm việc tháo gỡ, chằng buộc hàng hoá, cũng như các hư hỏng bên trong container như xước, gãy ván sàn...</li><li>Nếu phát sinh thêm phương án, sẽ căn cứ vào thực tế hiện trường để thu phí bổ sung.</li>`,
            en: `<li style="margin-bottom: 4px;">This quotation is based on the information provided by the customer. Please double-check the service details.</li><li style="margin-bottom: 4px;">For stuffing/unstuffing services, we are not responsible for unlashing/lashing cargo or any internal container damages such as scratches, broken floorboards, etc.</li><li>Additional services arising on-site will be charged based on the actual work performed.</li>`
        }
        }
    };

    const state = {
        currentLang: localStorage.getItem('appLang') || 'vi',
        products: [],
        rawTotalAmount: 0,
    };

    // --- 2. DOM ELEMENTS ---
    const elements = {
        langToggleBtn: document.getElementById('lang-toggle-btn'),
        appTitle: document.getElementById('app-title'),
        developedByLine: document.getElementById('developed-by-line'),
        tableBody: document.querySelector('#invoice-items-table tbody'),
        addRowBtn: document.getElementById('add-row-btn'),
        invoiceNumber: document.getElementById('invoice-number'),
        invoiceDate: document.getElementById('invoice-date'),
        customerName: document.getElementById('customer-name'),
        customerTaxCode: document.getElementById('customer-tax-code'),
        customerAddress: document.getElementById('customer-address'),
        customerPhone: document.getElementById('customer-phone'),
        customerNotes: document.getElementById('customer-notes'),
        totalAmount: document.getElementById('total-amount'),
        totalInWords: document.getElementById('total-in-words'),
        renderPreviewBtn: document.getElementById('render-preview-btn'),
        generatePdfBtn: document.getElementById('generate-pdf-btn'),
        newBtn: document.getElementById('new-btn'),
        saveBtn: document.getElementById('save-btn'),
        a4ContentWrapper: document.getElementById('a4-content-wrapper'),
        previewCanvas: document.getElementById('pdf-canvas-preview'),
        toast: document.getElementById('toast-notification'),
        productModal: document.getElementById('product-modal'),
        manageProductsBtn: document.getElementById('manage-products-btn'),
        closeProductModalBtn: document.getElementById('close-product-modal-btn'),
        productForm: document.getElementById('product-form'),
        productManagementTable: document.getElementById('product-management-table'),
        editIndex: document.getElementById('edit-index'),
        productName: document.getElementById('product-name'),
        productUnit: document.getElementById('product-unit'),
        productPrice: document.getElementById('product-price'),
        cancelEditBtn: document.getElementById('cancel-edit-btn'),
        importExcelBtn: document.getElementById('import-excel-btn'),
        exportExcelBtn: document.getElementById('export-excel-btn'),
        excelImporter: document.getElementById('excel-importer'),
        backupDataBtn: document.getElementById('backup-data-btn'),
        restoreDataBtn: document.getElementById('restore-data-btn'),
        jsonImporter: document.getElementById('json-importer'),
        historyModal: document.getElementById('history-modal'),
        historyBtn: document.getElementById('history-btn'),
        closeHistoryModalBtn: document.getElementById('close-history-modal-btn'),
        historyTableBody: document.getElementById('history-table-body'),
        formTitle: document.getElementById('form-title'),
        labelQuoteNo: document.getElementById('label-quote-no'),
        labelQuoteDate: document.getElementById('label-quote-date'),
        labelCustomerName: document.getElementById('label-customer-name'),
        labelTaxCode: document.getElementById('label-tax-code'),
        labelAddress: document.getElementById('label-address'),
        labelPhone: document.getElementById('label-phone'),
        labelNotes: document.getElementById('label-notes'),
        thService: document.getElementById('th-service'),
        thQty: document.getElementById('th-qty'),
        thUnitPrice: document.getElementById('th-unit-price'),
        thAmount: document.getElementById('th-amount'),
        labelTotal: document.getElementById('label-total'),
        labelInWords: document.getElementById('label-in-words'),
        actionsTitle: document.getElementById('actions-title'),
        previewPlaceholder: document.getElementById('preview-placeholder'),
        modalProductTitle: document.getElementById('modal-product-title'),
        labelModalName: document.getElementById('label-modal-name'),
        labelModalUnit: document.getElementById('label-modal-unit'),
        labelModalPrice: document.getElementById('label-modal-price'),
        btnModalSave: document.getElementById('btn-modal-save'),
        thModalName: document.getElementById('th-modal-name'),
        thModalUnit: document.getElementById('th-modal-unit'),
        thModalPrice: document.getElementById('th-modal-price'),
        thModalAction: document.getElementById('th-modal-action'),
        modalHistoryTitle: document.getElementById('modal-history-title'),
        thHistoryDate: document.getElementById('th-history-date'),
        thHistoryNo: document.getElementById('th-history-no'),
        thHistoryCustomer: document.getElementById('th-history-customer'),
        thHistoryTotal: document.getElementById('th-history-total'),
        thHistoryAction: document.getElementById('th-history-action'),
    };

    // --- 3. UTILITY FUNCTIONS ---
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    const showToast = (message, type = 'success') => { elements.toast.textContent = message; elements.toast.className = `show ${type}`; setTimeout(() => { elements.toast.classList.remove('show'); }, 3000); };
    const debounce = (func, delay) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), delay); }; };
    const showModal = (modalElement) => { modalElement.style.display = 'block'; };
    const hideModal = (modalElement) => { modalElement.style.display = 'none'; };

    function parseDateString(dateString) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return null;
    }
    function numberToWords_VI(n) { if (n === undefined || n === null || isNaN(n) || n === 0) return "Không"; const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"], teens = ["mười", "mười một", "mười hai", "mười ba", "mười bốn", "mười lăm", "mười sáu", "mười bảy", "mười tám", "mười chín"], tens = ["", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"], powersOfTen = ["", "ngàn", "triệu", "tỷ"]; function convertChunk(num) { let str = "", h = Math.floor(num / 100), t = Math.floor((num % 100) / 10), u = num % 10; if (h > 0) str += units[h] + " trăm "; if (t === 1) str += teens[u] + " "; else if (t > 1) { str += tens[t] + " "; if (u === 1) str += "mốt "; else if (u > 0) str += units[u] + " "; } else if (u > 0) { if (h > 0) str += "lẻ "; str += units[u] + " "; } return str.trim(); } function convertInteger(num) { if (num === 0) return "không"; if (num < 0) return "âm " + convertInteger(Math.abs(num)); let word = "", i = 0, tempNum = num; while (tempNum > 0) { if (tempNum % 1000 !== 0) { const chunkWord = convertChunk(tempNum % 1000); if (chunkWord) word = chunkWord + " " + powersOfTen[i] + " " + word; } tempNum = Math.floor(tempNum / 1000); i++; } return word.trim(); } const integerPart = Math.trunc(n); let integerWords = convertInteger(integerPart); return integerWords.charAt(0).toUpperCase() + integerWords.slice(1); }
    function numberToWords_EN(n) { if (n === 0) return 'Zero'; const below_20 = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']; const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']; const thousands = ['','Thousand','Million','Billion']; function helper(num) { if (num === 0) return ''; if (num < 20) return below_20[num] + ' '; if (num < 100) return tens[Math.floor(num/10)] + ' ' + helper(num % 10); return below_20[Math.floor(num/100)] + ' Hundred ' + helper(num % 100); } let word = ''; let i = 0; while (n > 0) { if (n % 1000 !== 0) { word = helper(n % 1000) + thousands[i] + ' ' + word; } n = Math.floor(n / 1000); i++; } return word.trim(); }

    // --- 4. UI UPDATE FUNCTIONS ---
    function createTableRow() {
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
    function initFlatpickr(rowElement) {
        const dateOnlyOptions = { dateFormat: "d/m/Y", onChange: (selectedDates, dateStr, instance) => instance.element.dispatchEvent(new Event('input', { bubbles: true })) };
        const dateTimeOptions = { enableTime: true, dateFormat: "d/m/Y H:i", time_24hr: true, minuteIncrement: 30, onChange: (selectedDates, dateStr, instance) => instance.element.dispatchEvent(new Event('input', { bubbles: true })) };
        rowElement.querySelectorAll('.start-date-input, .end-date-input').forEach(input => flatpickr(input, dateOnlyOptions));
        rowElement.querySelectorAll('.start-datetime-input, .end-datetime-input').forEach(input => flatpickr(input, dateTimeOptions));
    }

    function recalculateTotals() {
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

    function resetForm(confirmNeeded = true) { 
        const doReset = () => {
            elements.customerName.value = ''; elements.customerTaxCode.value = ''; elements.customerAddress.value = ''; elements.customerPhone.value = ''; elements.customerNotes.value = '';
            elements.tableBody.innerHTML = '';
            init(false);
            showToast(i18n.toastNewQuote[state.currentLang], 'info');
        };
        if (confirmNeeded) {
            if (confirm(i18n.confirmClear[state.currentLang])) doReset();
        } else {
            doReset();
        }
    }

    function renderProductManagementTable() { 
        elements.productManagementTable.innerHTML = ''; 
        const otherOptionName = i18n.otherOption[state.currentLang]; 
        state.products.filter(p => p.name !== otherOptionName).forEach((p) => { 
            const originalIndex = state.products.findIndex(op => op.name === p.name); 
            const row = elements.productManagementTable.insertRow(); 
            row.innerHTML = `<td class="p-2">${p.name}</td><td class="p-2 text-center">${p.unit}</td><td class="p-2 text-right">${formatCurrency(p.price)}</td><td class="p-2 text-center"><button class="edit-product-btn px-2 py-1 bg-yellow-500 text-white rounded text-sm" data-index="${originalIndex}">${i18n.view[state.currentLang]}</button> <button class="delete-product-btn px-2 py-1 bg-red-600 text-white rounded text-sm" data-index="${originalIndex}">${i18n.delete[state.currentLang]}</button></td>`; 
        }); 
    }

    function renderHistoryTable() { 
        let savedQuotations = JSON.parse(localStorage.getItem(`tanthuan_quotations_${state.currentLang}`)) || []; 
        savedQuotations.sort((a, b) => b.id.localeCompare(a.id)); 
        elements.historyTableBody.innerHTML = savedQuotations.length === 0 ? `<tr><td colspan="5" class="text-center p-4">Chưa có dữ liệu.</td></tr>` : ''; 
        savedQuotations.forEach(q => { 
            const row = elements.historyTableBody.insertRow(); 
            const date = new Date(q.invoiceDate).toLocaleDateString(state.currentLang === 'vi' ? 'vi-VN' : 'en-GB'); 
            row.innerHTML = `<td class="p-2">${date}</td><td class="p-2">${q.invoiceNumber}</td><td class="p-2">${q.customerName}</td><td class="p-2 text-right">${q.totalAmount}</td><td class="p-2 text-center"><button class="view-history-btn px-2 py-1 bg-blue-500 text-white rounded text-sm" data-id="${q.id}">${i18n.view[state.currentLang]}</button> <button class="delete-history-btn px-2 py-1 bg-red-600 text-white rounded text-sm" data-id="${q.id}">${i18n.delete[state.currentLang]}</button></td>`; 
        }); 
    }

    function resetProductForm() { 
        elements.productForm.reset(); 
        elements.editIndex.value = -1; 
        elements.cancelEditBtn.style.display = 'none'; 
    }

    function translateUI() {
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

    // --- 5. DATA MANAGEMENT ---
    function saveProducts() { 
        localStorage.setItem(`tanthuan_products_${state.currentLang}`, JSON.stringify(state.products.filter(p => p.name !== i18n.otherOption[state.currentLang]))); 
    }

    function loadProducts() {
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

    function saveQuotation() {
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

    function loadQuotation(id) { 
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

    function deleteQuotation(id) { 
        let savedQuotations = JSON.parse(localStorage.getItem(`tanthuan_quotations_${state.currentLang}`)) || []; 
        localStorage.setItem(`tanthuan_quotations_${state.currentLang}`, JSON.stringify(savedQuotations.filter(q => q.id !== id))); 
        showToast(i18n.toastDeleteSuccess[state.currentLang], 'info'); 
    }

    function generateNextQuoteNumber() {
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

    // --- 6. PDF & PREVIEW GENERATION ---
    function waitForImageLoad(imageElement) {
        return new Promise((resolve, reject) => {
            if (imageElement.complete && imageElement.naturalHeight !== 0) return resolve();
            imageElement.onload = () => resolve();
            imageElement.onerror = (err) => reject(err);
        });
    }

    function generateA4HTML(qrCodeBase64) {
        const itemsHTML = Array.from(document.querySelectorAll('.item-row')).map((row, index) => {
            const select = row.querySelector('.product-select');
            const productName = select.value;
            if (!productName) return '';

            const product = state.products.find(p => p.name === productName);
            const unit = product ? product.unit : (state.currentLang === 'vi' ? 'cont' : 'Turn');
            const qty = row.querySelector('.qty-input').value;
            const price = parseFloat(row.querySelector('.price-input').value) || 0;
            const lineTotal = row.querySelector('.line-total').textContent;
            const displayName = productName === i18n.otherOption[state.currentLang] ? `${productName} ${i18n.pdf.otherOptionNote[state.currentLang]}` : productName;

            return `<tr class="border-b"><td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${index + 1}</td><td style="padding: 8px; border: 1px solid #ccc; word-break: break-word; white-space: normal;">${displayName}</td><td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${unit}</td><td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${qty}</td><td style="padding: 8px; border: 1px solid #ccc; text-align: right;">${formatCurrency(price)}</td><td style="padding: 8px; border: 1px solid #ccc; text-align: right;">${lineTotal}</td></tr>`;
        }).join('');

        const pdfText = i18n.pdf;
        const taxCodeHTML = elements.customerTaxCode.value ? `<tr><td style="border: none; padding: 2px 0; width: 15%; font-weight: bold; white-space: nowrap; vertical-align: top;">${pdfText.taxCode[state.currentLang]}:</td><td style="border: none; padding: 2px 0;">${elements.customerTaxCode.value}</td></tr>` : '';

        return `
            <div style="font-family: 'Roboto', sans-serif; color: #000;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;"><tr><td style="width: 25%; vertical-align: middle; padding-right: 15px;"><img src="logo.png" alt="Logo" style="max-width: 100px; height: auto;"></td><td style="width: 45%; vertical-align: middle;"><h3 style="font-size: 1.125rem; font-weight: 700; margin:0 0 5px 0;">${pdfText.companyName[state.currentLang]}</h3><p style="margin: 0; font-size: 10pt;">${pdfText.phone[state.currentLang]}: 0901196093</p><p style="margin: 0; font-size: 10pt;">${pdfText.companyAddress[state.currentLang]}</p><p style="margin: 0; font-size: 10pt;">${pdfText.email[state.currentLang]}: doc@tanthuanport.vn</p></td><td style="width: 30%; vertical-align: middle; text-align: right;"><p style="margin: 0; font-size: 11pt;"><strong>${pdfText.quoteNo[state.currentLang]}:</strong> ${elements.invoiceNumber.value}</p><p style="margin: 0; font-size: 11pt;"><strong>${pdfText.date[state.currentLang]}:</strong> ${elements.invoiceDate.value}</p></td></tr></table>
                <div style="text-align: center; margin-bottom: 1.5rem;"><h1 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 0;">${pdfText.title[state.currentLang]}</h1><p style="font-size: 11pt; font-style: italic; margin-top: 4px;">${pdfText.vatIncluded[state.currentLang]}</p></div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.2rem; font-size: 11pt;"><tr><td style="border: none; padding: 2px 0; width: 15%; font-weight: bold; white-space: nowrap; vertical-align: top;">${pdfText.customerName[state.currentLang]}:</td><td style="border: none; padding: 2px 0;">${elements.customerName.value}</td></tr>${taxCodeHTML}<tr><td style="border: none; padding: 2px 0; width: 15%; font-weight: bold; white-space: nowrap; vertical-align: top;">${pdfText.address[state.currentLang]}:</td><td style="border: none; padding: 2px 0;">${elements.customerAddress.value}</td></tr><tr><td style="border: none; padding: 2px 0; width: 15%; font-weight: bold; white-space: nowrap; vertical-align: top;">${pdfText.phone[state.currentLang]}:</td><td style="border: none; padding: 2px 0;">${elements.customerPhone.value}</td></tr><tr><td style="border: none; padding: 2px 0; width: 15%; font-weight: bold; white-space: nowrap; vertical-align: top;">${pdfText.notes[state.currentLang]}:</td><td style="border: none; padding: 2px 0; word-break: break-word; white-space: normal;">${elements.customerNotes.value}</td></tr></table>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: 11pt;"><thead style="background-color: #e0e0e0 !important; -webkit-print-color-adjust: exact;"><tr><th style="width: 5%; text-align: center; padding: 8px; border: 1px solid #ccc;">${pdfText.thNo[state.currentLang]}</th><th style="width: 45%; text-align: left; padding: 8px; border: 1px solid #ccc;">${pdfText.thService[state.currentLang]}</th><th style="width: 10%; text-align: center; padding: 8px; border: 1px solid #ccc;">${pdfText.thUnit[state.currentLang]}</th><th style="width: 10%; text-align: center; padding: 8px; border: 1px solid #ccc;">${pdfText.thQty[state.currentLang]}</th><th style="width: 15%; text-align: right; padding: 8px; border: 1px solid #ccc;">${pdfText.thUnitPrice[state.currentLang]}</th><th style="width: 15%; text-align: right; padding: 8px; border: 1px solid #ccc;">${pdfText.thAmount[state.currentLang]}</th></tr></thead><tbody>${itemsHTML}</tbody></table>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ccc; font-size: 11pt;"><tr><td style="padding: 8px; width: 70%; border-right: 1px solid #ccc;">${pdfText.totalPayment[state.currentLang]}</td><td style="padding: 8px; width: 30%; text-align: right; font-weight: bold;">${elements.totalAmount.textContent}</td></tr><tr style="background-color: #f3f4f6 !important; -webkit-print-color-adjust: exact;"><td colspan="2" style="padding: 8px;"><span style="font-style: normal;">${pdfText.inWords[state.currentLang]} </span><span style="font-style: italic;">${elements.totalInWords.textContent}</span></td></tr></table>
                <div style="margin-top: 20px; font-size: 10pt; border: 1px solid #ddd; padding: 10px 15px; border-radius: 5px; background-color: #f9f9f9 !important; -webkit-print-color-adjust: exact;"><h4 style="font-weight: bold; margin: 0 0 8px 0; font-size: 11pt;">${pdfText.quoteNotesTitle[state.currentLang]}</h4><ul class="custom-list">${pdfText.quoteNotesContent[state.currentLang]}</ul></div>
                <table style="width: 100%; border-collapse: collapse; margin-top: 1.5rem; border-top: 1px solid #ccc; padding-top: 1rem;"><tr><td style="width: 70%; border: none; vertical-align: top;"><h4 style="font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">${pdfText.paymentInfo[state.currentLang]}</h4><p style="margin: 0; font-size: 11pt;">${pdfText.bank[state.currentLang]}: <strong>BIDV - Chau Thanh Sai Gon Branch</strong></p><p style="margin: 0; font-size: 11pt;">${pdfText.accountName[state.currentLang]}: <strong>CONG TY CO PHAN CANG SAI GON</strong></p><p style="margin: 0; font-size: 11pt;">${pdfText.accountNumber[state.currentLang]}: <strong style="color: #d0021b !important;">8608393979</strong></p><p style="margin-top: 2rem; font-size: 0.875rem; font-style: italic;">${pdfText.taxNote[state.currentLang]}</p></td><td style="width: 30%; border: none; text-align: right; vertical-align: top;"><img src="${qrCodeBase64}" alt="QR Code" style="width: 120px; height: 120px; display: inline-block;" id="qr-code-image"></td></tr></table>
            </div>
        `;
    }

    async function getDynamicQrCodeBase64(amount, description) {
        if (amount <= 0) return staticQrCode;
        const vietQR_URL = `https://api.vietqr.io/image/970418-8608393979-compact2.jpg?accountName=CONG%20TY%20CO%20PHAN%20CANG%20SAI%20GON&amount=${amount}&addInfo=${encodeURIComponent(description)}`;
        try {
            const response = await fetch(vietQR_URL);
            if (!response.ok) throw new Error('Network response was not ok.');
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.warn("Could not generate dynamic QR, using static QR instead. Error:", error);
            return staticQrCode;
        }
    }

    // [CẢI TIẾN] Tách logic tạo canvas ra hàm riêng để tái sử dụng
    async function generateQuotationCanvas() {
        const qrCodeBase64 = await getDynamicQrCodeBase64(state.rawTotalAmount, elements.invoiceNumber.value);
        elements.a4ContentWrapper.innerHTML = generateA4HTML(qrCodeBase64);
        
        await new Promise(resolve => setTimeout(resolve, 0)); // Chờ DOM cập nhật
        
        const imagesToLoad = [
            waitForImageLoad(document.getElementById('qr-code-image')),
            waitForImageLoad(document.querySelector('#a4-content-wrapper img[alt="Logo"]'))
        ];
        await Promise.all([...imagesToLoad, document.fonts.ready]);

        return await html2canvas(elements.a4ContentWrapper, { 
            scale: 1.5, useCORS: true, allowTaint: true, scrollX: 0, scrollY: 0,
            windowWidth: elements.a4ContentWrapper.scrollWidth,
            windowHeight: elements.a4ContentWrapper.scrollHeight
        });
    }

    async function renderPreviewToCanvas() { 
        if (!validateForm()) return;
        showToast(i18n.updatePreview[state.currentLang], 'info'); 
        try {
            const canvas = await generateQuotationCanvas();
            const a4Ratio = 297 / 210; 
            elements.previewCanvas.width = canvas.width; 
            elements.previewCanvas.height = canvas.height; 
            elements.previewCanvas.style.height = (elements.previewCanvas.clientWidth * a4Ratio) + 'px'; 
            const ctx = elements.previewCanvas.getContext('2d'); 
            ctx.drawImage(canvas, 0, 0, elements.previewCanvas.width, elements.previewCanvas.height); 
            showToast(i18n.updatePreview[state.currentLang]);
        } catch (error) { 
            showToast('Error creating preview. Check Console (F12).', 'error'); 
            console.error("html2canvas error (Preview):", error); 
        } 
    }

    async function generatePdf() {
        if (!validateForm()) return;
        
        elements.generatePdfBtn.disabled = true; 
        elements.generatePdfBtn.textContent = 'Processing...'; 
        showToast('Preparing PDF...', 'info'); 
        
        try { 
            const canvas = await generateQuotationCanvas();
            const { jsPDF } = window.jspdf; 
            const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' }); 
            const imgData = canvas.toDataURL('image/jpeg', 0.85);
            const pdfWidth = doc.internal.pageSize.getWidth(); 
            const pdfHeight = doc.internal.pageSize.getHeight(); 
            doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
            doc.output('dataurlnewwindow'); 
            showToast('PDF opened in a new tab!'); 
        } catch (error) { 
            showToast('Error creating PDF. Check Console (F12).', 'error'); 
            console.error("html2canvas error (PDF Export):", error); 
        } finally {
            elements.generatePdfBtn.disabled = false; 
            elements.generatePdfBtn.textContent = i18n.printPdf[state.currentLang]; 
        }
    }

    // --- 7. EVENT HANDLERS ---
    function handleTableRowInput(e) {
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
    function handleTableRowChange(e) {
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
    function handleTableRowClick(e) {
        if (e.target.classList.contains('remove-row-btn')) {
            e.target.closest('.item-row').remove();
            recalculateTotals();
        }
    }
    function handleLangToggle() {
        state.currentLang = state.currentLang === 'vi' ? 'en' : 'vi';
        localStorage.setItem('appLang', state.currentLang);
        loadProducts();
        resetForm(false);
        translateUI();
    }
    function handleProductFormSubmit(e) {
        e.preventDefault();
        const name = elements.productName.value, unit = elements.productUnit.value, price = parseFloat(elements.productPrice.value), index = parseInt(elements.editIndex.value);
        if (index === -1) { state.products.unshift({ name, unit, price }); } else { state.products[index] = { name, unit, price }; }
        saveProducts();
        renderProductManagementTable();
        showToast(i18n.toastTariffUpdated[state.currentLang]);
        resetProductForm();
    }
    function handleProductTableClick(e) {
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
    function handleExcelImport(event) {
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
    function handleExcelExport() {
        const dataToExport = state.products.filter(p => p.name !== i18n.otherOption[state.currentLang]).map(p => ({ 'Name': p.name, 'Unit': p.unit, 'Price': p.price }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Services');
        XLSX.writeFile(workbook, 'Service_List_TanThuan.xlsx');
        showToast(i18n.toastExportSuccess[state.currentLang]);
    }
    function handleHistoryTableClick(e) {
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
    function handleWindowClick(event) {
        if (event.target == elements.productModal) { hideModal(elements.productModal); resetProductForm(); }
        if (event.target == elements.historyModal) { hideModal(elements.historyModal); }
    }
    function backupData() {
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
    function handleRestoreData(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (!confirm(i18n.confirmRestore[state.currentLang])) {
            event.target.value = '';
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
            } finally {
                event.target.value = '';
            }
        };
        reader.readAsText(file);
    }

    // --- 8. INITIALIZATION ---
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
        elements.manageProductsBtn.onclick = () => { showModal(elements.productModal); renderProductManagementTable(); };
        elements.closeProductModalBtn.onclick = () => { hideModal(elements.productModal); resetProductForm(); };
        elements.cancelEditBtn.onclick = resetProductForm;
        elements.productForm.addEventListener('submit', handleProductFormSubmit);
        elements.productManagementTable.addEventListener('click', handleProductTableClick);
        elements.importExcelBtn.onclick = () => elements.excelImporter.click();
        elements.exportExcelBtn.addEventListener('click', handleExcelExport);
        elements.excelImporter.addEventListener('change', handleExcelImport);
        elements.backupDataBtn.addEventListener('click', backupData);
        elements.restoreDataBtn.onclick = () => elements.jsonImporter.click();
        elements.jsonImporter.addEventListener('change', handleRestoreData);
        elements.historyBtn.onclick = () => { showModal(elements.historyModal); renderHistoryTable(); };
        elements.closeHistoryModalBtn.onclick = () => { hideModal(elements.historyModal); };
        elements.historyTableBody.addEventListener('click', handleHistoryTableClick);
        window.addEventListener('click', handleWindowClick);
    }

    function init(showWelcome = true) {
        loadProducts();
        translateUI();
        flatpickr(elements.invoiceDate, { dateFormat: "d/m/Y", defaultDate: "today" });
        elements.invoiceNumber.value = generateNextQuoteNumber();
        elements.tableBody.innerHTML = '';
        createTableRow();
        recalculateTotals();
        if (showWelcome) {
            showToast(i18n.toastReady[state.currentLang]);
        }
    }

    // --- APP ENTRY POINT ---
    init();
    bindEvents();

})(); // End of IIFE
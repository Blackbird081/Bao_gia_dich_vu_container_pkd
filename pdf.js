// Chứa các hàm liên quan đến việc tạo PDF và bản xem trước

import { state } from './state.js';
import { elements } from './dom.js';
import { i18n, staticQrCode } from './config.js';
import { formatCurrency, waitForImageLoad, showToast } from './utils.js';
import { saveQuotation } from './storage.js'; // Cần validateForm từ storage

// Hàm validateForm được sao chép vào đây để tránh circular dependency
// Hoặc có thể tạo một module `validation.js` riêng
function validateForm() {
    const errors = [];
    const fieldsToValidate = [
        { element: elements.customerName, errorKey: 'toastNoCustomer' },
        { element: elements.invoiceNumber, errorKey: 'toastNoQuoteNo' },
        { element: elements.invoiceDate, errorKey: 'toastInvalidDate', validator: (el) => el.value } // Simple check
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

async function generateQuotationCanvas() {
    const qrCodeBase64 = await getDynamicQrCodeBase64(state.rawTotalAmount, elements.invoiceNumber.value);
    elements.a4ContentWrapper.innerHTML = generateA4HTML(qrCodeBase64);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
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

export async function renderPreviewToCanvas() {
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

export async function generatePdf() {
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
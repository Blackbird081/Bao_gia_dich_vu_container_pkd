// Quản lý trạng thái động của ứng dụng

export const state = {
    currentLang: localStorage.getItem('appLang') || 'vi',
    products: [],
    rawTotalAmount: 0,
};
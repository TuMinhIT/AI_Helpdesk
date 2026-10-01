export function formatCurrency(value: number | null | undefined, locale = 'vi-VN', currency = 'VND') {
    if (value == null || Number.isNaN(value)) return "0 ₫";
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
    }).format(value);
}

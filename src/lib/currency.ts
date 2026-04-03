/** Product `price` values are stored as INR (Indian Rupees). */
const INR_LOCALE = "en-IN";

export function formatINR(amount: number): string {
    return new Intl.NumberFormat(INR_LOCALE, {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

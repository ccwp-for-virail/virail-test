export const API_PATH = "http://localhost:3000/api";
export const CURRENCY = "USD";
export const CURRENT_DATE = process.env.USE_VIRAIL_API === 'true' ? new Date().toISOString().substr(0, 10) : process.env.CURRENT_DATE;
export const LANG = "en_us";

export const COLUMNS = [
  "date",
  "transport",
  "departure",
  "arrival",
  "duration",
  "price"
];

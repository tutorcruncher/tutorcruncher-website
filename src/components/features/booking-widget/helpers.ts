import { COUNTRIES_CURRENCIES, LISTED_CURRENCIES } from "./constants";

// Resolves the currency key ("USD ($)") actually used for a country's brackets,
// falling back to USD for countries with no listed currency.
export const getCurrencyKeyForCountry = (countryCode: string) => {
  const currencyStr = COUNTRIES_CURRENCIES[countryCode]?.currencies[0];
  if (!(currencyStr in LISTED_CURRENCIES)) {
    return COUNTRIES_CURRENCIES["US"]["currencies"][0];
  }
  return currencyStr;
};

// The ISO code ("USD") for a country, matching the brackets the user was shown.
export const getCurrencyCodeForCountry = (countryCode: string) =>
  getCurrencyKeyForCountry(countryCode).split(" ")[0];

export const getCurrencyOptions = (countryCode: string) =>
  LISTED_CURRENCIES[getCurrencyKeyForCountry(countryCode)];

export const getKeyByCurrencyCode = (currencyCode: string) => {
  for (const key in LISTED_CURRENCIES) {
    if (key.includes(currencyCode)) {
      return key;
    }
  }
  return null;
};

export const checkPreviousBookings = (): string | false => {
  const previousCallData = JSON.parse(localStorage.getItem("call_data"));

  if (!previousCallData || previousCallData.call_type !== "sales") {
    return false;
  }

  const {
    admin_id: salespersonId,
    name,
    email,
    company_name: companyName,
    website,
    phone,
    currency,
    price_plan: pricePlan,
  } = previousCallData;

  const currencyKey = getKeyByCurrencyCode(currency);

  if (!currencyKey) {
    console.error("Invalid currency code:", currency);
    return false;
  }

  const currencyData = LISTED_CURRENCIES[currencyKey];
  const rbIndex = currencyData.findIndex(([plan]) => plan === pricePlan);

  if (rbIndex === -1) {
    console.error("Revenue band not found for given currency and price plan.");
    return `/book-a-call/${salespersonId}/`;
  }

  return `/book-a-call/${salespersonId}/?rb=${rbIndex}&name=${name}&email=${email}&company=${companyName}&website=${website}&phone=${phone}`;
};

const currency_format = new Intl.NumberFormat(undefined, {
  currency: "NGN",
  style: "currency",
  maximumFractionDigits: 0,
});

export function formatCurrency(number) {
  return currency_format.format(number);
}

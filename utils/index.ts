const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Manually adjust the formatted string if necessary
  let formattedValue = formatter.format(value);

  // Example adjustment: Remove spaces around the currency symbol if present
  formattedValue = formattedValue.replace(/\s?₮\s?/, "₮");

  return formattedValue;
};

export { formatCurrency };

function formatDate(dateString: string, full?: boolean): string {
  const date = new Date(dateString);

  const mongoliaOffset = 8 * 60 * 60 * 1000;

  const mongoliaDate = new Date(
    date.getTime() + mongoliaOffset + date.getTimezoneOffset() * 60000,
  );

  const year = mongoliaDate.getFullYear();
  const month = String(mongoliaDate.getMonth() + 1).padStart(2, "0");
  const day = String(mongoliaDate.getDate()).padStart(2, "0");
  const hours = String(mongoliaDate.getHours()).padStart(2, "0");
  const minutes = String(mongoliaDate.getMinutes()).padStart(2, "0");

  let formattedDate = "";

  if (full) {
    formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  } else {
    formattedDate = `${hours}:${minutes}`;
  }

  return formattedDate;
}

export default formatDate;

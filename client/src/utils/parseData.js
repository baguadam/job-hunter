export function parseInput(text) {
  const rows = text
    .split("\n")
    .map((row) => row.trim())
    .filter((row) => row.length > 0);
  const result = [];

  rows.forEach((row) => {
    const parts = row.split(";");
    if (parts.length === 3) {
      const [company, title, interval] = parts.map((part) => part.trim());
      const intervalPattern = /^\d{4}-(\d{4})?$/;

      if (company && title && intervalPattern.test(interval)) {
        result.push({ company, title, interval });
      } else {
        throw new Error(`Invalid format in row: ${row}`);
      }
    } else {
      throw new Error(`Invalid format in row: ${row}`);
    }
  });

  return result;
}

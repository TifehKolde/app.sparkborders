// src/utils/slugify.js
export function slugify(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-") // spaces → dashes
      .replace(/[^\w-]+/g, ""); // remove special characters
  }
  
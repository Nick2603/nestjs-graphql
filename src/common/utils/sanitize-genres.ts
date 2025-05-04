export const sanitizeGenres = (genres: string[]): string[] => {
  return genres.map((genre) => genre.trim().toLowerCase()).filter(Boolean);
};

// Ubacuje Cloudinary transformaciju (auto format + auto kvalitet + širina)
// direktno u URL, bez potrebe da se slike ručno menjaju u Cloudinary panelu.
export function optimizeCloudinaryUrl(url: string, width: number) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
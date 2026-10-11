// Ubacuje Cloudinary transformaciju (auto format + auto kvalitet + širina)
// direktno u URL, bez potrebe da se slike ručno menjaju u Cloudinary panelu.
// Bez širine menja se samo format i kvalitet (za male slike koje ne treba povećavati).
export function optimizeCloudinaryUrl(url: string, width?: number) {
  const transform = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
  return url.replace("/upload/", `/upload/${transform}/`);
}

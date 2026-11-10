// Ubacuje Cloudinary transformaciju (auto format + auto kvalitet + širina)
// direktno u URL, bez potrebe da se slike ručno menjaju u Cloudinary panelu.
// Bez širine menja se samo format i kvalitet (za male slike koje ne treba povećavati).
export function optimizeCloudinaryUrl(url: string, width?: number) {
  const transform = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
  return url.replace("/upload/", `/upload/${transform}/`);
}

// Za logoe kojima je u kodu zadata visina (širina prati proporciju): Cloudinary smanjuje sliku na `height` piksela
// visine; c_limit znači da manju sliku ne povećava.
export function optimizeCloudinaryHeight(url: string, height: number) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,h_${height}/`);
}

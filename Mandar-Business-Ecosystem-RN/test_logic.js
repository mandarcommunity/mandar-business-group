const base64Images = ['abcd'];
const images = ['file:///1'];
let finalImages = [];
let b64Index = 0;
for (const uri of images) {
  if (uri.startsWith('http')) {
    finalImages.push(uri);
  } else if (base64Images && base64Images[b64Index]) {
    finalImages.push("new_url");
    b64Index++;
  }
}
console.log(finalImages);

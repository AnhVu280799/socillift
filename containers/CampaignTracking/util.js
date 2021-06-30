export function stateToParamsHashtags({ hashtag }) {
  let results = {};
  results.hashtag = hashtag;
  return results;
}
export function paramsToStateHashtags({ hashtag }) {
  let results = {};
  if (hashtag) results.hashtag = normalizeHashtag(hashtag[0]);
  return results;
}
export function normalizeHashtag(string) {
  let result = string.trim();
  result = result.replace(/\s/g, "");
  result = result.replace(/[!@%&:;',`~<>=_#-/\\^$*"+?.()|[\]{}]/g, "");
  result = result.replace(/[àáảãạăắằẵặẳâầấậẫẩ]/g, "a");
  result = result.replace(/[ẠẢÃÀÁÂẬẦẤẨẪĂẮẰẶẲẴ]/g, "A");
  result = result.replace(/[èéẻẽẹêềếểễệ]/g, "e");
  result = result.replace(/[ÉÈẺẸẼÊẾỀỆỂỄ]/g, "E");
  result = result.replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, "o");
  result = result.replace(/[ÓÒỌÕỎÔỘỔỖỒỐƠỜỚỢỞỠ]/g, "O");
  result = result.replace(/[ùúủũụưừứửữự]/g, "u");
  result = result.replace(/[ÚÙỤỦŨƯỰỮỬỪỨ]/g, "U");
  result = result.replace(/[ìíỉĩị]/g, "i");
  result = result.replace(/[ÍÌỊỈĨ]/g, "I");
  result = result.replace(/[ỳýỷỹỵ]/g, "y");
  result = result.replace(/[ÝỲỶỴỸ]/g, "Y");
  result = result.replace(/[đ]/g, "d");
  result = result.replace(/[Đ]/g, "D");
  result = result.toLowerCase();

  return result;
}

const variableFormat = /%\d{1}/g;
const sFormat = /%s1/g;
const selectFormat = /%select\{.+\}\d{1}/;
// const pluralFormat = /%plural\{.+\}\d/;
const ordinalFormat = /%ordinal\d{1}/;
const objcclassFormat = /%objcclass\d/;
const objcinstanceFormat = /%objcinstance\d/;
const qFormat = /%q\d/;
const diffFormat = /%diff\{.+\}\d,\d/;
const subFormat = /%sub\{\w+\}\d/;

export const REPLACED_TO = [
  "영",
  "일",
  "이",
  "삼",
  "사",
  "오",
  "육",
  "칠",
  "팔",
  "구",
  "십",
];

export function parser(str: string) {
  let i = 0;

  while (variableFormat.test(str)) {
    str = str.replace(variableFormat, REPLACED_TO[i]);
    i++;
  }

  while (sFormat.test(str)) {
    str = str.replace(sFormat, REPLACED_TO[i]);
    i++;
  }

  while (selectFormat.test(str)) {
    str = str.replace(selectFormat, REPLACED_TO[i]);
    i++;
  }

  while (ordinalFormat.test(str)) {
    str = str.replace(ordinalFormat, REPLACED_TO[i]);
    i++;
  }

  while (objcclassFormat.test(str)) {
    str = str.replace(objcclassFormat, REPLACED_TO[i]);
    i++;
  }

  while (objcinstanceFormat.test(str)) {
    str = str.replace(objcinstanceFormat, REPLACED_TO[i]);
    i++;
  }

  while (qFormat.test(str)) {
    str = str.replace(qFormat, REPLACED_TO[i]);
    i++;
  }

  while (diffFormat.test(str)) {
    str = str.replace(diffFormat, REPLACED_TO[i]);
    i++;
  }

  while (subFormat.test(str)) {
    str = str.replace(subFormat, REPLACED_TO[i]);
    i++;
  }

  return str;
}

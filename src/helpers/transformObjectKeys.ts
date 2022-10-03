import { camelCase } from "change-case";

function transformObjectKeys(obj: any) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  let newObj = obj;

  if (typeof newObj === "object") {
    if (obj instanceof Array) {
      newObj = obj.map(transformObjectKeys);
    } else {
      newObj = {};

      Object.keys(obj).forEach((key) => {
        if (key === "id") {
          newObj[camelCase(key)] = transformObjectKeys(String(obj[key]));
        } else {
          newObj[camelCase(key)] = transformObjectKeys(obj[key]);
        }
      });
    }
  }

  return newObj;
}

export default transformObjectKeys;

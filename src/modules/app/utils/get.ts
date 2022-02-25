export const get = (obj: any, path: string) => {
  if (!obj) return obj;

  return path.split(".").reduce(function (a, b) {
    return a && a[b];
  }, obj);

  // const parts = path.split(".");
  // for (let i = 0; i < parts.length; ++i) {
  //   if (!obj) return obj;
  //
  //   const key = parts[i];
  //   obj = obj[key];
  // }

  // return obj;
};

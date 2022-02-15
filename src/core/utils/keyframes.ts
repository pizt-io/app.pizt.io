import css from "css";

export const keyframes = {
  stringify: (obj: any): string => {
    const result: string[] = [];

    Object.keys(obj).forEach((animationName) => {
      const animation: string[] = [];

      Object.keys(obj[animationName]).forEach((keyframe) => {
        let properties = "";

        Object.keys(obj[animationName][keyframe]).forEach((property) => {
          const value = obj[animationName][keyframe][property];

          if (Array.isArray(value)) {
            let arrayValue = "";

            value.forEach((subvalue) => {
              Object.keys(subvalue).forEach((subproperty) => {
                arrayValue += ` ${subproperty}(${subvalue[subproperty]})`;
              });
            });

            properties += ` ${property}: ${arrayValue}; `;
          } else {
            properties += ` ${property}: ${value}; `;
          }
        });

        animation.push(`${keyframe} { ${properties} }`);
      });

      result.push(`@keyframes ${animationName} { ${animation.join(" ")} }`);
    });

    return result.join("");
  },

  parse: (str: string) => css.parse(str),
};

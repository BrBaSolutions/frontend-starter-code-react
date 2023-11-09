import { NestedObjectConfig, PAYLOAD_MAKER_CONFIG } from "../constants/interfaces";

export const createPayloadFromData = <T extends Record<string, any>>(
  data: Partial<T>,
  config?: PAYLOAD_MAKER_CONFIG<T>
): Partial<T> => {
  const {
    columnsToConsider = Object.keys(data) as (keyof T)[],
    columnMapping = {},
    typeMapping = {},
    defaultValues = {},
    nestedObjects = [],
  } = config || {};

  const payload: Partial<T> = {};

  const keysToConsider =
    config?.columnsToConsider || (Object.keys(data) as (keyof T)[]);

  const mapValue = (key: keyof T, value: any) => {
    if (key in columnMapping) {
      // @ts-ignore
      key = columnMapping[key] as keyof T;
    }

    if (key in typeMapping) {
      // @ts-ignore
      const convert = typeMapping[key]!;
      value = convert(value);
    }

    return { key, value };
  };

  const processNestedObjects = (nestedObject: NestedObjectConfig<T>) => {
    let keyName: keyof T = nestedObject.mapTo as keyof T;

    if (keysToConsider.includes(keyName)) {
      if (keyName in columnMapping) {
        // @ts-ignore
        keyName = columnMapping[keyName] as keyof T;
      }

      const new_object: any = {};

      nestedObject.fieldsToMap.forEach((field) => {
        if (field in data) {
          let { key, value } = mapValue(field, data[field]);

          if (nestedObject.nestedTypeMapping && key in nestedObject.nestedTypeMapping) {
            // @ts-ignore
            const convert = nestedObject.nestedTypeMapping[key]!;
            value = convert(value);
          }

          if (nestedObject.nestedColumnMapping && key in nestedObject.nestedColumnMapping) {
            // @ts-ignore
            key = nestedObject.nestedColumnMapping[key];
          }

          if (nestedObject.nestedDefaultValues && key in nestedObject.nestedDefaultValues) {
            if (!value) {
              // @ts-ignore
              value = nestedObject.nestedDefaultValues[key];
            }
          }
          new_object[key] = value;
        }
      });

      payload[keyName] = new_object;
    }
  };

  columnsToConsider.forEach((key) => {
    const value = data[key];

    if (keysToConsider.includes(key)) {
      const { key: finalKey, value: finalValue } = mapValue(key, value);
      payload[finalKey] = finalValue;
    }
  });

  Object.entries(defaultValues).forEach(([key, value]) => {
    if (keysToConsider.includes(key)) {
      const { key: finalKey } = mapValue(key as keyof T, value);
      if (!payload[finalKey]) {
        // @ts-ignore
        payload[finalKey] = value;
      }
    }
  });

  nestedObjects.forEach(processNestedObjects);

  return payload;
};

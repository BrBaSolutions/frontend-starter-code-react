import { FORM_FIELD } from "../constants/interfaces";

export const generateInitialValues = (formData: any, formFieldsArray: FORM_FIELD[][]): { [key: string]: any } => {
  const initialValues: { [key: string]: any } = {};

  formFieldsArray.forEach((formFields) => {
    formFields.forEach((field) => {
      const { name } = field;
      const value = formData[name] || '';
  
      initialValues[name] = value;
    });
  });

  return initialValues;
};

import Papa, { ParseStepResult } from "papaparse";
import { CSV_COLUMN_MAPPING } from "../constants/interfaces";

interface CSV_ROW {
  [key: string]: string;
}

/**
 * Parse a CSV file and return JSON data with specified columns.
 * If no columns are specified, all columns will be included.
 * @param file - The File object representing the CSV file.
 * @param columnMappings - An object mapping CSV column names to desired JSON keys.
 * @returns Promise resolving to JSON data.
 */
export const parseCsvToJson = async (
  file: File,
  columnMappings: CSV_COLUMN_MAPPING[]
): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    const csvData: CSV_ROW[] = [];

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (event.target?.result) {
        const csvString = event.target.result as string;

        // @ts-ignore
        Papa.parse(csvString, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          step: (results: ParseStepResult<CSV_ROW>) => {
            const row: CSV_ROW = results.data;
            const filteredRow: CSV_ROW = {};

            columnMappings.forEach((columnMapping) => {
              const { columnName, jsonFieldName, required, pattern } =
                columnMapping;
              if (!row.hasOwnProperty(columnName)) {
                if (required) {
                  reject(
                    `Required field '${columnName}' not found in the CSV data.`
                  );
                }
                return;
              }
              if (pattern && !pattern.test(row[columnName])) {
                reject(
                  `Field '${columnName}' does not have data in correct format ${row[columnName]}.`
                );
                return;
              }
              filteredRow[jsonFieldName] = row[columnName];
            });

            csvData.push(filteredRow);
          },
          complete: () => {
            resolve(csvData);
          },
          error: (error: Papa.ParseError) => {
            reject(error.message || "An error occurred while parsing the CSV.");
          },
        });
      }
    };

    fileReader.onerror = (error: ProgressEvent<FileReader>) => {
      reject(
        (error.target as FileReader).error?.message ||
          "An error occurred while reading the file."
      );
    };

    fileReader.readAsText(file);
  });
};

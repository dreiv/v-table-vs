import data from "./data.json";

const latency = () => Math.random() * 500 + 300; // simulate network latency of 300-800ms

export const API = {
  fetch: async (pageNumber = 1, pageSize = 50): Promise<any> =>
    new Promise((resolve) => {
      const auxiliary = {};
      let records = data as any[];

      const response = {
        ...auxiliary,
        totalRecords: records.length,
        pageNumber,
        pageSize,
        records: records.splice(0, pageSize),
      };

      setTimeout(() => resolve(response), latency());
    }),
};

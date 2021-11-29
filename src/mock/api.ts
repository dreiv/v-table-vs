import data from "./data.json";

const latency = () => Math.random() * 500 + 300; // simulate network latency of 300-800ms

export const API = {
  load: async (pageNumber = 1, pageSize = 25) =>
    new Promise((resolve) => {
      const auxiliary = {};
      let records = data as any[];

      const response = {
        ...auxiliary,
        totalRecords: records.length,
        pageNumber,
        pageSize,
        records,
      };

      setTimeout(() => resolve(response), latency());
    }),
};

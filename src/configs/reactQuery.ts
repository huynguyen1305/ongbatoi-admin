import { QueryClientConfig } from "react-query";

const reactQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

export default reactQueryConfig;

import reactQueryConfig from "@/configs/reactQuery";
import { QueryClient, QueryClientProvider as Provider } from "react-query";
import React, { useState } from "react";

const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient(reactQueryConfig));
  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;

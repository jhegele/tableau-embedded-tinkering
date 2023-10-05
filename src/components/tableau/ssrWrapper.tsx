import { Suspense } from "react";
import { type TableauProps } from "./Tableau";
import dynamic from "next/dynamic";
const TableauComponent = dynamic(() => import("./Tableau"), { ssr: false });

export const Tableau: React.FC<TableauProps> = (props) => {
  return (
    <Suspense fallback={null}>
      <TableauComponent {...props} />
    </Suspense>
  );
};

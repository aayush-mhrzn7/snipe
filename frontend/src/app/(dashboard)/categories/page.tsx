import { DataTableDemo } from "@/components/table";
import React from "react";
import { columns } from "./component/column";
import DataTable from "./component/DataTable";

const page = () => {
  return (
    <div className="mx-auto py-2 container">
      <DataTable />
    </div>
  );
};

export default page;

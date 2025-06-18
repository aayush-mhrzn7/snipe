"use client";
import Modal from "@/components/modal/Modal";
import { DataTableDemo } from "@/components/table";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/categories.service";
import { APIResults } from "@/utils/interface/api.interface";
import { CategoryResultInterface } from "@/utils/interface/category.inteface";
import { useQuery } from "@tanstack/react-query";
import { CategoryForm } from "./category.form";
import { columns } from "./column";

const DataTable = () => {
  const { data } = useQuery<APIResults<CategoryResultInterface>>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const column = columns;
  return (
    <div>
      <DataTableDemo
        injectUI={
          <Modal
            title="Manage Categories"
            trigger={<Button>Add Category</Button>}
          >
            <CategoryForm />
          </Modal>
        }
        data={data?.data.result}
        columns={column}
        searchKey="name"
        title="Categories"
        subheading="Manage Categories"
      />
    </div>
  );
};

export default DataTable;

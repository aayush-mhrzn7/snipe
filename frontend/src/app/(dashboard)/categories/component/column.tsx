"use client";
import { AlertModel } from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCategories } from "@/services/categories.service";
import { CategoryInterface } from "@/utils/interface/category.inteface";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2Icon } from "lucide-react";

export const columns: ColumnDef<CategoryInterface>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <span
        className="flex cursor-pointer items-center gap-2 hover:text-blue-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown size={14} />
      </span>
    ),
    cell: ({ row }) => {
      const title = row.getValue("name") as string;
      return (
        <div className="max-w-[300px]">
          <p className="font-medium text-sm line-clamp-2">
            {title || "No title available"}
          </p>
        </div>
      );
    },
    size: 300,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <span
        className="flex cursor-pointer items-center gap-2 hover:text-blue-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown size={14} />
      </span>
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[300px]">
          <p className="font-medium text-sm line-clamp-2">
            {row?.original?.createdAt?.split("T")[0].replaceAll("-", "/") ||
              "No title available"}
          </p>
        </div>
      );
    },
    size: 300,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      return (
        <div className="flex justify-center">
          <AlertModel
            trigger={
              <Button variant={"destructive"} className="cursor-pointer">
                <Trash2Icon />
              </Button>
            }
            title="Are you sure you want to delete this category?"
            action={async () => {
              await deleteCategories(row?.original?._id);
              queryClient.invalidateQueries({ queryKey: ["categories"] });
            }}
          />
        </div>
      );
    },
    size: 80,
  },
];

// Optional: Export default column visibility settings
export const defaultColumnVisibility = {
  price: false, // Hide raw price by default since we have normalized price
};

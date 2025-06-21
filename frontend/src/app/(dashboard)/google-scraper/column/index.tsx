"use client";
import Modal from "@/components/modal/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProductData } from "@/utils/interface/scraper.interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<ProductData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <img
          src={row.getValue("image")}
          height={60}
          width={80}
          alt="Product"
          className="rounded-md object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-image.png"; // Fallback image
          }}
        />
      </div>
    ),
    size: 100,
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <span
        className="flex cursor-pointer items-center gap-2 hover:text-blue-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown size={14} />
      </span>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
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
    accessorKey: "price",
    header: ({ column }) => (
      <span
        className="flex cursor-pointer items-center gap-2 hover:text-blue-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Raw Price
        <ArrowUpDown size={14} />
      </span>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as string;
      console.log(price, "price");
      return (
        <div className="text-sm">
          <pre className="whitespace-pre-wrap text-xs text-gray-600 max-w-[150px]">
            {price || "N/A"}
          </pre>
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: "normalizedPrice",
    header: ({ column }) => (
      <span
        className="flex cursor-pointer items-center gap-2 hover:text-blue-600"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown size={14} />
      </span>
    ),
    cell: ({ row }) => {
      const normalizedPrice = row.getValue(
        "normalizedPrice"
      ) as ProductData["normalizedPrice"];
      return (
        <div className="flex justify-start items-center font-medium">
          {normalizedPrice?.display ? (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-green-600">
                {normalizedPrice.display}
              </span>
              <span className="text-xs text-gray-500">
                Amount: {normalizedPrice.amount?.toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>
      );
    },
    size: 130,
    sortingFn: (rowA, rowB) => {
      const priceA = rowA.original.normalizedPrice?.amount || 0;
      const priceB = rowB.original.normalizedPrice?.amount || 0;
      return priceA - priceB;
    },
  },
  {
    accessorKey: "href",
    header: "Product Link",
    cell: ({ row }) => {
      const href = row.getValue("href") as string;
      return (
        <div className="flex items-center gap-2">
          {href ? (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:opacity-80"
            >
              <Badge className="cursor-pointer transition-all hover:bg-blue-50">
                <ExternalLink size={12} className="mr-1" />
                View Product
              </Badge>
            </Link>
          ) : (
            <Badge variant="secondary">No Link</Badge>
          )}
        </div>
      );
    },
    size: 120,
    enableSorting: false,
  },
  {
    id: "manage-jobs",
    header: () => <div className="text-center">Manage Jobs</div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex justify-center">
          <Modal
            trigger={
              <Button size="sm" variant="outline">
                Manage Jobs
              </Button>
            }
            title={`Manage Jobs - ${product.title || "Product"}`}
          >
            <div className="flex flex-col w-full gap-4">
              <div className="text-sm text-gray-600">
                Configure monitoring for this product
              </div>
              <Input
                type="text"
                className="text-center font-mono"
                placeholder="0 */6 * * *"
                defaultValue="0 */6 * * *"
              />
              <div className="text-xs text-gray-500">
                Current: Check every 6 hours
              </div>
              <Button className="w-full">Update CRON Schedule</Button>
            </div>
          </Modal>
        </div>
      );
    },
    size: 120,
    enableSorting: false,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      // const router = useRouter();

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Product Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  if (product.href) {
                    navigator.clipboard.writeText(product.href);
                  }
                }}
              >
                Copy Product URL
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (product.normalizedPrice?.display) {
                    navigator.clipboard.writeText(
                      product.normalizedPrice.display
                    );
                  }
                }}
              >
                Copy Price
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  if (product.href) {
                    window.open(product.href, "_blank");
                  }
                }}
              >
                Open Product Page
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  history.pushState(null, "", `?image=${product.href}`);
                  // router.push(`?image=${product.image}`);
                }}
                className="text-blue-600"
              >
                Save This Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

"use client";
import Modal from "@/components/modal/Modal";
import { DataTableDemo } from "@/components/table";
import { Button } from "@/components/ui/button";
import { googleScraper } from "@/services/scraper.service";
import {
  GoogleScrapperFormSchema,
  GoogleScrapperSchema,
} from "@/utils/schema/scraper.schema";
import useScraperStore from "@/utils/states/scraper.state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { columns } from "../column";
import { FormGoogleScrape, SavePost } from "../form";
import { useSearchParams } from "next/navigation";
import AlertMesage from "@/components/alert";
import { TerminalIcon } from "lucide-react";
const DataTableComponent = () => {
  const column = columns;
  const searchParams = useSearchParams();
  console.log("idasdasdasdasd", searchParams.get("id"));
  const { scraper, setScraper } = useScraperStore();
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["google-scraper"],
    mutationFn: googleScraper,
    onSuccess: (data) => {
      console.log(data, "asdasdasdsadsa data");
      setScraper(data.data.result);
    },
    onError: (error) => console.log(error),
  });

  const onSubmit = (data: GoogleScrapperFormSchema) => {
    mutate(data);
  };
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<GoogleScrapperFormSchema>({
    mode: "onChange",
    resolver: zodResolver(GoogleScrapperSchema),
  });
  console.log("data", data?.data?.result);
  console.log(scraper, "scraper");
  const finalResult = scraper?.flatMap((product) => product.products);
  const searchparams = useSearchParams();
  console.log(searchparams.get("image"));
  return (
    <>
      {/* TODO: Replace with the module to add or edit and based on it change the UI */}
      {searchParams.get("image") ? (
        <div className="mx-auto py-2 container font-satoshi">
          <h2 className="text-2xl font-bold">Start Tracking This Product</h2>

          <SavePost
            data={scraper
              .flatMap((product) => product.products)
              .find((item) => item.href === searchParams.get("image"))}
          />
        </div>
      ) : (
        <div className="mx-auto py-2 container">
          <DataTableDemo
            searchKey="title"
            title="Google Scraper"
            subheading="Scrape the data from any website and get their details"
            columns={column}
            data={finalResult || []}
            injectUI={
              <Modal
                title="Google Scraper"
                trigger={<Button>Crawl the Web</Button>}
              >
                <FormGoogleScrape
                  onSubmit={handleSubmit(onSubmit)}
                  control={control}
                  errors={errors}
                />
              </Modal>
            }
          />
        </div>
      )}
    </>
  );
};

export default DataTableComponent;

"use client";

import {
  CustomAsyncSelect,
  CustomInput,
  CustomSelect,
} from "@/components/custom-forms-fields";
import { Button } from "@/components/ui/button";
import { GoogleScrapperOptionSize } from "@/utils/constants/index.constants";
import { GoogleScrapperFormSchema } from "@/utils/schema/scraper.schema";
import { TerminalIcon } from "lucide-react";
import { useEffect } from "react";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import AlertMesage from "@/components/alert";
import Image from "next/image";

const FormGoogleScrape = ({
  onSubmit,
  errors,
  control,
}: {
  onSubmit: SubmitHandler<GoogleScrapperFormSchema>;
  errors: string;
  control: Control;
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          google_query: e.currentTarget.google_query.value,
          no_of_links: e.currentTarget.no_of_links.value,
        });
      }}
    >
      <CustomInput
        placeholder="Buy Mac Mini Near Me"
        //   @ts-ignore TODO: Fix control
        control={control}
        name="google_query"
        inputType="text"
        label="Google Query"
        error=""
      />
      <div className="w-full">
        <CustomSelect
          label="No of links"
          error=""
          //   @ts-ignore
          control={control}
          name="no_of_links"
          options={GoogleScrapperOptionSize}
          placeholder="4"
        />
      </div>
      <Button className="mt-4">Submit</Button>
    </form>
  );
};
const SavePost = ({ data }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (data) {
      reset({
        product_name: data.title || "N/A",
        price: data.price,
        image_url: data.image,
      });
    }
  }, [data]);
  return (
    <div className="flex  min-h-[88dvh] max-md:min-h-full max-md:flex-col gap-3">
      {" "}
      <form
        className="flex-1 max-md:flex-[0]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="my-2 mb-6">
          <AlertMesage
            variant="default"
            icon={<TerminalIcon />}
            title="Heads Up!"
            description="Sometimes the Scraper may not be able to Scrape all Details of the Product Please Check the Product Details and Add Manually Update If Required"
          />
        </div>
        <CustomInput
          placeholder="Product Name"
          //   @ts-ignore TODO: Fix control
          control={control}
          name="product_name"
          inputType="text"
          label="Product Name"
          error=""
        />
        <div className="flex gap-4 w-full">
          <div className="flex-1">
            <CustomAsyncSelect
              placeholder="Electronics"
              //   @ts-ignore TODO: Fix control
              control={control}
              name="categories"
              label="Categories"
              error=""
            />
          </div>
          <div className="flex-1">
            <CustomSelect
              label="Scraping Frequency"
              //   @ts-ignore TODO: Fix control
              control={control}
              error=""
              options={[
                { label: "Once a Day", value: "0 0 * * *" },
                { label: "Once a Week", value: "0 0 * * 0" },
                { label: "Once a Month", value: "0 0 1 * *" },
                { label: "Once every 3 Months", value: "0 0 1 */3 *" },
                { label: "Once a Year", value: "0 0 1 1 *" },
              ]}
              name="cron_frequency"
              placeholder=" * * * * *"
            />
          </div>
        </div>

        <CustomInput
          placeholder="Price"
          //   @ts-ignore TODO: Fix control
          control={control}
          name="price"
          inputType="text"
          label="Product Price"
          error=""
        />
        <CustomInput
          placeholder="https://www.image.com/"
          //   @ts-ignore TODO: Fix control
          control={control}
          name="image_url"
          inputType="text"
          label="Image Url"
          error=""
          disabled={true}
          className="cursor-not-allowed"
        />
        {/* <Image
          src={data?.image || ""}
          alt="image"
          width={300}
          height={300}
          className="w-full h-full"
        /> */}
        <Button className="mt-4">Submit</Button>
      </form>
      <div className="max-md:h-[500px] max-md:mt-4 rounded-xl w-[400px] max-lg:w-[200px] max-md:w-full">
        {data && (
          <iframe
            src={data?.href}
            frameborder="0"
            width="100%"
            height="100%"
            className="rounded-xl"
          ></iframe>
        )}
      </div>
    </div>
  );
};
export { FormGoogleScrape, SavePost };

"use client";

import { CustomInput, CustomSelect } from "@/components/custom-forms-fields";
import { Button } from "@/components/ui/button";
import { GoogleScrapperOptionSize } from "@/utils/constants/index.constants";
import { GoogleScrapperFormSchema } from "@/utils/schema/scraper.schema";
import { Control, SubmitHandler } from "react-hook-form";

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
export { FormGoogleScrape };

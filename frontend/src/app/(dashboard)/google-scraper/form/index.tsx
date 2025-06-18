"use client";

import { CustomInput, CustomSelect } from "@/components/custom-forms-fields";
import { Button } from "@/components/ui/button";
import { googleScraper } from "@/services/scraper.service";
import { GoogleScrapperOptionSize } from "@/utils/constants/index.constants";
import {
  GoogleScrapperFormSchema,
  GoogleScrapperSchema,
} from "@/utils/schema/scraper.schema";
import useScraperStore from "@/utils/states/scraper.state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FormGoogleScrape = ({ onSubmit, errors, control }) => {
  return (
    <form onSubmit={onSubmit}>
      <CustomInput
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

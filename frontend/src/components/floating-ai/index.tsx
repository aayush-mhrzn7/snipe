import React from "react";
import { BoltIcon } from "@/assets/icons";
import Modal from "../modal/Modal";
import CustomToolTip from "../tooltip/CustomToolTip";
const index = () => {
  return (
    <div className="size-[40px] rounded-full border border-primary-border  flex justify-center bg-primary text-white hover:bg-primary/80 transition-all items-center shadow-sm">
      <Modal
        title="Summerize Using AI"
        trigger={
          <CustomToolTip
            trigger={<BoltIcon className="size-5" />}
            content="Summerize Using AI"
          />
        }
        children="Floating AI"
      />
    </div>
  );
};

export default index;

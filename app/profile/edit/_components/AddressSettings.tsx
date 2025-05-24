import { Button } from "@/components/ui/shadcn-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface AddressSettingsProps {
  addressFormik: any;
}
function AddressSettings({ addressFormik }: AddressSettingsProps) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="flex flex-col gap-3 w-full col-span-3">
        <label className="text-[#6F6F6F] text-lg" htmlFor="newEmail">
          Хот
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <input
            id="city"
            name="city"
            type="text"
            onChange={(e) =>
              addressFormik.setFieldValue("city", e.target.value)
            }
            value={addressFormik.values.city}
            className="w-full p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full col-span-3">
        <label className="text-[#6F6F6F] text-lg" htmlFor="district">
          Дүүрэг
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <input
            id="district"
            name="district"
            type="text"
            onChange={(e) =>
              addressFormik.setFieldValue("district", e.target.value)
            }
            value={addressFormik.values.district}
            className="w-full p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full col-span-3">
        <label className="text-[#6F6F6F] text-lg" htmlFor="newEmail">
          Хороо
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <input
            id="street"
            name="street"
            type="text"
            onChange={(e) =>
              addressFormik.setFieldValue("street", e.target.value)
            }
            value={addressFormik.values.street}
            className="w-full p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full col-span-3">
        <label className="text-[#6F6F6F] text-lg" htmlFor="addressType">
          Хаягийн төрөл
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <Select
            onValueChange={(value) =>
              addressFormik.setFieldValue("addressType", value)
            }
            value={addressFormik.values.addressType}
          >
            {/* @ts-ignore */}
            <SelectTrigger className="w-full outline-none min-h-[62px] p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl">
              <SelectValue placeholder="Хаягийн төрөл" />
            </SelectTrigger>
            {/* @ts-ignore */}
            <SelectContent>
              {/* @ts-ignore */}
              <SelectItem value="home">Орон сууц</SelectItem>
              {/* @ts-ignore */}
              <SelectItem value="office">гэр хороолол</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full col-span-2">
        <label className="text-[#6F6F6F] text-lg" htmlFor="gate">
          Орц
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <input
            id="gate"
            name="gate"
            type="text"
            placeholder="№"
            onChange={(e) =>
              addressFormik.setFieldValue("gate", e.target.value)
            }
            value={addressFormik.values.gate}
            className="w-full p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full col-span-2">
        <label className="text-[#6F6F6F] text-lg" htmlFor="floor">
          Давхар
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <input
            id="floor"
            name="floor"
            type="text"
            placeholder="№"
            onChange={(e) =>
              addressFormik.setFieldValue("floor", e.target.value)
            }
            value={addressFormik.values.floor}
            className="w-full p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full col-span-2">
        <label className="text-[#6F6F6F] text-lg" htmlFor="houseNumber">
          Тоот
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <input
            id="houseNumber"
            name="houseNumber"
            type="text"
            placeholder="№"
            onChange={(e) =>
              addressFormik.setFieldValue("houseNumber", e.target.value)
            }
            value={addressFormik.values.houseNumber}
            className="w-full p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full col-span-6">
        <label className="text-[#6F6F6F] text-lg" htmlFor="newEmail">
          Нэмэлт мэдээлэл
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <input
            id="additionalInfo"
            name="additionalInfo"
            type="text"
            onChange={(e) =>
              addressFormik.setFieldValue("additionalInfo", e.target.value)
            }
            value={addressFormik.values.additionalInfo}
            className="w-full p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
          />
        </div>
      </div>
      <Button className="col-span-6 bg-[#2D262D] text-white py-6 font-bold text-lg">
        Хадгалах
      </Button>
    </div>
  );
}

export default AddressSettings;

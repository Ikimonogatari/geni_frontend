"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import {
  useGetCityListQuery,
  useGetDistrictListQuery,
  useGetSubDistrictListQuery,
  useGetUserAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "@/app/services/service";

interface AddressData {
  SubDistId: number;
  ComplexBuilding: string;
  Entrance: string;
  Floor: number;
  ApartmentNumber: number;
  Detail: string;
  IsDefault: boolean;
}

interface City {
  CityId: number;
  Name: string;
  OrderNo: number;
}

interface District {
  DistId: number;
  CityId: number;
  Name: string;
  OrderNo: number;
}

interface SubDistrict {
  SubDistId: number;
  DistId: number;
  Name: string;
  OrderNo: number;
}

const AddressSelection: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    null
  );
  const [selectedSubDistrictId, setSelectedSubDistrictId] = useState<
    number | null
  >(null);
  const [addressForm, setAddressForm] = useState<AddressData>({
    SubDistId: 0,
    ComplexBuilding: "",
    Entrance: "",
    Floor: 0,
    ApartmentNumber: 0,
    Detail: "",
    IsDefault: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  // API hooks
  const {
    data: cityList,
    isLoading: cityLoading,
    error: cityError,
  } = useGetCityListQuery({});
  const {
    data: districtList,
    isLoading: districtLoading,
    error: districtError,
  } = useGetDistrictListQuery(selectedCityId, {
    skip: !selectedCityId || selectedCityId === 0,
  });
  const {
    data: subDistrictList,
    isLoading: subDistrictLoading,
    error: subDistrictError,
  } = useGetSubDistrictListQuery(selectedDistrictId, {
    skip: !selectedDistrictId || selectedDistrictId === 0,
  });
  const { data: userAddress, error: userAddressError } = useGetUserAddressQuery(
    {}
  );

  const [createAddress, { isLoading: createLoading }] =
    useCreateAddressMutation();
  const [updateAddress, { isLoading: updateLoading }] =
    useUpdateAddressMutation();

  // Load existing address data
  useEffect(() => {
    if (userAddress && userAddress.length > 0) {
      const address = userAddress[0]; // Assuming single address for now
      setAddressForm(address);
      setIsEditing(true);
      // You might need to set the selected IDs based on the existing address
      // This would require reverse lookup from SubDistId to find DistId and CityId
    }
  }, [userAddress]);

  // Debug logging for API responses
  useEffect(() => {
    console.log("City list:", cityList);
    if (cityError) console.error("City error:", cityError);
  }, [cityList, cityError]);

  useEffect(() => {
    console.log("Selected city ID:", selectedCityId);
    console.log("District list:", districtList);
    console.log("District loading:", districtLoading);
    if (districtError) console.error("District error:", districtError);
  }, [selectedCityId, districtList, districtLoading, districtError]);

  useEffect(() => {
    console.log("Selected district ID:", selectedDistrictId);
    console.log("Sub-district list:", subDistrictList);
    console.log("Sub-district loading:", subDistrictLoading);
    if (subDistrictError)
      console.error("Sub-district error:", subDistrictError);
  }, [
    selectedDistrictId,
    subDistrictList,
    subDistrictLoading,
    subDistrictError,
  ]);

  // Update SubDistId when sub-district is selected
  useEffect(() => {
    if (selectedSubDistrictId) {
      setAddressForm((prev) => ({ ...prev, SubDistId: selectedSubDistrictId }));
    }
  }, [selectedSubDistrictId]);

  const handleCityChange = (value: string) => {
    const cityId = parseInt(value);
    setSelectedCityId(cityId || null);
    setSelectedDistrictId(null);
    setSelectedSubDistrictId(null);
    // Reset SubDistId in form when city changes
    setAddressForm((prev) => ({ ...prev, SubDistId: 0 }));
  };

  const handleDistrictChange = (value: string) => {
    const districtId = parseInt(value);
    setSelectedDistrictId(districtId || null);
    setSelectedSubDistrictId(null);
    // Reset SubDistId in form when district changes
    setAddressForm((prev) => ({ ...prev, SubDistId: 0 }));
  };

  const handleSubDistrictChange = (value: string) => {
    const subDistrictId = parseInt(value);
    setSelectedSubDistrictId(subDistrictId || null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addressForm.SubDistId) {
      toast.error("Дүүрэг/сум сонгоно уу");
      return;
    }

    try {
      if (isEditing) {
        await updateAddress(addressForm).unwrap();
        toast.success("Хаяг амжилттай шинэчлэгдлээ");
      } else {
        await createAddress(addressForm).unwrap();
        toast.success("Хаяг амжилттай хадгалагдлаа");
        setIsEditing(true);
      }
    } catch (error: any) {
      toast.error(error?.data?.error || "Алдаа гарлаа");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Хаяг</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First 4 inputs in 2 columns for desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City Selection */}
          <div className="flex flex-col gap-3">
            <label className="block text-[#6F6F6F] text-lg font-normal">
              Аймаг/Хот
            </label>
            <Select
              value={selectedCityId?.toString() || ""}
              onValueChange={handleCityChange}
              disabled={cityLoading}
            >
              {/* @ts-ignore */}
              <SelectTrigger className="w-full bg-[#F5F4F0] p-3 sm:p-4 rounded-lg border border-[#CDCDCD] text-base sm:text-xl h-auto outline-none ring-0 focus:outline-none focus-visible:outline-none">
                <SelectValue placeholder="Аймаг/Хот сонгоно уу" />
              </SelectTrigger>
              {/* @ts-ignore */}
              <SelectContent>
                {cityList?.map((city: City) => (
                  // @ts-ignore
                  <SelectItem key={city.CityId} value={city.CityId.toString()}>
                    {city.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District Selection */}
          <div className="flex flex-col gap-3">
            <label className="block text-[#6F6F6F] text-lg font-normal">
              Сум/Дүүрэг
            </label>
            <Select
              value={selectedDistrictId?.toString() || ""}
              onValueChange={handleDistrictChange}
              disabled={!selectedCityId || districtLoading}
            >
              {/* @ts-ignore */}
              <SelectTrigger
                className={`w-full bg-[#F5F4F0] p-3 sm:p-4 rounded-lg border border-[#CDCDCD] text-base sm:text-xl h-auto outline-none ring-0 focus:outline-none focus-visible:outline-none ${
                  !selectedCityId || districtLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100"
                }`}
              >
                <SelectValue
                  placeholder={
                    !selectedCityId
                      ? "Эхлээд аймаг/хот сонгоно уу"
                      : districtLoading
                      ? "Ачааллаж байна..."
                      : "Сум/Дүүрэг сонгоно уу"
                  }
                />
              </SelectTrigger>
              {/* @ts-ignore */}
              <SelectContent>
                {districtList?.map((district: District) => (
                  // @ts-ignore
                  <SelectItem
                    key={district.DistId}
                    value={district.DistId.toString()}
                  >
                    {district.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCityId &&
              !districtLoading &&
              (!districtList || districtList.length === 0) && (
                <p className="text-sm text-amber-600 mt-1">
                  Энэ хотод дүүрэг олдсонгүй
                </p>
              )}
            {districtError && (
              <p className="text-sm text-red-500 mt-1">
                Дүүрэг ачааллахад алдаа гарлаа
              </p>
            )}
          </div>

          {/* Sub-District Selection */}
          <div className="flex flex-col gap-3">
            <label className="block text-[#6F6F6F] text-lg font-normal">
              Баг/Хороо
            </label>
            <Select
              value={selectedSubDistrictId?.toString() || ""}
              onValueChange={handleSubDistrictChange}
              disabled={!selectedDistrictId || subDistrictLoading}
            >
              {/* @ts-ignore */}
              <SelectTrigger
                className={`w-full bg-[#F5F4F0] p-3 sm:p-4 rounded-lg border border-[#CDCDCD] text-base sm:text-xl h-auto outline-none ring-0 focus:outline-none focus-visible:outline-none ${
                  !selectedDistrictId || subDistrictLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100"
                }`}
              >
                <SelectValue
                  placeholder={
                    !selectedCityId
                      ? "Эхлээд аймаг/хот сонгоно уу"
                      : !selectedDistrictId
                      ? "Эхлээд сум/дүүрэг сонгоно уу"
                      : subDistrictLoading
                      ? "Ачааллаж байна..."
                      : "Баг/Хороо сонгоно уу"
                  }
                />
              </SelectTrigger>
              {/* @ts-ignore */}
              <SelectContent>
                {subDistrictList?.map((subDistrict: SubDistrict) => (
                  // @ts-ignore
                  <SelectItem
                    key={subDistrict.SubDistId}
                    value={subDistrict.SubDistId.toString()}
                  >
                    {subDistrict.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDistrictId &&
              !subDistrictLoading &&
              (!subDistrictList || subDistrictList.length === 0) && (
                <p className="text-sm text-amber-600 mt-1">
                  Энэ дүүрэгт хороо олдсонгүй
                </p>
              )}
            {subDistrictError && (
              <p className="text-sm text-red-500 mt-1">
                Хороо ачааллахад алдаа гарлаа
              </p>
            )}
          </div>

          <Input
            name="ComplexBuilding"
            type="text"
            label="Барилга/Байшин"
            value={addressForm.ComplexBuilding}
            onChange={handleInputChange}
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            className="bg-[#F5F4F0] text-base sm:text-xl"
            layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
          />
        </div>

        {/* Next 3 inputs in 3 columns for desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            name="Entrance"
            type="text"
            label="Орц"
            value={addressForm.Entrance}
            onChange={handleInputChange}
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            className="bg-[#F5F4F0] text-base sm:text-xl"
            layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
          />
          <Input
            name="Floor"
            type="number"
            label="Давхар"
            value={addressForm.Floor.toString()}
            onChange={handleInputChange}
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            className="bg-[#F5F4F0] text-base sm:text-xl"
            layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
          />
          <Input
            name="ApartmentNumber"
            type="number"
            label="Орон сууц дугаар"
            value={addressForm.ApartmentNumber.toString()}
            onChange={handleInputChange}
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            className="bg-[#F5F4F0] text-base sm:text-xl"
            layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
          />
        </div>

        {/* Details input full width */}
        <Textarea
          name="Detail"
          label="Нэмэлт мэдээлэл"
          value={addressForm.Detail}
          onChange={handleInputChange}
          rows={3}
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="bg-[#F5F4F0] p-3 sm:p-4"
          className="bg-[#F5F4F0] text-base sm:text-xl"
        />

        <button
          type="submit"
          disabled={createLoading || updateLoading}
          className="w-full bg-primary rounded-2xl border border-[#2D262D] text-white py-4 font-bold text-base sm:text-xl disabled:opacity-50"
        >
          {createLoading || updateLoading
            ? "Хадгалж байна..."
            : isEditing
            ? "Хаягийг шинэчлэх"
            : "Хаяг хадгалах"}
        </button>
      </form>
    </div>
  );
};

export default AddressSelection;

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
  const [currentAddressInfo, setCurrentAddressInfo] = useState<{
    cityName?: string;
    districtName?: string;
    subDistrictName?: string;
  }>({});

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

  // Function to get current address names for placeholders
  const getCurrentAddressNames = async (existingSubDistId: number) => {
    if (!cityList || cityList.length === 0) return;

    try {
      // Get all districts for all cities to find the one that contains our SubDistId
      for (const city of cityList) {
        const districtResponse = await fetch(
          `/api/web/private/user/address-dict/dist/${city.CityId}`,
          {
            headers: {
              Authorization: `Bearer ${
                document.cookie.split("authToken=")[1]?.split(";")[0]
              }`,
            },
          }
        );

        if (districtResponse.ok) {
          const districts = await districtResponse.json();

          for (const district of districts) {
            const subDistResponse = await fetch(
              `/api/web/private/user/address-dict/subdist/${district.DistId}`,
              {
                headers: {
                  Authorization: `Bearer ${
                    document.cookie.split("authToken=")[1]?.split(";")[0]
                  }`,
                },
              }
            );

            if (subDistResponse.ok) {
              const subDistricts = await subDistResponse.json();
              const foundSubDist = subDistricts.find(
                (sd: SubDistrict) => sd.SubDistId === existingSubDistId
              );

              if (foundSubDist) {
                // Found the hierarchy! Set the names for placeholders
                setCurrentAddressInfo({
                  cityName: city.Name,
                  districtName: district.Name,
                  subDistrictName: foundSubDist.Name,
                });
                return;
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error getting current address names:", error);
    }
  };

  // Load existing address data and determine if we're editing or creating
  useEffect(() => {
    if (userAddress && userAddress.length > 0) {
      const address = userAddress[0]; // Assuming single address for now
      setAddressForm(address);
      setIsEditing(true);

      // Get current address names for placeholders
      if (address.SubDistId && cityList && cityList.length > 0) {
        getCurrentAddressNames(address.SubDistId);
      }
    } else {
      // userAddress is null, empty array, or undefined - we should create new address
      setIsEditing(false);
      setAddressForm({
        SubDistId: 0,
        ComplexBuilding: "",
        Entrance: "",
        Floor: 0,
        ApartmentNumber: 0,
        Detail: "",
        IsDefault: true,
      });
      setCurrentAddressInfo({});
    }
  }, [userAddress, cityList]);

  // Debug logging for API responses
  useEffect(() => {
    console.log("User address:", userAddress);
    console.log("Is editing:", isEditing);
    if (cityError) console.error("City error:", cityError);
  }, [userAddress, isEditing, cityError]);

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
      let result;
      if (isEditing && userAddress && userAddress.length > 0) {
        // Update existing address using PUT
        result = await updateAddress(addressForm).unwrap();
        toast.success("Хаяг амжилттай шинэчлэгдлээ");
      } else {
        // Create new address using POST
        result = await createAddress(addressForm).unwrap();
        toast.success("Хаяг амжилттай хадгалагдлаа");
        setIsEditing(true);
      }

      // Log the result for debugging
      console.log("Address operation result:", result);
    } catch (error: any) {
      console.error("Address operation error:", error);

      // Better error handling - check if it's actually an error or just empty response
      if (error?.status === 200 || error?.originalStatus === 200) {
        // If status is 200, it's actually successful despite the error
        if (isEditing) {
          toast.success("Хаяг амжилттай шинэчлэгдлээ");
        } else {
          toast.success("Хаяг амжилттай хадгалагдлаа");
          setIsEditing(true);
        }
      } else {
        // Only show error if it's actually an error
        const errorMessage = error?.data?.error || error?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.error("Алдаа гарлаа");
        }
      }
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
              Хот/Аймаг (заавал)
            </label>
            <Select
              value={selectedCityId?.toString() || ""}
              onValueChange={handleCityChange}
              disabled={cityLoading}
              required
            >
              {/* @ts-ignore */}
              <SelectTrigger className="w-full bg-[#F5F4F0] p-3 sm:p-4 rounded-lg border border-[#CDCDCD] text-base sm:text-xl h-auto outline-none ring-0 focus:outline-none focus-visible:outline-none">
                <SelectValue
                  placeholder={
                    currentAddressInfo.cityName || "Хот/Аймаг сонгоно уу"
                  }
                />
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
              Дүүрэг/Сум (заавал)
            </label>
            <Select
              value={selectedDistrictId?.toString() || ""}
              onValueChange={handleDistrictChange}
              disabled={!selectedCityId || districtLoading}
              required
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
                    currentAddressInfo.districtName && !selectedCityId
                      ? currentAddressInfo.districtName
                      : !selectedCityId
                      ? "Эхлээд хот/аймаг сонгоно уу"
                      : districtLoading
                      ? "Ачааллаж байна..."
                      : "Дүүрэг/Сум сонгоно уу"
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
              Хороо/Баг (заавал)
            </label>
            <Select
              value={selectedSubDistrictId?.toString() || ""}
              onValueChange={handleSubDistrictChange}
              disabled={!selectedDistrictId || subDistrictLoading}
              required
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
                    currentAddressInfo.subDistrictName && !selectedDistrictId
                      ? currentAddressInfo.subDistrictName
                      : !selectedCityId
                      ? "Эхлээд хот/аймаг сонгоно уу"
                      : !selectedDistrictId
                      ? "Эхлээд дүүрэг/сум сонгоно уу"
                      : subDistrictLoading
                      ? "Ачааллаж байна..."
                      : "Хороо/Баг сонгоно уу"
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
            label="Хотхон/Барилга (заавал биш)"
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
            label="Орц (заавал биш)"
            value={addressForm.Entrance}
            onChange={handleInputChange}
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            className="bg-[#F5F4F0] text-base sm:text-xl"
            layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
          />
          <Input
            name="Floor"
            type="number"
            label="Давхар (заавал биш)"
            value={addressForm.Floor.toString()}
            onChange={handleInputChange}
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            className="bg-[#F5F4F0] text-base sm:text-xl"
            layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
          />
          <Input
            name="ApartmentNumber"
            type="number"
            label="Тоот (заавал биш)"
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
          label="Нэмэлт мэдээлэл (заавал)"
          value={addressForm.Detail}
          onChange={handleInputChange}
          rows={3}
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="bg-[#F5F4F0] p-3 sm:p-4"
          className="bg-[#F5F4F0] text-base sm:text-xl"
          required
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

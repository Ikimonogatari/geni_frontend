import React, { useState } from "react";
import { useFormikContext } from "formik";

const ReturnSection = () => {
  const { setFieldValue, submitForm, validateField } = useFormikContext<any>();
  const [openReturnSection, setOpenReturnSection] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [extraInput, setExtraInput] = useState("");

  const returnOptions = [
    { id: "incomplete", label: "Бүтээгдэхүүн эвдэрсэн" },
    { id: "quality", label: "Бүтээгдэхүүний хугацаа дууссан" },
    { id: "damaged", label: "Бүтээгдэхүүн хэмжээ зөрсөн" },
    { id: "wrong", label: "Буруу бүтээгдэхүүн ирсэн байна" },
    { id: "other", label: "Бусад" },
  ];

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) => {
      const newSelection = prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option];

      const selectedLabels = returnOptions
        .filter((opt) => newSelection.includes(opt.id))
        .map((opt) => opt.label);

      let returnReason = selectedLabels.join("\n");
      if (
        extraInput &&
        (newSelection.includes("other") || selectedLabels.length > 0)
      ) {
        returnReason += "\nНэмэлт тайлбар: " + extraInput;
      }

      setFieldValue("returnReason", returnReason);
      return newSelection;
    });
  };

  const handleExtraInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newExtraInput = e.target.value;
    setExtraInput(newExtraInput);

    const selectedLabels = returnOptions
      .filter((opt) => selectedOptions.includes(opt.id))
      .map((opt) => opt.label);

    let returnReason = selectedLabels.join("\n");
    if (
      newExtraInput &&
      (selectedOptions.includes("other") || selectedLabels.length > 0)
    ) {
      returnReason += "\nНэмэлт тайлбар: " + newExtraInput;
    }

    setFieldValue("returnReason", returnReason);
  };

  const handleSubmit = () => {
    if (validateField("returnReason")) [submitForm()];
  };

  return (
    <>
      {openReturnSection && (
        <div className="space-y-4 border-geni-gray border-[1px] rounded-xl p-8">
          <h3 className="text-lg font-medium">Буцаах шалгаанаа оруулна уу</h3>

          <div className="space-y-2">
            {returnOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center border-geni-gray border-[1px] rounded-xl p-3 gap-2"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id={`checkbox-${option.id}`}
                    className="peer hidden"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionChange(option.id)}
                  />
                  <label
                    htmlFor={`checkbox-${option.id}`}
                    className="w-6 h-6 rounded-lg border-2 border-orange-300 flex items-center justify-center cursor-pointer transition-all peer-checked:border-green-500"
                  >
                    <span
                      className={`text-sm sm:text-base ${
                        selectedOptions.includes(option.id)
                          ? "text-green-500"
                          : "hidden"
                      } text-center select-none peer-checked:inline-block w-3 h-5 border-white`}
                    >
                      ✓
                    </span>
                  </label>
                </div>
                <label htmlFor={`checkbox-${option.id}`}>{option.label}</label>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Та өөр шалтгаанаа энд бичнэ үү."
              rows={4}
              value={extraInput}
              onChange={handleExtraInputChange}
            />
          </div>
        </div>
      )}
      <button
        onClick={() =>
          openReturnSection ? handleSubmit() : setOpenReturnSection(true)
        }
        className="w-full text-center text-xs sm:text-base bg-geni-gray px-3 mt-2 sm:px-5 py-2 rounded-lg text-white font-bold"
      >
        Бүтээгдэхүүн буцаах
      </button>
    </>
  );
};

export default ReturnSection;

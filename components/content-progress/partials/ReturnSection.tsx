import { useFormikContext } from "formik";
import { RefundReason } from "@/components/content-progress/content.services";
import _ from "lodash";
import { Loader2 } from "lucide-react";

type ReturnSectionProps = {
  isLoading: boolean;
  data: RefundReason[];
};

const ReturnSection: React.FC<ReturnSectionProps> = ({ isLoading, data }) => {
  const { setFieldValue, values } = useFormikContext<any>();

  const handleOptionChange = (optionId: number) => {
    if (values.returnReason.includes(optionId)) {
      setFieldValue("returnReason", _.without(values.returnReason, optionId));
      if (
        optionId === data.find((option) => option.DictVal === "Бусад")?.DictId
      ) {
        setFieldValue("returnReasonDescription", "");
      }
    } else {
      setFieldValue("returnReason", _.union(values.returnReason, [optionId]));
    }
  };

  const handleExtraInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFieldValue(
      "returnReason",
      _.union(values.returnReason, [
        data.find((option) => option.DictVal === "Бусад")?.DictId,
      ])
    );
    setFieldValue("returnReasonDescription", e.target.value);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-3">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 border-geni-gray border-[1px] rounded-xl p-8">
        <h3 className="text-lg font-medium">Буцаах шалгаанаа оруулна уу</h3>

        <div className="space-y-2">
          {data.map((option, index) => (
            <div
              key={index}
              className="flex items-center border-geni-gray border-[1px] rounded-xl p-3 gap-2"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id={`checkbox-${option.DictId}`}
                  className="peer hidden"
                  checked={values.returnReason.includes(option.DictId)}
                  onChange={() => handleOptionChange(option.DictId)}
                />
                <label
                  htmlFor={`checkbox-${option.DictId}`}
                  className="w-6 h-6 rounded-lg border-2 border-orange-300 flex items-center justify-center cursor-pointer transition-all peer-checked:border-green-500"
                >
                  <span
                    className={`text-sm sm:text-base ${
                      values.returnReason.includes(option.DictId)
                        ? "text-green-500"
                        : "hidden"
                    } text-center select-none peer-checked:inline-block w-3 h-5 border-white`}
                  >
                    ✓
                  </span>
                </label>
              </div>
              <label htmlFor={`checkbox-${option.DictId}`}>
                {option.DictVal}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-xl"
            placeholder="Та өөр шалтгаанаа энд бичнэ үү."
            rows={4}
            value={values.returnReasonDescription}
            onChange={handleExtraInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default ReturnSection;

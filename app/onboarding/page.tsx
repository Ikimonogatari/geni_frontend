"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  useTermCheckMutation,
  useGetCreatorRequestsQuery,
  useGetBrandRequestsQuery,
} from "../services/service";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show only 3 items in preview
  const termsScrollRef = useRef<HTMLDivElement>(null);

  const [
    termCheck,
    {
      data: termCheckData,
      error: termCheckError,
      isLoading: termCheckLoading,
      isSuccess: termCheckSuccess,
    },
  ] = useTermCheckMutation();

  // API calls for requests
  const {
    data: creatorRequestsData,
    isLoading: creatorRequestsLoading,
    error: creatorRequestsError,
  } = useGetCreatorRequestsQuery({
    offset: 0,
    limit: itemsPerPage,
    status: "",
  });

  const {
    data: brandRequestsData,
    isLoading: brandRequestsLoading,
    error: brandRequestsError,
  } = useGetBrandRequestsQuery({
    offset: 0,
    limit: itemsPerPage,
    status: "",
  });

  useEffect(() => {
    if (termCheckSuccess) {
      toast.success("Үйлчилгээний нөхцөлийг амжилттай зөвшөөрлөө");
      setShowTermsModal(false);
      // Now redirect to the appropriate onboarding page
      if (selectedUserType === "Brand") {
        router.push("/onboarding/brand");
      } else if (selectedUserType === "Creator") {
        router.push("/onboarding/creator");
      } else if (selectedUserType === "Student") {
        router.push("/onboarding/student");
      }
    }
    if (termCheckError) {
      // @ts-ignore
      toast.error(termCheckError?.data?.error || "Алдаа гарлаа");
    }
  }, [termCheckSuccess, termCheckError, selectedUserType, router]);

  const handleUserType = (type: string) => {
    Cookies.set("userType", type, { expires: 1 / 24 });
    setSelectedUserType(type);
    setShowTermsModal(true);
    setIsTermsChecked(false);
    setHasScrolledToBottom(false);
  };

  const handleScroll = () => {
    if (termsScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsScrollRef.current;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;
      if (isAtBottom) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const handleTermsCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const handleContinue = () => {
    if (isTermsChecked && hasScrolledToBottom) {
      termCheck({});
    }
  };

  // Request status and display functions
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "Зөвшөөрөгдсөн";
      case "rejected":
        return "Татгалзсан";
      case "pending":
        return "Хүлээгдэж байна";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderCreatorRequestCard = (request: any) => (
    <div
      key={request.CreatorRequestId}
      className="bg-white border border-[#CDCDCD] rounded-2xl p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="text-base font-bold">
              {request.FirstName} {request.LastName}
            </h4>
            <p className="text-sm text-gray-600">@{request.Nickname}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              request.Status
            )}`}
          >
            {getStatusText(request.Status)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-medium text-gray-700">Регистр:</span>
            <p className="text-gray-600">{request.RegNo}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Утас:</span>
            <p className="text-gray-600">{request.PhoneNumber}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Илгээсэн: {formatDate(request.CreatedAt)}</span>
          {request.ReasonRejected && (
            <span className="text-red-600 text-xs">
              Шалтгаан: {request.ReasonRejected}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const renderBrandRequestCard = (request: any) => (
    <div
      key={request.BrandRequestId}
      className="bg-white border border-[#CDCDCD] rounded-2xl p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="text-base font-bold">{request.BrandName}</h4>
            <p className="text-sm text-gray-600">{request.OrgName}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              request.Status
            )}`}
          >
            {getStatusText(request.Status)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-medium text-gray-700">Регистр:</span>
            <p className="text-gray-600">{request.OrgRegNo}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Хариуцагч:</span>
            <p className="text-gray-600">
              {request.FirstName} {request.LastName}
            </p>
          </div>
        </div>

        {request.BrandTypeNames && request.BrandTypeNames.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {request.BrandTypeNames.slice(0, 2).map(
              (typeName: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full text-xs bg-[#EBEEFF] text-[#4D55F5] border border-[#4D55F5]"
                >
                  {typeName}
                </span>
              )
            )}
            {request.BrandTypeNames.length > 2 && (
              <span className="text-xs text-gray-500">
                +{request.BrandTypeNames.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Илгээсэн: {formatDate(request.CreatedAt)}</span>
          {request.ReasonRejected && (
            <span className="text-red-600 text-xs">
              Шалтгаан: {request.ReasonRejected}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const getTermsContent = () => {
    if (selectedUserType === "Student") {
      return (
        <>
          Ерөнхий зүйл: <br />
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Geni Сурагч нь Geni Платформыг ашиглан Geni сурагчын хөтөлбөрийн
              видео хичээлүүдийг худалдан авч үзэх болон хөтөлбөрийн даалгавар
              контентийг хийж илгээхэд ашиглана.
            </li>
          </ul>
          <br />
          Платформ ашиглах тухай: <br />
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Контент бүтээгч нь Geni платформ дээр өөрийн албан ёсны хаягыг
              үүсгэн Geni Сурагчын хөтөлбөрийг худалдан авч, үзэх боломжтой.
            </li>
            <li>
              Geni платформ дээрх хэрэглэгчийн хувийн мэдээллийн аюулгүй байдлыг
              Geni платформын зүгээс хангах үүрэгтэй.
            </li>
            <li>
              Сурагч нь өөрийн хурдаар хичээлүүдээ үзэн хүссэн үедээ даалгавар
              контентоо илгээх боломжтой.
            </li>
            <li>Хөтөлбөрийн төлбөрийг буцаан төлөх боломжгүй.</li>
            <li>
              Платформоор дамжуулан хөтөлбөрийн даалгаварыг илгээх бөгөөд уг
              даалгавар дээр Geni платформын зүгээс зөвлөгөө өгөх үүрэгтэй.
            </li>
            <li>
              Сурагч нь даалгавар дээр өгсөн зөвлөгөөний дагуу дахин даалгавар
              хийн илгээх үүрэгтэй.
            </li>
            <li>
              Сурагчын даалгавар Geni платформын шалгуурыг хангасан тохиолдолд
              албан ёсны Контент бүтээгч болох боломжтой.
            </li>
            <li>
              Сурагчын даалгавар тэнцсэнээр Албан ёсны контент бүтээгчийн
              хаягтай болж Брэндүүдтэй хамтрах эрхийг Geni Платформоос нээж өгөх
              үүрэгтэй.
            </li>
          </ul>
        </>
      );
    } else if (selectedUserType === "Creator") {
      return (
        <>
          Контент бүтээгчдэд хамаарах нөхцлүүд <br />
          <br />
          Ерөнхий зүйл: <br />
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Контент бүтээгч нь Geni Платформыг ашиглан Geni платформ дээрх
              Брэндүүдтэй хамтран хэрэглэгчийн бүтээсэн видео контент бүтээж
              ажиллах ажлын үүрэг хариуцлага болон харилцааг зохицуулахад
              оршино.
            </li>
            <li>
              Контент бүтээгч нь Geni платформоор дамжуулан Geni платформ дээрх
              бүх брэндүүдтэй хамтран ажиллах боломжтой.
            </li>
            <li>
              Geni платформ нь Контент бүтээгчийг брэндүүдтэй хамтран ажиллахад
              нь жуучлах болон хоорондын харилцаа холбоог зохицуулах үүрэгтэй.
            </li>
            <li>
              Контент бүтээгч нь брэндтэй хамтран ажиллахдаа тухайн брэндийн
              бүтээгдэхүүнийг авч контент хийх бөгөөд тэдгээр бүтээгдэхүүнийг
              урсгал зардал гэж үзэж болно.
            </li>
          </ul>
          <br />
          Платформ ашиглах тухай: <br />
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Контент бүтээгч нь Geni платформ дээр өөрийн албан ёсны хаягыг
              үүсгэн Geni платформ дээрх брэндүүдтэй хамтрах боломжтой.
            </li>
            <li>
              Geni платформоор дамжуулан брэндүүдтэй хамтран ажиллахдаа өөрийгөө
              Geni платформын стандартын дагуу гэрчилгээжүүлэх шаардлагатай.
            </li>
            <li>
              Контент бүтээгч нь хүлээж авсан бүтээгдэхүүнээрээ контент хийж
              брэндэд хэд хоногийн дотор илгээх үүрэгтэй.
            </li>
            <li>
              Брэндийн санал болгосон бүтээгдэхүүний тухай бодит мэдээлэлд
              үндэслэн контент хийх үүрэгтэй.
            </li>
            <li>
              Контент бүтээгч нь брэндийн засвар хүсэлтийн дагуу дахин контентоо
              засаж илгээх үүрэгтэй.
            </li>
            <li>
              Контент стандартыг хангаагүй тохиолдолд платформын зүгээс зөвлөгөө
              болон засвар хүсэлт илгээнэ.
            </li>
            <li>
              Контент бүтээгч нь чанартай контент хийж брэндээс өндөр үнэлгээ
              авснаар түвшинг нэмэгдүүлэх боломжтой.
            </li>
            <li>
              Гүйцэтгэсэн ажлын хувьд оноо цуглуулж Geni платформын зүгээс
              шагнал урамшуулал авах боломжтой.
            </li>
          </ul>
          <br />
          Контент стандарт тухай: <br />
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Контент бүтээгч нь UGC буюу хэрэглэгчдийн бүтээсэн контентийн
              төрөлд багтах контент хийх ёстой.
            </li>
            <li>
              Контентийн агуулга нь хэрэглэгч тухайн бүтээгдэхүүнийг бодитоор
              хэрэглэж үзсэн туршлага дээр үндэслэн хийгдэх болно.
            </li>
            <li>Хэт зар сурталчилгаа шиг харагдахаас зайлсхийх ёстой.</li>
            <li>
              Контентийн техникийн шаардлага:
              <ul>
                <li>a. Хэмжээ: 9x16</li>
                <li>b. Хугацаа: 20 секунд - 1:30 минут</li>
                <li>c. Бичлэг чанар: HD чанартай байх</li>
                <li>d. Дуу: Тодорхой сонсогдохуйц байх</li>
              </ul>
            </li>
          </ul>
          <br />
          Үүрэг, хариуцлага: <br />
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Контент бүтээгч нь хүлээж авсан бүтээгдэхүүнээ сайтар хамгаалж
              ашиглах үүрэгтэй.
            </li>
            <li>Тогтоосон хугацаанд контентоо илгээх үүрэгтэй.</li>
            <li>
              Брэндийн засвар хүсэлтийг анхааралтай уншиж дагаж мөрдөх үүрэгтэй.
            </li>
            <li>Платформын дүрэм журмыг зөрчихгүй байх үүрэгтэй.</li>
          </ul>
        </>
      );
    } else {
      // Brand terms - COMPLETE content from Step2.tsx
      return (
        <>
          Брэндэд хамаарах нөхцлүүд <br />
          <br />
          Ерөнхий зүйл: <br />
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Байгууллага буюу брэнд нь Geni Платформыг ашиглан Geni Платформ
              дээрх контент бүтээгчидтэй хамтран хэрэглэгчийн бүтээсэн видео
              контент бүтээж ажиллах ажлын үүрэг хариуцлага болон харилцааг
              зохицуулахад оршино.
            </li>
            <li>
              Брэнд нь Geni платформоор дамжуулан Geni платформ дээрх бүх
              контент бүтээгчидтэй хамтран ажиллах боломжтой.
            </li>
            <li>
              Geni платформ нь Брэндийг контент бүтээгчидтэй хамтран ажиллахад
              нь жуучлах болон хоорондын харилцаа холбоог зохицуулах үүрэгтэй.
            </li>
            <li>
              Geni платформ дээрх контент бүтээгчидтэй хамтран ажиллахдаа
              бүтээгдэхүүнээ контент бүтээгчдэд санал болгох үүднээс Geni
              платформруу илгээх ёстой бөгөөд энэ нь контент бүтээгчийн
              контентоо бүтээхэд зориулсан урсгал зардал гэж тооцогдоно.
            </li>
          </ul>
          <br />
          Платформ ашиглах тухай:
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Брэнд нь Geni платформ дээр өөрийн албан ёсны хаягыг үүсгэн Geni
              платформ дээрх контент бүтээгчидтэй хамтрах боломжтой.
            </li>
            <li>
              Geni платформоор дамжуулан контент бүтээгчидтэй хамтран ажиллахдаа
              контент бүтээгчидтэй хамтран ажиллах эрх буюу "Geni Credit"-г
              идэвхжүүлж цэнэглэсний дараа контент бүтээгчидтэй хамтрах эрхтэй
              болно.
            </li>
            <li>
              Брэнд нь "Geni Credit"-н тоогоор бүтээгчидтэй хамтрах эрхтэй болох
              бөгөөд 4 төрлийн багцтай. Тухайн багцаас хамааран "Geni Credit"-н
              тоо болон үнийн дүн харилцан өөр өөр байна.
              <ul>
                <li>
                  a. Geni credit: 3 ширхэг - Нэгж үнэ: 250'000₮ - Нийт үнэ:
                  750'000₮
                </li>
                <li>
                  b. Geni credit: 8 ширхэг - Нэгж үнэ: 230'000₮ - Нийт үнэ:
                  1'840'000₮
                </li>
                <li>
                  c. Geni credit: 15 ширхэг - Нэгж үнэ: 210'000₮ - Нийт үнэ:
                  3'150'000₮
                </li>
                <li>
                  d. Geni credit: 30 ширхэг - Нэгж үнэ: 190'000₮ - Нийт үнэ:
                  5'700'000₮
                </li>
              </ul>
            </li>
            <li>
              "Geni Credit" дууссан тохиолдолд Geni платформыг ашиглан хүссэн
              үедээ дахин цэнэглэж ашиглах боломжтой.
            </li>
            <li>
              Брэнд нь "Geni Credit"-н цэнэглэсэн тоогоо ашиглан Geni платформ
              дээр өөрсдийн бараа бүтээгдэхүүний мэдээллээ болон ямар агуулгатай
              контент контент бүтээгчдээс авмаар байгаа хүсэлтээ ойлгомжтой сайн
              бичиж илгээх шаардлагатай бөгөөд уг бичсэн илгээсэн хүсэлтийн
              дагуу контент бүтээгчид контентоо хийж илгээх юм.
            </li>
            <li>
              Бүтээгдэхүүний хүсэлтээ илгээхдээ нэг контент бүтээгчид хамгийн
              багадаа 30'000 төгрөгний үнэ бүхий бүтээгдэхүүнийг санал болгоно.
              Энэ нь контент бүтээгчдийн сэтгэл ханамжыг хангахад зориулагдана.
            </li>
            <li>
              Бүтээгдэхүүний мэдээлэл илгээсний дараа оруулсан мэдээллийн дагуу
              бүтээгдэхүүнээ Geni платформ-н агуулахруу хүргүүлэх үүрэгтэй.
            </li>
            <li>
              Geni платформын зүгээс бараа бүтээгдэхүүний илгээсэн мэдээллийг
              шалгасны дараагаар албан ёсоор платформ дээр бүтээгдэхүүний
              мэдээлэл байршина.
            </li>
            <li>
              Geni платформ дээр бүтээгдэхүүний мэдээлэл байршсаны дараагаар
              тухайн бүтээгдэхүүнийг авч контент бүтээх хүсэлтээ контент
              бүтээгчид Geni платформ луу илгээнэ.
            </li>
            <li>
              Контент бүтээгчийн хүсэлтийг Geni платформоос хүлээн зөвшөөрсөнөөс
              эхлэн контент брэндэд очих хүртэлх бүх процессийг платформоор
              дамжуулан хянана. Үүнд дараах төлөвүүд орно:
              <ul>
                <li>a. Бүтээгдэхүүн контент бүтээгчид хүргэгдэж байна.</li>
                <li>b. Контент бүтээгч бүтээгдэхүүнийг хүлээн авсан. </li>
                <li>c. Контент бүтээгч контентоо хийж байна. </li>
                <li>d. Контент бүтээгч контентоо илгээлээ.</li>
                <li>
                  e. Контент бүтээгчийн контентийг Geni платформын зүгээс шалгаж
                  байна.
                </li>
                <li>
                  f. Контент бүтээгчийн контент шаардлага хангаагүй тул
                  засварлаж байна.
                </li>
                <li>
                  g. Контент бүтээгчийн контент шаардлага хангаж брэндэд
                  илгээгдлээ.
                </li>
                <li>
                  h. Брэндийн контент засах хүсэлтийн дагуу контент бүтээгч
                  засаж байна.
                </li>
                <li>i. Контент бүтээгч контентоо засаж илгээлээ.</li>
              </ul>
            </li>
            <li>
              Контент бүтээгчийн илгээсэн контентийг Geni платформын зүгээс нэг
              удаагын хяналт хийдэг бөгөөд ерөнхий контентийн чанар болон
              стандартыг хангасан байгаа эсэхийг шалгадаг.
            </li>
            <li>
              Geni платформын хяналтанд тэнцсэн контент брэндэд очих бөгөөд
              брэнд тухайн контентийг үзээд шууд хүлээн авч болно. Эсвэл засвар
              хийлгүүлэх хүсэлт илгээж болно.
            </li>
            <li>
              Брэндийн контент бүтээгчдэд илгээх контент засварын хүсэлт 1 удаа
              илгээж болно. Ингэхдээ дээд талдаа засах шаардлагтай 3 зүйлийг
              нарийн тодорхой оруулсан байна.
            </li>
            <li>
              Платформоор дамжуулан хийгдсэн контентийн оюуны өмчийг контент
              бүтээгч эзэмших бөгөөд хамтарсан Брэнд нь контентийг
              хугацаагүйгээр бүрэн ашиглах эрхтэй гэж явна.
            </li>
            <li>
              Контент бүтээгчийн илгээсэн контентийг авж ашиглахаасаа өмнө
              тухайн контент бүтээгчийн хийсэн контентод брэнд үнэлгээ өгөх
              бөгөөд нэмэлтээр сэтгэгдэл илгээх боломжтой. Контентийн үнэлгээг
              өгөхдөө дараах 3 төрлөөр өгнө. Үүнд:
              <ul>
                <li>a. Брэндийн хүсэлтийн дагуу хийсэн эсэх | 1-5 од</li>
                <li>b. Контентийн агуулга сайн эсэх | 1-5 од</li>
                <li>c. Контентийн хийцлэл сайн эсэх | 1-5 од</li>
              </ul>
            </li>
            <li>
              Контент бүтээгчдээс хүлээн авсан контентууд нь Брэндийн хаягын
              "Контент" хэсэгт байршина. Энэхүү хэсгээс Брэнд хүссэн үедээ
              контентуудаа үзэж татаж аван ашиглаж болно.
            </li>
            <li>
              Брэнд нь Geni платформ дээр байршуулсан бүтээгдэхүүний мэдээлэл
              болон контент бүтээгчдээс хүсэх хүсэлтээ өөрөө дахин засварлах
              боломжтой.
            </li>
            <li>
              Брэнд нь Geni платформын "Бүтээгдэхүүн" хэсгээс өөрийн байршуулсан
              бүтээгдэхүүний мэдээлэл болон тоо ширхэгийг харж, хянаж, нэмж,
              идэвхгүй болгох боломжтой.
            </li>
          </ul>
          <br />
          Контент стандарт тухай:
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Geni Платформоор дамжуулан контент бүтээгчдээс авах контент нь UGC
              буюу хэрэглэгчдийн бүтээсэн контентийн төрөлд багтах бөгөөд тус
              контентийн агуулга нь хэрэглэгч тухайн бүтээгдэхүүнийг бодитоор
              хэрэглэж үзсэн туршлага дээр үндэслэн хийгдэх болно.
            </li>
            <li>
              Хэрэглэгчдийн бүтээсэн контент нь бодит мэдээлэл дээр үндэслэн
              хийгдэх ёстой бөгөөд хэт зар сурталчилгаа шиг байх ёсгүй.
            </li>
            <li>
              Контентийн ерөнхий суурь стандартыг платформын зүгээс хянан
              шалгадаг. Үүнд:
              <ul>
                <li>a. Хэмжээ: 9x16 </li>
                <li>
                  b. Хугацаа: Хамгийн багадаа - 20 секунд, Хамгийн ихдээ - 1:30
                  секунд
                </li>
                <li>
                  c. Бичиглэл: Үг үсгийн алдаа болон алдаагүй фонт байгаа эсэх.
                </li>
                <li>
                  d. Ая болон дуу оруулга: Хэт сул болон чанга гэх мэт алдаа
                  байгаа эсэх.
                </li>
                <li>
                  e. Бичлэг чанар: Бичлэгний чанар хэт муу болон харанхуй орчинд
                  гэх мэт тохиромжгүй зураг авалт хийсэн эсэх.
                </li>
              </ul>
            </li>
            <li>
              Брэндийн оруулсан бүтээгдэхүүний мэдээлэл болон контент
              бүтээгчдээс хүссэн хүсэлтийн дагуу контент бүтээгчид контентоо
              хийх үүрэгтэй.
            </li>
            <li>
              Брэндийн контентоо засуулах хүсэлтийн дагуу тус контент бүтээгч
              дахин контентоо засаж илгээх үүрэгтэй.
            </li>
            <li>
              Контент бүтээгчийн засаж илгээсэн контент нь брэндийн сэтгэгдэлд
              хүрээгүй тохиолдолд брэнд контент бүтээгчид муу үнэлгээ өгч дүгнэх
              эрхтэй.
            </li>
          </ul>
          <br />
          Үүрэг, хариуцлага
          <br />
          <ul className="list-decimal ml-3 sm:ml-5">
            <li>
              Брэнд нь Geni платформыг ашиглах эрх бүхий төлбөрөө 100% урьдчилан
              төлнө.
            </li>
            <li>
              Брэнд нь Geni платформ дээр оруулж буй бүтээгдэхүүний мэдээлэл
              болон контент бүтээгчээс хүсэж буй хүсэлтээ бүрэн хариуцна.
              Мэдээллээ дутуу оруулсанаас болж үүссэн контент гүйцэтгэлийн
              асуудлыг брэнд хариуцна.
            </li>
            <li>
              Брэнд нь Geni платформоор дамжуулан контент бүтээгчидтэй хамтран
              ажиллахдаа илгээж буй бүтээгдэхүүний эвдрэл гэмтэл болон дуусах
              хугацааны алдангыг бүрэн хариуцна.
            </li>
            <li>
              Брэндтэй хамтран ажиллаж буй контент бүтээгч нь контентоо өгөх
              хугацаа нь бүтээгдэхүүн хүргэгдэж очсоноос хойш 7 хоног байна.
              Харин брэндийн контентийн засвар хийлгэх хүсэлтийн хугацаа нь
              контент платформ дээр хүргэгдсэнээс хойш 7 хоног байна.
            </li>
            <li>
              Брэнд нь контент бүтээгчийн илгээсэн контентийг 7 хоногийн дотор
              хүлээж авах тохиолдолд контент санамсаргүйгээр арилах боломжтой.
            </li>
            <li>
              Брэнд нь Geni платформоос хүлээн авсан контентоо агуулга, формат
              болон бүтцээр нь өөрчлөх боломжгүй.
            </li>
            <li>
              Geni платформоос хүргэгдсэн бүтээгдэхүүний тоо, хэмжээ хийгээд нэр
              төрлийг шалгах асуудлыг брэнд хүлээн авч шалгах үүрэгтэй.
              Бүтээгдэхүүний тоо ширхэг, хэмжээ болон нэр төрлийг шийдвэрлэх
              эцсийн эрх нь брэндийнх байна.
            </li>
            <li>
              Geni платформ дээр контент тавих брэндүүд нь зөвхөн албан ёсны эрх
              бүхий бараа бүтээгдэхүүнээрээ контент захиалах бөгөөд Монгол улсын
              амьтан хамгаалах болон улсын хилээр нэвтрүүлэхийг хориглодог эд
              зүйлс, архи согтууруулах ундаа, тамхи, эмийн зэрэг бүтээгдэхүүнээр
              контент хийлгэхийг хориглоно. Хэрэв эдгээр зүйлсийг платформын
              зүгээс мэдэгдэлгүйгээр платформ дээр байршуулсан бол түүнтэй
              холбоотой хууль зүйн асуудлыг бүх хариуцлагыг Брэнд хүлээнэ.
            </li>
          </ul>
        </>
      );
    }
  };

  const getThemeColors = () => {
    switch (selectedUserType) {
      case "Student":
        return {
          button: "bg-[#4FB755]",
          border: "border-[#4FB755]",
          shadow: "shadow-[4px_4px_0px_0px_#3A8F44]",
        };
      case "Creator":
        return {
          button: "bg-[#CA7FFE]",
          border: "border-[#CA7FFE]",
          shadow: "shadow-[4px_4px_0px_0px_#9C44DA]",
        };
      case "Brand":
      default:
        return {
          button: "bg-[#4D55F5]",
          border: "border-[#4D55F5]",
          shadow: "shadow-[4px_4px_0px_0px_#1920B4]",
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-7 py-11 container">
        <div className="flex flex-col items-start gap-4">
          <Image src="/logo.svg" width={89} height={32} alt="logo" />
          <p className="text-sm">Сайн уу, dalmawork@gmail.com</p>
          <h1 className="text-2xl font-bold">
            Платформд нэгдэх төрлөө сонгоно уу
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
            {/* Student Card */}
            <div
              className={`bg-white border border-[#CDCDCD] rounded-[30px] p-6 flex flex-col gap-4 ${
                (brandRequestsData?.Data &&
                  brandRequestsData.Data.length > 0) ||
                (creatorRequestsData?.Data &&
                  creatorRequestsData.Data.length > 0)
                  ? "opacity-50"
                  : ""
              }`}
            >
              <div className="relative aspect-square w-full bg-[#E8FFE9] rounded-2xl flex items-center justify-center">
                <Image
                  src="/student-character.svg"
                  width={120}
                  height={120}
                  alt="student"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#E8FFE9] text-[#4FB755] rounded-full">
                    STUDENT
                  </span>
                </div>
                <p className="text-sm">
                  Контент бүтээх чадвар өөрийн гэсэн үзэгч хүрээтэй байх
                  шаардлагагүй, Geni Student-ээр бүртгүүлнэ үү
                </p>
                <button
                  onClick={() => handleUserType("Student")}
                  disabled={
                    (brandRequestsData?.Data &&
                      brandRequestsData.Data.length > 0) ||
                    (creatorRequestsData?.Data &&
                      creatorRequestsData.Data.length > 0)
                  }
                  className="w-full bg-[#4FB755] text-white font-bold py-4 px-6 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A8F44] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#3A8F44]"
                >
                  Сурагч болох →
                </button>
              </div>
            </div>

            {/* Creator Card */}
            <div
              className={`bg-white border border-[#CDCDCD] rounded-[30px] p-6 flex flex-col gap-4 ${
                brandRequestsData?.Data && brandRequestsData.Data.length > 0
                  ? "opacity-50"
                  : ""
              }`}
            >
              <div className="relative aspect-square w-full bg-[#F9EBFF] rounded-2xl flex items-center justify-center">
                <Image
                  src="/creator-character.svg"
                  width={120}
                  height={120}
                  alt="creator"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#F9EBFF] text-[#CA7FFE] rounded-full">
                    CREATOR
                  </span>
                </div>
                <p className="text-sm">
                  Чадварлаг хэрнээ цахим орчинд өөрийн гэсэн үзэгч хүрээтэй байх
                  creator болж хамтран бүтээх эрмэлзэлтэй бол бүртгүүлнэ үү
                </p>
                <button
                  onClick={() => handleUserType("Creator")}
                  disabled={
                    brandRequestsData?.Data && brandRequestsData.Data.length > 0
                  }
                  className="w-full bg-[#CA7FFE] text-white font-bold py-4 px-6 rounded-full border border-black shadow-[4px_4px_0px_0px_#9C44DA] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#9C44DA]"
                >
                  Бүтээгч болох →
                </button>
              </div>
            </div>

            {/* Brand Card */}
            <div className="bg-white border border-[#CDCDCD] rounded-[30px] p-6 flex flex-col gap-4">
              <div className="relative aspect-square w-full bg-[#EBEEFF] rounded-2xl flex items-center justify-center">
                <Image
                  src="/brand-character.svg"
                  width={120}
                  height={120}
                  alt="brand"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#EBEEFF] text-[#4D55F5] rounded-full">
                    BRAND
                  </span>
                </div>
                <p className="text-sm">
                  Бүтээгдэхүүнээ өргөжүүлэх зорилготой байгаа аж ахуйн нэгж, үр
                  дүнтэй маркетинг хийх эрхэм
                </p>
                {brandRequestsData?.Data &&
                brandRequestsData.Data.length > 0 ? (
                  <div className="w-full bg-[#EBEEFF] text-[#4D55F5] font-medium py-4 px-6 rounded-full border border-[#4D55F5] text-center text-sm">
                    Өргөдөлийн хариу 1-2 өдөрт таны имэйл хаяг руу илгээгдэнэ.
                  </div>
                ) : (
                  <button
                    onClick={() => handleUserType("Brand")}
                    className="w-full bg-[#4D55F5] text-white font-bold py-4 px-6 rounded-full border border-black shadow-[4px_4px_0px_0px_#1920B4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Брэнд болох →
                  </button>
                )}
              </div>
            </div>

            {/* Coming Soon Card */}
            <div
              className={`bg-white border border-[#CDCDCD] rounded-[30px] p-6 flex flex-col gap-4 ${
                brandRequestsData?.Data && brandRequestsData.Data.length > 0
                  ? "opacity-50"
                  : ""
              }`}
            >
              <div className="relative aspect-square w-full bg-[#FFF6F6] rounded-2xl flex items-center justify-center">
                <Image
                  src="/coming-soon-character.svg"
                  width={120}
                  height={120}
                  alt="coming soon"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#FFF6F6] text-[#FF6B6B] rounded-full">
                    COMING SOON
                  </span>
                </div>
                <div className="h-[72px]" />
                <button
                  disabled
                  className="w-full bg-[#FFF6F6] text-[#FF6B6B] font-bold py-4 px-6 rounded-full border border-[#CDCDCD] cursor-not-allowed"
                >
                  Удахгүй
                </button>
              </div>
            </div>
          </div>

          {/* Requests Section */}
          <div className="w-full mt-8">
            <h2 className="text-xl font-bold mb-6">Хүсэлтийн төлөв байдал</h2>

            {/* Show based on which has data - prioritize brand, then creator, then show both empty states */}
            {brandRequestsData?.Data && brandRequestsData.Data.length > 0 ? (
              // Show only Brand Requests if brand has data
              <div className="w-full">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#4D55F5] p-2 rounded-lg">
                      <Image
                        src="/brand-icon-white.png"
                        width={20}
                        height={20}
                        alt="Brand"
                        className="w-5 h-5"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Brand Хүсэлтүүд</h3>
                  </div>

                  {brandRequestsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4D55F5]"></div>
                    </div>
                  ) : brandRequestsError ? (
                    <div className="text-center py-8">
                      <p className="text-red-600 text-sm">Алдаа гарлаа</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {brandRequestsData.Data.slice(0, 6).map((request: any) =>
                        renderBrandRequestCard(request)
                      )}
                      {brandRequestsData.Data.length > 6 && (
                        <div className="col-span-full text-center">
                          <p className="text-sm text-gray-500">
                            +{brandRequestsData.Data.length - 6} дахин олон
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : creatorRequestsData?.Data &&
              creatorRequestsData.Data.length > 0 ? (
              // Show only Creator Requests if creator has data and brand doesn't
              <div className="w-full">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#CA7FFE] p-2 rounded-lg">
                      <Image
                        src="/creator-icon-white.png"
                        width={20}
                        height={20}
                        alt="Creator"
                        className="w-5 h-5"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Creator Хүсэлтүүд</h3>
                  </div>

                  {creatorRequestsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CA7FFE]"></div>
                    </div>
                  ) : creatorRequestsError ? (
                    <div className="text-center py-8">
                      <p className="text-red-600 text-sm">Алдаа гарлаа</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {creatorRequestsData.Data.slice(0, 6).map(
                        (request: any) => renderCreatorRequestCard(request)
                      )}
                      {creatorRequestsData.Data.length > 6 && (
                        <div className="col-span-full text-center">
                          <p className="text-sm text-gray-500">
                            +{creatorRequestsData.Data.length - 6} дахин олон
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Show both empty states if neither has data
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Creator Requests */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#CA7FFE] p-2 rounded-lg">
                      <Image
                        src="/creator-icon-white.png"
                        width={20}
                        height={20}
                        alt="Creator"
                        className="w-5 h-5"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Creator Хүсэлтүүд</h3>
                  </div>

                  {creatorRequestsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CA7FFE]"></div>
                    </div>
                  ) : creatorRequestsError ? (
                    <div className="text-center py-8">
                      <p className="text-red-600 text-sm">Алдаа гарлаа</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-[#F9EBFF] rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                        <Image
                          src="/creator-character.svg"
                          width={32}
                          height={32}
                          alt="Creator"
                        />
                      </div>
                      <p className="text-gray-600 text-sm">Хүсэлт олдсонгүй</p>
                    </div>
                  )}
                </div>

                {/* Brand Requests */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#4D55F5] p-2 rounded-lg">
                      <Image
                        src="/brand-icon-white.png"
                        width={20}
                        height={20}
                        alt="Brand"
                        className="w-5 h-5"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Brand Хүсэлтүүд</h3>
                  </div>

                  {brandRequestsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4D55F5]"></div>
                    </div>
                  ) : brandRequestsError ? (
                    <div className="text-center py-8">
                      <p className="text-red-600 text-sm">Алдаа гарлаа</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-[#EBEEFF] rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                        <Image
                          src="/brand-character.svg"
                          width={32}
                          height={32}
                          alt="Brand"
                        />
                      </div>
                      <p className="text-gray-600 text-sm">Хүсэлт олдсонгүй</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
          {/* @ts-ignore */}
          <DialogContent className="overflow-y-auto flex flex-col gap-4 max-h-[739px] w-full max-w-4xl rounded-3xl">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
                  Платформыг ашиглах үйлчилгээний нөхцөл
                </span>
                <span className="text-[#6F6F6F] text-sm sm:text-base">
                  Сүүлд шинэчлэгдсэн: 2024.12.13
                </span>
              </div>

              <div
                ref={termsScrollRef}
                onScroll={handleScroll}
                className="text-xs sm:text-sm md:text-base lg:text-lg font-thin rounded-3xl border border-[#CDCDCD] py-3 sm:py-6 px-5 sm:px-8 w-full overflow-y-auto max-h-[160px] sm:max-h-[330px]"
              >
                {getTermsContent()}
              </div>

              {!hasScrolledToBottom && (
                <div className="text-red-500 text-sm text-center">
                  Үйлчилгээний нөхцөлийг бүрэн уншаад дуустал гүйлгэнэ үү
                </div>
              )}

              <div className="flex items-center gap-2 justify-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    className="peer hidden"
                    checked={isTermsChecked}
                    onChange={handleTermsCheck}
                    disabled={!hasScrolledToBottom}
                  />
                  <label
                    htmlFor="terms-checkbox"
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all ${
                      isTermsChecked && hasScrolledToBottom
                        ? `${themeColors.button} ${themeColors.border}`
                        : ""
                    } ${
                      !hasScrolledToBottom
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isTermsChecked && hasScrolledToBottom && (
                      <span className="text-sm sm:text-base text-white select-none w-3 h-5 border-white">
                        ✓
                      </span>
                    )}
                  </label>
                </div>
                <span className="text-xs sm:text-lg font-semibold">
                  Үйлчилгээний нөхцөлийг хүлээн зөвшөөрч байна
                </span>
              </div>

              <button
                onClick={handleContinue}
                disabled={
                  !isTermsChecked || !hasScrolledToBottom || termCheckLoading
                }
                className={`w-full text-white font-bold py-4 px-6 rounded-full border border-black transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  isTermsChecked && hasScrolledToBottom && !termCheckLoading
                    ? `${themeColors.button} ${themeColors.shadow} hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none`
                    : "bg-gray-400"
                }`}
              >
                {termCheckLoading ? "Илгээж байна..." : "Үргэлжлүүлэх"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

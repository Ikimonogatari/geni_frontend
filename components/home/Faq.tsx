import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function Faq() {
  return (
    <div className="flex flex-col gap-6 py-11">
      <span className="text-4xl font-bold">Бүтээгчдийн түгээмэл асуултууд</span>
      {faq.map((f, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem
            className="border border-border-gray/60 rounded-2xl px-8 py-2"
            value={f.q}
          >
            <AccordionTrigger className="font-normal text-xl">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="font-normal text-xl">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default Faq;

const faq = [
  {
    q: "Брэндтэй ямар нөхцөлөөр, яаж хамтардаг вэ?",
    a: "Certified бүтээгчид брэндийн санал болгосон бүтээгдэхүүнээс үнэгүй сонгон авч хэрэглэсэн сэтгэгдлээ контентоор дамжуулан илгээдэг. Олон брэндтэй хамтран тодорхой оноо цуглуулж туршлагатай болсон бүтээгчид Pro түвшинд шилждэг бөгөөд цаашид хамтрал болгоны чанараас хамааран нэмэлт мөнгөн урамшуулал авдаг.",
  },
  {
    q: "Pro бүтээгч болохын давуу тал юу вэ?",
    a: "Certified бүтээгч нэг дор 1 хамтрал хийн түүнийгээ амжилттай дуусгасны дараа ахин хамтрал хийх эрх нээгддэг бол Pro бүтээгчид зэрэг 2 ба түүнээс хамтрал хийх боломжтой байдаг. Мөн PRO түвшин ахих тусам хамтралын онооноос авах мөнгөн урамшуулал өснө.",
  },
  {
    q: "Яаж Pro бүтээгч болдог вэ?",
    a: "Брэнд бүтээгчийн илгээсэн контентыг үзээд 0-100н хооронд сэтгэл ханамжийн үнэлгээ өгдөг. Энэхүү үнэлгээ нь XP оноо болж бүтээгчид хуримтлагддаг бөгөөд 1000 XP оноо цуглуулан эхний түвшний Pro бүтээгч болно.",
  },
  {
    q: "Хэзээнээс мөнгөн урамшуулал авч эхлэх боломжтой вэ?",
    a: "Бүтээгч Pro түвшинтэй болсноос эхлэн хамтрал бүрийн оноод харгалзах мөнгөн урамшууллыг өөрийн дижитал хэтэвчинд авдаг. Та урамшууллаа өөрийн хэтэвчнээс сар болгоны эхний 7 хоногт  өөрийн данс руу татах боломжтой.",
  },
];

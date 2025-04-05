import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function Faq({
  title,
  list,
}: {
  title: string;
  list: { q: string; a: string }[];
}) {
  return (
    <div className="flex flex-col gap-6 py-11">
      <span className="text-3xl lg:text-4xl font-bold">{title}</span>
      {list.map((f, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem
            className="border border-border-gray/50 rounded-2xl px-8 py-2"
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

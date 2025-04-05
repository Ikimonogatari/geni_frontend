import Image from "next/image";

export default function Features() {
  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-5xl font-black"></h2>
      <div className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-6">
        <div className="col-span-full lg:col-span-5 flex flex-col items-start gap-4 px-7 py-5 pb-6 bg-primary-bg rounded-[30px] border border-border-gray/60">
          <Image
            src="/landing/student/features/feature-1.png"
            alt="feature-1"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-[100px] lg:w-[165px] lg:h-auto object-contain"
          />
          <p className="text-2xl ml-2">
            UGC зах зээл, UGC контент бүтээгч болоход хэрэгтэй бүх мэдээлэл
          </p>
        </div>
        <div className="col-span-full lg:col-span-5 flex items-center gap-4 px-9 py-5 pb-6 bg-primary-bg rounded-[30px] border border-border-gray/60">
          <p className="text-2xl">
            Контент бүтээхэд шаардагдах суурь чадварууд
          </p>
          <Image
            src="/landing/student/features/feature-2.png"
            alt="feature-2"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full lg:w-[165px] h-auto"
          />
        </div>
        <div className="col-span-full lg:col-span-3 flex flex-col gap-4 p-6 bg-primary-bg rounded-[30px] border border-border-gray/60">
          <Image
            src="/landing/student/features/feature-3.png"
            alt="feature-1"
            width={0}
            height={0}
            sizes="100vw"
            className="w-24 h-auto"
          />
          <p className="text-2xl ml-2">Capcut ашиглан видео эдит хийх</p>
        </div>
        <div className="col-span-full lg:col-span-3 flex flex-col gap-4 p-6 bg-primary-bg rounded-[30px] border border-border-gray/60">
          <Image
            src="/landing/student/features/feature-4.png"
            alt="feature-1"
            width={0}
            height={0}
            sizes="100vw"
            className="w-24 h-auto"
          />
          <p className="text-2xl ml-2">
            Canva ашиглан бичлэгийн thumbnail бүтээх
          </p>
        </div>
        <div className="col-span-full lg:col-span-5 flex items-center gap-4 px-9 py-5 pb-6 bg-primary-bg rounded-[30px] border border-border-gray/60">
          <p className="text-2xl">Чанартай контент агуулга гаргах заавар</p>
          <Image
            src="/landing/student/features/feature-5.png"
            alt="feature-2"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full lg:w-[165px] h-auto"
          />
        </div>
        <div className="col-span-full lg:col-span-6 flex flex-col gap-4 p-6 bg-primary-bg rounded-[30px] border border-border-gray/60">
          <Image
            src="/landing/student/features/feature-6.png"
            alt="feature-1"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[214px] h-auto"
          />
          <p className="text-2xl ml-2">
            Контент төлөвлөлт хийх заавар, бэлэн загвар
          </p>
        </div>
        <div className="col-span-full lg:col-span-5 flex flex-col gap-4 p-6 bg-primary-bg rounded-[30px] border border-border-gray/60">
          <Image
            src="/landing/student/features/feature-7.png"
            alt="feature-1"
            width={0}
            height={0}
            sizes="100vw"
            className="w-24 h-auto"
          />
          <p className="text-2xl ml-2">
            Сошиал хаяг хөтлөх зөвлөмж, дэлгэрэнгүй гарын авлага
          </p>
        </div>
      </div>
    </div>
  );
}

import { useGetUserInfoQuery } from "@/app/services/service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/shadcn-button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

const USER_TYPE_CLASS = {
  Brand: "bg-geni-blue hover:bg-geni-blue/80",
  Creator: "bg-geni-pink hover:bg-geni-pink/80",
  Student: "bg-geni-green hover:bg-geni-green/80",
};

export default function UserButton() {
  const {
    currentData: currentUser,
    isFetching: loadingCurrentUser,
    isError,
  } = useGetUserInfoQuery({});

  if (loadingCurrentUser) {
    return (
      <Skeleton className="flex items-center w-[160px] h-11 rounded-full bg-white/60"></Skeleton>
    );
  }

  if (isError) {
    return (
      <Button
        asChild
        className="px-14 py-2 h-11 bg-primary text-primary-foreground text-base font-bold rounded-full"
      >
        <Link href="/login">Нэвтрэх</Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      className={cn(
        "flex items-center gap-2 px-7 py-2 h-11 text-primary-foreground text-base font-bold rounded-[10px] border border-border-gray",
        USER_TYPE_CLASS[currentUser?.UserType] ?? ""
      )}
    >
      <Link href="/profile">
        <Avatar className="size-8">
          <AvatarImage
            className="object-cover"
            src={currentUser?.ProfileLink}
          />
          <AvatarFallback>
            {currentUser?.UserType === "Creator"
              ? "/dummy-creator.png"
              : currentUser?.UserType === "Brand"
              ? "/dummy-brand.png"
              : currentUser?.UserType === "Student" && "/dummy-student.png"}
          </AvatarFallback>
          {(currentUser?.UserType == "Creator"
            ? currentUser?.Nickname || currentUser?.Email
            : currentUser?.Name || currentUser?.BusinessEmail) || "User"}
        </Avatar>
      </Link>
    </Button>
  );
}

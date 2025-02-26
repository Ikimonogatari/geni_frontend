import Image from "next/image";
import { handleLogout } from "./logout-function";

function LogoutButton() {
  return (
    <button
      onClick={handleLogout}
      className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
    >
      <Image
        src={"/logout-icon.png"}
        width={24}
        height={24}
        className="min-w-5 sm:min-w-6 min-h-5 h-5 w-5 sm:min-h-6 sm:h-6 sm:w-6"
        alt=""
      />
    </button>
  );
}

export default LogoutButton;

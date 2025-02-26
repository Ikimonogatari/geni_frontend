import { useUserInfo } from "@/app/context/UserInfoContext";

const DropdownListItem = ({ href, title }) => (
  <a
    href={href}
    className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
  >
    {title}
  </a>
);

const DropdownMenu = ({ isOpen }) => {
  const {
    userInfo,
    isError: userInfoError,
    isLoading: userInfoLoading,
  } = useUserInfo();

  const userType = userInfo?.UserType;

  const getDropdownMenuData = (userType, userInfo) => {
    const baseMenuItems = [
      { href: "/", title: "Нүүр" },
      { href: "/creators", title: "Бүтээгчид" },
      { href: "/brands", title: "Брэндүүд" },
    ];

    const userMenuItem =
      userType && userInfo
        ? { href: "/profile", title: "Профайл" }
        : { href: "/login", title: "Нэвтрэх" };

    return [...baseMenuItems, userMenuItem];
  };

  const dropdownMenuData = getDropdownMenuData(userType, userInfo);

  return (
    <div
      className={`absolute left-0 z-40 w-full rounded border-[.5px] border-light 
                  bg-[#F8F8FA] py-5 shadow-card transition-all text-[#273266] 
                  ${
                    isOpen
                      ? "top-full opacity-100 visible"
                      : "top-[110%] invisible opacity-0"
                  }`}
    >
      {dropdownMenuData.map((item) => (
        <DropdownListItem key={item.href} href={item.href} title={item.title} />
      ))}
    </div>
  );
};

export default DropdownMenu;

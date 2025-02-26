type UserType = "Student" | "Creator" | "Brand";
const getUserTypeColor = (userType: UserType) => {
  switch (userType) {
    case "Creator":
      return "secondary";
    case "Brand":
      return "geni-blue";
    case "Student":
      return "geni-student";
    default:
      return "opacity-0";
  }
};

const USER_COLOR = {
  Creator: "secondary",
  Brand: "geni-blue",
  Student: "geni-student",
};

export { getUserTypeColor, USER_COLOR };

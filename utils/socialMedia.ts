export const extractUsername = (
  platform: "instagram" | "facebook",
  url: string
): string => {
  if (!url) return "";

  // If it's already a username (no http/https), return it
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return url.replace(/^@/, "");
  }

  // Extract username from URL
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split("/").filter(Boolean);

  // Handle different URL formats
  if (platform === "instagram") {
    // For Instagram, the username is usually the first path segment
    return pathSegments[0] || "";
  } else if (platform === "facebook") {
    // For Facebook, the username is usually the last path segment
    return pathSegments[pathSegments.length - 1] || "";
  }

  return "";
};

export const formatSocialMediaUrl = (
  platform: "instagram" | "facebook",
  input: string
): string => {
  if (!input) return "";

  // If input is already a URL, return it
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }

  // Format based on platform
  switch (platform) {
    case "instagram":
      return `https://www.instagram.com/${input.replace(/^@/, "")}/`;
    case "facebook":
      return `https://www.facebook.com/${input.replace(/^@/, "")}/`;
    default:
      return input;
  }
};

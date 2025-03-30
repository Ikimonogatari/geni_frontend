import { useCallback } from "react";

export const useDateFormatter = () => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);

    // Get month, day, year, hour, and minutes
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }, []);

  return { formatDate };
};

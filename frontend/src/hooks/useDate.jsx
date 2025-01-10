import {
  format,
  formatDistanceToNowStrict,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";

const useDate = () => {
  const formatDate = (date) => {
    const parsedDate = parseISO(date);
    return isToday(parsedDate)
      ? formatDistanceToNowStrict(parsedDate, { addSuffix: true })
      : isYesterday(parsedDate)
      ? "Kemarin"
      : format(parsedDate, "dd MMM yyyy");
  };
  return { formatDate };
};

export default useDate;

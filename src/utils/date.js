import format from "date-fns/format";
import addDays from "date-fns/addDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

export const getUpcomingDays = startDate => {
  try {
    const endDate = addDays(startDate, 6);

    return eachDayOfInterval({ start: startDate, end: endDate }).map(formatDate);
  } catch (e) {
    return [];
  }
};

export const formatDate = date => format(date, "yyyy-MM-dd");

export const formatTime = date => format(date, "HH:mm");

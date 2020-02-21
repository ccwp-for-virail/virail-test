import fetch from "cross-fetch";

import { getUpcomingDays } from "../../../utils/date";

import emptyResponse from "./empty";
import pastResponse from "./past";

const USE_VIRAIL_API = process.env.USE_VIRAIL_API === "true";
const dates = getUpcomingDays(new Date(2020, 1, 20));

const configurations = dates.reduce(
  (acc, date) => ({
    ...acc,
    [date]: require(`./${date}`)
  }),
  {}
);

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

export default async (req, res) => {
  if (USE_VIRAIL_API) {
    const [, query] = req.url.split('?');
    const response = await fetch(`https://www.virail.com/virail/v7/search/en_us?${query}`);

    if (response.ok) {
      const json = await response.json();
      return res.json(json);
    }

    return res.status(500).send("Not Found");
  }

  await sleep(1000);

  const { dt: date } = req.query;
  const random = Math.floor(Math.random() * (100 + 1));

  if (random < 7) {
    return res.json(emptyResponse);
  }

  if (random < 15) {
    return res.json(pastResponse);
  }

  if (configurations[date]) {
    return res.json(configurations[date]);
  }

  return res.status(404).send("Not Found");
};

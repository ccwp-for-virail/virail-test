import fetch from "cross-fetch";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import uniqBy from "lodash/uniqBy";

import { API_PATH, CURRENCY, LANG } from "../config";

export const getSearchPath = ({
  from = "c.3173435",
  to = "c.3169070",
  lang = LANG,
  date,
  currency = CURRENCY,
  adultPassengers = 1
}) =>
  `${API_PATH}/search?from=${from}&to=${to}&land=${lang}&dt=${date}&currency=${currency}&adult_passengers=${adultPassengers}`;

const ERRORS = {
  SERVER: "Server Error.",
  EMPTY: "Missing or empty result array.",
  "api.errors.pastDate": "Provided date can not be in the past."
};

const isEmptyResultList = result => isEmpty(result);

const isErrorStatus = status => status === "error";

/**
 * @param {String} date
 */
export const fetchTravelOptions = async date => {
  const response = await fetch(getSearchPath({ date }));

  if (!response.ok) {
    throw new Error(ERRORS.SERVER);
  }

  const { message, result, status } = await response.json();

  if (isErrorStatus(status)) {
    throw new Error(ERRORS[message]);
  }

  if (isEmptyResultList(result)) {
    throw new Error(ERRORS.EMPTY);
  }

  return result;
};

/**
 * @param {Object[]} result
 * @returns {Object[]}
 */
export const filterResultsByBestOrCheapestOption = (result = []) =>
  result.filter(
    ({ trait = {} }) => trait.global === "best" || trait.global === "cheapest"
  );

/**
 * @param {Object[]} segments
 * @returns {String}
 */
export const getArrivalLocation = ({ segments } = {}) =>
  get(segments, `[${segments.length - 1}].arrival`);

/**
 * @param {Object[]} segments
 * @returns {Number}
 */
export const getArrivalTime = ({ segments } = {}) =>
  get(segments, `[${segments.length - 1}].toTimeVal`);

/**
 * @param {Object[]} segments
 * @returns {String}
 */
export const getDepartureLocation = ({ segments } = {}) =>
  get(segments, "[0].departure");

/**
 * @param {Object[]} segments
 * @returns {Number}
 */
export const getDepartureTime = ({ segments } = {}) =>
  get(segments, "[0].fromTimeVal");

/**
 * @param {String} duration
 * @returns {String}
 */
export const getDuration = ({ duration } = {}) => duration;

/**
 * @param {String} duration
 * @returns {String}
 */
export const getPrice = ({ price } = {}) => price;

/**
 * @param {String} transport
 * @param {Object[]} segments
 * @returns {String}
 */
export const getTransportType = ({ transport, segments } = {}) => {
  if (segments.length > 1) {
    const types = uniqBy(segments, segment => segment.transport);

    return types.length !== 1 ? "mixed" : transport;
  }

  return transport;
};

/**
 * @param {Object[]} result
 * @returns {Object}
 */
export const pickResultByDepartureTime = (result = []) =>
  result.reduce((bestOption, currentOption) => {
    if (isEmpty(bestOption.segments)) {
      return currentOption;
    }

    if (isEmpty(currentOption.segments)) {
      return bestOption;
    }

    if (
      getDepartureTime(currentOption.segments) <
      getDepartureTime(bestOption.segments)
    ) {
      return currentOption;
    }

    return bestOption;
  }, result[0]);

/**
 * @param {Object[]} result
 * @returns {{ departureTime: Date, duration: String, departureLocation: String, arrivalTime: Date, price: String, transportType: String, arrivalLocation: String }}
 */
export const processSearchRequest = result => {
  const filtered = filterResultsByBestOrCheapestOption(result);
  const picked = pickResultByDepartureTime(filtered);
  const arrivalLocation = getArrivalLocation(picked);
  const arrivalTime = new Date(getArrivalTime(picked) * 1000);
  const departureLocation = getDepartureLocation(picked);
  const departureTime = new Date(getDepartureTime(picked) * 1000);
  const duration = getDuration(picked);
  const price = getPrice(picked);
  const transportType = getTransportType(picked);

  return {
    arrivalLocation,
    arrivalTime,
    departureLocation,
    departureTime,
    duration,
    price,
    transportType
  };
};

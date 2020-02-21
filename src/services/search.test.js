import {processSearchRequest} from "./search";

const resultMock = [
  {
    trait: {
      global: 'cheapest'
    },
    transport: 'bus',
    duration: '9h 55m',
    price: '10 $',
    priceVal: 10.0000,
    segments: [
      {
        priceVal: 5.0000,
        departure: "Milan (Lampugnano bus station)",
        fromTimeVal: 1582232514,
      },
      {
        priceVal: 5.0000,
        arrival: "Rome Anagnina",
        toTimeVal: 1582242714,
      }
    ]
  },
  {
    trait: {
      global: 'cheapest'
    },
    transport: 'bus',
    duration: '9h 55m',
    price: '10 $',
    priceVal: 10.0000,
    segments: [
      {
        priceVal: 10.0000,
        departure: "Milan (Lampugnano bus station)",
        fromTimeVal: 1582242714,
      }
    ]
  },
  {
    trait: {
      global: 'best'
    },
    transport: 'plane',
    duration: '3h 55m',
    price: '11 $',
    priceVal: 10.0000,
    segments: [
      {
        priceVal: 10.0000,
        departure: "Milan (Lampugnano bus station)",
        fromTime: "23:45pm",
        fromTimeISO8601: "2020-02-20T20:45:00+01:00"
      }
    ]
  }
];

it('should properly extract data', () => {
  const expectedResult = {
    arrivalLocation: "Rome Anagnina",
    arrivalTime: new Date(1582242714000),
    departureLocation: 'Milan (Lampugnano bus station)',
    departureTime: new Date(1582232514000),
    duration: '9h 55m',
    price: '10 $',
    transportType: 'bus'
  };
  expect(processSearchRequest(resultMock)).toEqual(expectedResult)
});

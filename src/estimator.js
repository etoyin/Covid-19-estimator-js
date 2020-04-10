
export const convertToDays = (periodType, timeToElapse) => {
  let timeInDays;
  switch (periodType) {
    case 'months':
      timeInDays = timeToElapse * 30;
      break;
    case 'weeks':
      timeInDays = timeToElapse * 7;
      break;
    default:
      timeInDays = timeToElapse;
  }
  return timeInDays;
};

const commonFunction = (currentlyInfected, data) => {
  const {
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region
  } = data;
  const {
    avgDailyIncomeInUSD,
    //avgDailyIncomePopulation
  } = region;
  const timeInDays = convertToDays(periodType, timeToElapse);
  const infectionsByRequestedTime = currentlyInfected * (2 ** Math.trunc(timeInDays / 3));
  const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
  const hospitalBedAvailable = totalHospitalBeds * 0.35;
  const hospitalBedsByRequestedTime = Math.trunc(hospitalBedAvailable - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const avgDollarXIncomePopXtime = avgDailyIncomeInUSD;
  const dollarOut = infectionsByRequestedTime * avgDollarXIncomePopXtime;
  const dollarsInFlight = Number(dollarOut.toFixed(2));

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

export const impactCases = (data) => {
  const { reportedCases } = data;
  const currentlyInfected = reportedCases * 10;
  return commonFunction(currentlyInfected, data);
};

export const severeImpactCases = (data) => {
  const { reportedCases } = data;
  const currentlyInfected = reportedCases * 50;
  return commonFunction(currentlyInfected, data);
};

const covid19ImpactEstimator = (data) => (
  {
    data,
    impact: impactCases(data),
    severeImpact: severeImpactCases(data)
  }
);

export default covid19ImpactEstimator;

import { convertToDays, impactCases, severeImpactCases } from './estimator';


describe('convertToDays', () => {
  it('Should return all answers in days', () => {
    expect(convertToDays('days', 156285)).toBe(156285);
    expect(convertToDays('weeks', 400)).toBe(2800);
    expect(convertToDays('weeks', 8)).toBe(56);
    expect(convertToDays('months', 2)).toBe(60);
    expect(convertToDays('months', 5)).toBe(150);
  });
});

describe('impactCases', () => {
  it('Should return an object', () => {
    const data2 = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.51
      },
      periodType: 'days',
      timeToElapse: 8,
      reportedCases: 6,
      population: 2705,
      totalHospitalBeds: 614
    };
    const data = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 3,
        avgDailyIncomePopulation: 0.41
      },
      periodType: 'days',
      timeToElapse: 18,
      reportedCases: 16,
      population: 2735,
      totalHospitalBeds: 64
    };
    const data3 = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.51
      },
      periodType: 'months',
      timeToElapse: 0.5,
      reportedCases: 6,
      population: 2705,
      totalHospitalBeds: 614
    };
    const data4 = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.51
      },
      periodType: 'weeks',
      timeToElapse: 1,
      reportedCases: 6,
      population: 2705,
      totalHospitalBeds: 614
    };

    expect(impactCases(data3)).toEqual({
      currentlyInfected: 60,
      infectionsByRequestedTime: 1920,
      severeCasesByRequestedTime: 288,
      hospitalBedsByRequestedTime: -73,
      casesForICUByRequestedTime: 96,
      casesForVentilatorsByRequestedTime: 38,
      dollarsInFlight: 30.6
    });

    expect(impactCases(data4)).toEqual({
      currentlyInfected: 60,
      infectionsByRequestedTime: 240,
      severeCasesByRequestedTime: 36,
      hospitalBedsByRequestedTime: 178,
      casesForICUByRequestedTime: 12,
      casesForVentilatorsByRequestedTime: 4,
      dollarsInFlight: 14.28
    });

    expect(impactCases(data2)).toEqual({
      currentlyInfected: 60,
      infectionsByRequestedTime: 240,
      severeCasesByRequestedTime: 36,
      hospitalBedsByRequestedTime: 178,
      casesForICUByRequestedTime: 12,
      casesForVentilatorsByRequestedTime: 4,
      dollarsInFlight: 16.32
    });

    expect(impactCases(data)).toEqual({
      currentlyInfected: 160,
      infectionsByRequestedTime: 10240,
      severeCasesByRequestedTime: 1536,
      hospitalBedsByRequestedTime: -1514,
      casesForICUByRequestedTime: 512,
      casesForVentilatorsByRequestedTime: 204,
      dollarsInFlight: 22.14
    });
  });
});

describe('severeImpactCases', () => {
  it('Should return an object', () => {
    const data2 = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.51
      },
      periodType: 'days',
      timeToElapse: 8,
      reportedCases: 6,
      population: 2705,
      totalHospitalBeds: 614
    };
    const data = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 3,
        avgDailyIncomePopulation: 0.41
      },
      periodType: 'days',
      timeToElapse: 18,
      reportedCases: 16,
      population: 2735,
      totalHospitalBeds: 64
    };
    expect(severeImpactCases(data2)).toEqual({
      currentlyInfected: 300,
      infectionsByRequestedTime: 1200,
      severeCasesByRequestedTime: 180,
      hospitalBedsByRequestedTime: 34,
      casesForICUByRequestedTime: 60,
      casesForVentilatorsByRequestedTime: 24,
      dollarsInFlight: 16.32
    });
    expect(severeImpactCases(data)).toEqual({
      currentlyInfected: 800,
      infectionsByRequestedTime: 51200,
      severeCasesByRequestedTime: 7680,
      hospitalBedsByRequestedTime: -7657,
      casesForICUByRequestedTime: 2560,
      casesForVentilatorsByRequestedTime: 1024,
      dollarsInFlight: 22.14
    });
  });
});

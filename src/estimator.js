const covid19ImpactEstimator = (data) => {
    return {
        data: data,
        impact: impactCases(data),
        severeImpact: severeImpactCases(data)
    }

};

export const convertToDays = (periodType, timeToElapse) => {
    let timeInDays;
    switch(periodType){
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

}


export const impactCases = (data) => {
    const {periodType, timeToElapse, reportedCases, population, totalHospitalBeds, region} = data;
    const currentlyInfected = reportedCases * 10;
    const timeInDays = convertToDays(periodType, timeToElapse);
    const infectionsByRequestedTime = currentlyInfected * ( 2 ** Math.floor(timeInDays/3) );
    const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
    const hospitalBedsByRequestedTime = Math.floor(totalHospitalBeds * 0.35) - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);
    const dollarsInFlight = region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * timeInDays;
    //const hospitalBedsByRequestedTime = (availableBedSpace > 0)

    return {
        currentlyInfected: currentlyInfected,
        infectionsByRequestedTime: infectionsByRequestedTime,
        severeCasesByRequestedTime: severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime,
        dollarsInFlight: dollarsInFlight
    }
}

export const severeImpactCases = (data) => {
    const {periodType, timeToElapse, reportedCases, population, totalHospitalBeds, region} = data;
    const currentlyInfected = reportedCases * 50;
    const timeInDays = convertToDays(periodType, timeToElapse);
    const infectionsByRequestedTime = currentlyInfected * ( 2 ** Math.floor(timeInDays/3) );
    const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
    const hospitalBedsByRequestedTime = Math.floor(totalHospitalBeds * 0.35) - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);
    const dollarsInFlight = region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * timeInDays;
    //const hospitalBedsByRequestedTime = (availableBedSpace > 0)

    return {
        currentlyInfected: currentlyInfected,
        infectionsByRequestedTime: infectionsByRequestedTime,
        severeCasesByRequestedTime: severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime,
        dollarsInFlight: dollarsInFlight
    }
}

export default covid19ImpactEstimator;

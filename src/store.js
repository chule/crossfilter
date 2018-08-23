// import _ from 'lodash'
import crossfilter from 'crossfilter'
 
import initialData from './data/data'
//import * as d3 from 'd3'

// function randomGaussian() {
//     return Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
// }

const store = (() => {
    // const data = _.range(256).map((i) => {
    //     // console.log(i, " -- ", randomGaussian() + 8);
    //     return [i, randomGaussian() + 8]
    // });

    // console.log("data -> ", data);

    // Initialize crossfilter dataset.

    let data = initialData.filter(d => 
        d.totalDebtToEquityRatio !== null 
        && d.dividendRate !== null 
        && d.pERatio !== null 
        && d.earningsGrowth !== null)

    const filter = crossfilter(data);

    // let extent = d3.extent(data, d => d.earningsGrowth)

    // console.log(extent)
    // {
    //     "name": "OMV",
    //     "totalDebtToEquityRatio": 91.45242,
    //     "dividendRate": 1.5,
    //     "pERatio": 10.48,
    //     "ticker": "OMV AV Equity",
    //     "earningsGrowth": 309.596
    //   },

    // Create dimensions and groups.
    const totalDebtToEquityRatio = filter.dimension(d => d.totalDebtToEquityRatio)
    const totalDebtToEquityRatioGroup = totalDebtToEquityRatio.group(d => Math.floor(d / 10) * 10)//.reduceSum(d => d.totalDebtToEquityRatio)

    const dividendRate = filter.dimension(d => d.dividendRate)
    const dividendRateGroup = dividendRate.group(d => Math.floor(d / 10) * 10) //d => Math.floor(d)

    const pERatio = filter.dimension(d => d.pERatio)
    const pERatioGroup = pERatio.group(d => Math.floor(d / 10) * 10)

    const earningsGrowth = filter.dimension(d => d.earningsGrowth)
    const earningsGrowthGroup = earningsGrowth.group(d => Math.floor(d / 10) * 10)

    // Create dimensions and groups.
    // const index = filter.dimension(d => d[0]);
    // const indexGroup = index.group().reduceSum(d => d[1]);
    // const value = filter.dimension(d => d[1]);
    // const valueGroup = value.group().reduceSum(d => d[1]);
    // const index2D = filter.dimension(d => d);
    // const index2DGroup = index2D.group();

    const charts = [];

    return {
        data,
        filter,
        totalDebtToEquityRatio, totalDebtToEquityRatioGroup,
        dividendRate, dividendRateGroup,
        pERatio, pERatioGroup,
        earningsGrowth, earningsGrowthGroup,
        charts
    };
})();

export default store
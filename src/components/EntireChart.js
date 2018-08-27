import React from 'react'

import Histogram from './Histogram2'
import store from '../store'

import './entireChart.css'

class EntireChart extends React.Component {
    componentWillMount() {
        //this.filterAll();
        //store.pERatio.filter([0,70])
    }

    filterAll() {
        [
            store.totalDebtToEquityRatio,
            store.dividendRate,
            store.pERatio,
            store.earningsGrowth
        ].forEach(dimension => dimension.filterAll())
    }



    redrawAll() {
        store.charts.forEach(chart => chart.redraw());
    }

    render() {

        store.pERatio.filter([0, 70])

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '50%', height: '350px' }}>
                    <Histogram
                        id='histogram-chart'
                        name='totalDebtToEquityRatio'
                        dimension={store.totalDebtToEquityRatio}
                        group={store.totalDebtToEquityRatioGroup}
                        yAccessor={d => d.value}
                        padding={2}
                        outliers={[0,350]}
                        redrawAll={this.redrawAll} />
                </div>

                <div style={{ width: '50%', height: '350px' }}>
                    <Histogram
                        id='histogram-chart'
                        name='dividendRate'
                        dimension={store.dividendRate}
                        group={store.dividendRateGroup}
                        yAccessor={d => d.value}
                        padding={2}
                        outliers={[0,11]}
                        redrawAll={this.redrawAll} />
                </div>
                <div style={{ width: '50%', height: '350px' }}>
                    <Histogram
                        id='histogram-chart'
                        name='pERatio'
                        dimension={store.pERatio}
                        group={store.pERatioGroup}
                        yAccessor={d => d.value}
                        padding={2}
                        outliers={[0,70]}
                        redrawAll={this.redrawAll} />
                </div>
                <div style={{ width: '50%', height: '350px' }}>
                    <Histogram
                        id='histogram-chart'
                        name='earningsGrowth'
                        dimension={store.earningsGrowth}
                        group={store.earningsGrowthGroup}
                        yAccessor={d => d.value}
                        padding={2}
                        outliers={[-100,250]}
                        redrawAll={this.redrawAll} />
                </div>
            </div>
        );
    }
}

export default EntireChart
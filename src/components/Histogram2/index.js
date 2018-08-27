import React, { Component } from 'react'
//import BarChart from "./BarChart"
import BarPath from './BarPath'
import ChangeOutliers from './ChangeOutliers'
import Axes from './Axes'
import * as d3 from "d3"
import ResponsiveWrapper from './ResponsiveWrapper'
import store from '../../store'

class Histogram extends Component {

    state = {
        margin: { top: 42, right: 15, bottom: 50, left: 35 },
        size: {},
        xScale: null,
        yScale: null,
        histogram: null,
        svgDimensions: null,
        all: this.props.group.all(),
        width: null,
        heigth: null,
        outliersExcluded: true
    }

    componentDidMount() {

        let { group } = this.props

        let redraw = () => {

            const all = group.all().filter(d => d.value);

            this.setState(() => ({
                all
            }))

        }


        redraw();

        let chart = {
            redraw
        };

        store.charts.push(chart);
    }

    changeOutliers = () => {

        console.log("changeOutliers")
        this.setState(oldState => ({
            ...oldState,
            outliersExcluded: !oldState.outliersExcluded
        }))
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        let { xScale, yScale, margin, histogram, all } = prevState;

        let {
            //group,
            // margin,
            // width, height,
            // x, y,
            //xAccessor,
            //yAccessor,
            //padding,
            parentWidth,
            parentHeight
        } = nextProps;



        const svgDimensions = {
            width: Math.max(parentWidth, 400),
            height: Math.max(parentHeight, 300)
        }

        let width = svgDimensions.width - margin.left - margin.right
        let height = svgDimensions.height - margin.top - margin.bottom

        let extent = d3.extent(all, d => d.key)


        console.log("nextProps, prevState", nextProps, prevState)



        if (prevState.outliersExcluded) {
            xScale = d3.scaleLinear()
                .domain(nextProps.outliers)
                .range([0, width])
                .nice()
        } else {
            xScale = d3.scaleLinear()
                .domain(extent)
                .range([0, width])
                .nice()
        }



        histogram = d3.histogram()
            .value(d => d.key)
            .domain(xScale.domain())
            .thresholds(xScale.ticks(40));

        // yScale = d3.scaleLinear()
        //     .domain(d3.extent(all, d => d.value))
        //     .range([height, 0]);

        yScale = d3.scaleLinear()
            .domain([0, d3.max(histogram(all), d => d.length)])
            .range([height, 0])
            .nice()



        prevState = { ...prevState, xScale, yScale, histogram, svgDimensions, width, height };
        return prevState;
    }

    render() {

        const { xScale, yScale, margin, svgDimensions, histogram, all, width, height, outliersExcluded } = this.state

        return (

            <svg width={svgDimensions.width} height={svgDimensions.height}>

                <g transform={`translate(${svgDimensions.width / 2}, 22)`}>
                    <text style={{ textAnchor: 'middle' }}> {this.props.name} </text>
                </g>

                {/*  */}
                <ChangeOutliers 
                    outliersExcluded={outliersExcluded} 
                    changeOutliers={this.changeOutliers}
                    svgDimensions={svgDimensions}
                    />
                <BarPath
                    scales={{ xScale, yScale }}
                    name={this.props.name}
                    margin={margin}
                    data={histogram(all)}
                    svgDimensions={svgDimensions}
                    width={width}
                    height={height}
                    dimension={this.props.dimension}
                    redrawAll={this.props.redrawAll}
                />

                <Axes
                    scales={{ xScale, yScale }}
                    margin={margin}
                    svgDimensions={svgDimensions}
                    width={width}
                    height={height}
                />

            </svg>
        )
    }
}

Histogram.defaultProps = {
    margin: { top: 32, left: 32, bottom: 32, right: 32 },
    // width: 320,
    // height: 320,
    xAccessor: d => d.key
}

export default ResponsiveWrapper(Histogram)
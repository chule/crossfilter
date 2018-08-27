import React, { Component } from "react"

class ChangeOutliers extends Component {

    render() {
        const { outliersExcluded, changeOutliers, svgDimensions} = this.props

        return (<g transform={`translate(${svgDimensions.width - 22}, 22)`}>
            <text style={{ textAnchor: 'end' }} onClick={() => changeOutliers()}>
                {outliersExcluded ? "include outliers" : "exclude outliers"}

            </text>
        </g>)
    }

}

export default ChangeOutliers
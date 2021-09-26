import React from 'react'
import Component from "react-component-component";
import { Chart } from "react-google-charts";


// function SectionVs

function GraphComponents({ xAxis, yAxis, height, sesi, semester} ) {

  let url="http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?";
  url = `${url}entity=subjek&sesi=${sesi}&semester=${semester}`;
  // console.log({semester, sesi})
  // var newitem = [value['kod_subjek'], Number(vaule['bil_seksyen'])];
  return (
    <div className="googleCharts">
      <Component
        initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
        didMount={async function (component) {
          const response = await fetch(url);
          const json = await response.json();
          // console.log(json)
          // const rateCurrencyNames = Object.keys(json.rates)
          // const rateCurrencyValues = Object.values(json.rates)
          const chartData = [[xAxis, yAxis]]
          json.forEach((value)=>{
            chartData.push([value[xAxis], value[yAxis]])
          })
          component.setState({
            dataLoadingStatus: 'ready',
            chartData: chartData,
          })
        }}
      >
        {component => {
          return component.state.dataLoadingStatus === 'ready' ? (
            <Chart
              chartType="BarChart"
              data={component.state.chartData}
              options={{
                height,
                title: `Number of Student in Each Subject for ${sesi}, sem ${semester}`,
                chartArea: {top:20,width:"50%", height:"80%"},
                hAxis: {
                  title: yAxis,
                  minValue: 0
                },
                vAxis: {
                  title: xAxis
                }
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          ) : (
              <div>Fetching data from API</div>
            )
        }}
      </Component>   
       </div>
  )
}

export default GraphComponents

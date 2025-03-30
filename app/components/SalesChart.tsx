'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';

// const dataset = [
//   { min: -12, max: -4, precip: 79, month: 'Jan' },
//   { min: -11, max: -3, precip: 66, month: 'Feb' },
//   { min: -6, max: 2, precip: 76, month: 'Mar' },
//   { min: 1, max: 9, precip: 106, month: 'Apr' },
//   { min: 8, max: 17, precip: 105, month: 'Mai' },
//   { min: 15, max: 24, precip: 114, month: 'Jun' },
//   { min: 18, max: 26, precip: 106, month: 'Jul' },
//   { min: 17, max: 26, precip: 105, month: 'Aug' },
//   { min: 13, max: 21, precip: 100, month: 'Sept' },
//   { min: 6, max: 13, precip: 116, month: 'Oct' },
//   { min: 0, max: 6, precip: 93, month: 'Nov' },
//   { min: -8, max: -1, precip: 93, month: 'Dec' },
// ];

const series = [
    { type: 'line', dataKey: 'min', color: '#577399' },
    { type: 'line', dataKey: 'max', color: '#fe5f55' },
    { type: 'bar', dataKey: 'precip', color: '#bfdbf7', yAxisId: 'rightAxis' },
];

export default function SalesChart({sales}:{sales:any[]}) {
    const [reverseX, setReverseX] = React.useState(false);
    const [reverseLeft, setReverseLeft] = React.useState(false);
    const [reverseRight, setReverseRight] = React.useState(false);

    const label = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];



    const cumamt: any[] = []

    const total = (item:any) => {
      const amount = item.reduce((a:number, b:number) =>a+b, 0)

      return amount
      
    }

    function getMinMaxWithMath(arr:any[]) {
        // Math.max(10,3,8,1,33)
        let maximum = Math.max(...arr);
        // Math.min(10,3,8,1,33)
        let minimum = Math.min(...arr);
       let result =  ([maximum, minimum]); 
        return result;
    };
  

        const lab = sales?.flatMap((item:any) =>{
            const createdAt = new Date(item.createdAt).getMonth() 
            return createdAt
        });
    
        const uniqedate = lab.filter((item:any, i:number) => {
            return lab.indexOf(item) == i
        })
    
        const handleF = ((date:any) => {
            const filter = sales.filter((item:any) => new Date(item.createdAt).getMonth() == date)
            if(filter.length > 0) return cumamt.push({name: date, item: filter.flatMap((item:any) =>item.amount)})
                return
        })
    
        uniqedate.sort((a:number,b:number) =>a -b).flatMap((i:any) => {
            handleF(i)
        } )
    
    
        const labels = uniqedate?.flatMap((item:any) =>{
            return(label[item])
        });
    
    
        const datasets = cumamt?.flatMap((item:any, index:number) =>{
          // { min: -12, max: -4, precip: 79, month: 'Jan' },
            const amount = total(item?.item)
            const min = getMinMaxWithMath(item?.item)[1]
            const max = getMinMaxWithMath(item?.item)[0]
            return ({
                min,
                max,
                precip: parseInt(amount),
                month: labels[index],
            })
        });
       

       


    return (
        <Stack sx={{ width: '100%' }}
        >
            <Stack direction="row">
                <FormControlLabel
                checked={reverseX}
                control={
                    <Checkbox onChange={(event) => setReverseX(event.target.checked)} />
                }
                label='Reverse X-axis'
                labelPlacement="end"
                />
                <FormControlLabel
                checked={reverseLeft}
                control={
                    <Checkbox onChange={(event) => setReverseLeft(event.target.checked)} />
                }
                label="Reverse left axis"
                labelPlacement="end"
                />
                <FormControlLabel
                checked={reverseRight}
                control={
                    <Checkbox onChange={(event) => setReverseRight(event.target.checked)} />
                }
                label="Reverse right axis"
                labelPlacement="end"
                />
            </Stack>
            <Box sx={{ width: '100%' }}>
                <ResponsiveChartContainer
                series={[ { type: 'line', dataKey: 'min', color: '#e36a4f' },
                    { type: 'line', dataKey: 'max', color: '#1fc998' },
                    { type: 'bar', dataKey: 'precip', color: '#02b3b7', yAxisId: 'rightAxis' },]}
                xAxis={[
                    {
                    scaleType: 'band',
                    dataKey: 'month',
                    label: 'Month',
                    reverse: reverseX,
                    },
                ]}
                yAxis={[
                    { id: 'leftAxis', reverse: reverseLeft },
                    { id: 'rightAxis', reverse: reverseRight },
                ]}
                dataset={datasets}
                height={400}
                >
                <ChartsGrid horizontal />
                <BarPlot />
                <LinePlot />
                <MarkPlot />

                <ChartsXAxis />
                <ChartsYAxis axisId="leftAxis"  />
                <ChartsYAxis
                    axisId="rightAxis"
                    position="right"
                   
                />
                <ChartsTooltip />
                </ResponsiveChartContainer>
            </Box>
        </Stack>
    );
}

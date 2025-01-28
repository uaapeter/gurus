'use client'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

const DateSelectionInput = ({ minDate, handleSelect, selectionRange, months}:{ minDate?: any,
   months:number, selectionRange:any, handleSelect: (ranges: any) => void}) => {
 
return (
    <DateRangePicker
        months={months}
        direction='horizontal'
        ranges={selectionRange}
        onChange={handleSelect}
        minDate={minDate}
        rangeColors={['#02b3b7','#1fc998']}
      />
    )
  
}

export default DateSelectionInput
'use client'
import moment from 'moment';
import React, { useState } from 'react'
import Button from './Button';

function TodayMoment({splice, className}: {splice?: boolean, className:string}) {
    const [todayMoment, setTodayMoment] = useState('')


    setInterval(() => {
        const currentmoment = moment().format('MMMM Do YYYY, h:mm:ss a')
        setTodayMoment(currentmoment)
    }, 1000);
    return (
        <Button 
            noPd        
            title={splice ? todayMoment?.split(',')[1] : todayMoment}
            className={className}                        
        />

    )
}

export default TodayMoment
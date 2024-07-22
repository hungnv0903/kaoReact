import React, { Fragment } from 'react'
import listAirportData from '../api/data/ListAirport.json';
import regionData from '../api/data/Region.json';
import Styles from './index.module.css';

interface IAirport {
    AirportCode: string ; 
    AirportName: string ; 
    CityCode: string ; 
    CityName: string ; 
    CountryCode: string ; 
    CountryName: string ; 
}

type tRegion =  {
  [key:string]:string[]
}

interface IgroupAirport {
  [key:string]:IAirport[] ; 
}

interface IOnSelectPlace {
  onSelectPlace:(place:IAirport)=>void ; 
}


const groupAirportsByRegion = (regionData:tRegion , listAirportData:IAirport[])=>{
  const groupedAirports:IgroupAirport = {};
  Object.keys(regionData).forEach((region)=>{
    groupedAirports[region] = [] ; 
  }) 

  listAirportData.forEach((airport)=>{
    for(const [region , airportCodes] of Object.entries(regionData)){
      if(airportCodes.includes(airport.AirportCode)){
        groupedAirports[region].push(airport) ; 
        break ; 
      }
    }
  })

  return groupedAirports ; 
}
const newListAirport = groupAirportsByRegion(regionData , listAirportData) ; 

const convertAirport = (arrAir: IAirport[]) => {
  const objAirCode:any= {"HAN":1,"SGN":2,"DAD":3} ; 
  // const newArrAir = arrAir ;
  arrAir.sort((a,b)=>{
    const priorityA = objAirCode[a.AirportCode] || Infinity; // Sử dụng Infinity cho các giá trị không có trong priority
    const priorityB = objAirCode[b.AirportCode] || Infinity;
    return priorityA - priorityB;
  }); 
  return arrAir ; 
}



const ListMap = ({onSelectPlace}:IOnSelectPlace) => {
  return (
    <div className={`cursor-pointer pt-3 ${Styles.listAirport}`}>
        <div className='flex-col'>
          {
            Object.entries(newListAirport).map((item,index)=>(
              <div key={index}>
                <div className='bg-sky-400 px-3 text-gray-50'>
                  <span className='font-bold'>{item[0]}</span>
                </div>
                <div>
                  <ul className='flex flex-wrap  my-2'>
                    {
                      index===0?(
                      convertAirport(item[1]).map((airtport)=>(
                        <li key={airtport.AirportCode} onClick={()=>onSelectPlace(airtport)} className={`w-40 text-start mx-2 my-1 
                            ${airtport.AirportCode==='HAN'?'font-bold text-orange-600'
                              :airtport.AirportCode==='SGN'?'font-bold text-orange-600'
                              :airtport.AirportCode==='DAD'?'font-bold text-orange-600':''} `}>
                          <span className='px-2 py-1 hover:rounded-lg hover:bg-fuchsia-500 hover:border-white hover:border-2 hover:text-gray-50'>
                            {airtport.CityName} ({airtport.AirportCode})
                          </span>
                        </li>
                      ))
                    ):(
                      item[1].map((airtport)=>(
                        <li key={airtport.AirportCode} onClick={()=>onSelectPlace(airtport)} className="w-40 text-start mx-2 my-1">
                          <span className='px-2 py-1 hover:rounded-lg hover:bg-fuchsia-500 hover:border-white hover:border-2 hover:text-gray-50'>
                            {airtport.CityName} ({airtport.AirportCode})
                          </span>
                        </li>
                      ))
                    )
                    }
                  </ul>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default ListMap

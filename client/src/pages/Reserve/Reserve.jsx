import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './reserve.css'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../Hooks/use-fetch'
import { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'


function Reserve({setOpen, hotelId}) {

    const {data,loading,error } = useFetch(`/hotels/room/${hotelId}`)
    const [selectedRooms, setSelectedRooms] = useState([])
    const {dates} = useContext(SearchContext)
    
    const getDatesInRange=(startDate,endDate)=>{
        const end= new Date(endDate)

        const date= new Date(startDate)
        let dates=[]

        while(date<=end){
            dates.push(date.getTime())
            date.setDate(date.getDate()+1)
        }

        return dates;
    }

    const allDates= getDatesInRange(dates[0].startDate,dates[0].endDate)

    
    const isAvailable =(roomNumber)=>{
        const isFound = roomNumber.unavailableDates.some((date)=>
           allDates.includes(new Date(date).getTime())
        )
        return !isFound
    }
    const handleSelect =(e)=>{
        const checked = e.target.checked;
        const value= e.target.value;

        setSelectedRooms(
            checked
                ?[...selectedRooms,value]
                :selectedRooms.filter((item)=>item !==value)
        )
    }
    
    const navigate = useNavigate()

    const handleClick= async ()=>{
        try{
            await Promise.all(
                selectedRooms.map(roomId=>{
                    const res= axios.put(`/rooms/availability/${roomId}`,{
                        dates:allDates
                })
                return res.data
            }))
            setOpen(false);
            navigate("/")
        }catch(err){

        }
    }
  

  return (
    <div className='reserve'>
        <div className='rContainer'>
            <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=>setOpen(false)}/>
            <span>Select your rooms:</span>
            {data.map(item=>(
                <div className='rItem'>
                    <div className='rInfo'>
                        <div className='rItem'>{item.title}</div>
                        <div className='rDesc'>{item.desc}</div>
                        <div className='rMax'>Max People: <b>{item.maxPeople}</b></div>
                        <div className="rPrice">{item.price}</div>
                    </div>
                    <div className="rSelectRooms">
                    {item.roomNumbers.map((roomNumber)=>(
                        <div className="room" key={roomNumber._id}>
                            <label>{roomNumber.number}</label>
                            <input 
                                type='checkbox' 
                                value={roomNumber._id} 
                                onChange={handleSelect}
                                disabled={!isAvailable(roomNumber)}
                                />
                        </div>
                    ))}
                    </div>
                </div>
            ))}
            <button className='rButton' onClick={handleClick}>Reserve Now !!</button>
        </div>
    </div>
  )
}

export default Reserve
import './todos.css'
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
export const Todos=()=>{
   const [text, setText] = useState("")
   const [groceries, setGroceries] = useState([])
   const [page, setPage] = useState(1)
   
   useEffect(()=>{
       getData()
   },[page])
   
   const getData=()=>{
       axios.get(`http://localhost:2701/groceries?_limit=3&_page=${page}`).then((res)=>{
           setGroceries(res.data)
       })
   }
 
   
    return(
        <div>
            <input className='input' type="text" onChange={(e)=>setText(e.target.value)} />
            <button onClick={()=>{
                fetch("http://localhost:2701/groceries",{
                    method: "POST",
                    body: JSON.stringify({title:text, purchased:false}),
                    headers:{
                        "content-type":"application/json",
                    },
                }).then(()=>{ 
                    getData()
                })
            }}>Add</button>
            {groceries.map((g)=>(
                <div key={g.id}>{g.title} </div>
            ))}
            <button className='previous' onClick={()=>{
                setPage(page-1)
            }}>previous</button>
            <button className='next' onClick={()=>{
                setPage(page+1)
            }}>next</button>
        </div>
    )
}
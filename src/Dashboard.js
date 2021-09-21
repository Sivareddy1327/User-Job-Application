import React, {useState,useEffect} from 'react'
import { Link,Route } from 'react-router-dom'
import axios from 'axios'


const Dashboard = (props) =>{

    useEffect(()=>{
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const result = response.data
            console.log(result)
        })
        .catch((error)=>{
            alert(error.message)
        })
    },[])


    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                <li><Link to='/frontend'>Front-End Developer</Link></li>
                <li><Link to='/nodejs'>Node.js Developer</Link></li>
                <li><Link to='/meanstack'>MEAN Stack Developer</Link></li>
                <li> <Link to='/fullstack'>FULL Stack Developer</Link></li>
            </ul>
            
           

          
        </div>
    )
}

export default Dashboard
import React, {useState, useEffect} from 'react'
import { Link,Route } from 'react-router-dom'
import axios from 'axios'
import Home from './Home'
import Register from './Register'
import Dashboard from './Dashboard'
import Frontend from './Frontend'
import Nodejs from './Nodejs'
import Meanstack from './Meanstack'
import Fullstack from './Fullstack'

const App = (props) =>{

    const [backenddata,setBackenddata] = useState([])

    return (
        <div style={{color : 'blueviolet'}}>
            <ul>
                <li> <Link to='/'>Home</Link></li>
                <li>  <Link to='/register'>Register</Link></li>
                <li> <Link to='/dashboard'>Dashboard</Link></li>
            </ul>
           
          
           
            <Route path='/'  component={Home} exact={true}/>
            <Route path='/register'  component={Register} exact={true}/>
            <Route path='/dashboard'   component={Dashboard}/>
            <Route path='/frontend'  render={(props)=>{
                return <Frontend 
                            {...props}
                           // FrontendData = {FrontendData}
                      />
            }} />
            <Route path='/nodejs'  render={(props)=>{
                return <Nodejs 
                            {...props}
                           // NodejsData={NodejsData}
                />
            }} />
            <Route path='/meanstack'  render={(props)=>{
                return <Meanstack 
                            {...props}
                           // MeanstackData = {MeanstackData}
                />
            }}/>
            <Route path='/fullstack'  render={(props)=>{
                return <Fullstack 
                            {...props}
                          //  FullstackData={FullstackData}
                />
            }

            }/>
        
           
        </div>
    )
}

export default App





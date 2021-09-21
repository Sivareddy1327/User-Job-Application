import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Modal from 'react-modal'

    Modal.setAppElement("#root")
    const Fullstack = (props) =>{ 
     
        const [backenddata,setBackenddata] = useState([])
        const [userdetails,setUserdetails] = useState({})
        const [isopen,setIsOpen] = useState(false)

        useEffect(()=>{
            axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
            .then((response)=>{
                const result = response.data
                setBackenddata(result)
            })
            .catch((error)=>{
                alert(error.message)
            })
        }, [])
        const FullstackData = backenddata.filter((ele)=>{
            return ele.jobTitle === 'FULL Stack Developer'
        })

        const handleShortedlist = (id)=>{
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, {
                'status' : "shortlisted"
            })
            .then((response)=>{
                const result=response.data
                const update = backenddata.map((ele)=>{
                    if(ele._id == result._id)
                    {
                        return {...result}
                    }
                    else
                    {
                        return {...ele}
                    }
                })
                setBackenddata(update)
            })
            .catch((error)=>{
                alert(error.message)
            })
    
        }
        const handleRejected = (id)=>{
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, {
                'status' : "rejected"
            })
            .then((response)=>{
                const result=response.data
                const update = backenddata.map((ele)=>{
                    if(ele._id == result._id)
                    {
                        return {...result}
                    }
                    else
                    {
                        return {...ele}
                    }
                })
                setBackenddata(update)
            })
            .catch((error)=>{
                alert(error.message)
            })
    
        }

      

    const handleClick = (id) =>{
        const result = FullstackData.find((ele)=>{
            if(ele._id == id) 
                {
                    return ele
                }
        })
        setUserdetails(result)
        setIsOpen(true)
        
    }

    const handleClose = () =>{
        setIsOpen(false)
    }

        const handleStatus = (ele) =>{
         if(ele.status === 'shortlisted')
        {
            return <button style={{backgroundColor : 'green'}}>shortlisted</button>
        }
        else if(ele.status === 'rejected')
        {
            return <button style={{  backgroundColor: 'red'}}>rejected</button>
        }
        else
        {
            return (
                <>
                <button style={{backgroundColor : 'green'}} onClick={()=>{handleShortedlist(ele._id)}}>shortlisted</button>
                <button style ={{backgroundColor : 'red'}} onClick={()=>{handleRejected(ele._id)}}>rejected</button>
                </>
            )
       
        }
        }
    return (
        <div>
            <h1>FULL Stack Developer</h1>
            <h3>List of Candidates applied for FULL Stack Developer</h3>
            {backenddata.length != 0 &&
            <table border='1'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Technical Skills</th>
                    <th>Experience</th>
                    <th>Applied Date</th>
                    <th>view Details</th>
                    <th>Update Application Status</th>
                </tr>
                </thead>
            <tbody>
            {FullstackData.map((ele,i)=>{
                return <tr key={i}>
                <td>{ele.name}</td>
                <td>{ele.skills}</td>
                <td>{ele.experience}</td>
                <td>{ele.createdAt.slice(0,10)}</td>
                <td><button onClick={()=>{handleClick(ele._id)}}>view</button></td>
                <td>{handleStatus(ele)}</td>
                </tr>
                
                
                       
                })}
            </tbody>
            
        </table>
            
            }
            
            <Modal isOpen={isopen} shouldCloseOnOverlayClick={false} onRequestClose={()=>{setIsOpen(false)}} style={{
                overlay : {
                    backgroundColor : 'grey'
                },
                content : {
                    color : 'blue'
                }
            }}>
                <h1><b>Phone</b>-{userdetails.phone}</h1>
                <h1><b>Email</b>-{userdetails.email}</h1>
                <h1><b>Skills</b>-{userdetails.skills}</h1>
                <h1><b>Experience</b>-{userdetails.experience}</h1>
                <button onClick={handleClose}> close </button>
            </Modal>

        </div>
    )
}

export default Fullstack
import React, { useState } from 'react'
import validator from 'validator'
import axios from 'axios'


const Register = (props) =>{

    const [jobinfo,setJobinfo] = useState([])
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [jobTitle,setJobTitle] = useState('')
    const [experience,setExperience] = useState('') 
    const [skills,setSkills] = useState('')
    const [formerror,setFormerror] = useState({})
    const errors = {}

    const handleChangeName = (e) =>{
        setName(e.target.value)
    }

    const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
    }

    const handleChangePhone = (e) =>{
        setPhone(e.target.value)
    }

    const handleChangeJobTitle = (e) =>{
        setJobTitle(e.target.value)
    }

    const handleChangeSkills = (e) =>{
        setSkills(e.target.value)
    }
    const handleChangeExperience = (e) =>{
        setExperience(e.target.value)
    }

    const runValidation = () =>{

        // fullname
        if(name.trim().length == 0)
        {
            errors.name = 'name cannot be blank'
        }
        // email
        if(email.trim().length == 0)
        {
            errors.email = 'email cannot be blank'
        }
        else if(!validator.isEmail(email))
        {
            errors.email = 'email must be xyz@gmail.com in this format'
        }
        // contact
        if(phone.trim().length == 0)
        {
            errors.phone = 'phone number cannot be blank'
        }
        // apply for job
        if(jobTitle.trim().length == 0)
        {
            errors.jobTitle = 'jobTitle cannot be blank'
        }
        // experience
        if(experience.trim() == 0)
        {
            errors.experience = 'experience cannot be blank'
        }
        // technical skill
        if(skills.trim().length == 0)
        {
            errors.skills = 'Skills cannot be blank'
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            name : name,
            email : email,
            phone : phone,
            jobTitle : jobTitle,
            experience : experience, 
            skills : skills
        }
        // if validation
        runValidation()
        if(Object.keys(errors).length == 0)
        {
            setFormerror({})
            axios.post('http://dct-application-form.herokuapp.com/users/application-form', formData)
            .then((response)=>{
                const result = response.data
                console.log(result)
                setJobinfo(result)
            })
            .catch((error)=>{
                alert(error.message)
            })
            setName('')
            setEmail('')
            setPhone('')
            setJobTitle('')
            setExperience('')
            setSkills('')
        }
        else
        {
            setFormerror(errors)
            
        }
        
    }

    return (
        <div style={{ textAlign : 'center'}}>
            <form onSubmit={handleSubmit}>
                <h1>Job Application Form</h1>
                <label>Full name</label><br/>
                <input type='text' value={name} onChange={handleChangeName}/><br/>
                {formerror && <span style={{color : "red"}}>{formerror.name}</span>}<br/><br/>
                <label>Email</label><br/>
                <input type='text' value={email} onChange={handleChangeEmail}/><br/>
                {formerror && <span style={{color : "red"}}>{formerror.email}</span>}<br/><br/>
                <label>Contact Number</label><br/>
                <input type='text' value={phone} onChange={handleChangePhone}/><br/>
                {formerror && <span style={{color : "red"}}>{formerror.phone}</span>}<br/><br/>
                <label>Applying for Job</label><br/>
                <select value={jobTitle} onChange={handleChangeJobTitle}>
                    <option value=''>Select option</option>
                    <option value='Front-End Developer'>Front-End Developer</option>
                    <option value='Node.js Developer'>Node.js Developer</option>
                    <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                    <option value='FULL Stack Developer'>Full Stack Developer </option>

                </select><br/>
                {formerror && <span style={{color : "red"}}>{formerror.jobTitle}</span>}<br/><br/>
                <label>Experience</label><br/>
                <input type='text' value={experience} onChange={handleChangeExperience}/><br/>
                {formerror && <span style={{color : "red"}}>{formerror.experience}</span>}<br/><br/>
                <label>Technical Skills</label><br/>
                <textarea type='text' value={skills} onChange={handleChangeSkills}></textarea><br/>
                {formerror && <span style={{color : "red"}}>{formerror.skills}</span>}<br/><br/>
                <input type='submit'/>
            </form>
            
        </div>
    )
}

export default Register
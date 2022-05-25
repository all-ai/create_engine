import React, {useState} from "react"
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import QueryResult from "./QueryResponse";

export default () => {
    const [text, setText] = useState("")
    const [website, setWebsite] = useState("")
    const [waiting, setWaiting] = useState(false)
    const [result, setResult] = useState(null)
    const [type, setType] = useState("text")

    const updateType = (event) => {
        const {target: {value}} = event
        setType(value)
    }

    const updateText = (event) => {
        const {target: {value}} = event
        setText(value)
    }

    const updateWebsite = (event) => {
        const {target: {value}} = event
        setWebsite(value)
    }
    const submitText = () => {
        setWaiting(true)

        if(type === "text"){
            fetch("http://localhost:8000/create", {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type,
                    text,
                    website
                })
            })
                .then(resp => resp.json())
                .then(({success, payload}) => {
                    if (success) {
                        setResult(payload)
                    }
                })
                .catch(console.error)
                .finally(() => setWaiting(false))
        }
        else if(type === "image"){
            fetch("http://localhost:8000/create", {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type,
                    text,
                    website
                })
            })
                .then(resp => resp.json())
                .then(({success, payload}) => {
                    if (success) {
                        setResult(payload)
                    }
                })
                .catch(console.error)
                .finally(() => setWaiting(false))
        }



    }

    return <div style={{
        display: 'flex',
        justifyContent: "center",
        flexDirection: 'column',
    }}>


        <div style={{
            height: "3rem",
            display: 'flex',
            marginLeft: "12.5vw",
            width: "75vw"
        }}>
            <TextField value={text} onChange={updateText} id="outlined-basic" placeholder="What do you want to create?"
                       variant="outlined"/>
            <Button disabled={waiting} onClick={submitText} color="success" variant="contained">Submit</Button>

        </div>

        <div style={{
            height: "3rem",
            display: 'flex',
            marginTop:"2rem",
            marginLeft: "12.5vw",
            width: "75vw"
        }}>
            <TextField value={website} onChange={updateWebsite} id="outlined-basic" placeholder="Your website"
                       variant="outlined"/>
            <div style={{
                width:"12rem",
            }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Content type"
                    onChange={updateType}
                >
                    <MenuItem value={"text"}>Text</MenuItem>
                    <MenuItem value={"image"}>Image</MenuItem>
                    <MenuItem disabled value={"audio"}>Audio (WIP)</MenuItem>
                    <MenuItem disabled value={"video"}>Video (WIP)</MenuItem>
                </Select>
            </div>
        </div>


        <QueryResult {...result}/>
    </div>
}
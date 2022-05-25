import React from "react"
import InputBar from "./components/InputBar";


class App extends React.Component {


    render(){
        return <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"start",
            height:"100vh",
            width:"100vw"
        }}>
            <h1 style={{
                marginTop:"12.5vht",
                marginLeft:"12.5vw",
                fontSize:"4rem"
            }}>Create Something</h1>
            <div style={{
                display: 'flex',
                justifyContent:"center",
            }}>
                <InputBar/>
            </div>
        </div>
    }
}

export default App
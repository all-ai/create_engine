import React from "react"


const QueryResult = ({type = "", item = ""}) => {

    if (type === "text") {
        return <p>{item}</p>
    } else if (type === "") {
        return <img src={item}/>
    } else {
        return null
    }
}

export default QueryResult
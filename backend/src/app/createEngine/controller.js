const extractor = require('unfluff');
const axios = require('axios');
const {openAiRequest,fetchImage} = require("./repository");

const createTask = async (req, res) => {
    try{

    let {task = "",website,type="text"} = req.body

    const siteContent = await axios.get(website).then(response => {
        const data = extractor(response.data);
        return data.text
    })

    let prompt = siteContent + `\n${task}\n`
    let textResult = await openAiRequest(prompt)

    const resultSentences = textResult
        .trim()
        .split("\n")
        .filter(elem => elem !== "")

    if (type === "text") {
        return res.json({
            success:true,
            payload:{
                type,
                item:resultSentences.join("\n")
            }
        })
    }else if(type === "image"){
        const firstSentence = resultSentences[0]
        const blob = await fetchImage({
            firstSentence
        })
        return await blob.arrayBuffer().then((buf) => {
            res.set('content-type', 'image/png')
            res.send(Buffer.from(buf))
        })
    }else if(type === "video"){

    }else if(type === "audio"){

    }else{
        return res.json({
            success:false,
            payload:"Unknown type"
        })
    }

    }
    catch(err){
        console.error(err)
    }

    // TODO: Implement this
    // Fetch Open AI request.
    // If requires database return
    /*

    // TODO: Implement this
    // 1-) Fetch Open AI request.
    // 2-) If requires website crawling return

    {
        "success": true,
        "payload":{
            "type": "NEED_WEBSITE",
            "item": null
        }
    }
    // Search for session mechanism.
    // 3-) Get website from client.
    // 4-) Crawl website for
            * Logo
            * Motto
            * Description
            * Who are we, etc.
    // 5-) Append all data and fetch new Open AI request.
    // 6-) Return text material.

     */
}

module.exports = {
    createTask
}
const { Configuration, OpenAIApi } = require("openai");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const templateId = "vz9ByYbN2QnbRGXrwq"
const apiKey = "bb_pr_1d567a4b69a16beac3ff3b75dd81ea"

const fetchImage = async ({
    text=""
})  => {

    const data = {
        template:templateId,
        modifications:[
            {
                name:"image",
                image_url:"https://picsum.photos/1000/1000",
            },
            {
                name:"text",
                text
            }
        ]
    }

    // const imageRequestUrl = await fetch('https://api.bannerbear.com/v2/images', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type' : 'application/json',
    //         'Authorization' : `Bearer ${apiKey}`
    //     }
    // })
    //     .then(res => res.json())
    //     .then(res => res.self)
    //     .catch(console.error)
    const imageRequestUrl = "https://api.bannerbear.com/v2/images/VA54EW2ZqQrrG8m4QegGPNXJl\n"
    const fetchResults = await fetch(imageRequestUrl, {
        method: 'GET',
        headers: {
            'Content-Type' : "application/json",
            'Authorization' : `Bearer ${apiKey}`
        }
    }).then(res => res.json())

    const imageUrl = fetchResults.image_url_png

    return await fetch(imageUrl)
        .then(response => response.blob())
}

const openAiRequest = async (prompt) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion("text-babbage-001", {
        prompt,

        temperature: 0.7,
        max_tokens: 40,
        top_p: .7,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }).catch(console.error);
    return response.data.choices.map(item => item.text).join("")
}

module.exports = {
    openAiRequest,
    fetchImage
}

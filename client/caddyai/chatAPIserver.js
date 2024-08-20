const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const API_KEY = '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'

app.post('/completions', async(req, res) => {
    const options ={
        method: "POST",
        headers:{
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"     
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo-0301",
            messages: [{role:"user", content: "how are you"}],
            max_tokens: 100,
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error){
        console.log(error)
    }
})

console.log("trying to run open ai server")

app.listen(PORT, () => console.log('your openai server is running on port' + PORT ))


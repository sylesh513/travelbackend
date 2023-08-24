require("dotenv").config();
const OpenAi = require("openai");
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT;

app.post("/travel", async (req, res) => {
    const openai = new OpenAi({apikey: process.env.OPENAI_API_KEY, });
    const prompt = req.body.prompt;
    try{ 
    if (prompt==null){
        throw new Error("No prompt was provided :)");
    }
    const answer = await openai.chat.completions.create({
        messages: [{role: 'user', content: prompt}],
        model: 'gpt-3.5-turbo',
        max_tokens: 400,
        frequency_penalty: 0.6,
        
    });
    const info = answer.choices[0].message.content;
    return res.status(200).json({
        success: true,
        message: info,
    });
}
    catch (error){
        console.log(error.message);
    }
    //  console.log(answer.choices);

});
app.listen(port, () => console.log(`port number ${port}`));
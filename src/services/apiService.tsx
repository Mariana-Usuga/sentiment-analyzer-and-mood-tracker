import axios from 'axios';
const apiKey = process.env.OPENAI_API_KEY;
//const { Configuration, OpenAIApi } = require('openai');

const openAi = async (emojiMood: string, journalEntry: string) => {
  console.log('journal entry:', journalEntry, 'emoji:', emojiMood);
  /*const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      prompt: `me siento ${emojiMood} porque ${journalEntry}, has un diagnostico de mis sentimientos`,
      model: 'text-davinci-003',
      max_tokens: 50,
      n: 1,
      stop: '.',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
    },
  );
  console.log('response.data.choices[0].text ', response.data.choices[0].text);
  return response.data.choices[0].text;*/
};

export default openAi;

/*const client = axios.create({
    headers: {
      Authorization:
        'Bearer ' + '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',
    },
  });

  const params = {
    prompt: 'recomend me movies',
    model: 'text-davinci-003',
    max_tokens: 10,
    temperature: 0,
  };

  client
    .post('https://api.openai.com/v1/completions', params)
    .then(result => {
      console.log('Rsul', result.data.choices[0].text);
    })
    .catch(err => {
      console.log('err', err);
    });*/

/*const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + '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',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'dame una lista de deportes' }],
      //max_tokens: 5,
    }),
  });

  const data = await res.json();
  console.log('data ', data?.choices[0]?.messages);*/

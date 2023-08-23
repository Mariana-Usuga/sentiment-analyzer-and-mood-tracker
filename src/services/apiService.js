import axios from 'axios';

const s = {
  incredible: 'increible',
  fine: 'bien',
  neutral: 'neutral',
  sad: 'mal',
  awful: 'horrible',
};
const prompt = (emojiMood, journalEntry) => {
  if (emojiMood === 'incredible' && journalEntry) {
    console.log('1');
    return `Me siento ${s[emojiMood]} porque ${journalEntry}, haz un diagnostico de lo que te dije`;
  }
  if (emojiMood === 'incredible' && !journalEntry) {
    console.log('2');
    return `Me siento ${s[emojiMood]}, haz un diagnostico de mi sentimiento`;
  }
  if (emojiMood && !journalEntry) {
    console.log('3');
    return `Me siento ${s[emojiMood]}, haz un diagnostico de mi sentimiento
    y como puedo sentirme mejor`;
  }
  if (emojiMood && journalEntry) {
    console.log('4');
    return `Me siento ${s[emojiMood]} porque ${journalEntry}, 
  has un diagnostico de mis sentimientos y si es un sentimiento negativo que puedo hacer para sentirme mejor`;
  }
};

const openAi = async (emojiMood, journalEntry) => {
  console.log('journalEntry ', journalEntry);
  console.log('hola ', prompt(emojiMood, journalEntry));
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      prompt: prompt(emojiMood, journalEntry),
      model: 'text-davinci-003',
      max_tokens: 600,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
    },
  );
  return response.data.choices[0].text;
};

/*const createToken = user => {
  const SecretKey = 'miClaveSecreta';
  const payload = {
    uid: user.uid,
    displayName: user.displayName,
  };

  const options = {
    expiresIn: '1h',
  };

  const newToken = jwt.sign(payload, SecretKey, options);
  return newToken;
};*/

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
  console.log('data ', data?.choices[0]?.messages);
  
  
  PRIMERO=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
SEGUNDA=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
TERCERA=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
MIA=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

  
  */

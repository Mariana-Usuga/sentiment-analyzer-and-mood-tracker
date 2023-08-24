import axios from 'axios';
import CryptoJS from 'crypto-js';

const sentiments = {
  incredible: 'increible',
  fine: 'bien',
  neutral: 'neutral',
  sad: 'mal',
  awful: 'horrible',
};

const prompt = (emojiMood: string, journalEntry: string) => {
  if (emojiMood === 'incredible' && journalEntry) {
    console.log('1');
    return `Me siento ${sentiments[emojiMood]} porque ${journalEntry}, haz un diagnostico de lo que te dije 
    y dime si tiene relacion o sentido mi sentimiento y la razon si no tiene sentido dime un sentido 
    que este mas acorde `;
  }
  if (emojiMood === 'incredible' && !journalEntry) {
    console.log('2');
    return `Me siento ${sentiments[emojiMood]}, haz un diagnostico de mi sentimiento`;
  }
  if (emojiMood && !journalEntry) {
    console.log('3');
    return `Me siento ${
      sentiments[emojiMood as keyof typeof sentiments]
    }, haz un diagnostico de mi sentimiento
    y como puedo sentirme mejor`;
  }
  if (emojiMood && journalEntry) {
    console.log('4');
    return `Me siento ${
      sentiments[emojiMood as keyof typeof sentiments]
    } porque ${journalEntry}, 
  has un diagnostico de mis sentimientos y si es un sentimiento negativo que puedo hacer para sentirme mejor`;
  }
};

export const openAi = async (emojiMood: any, journalEntry: any) => {
  console.log('journalEntry ', process.env.REACT_APP_OPENAI_API_KEY);
  console.log('hola ', prompt(emojiMood, journalEntry));
  try {
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
  } catch (err) {
    console.log('ERROR ', err);
  }
};

export const observedTrends = async () => {
  console.log('journalEntry ', process.env.REACT_APP_OPENAI_API_KEY);
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        prompt: 'nose',
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
  } catch (err) {
    console.log('ERROR ', err);
  }
};

export const hashedCommentEncrypt = (comment: string) => {
  const secretKey = 'my-secret-key'; // Clave secreta para encriptar y desencriptar

  const encrypted = CryptoJS.AES.encrypt(comment, secretKey).toString();
  return encrypted;
};

export const hashedCommentDecrypt = (encryptedText: string) => {
  const secretKey = 'my-secret-key'; // Clave secreta para encriptar y desencriptar

  const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(
    CryptoJS.enc.Utf8,
  );
  return decrypted;
};

/*  
  PRIMERO=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
SEGUNDA=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
TERCERA=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
MIA=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

  
  */
import React from 'react';
import { StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ThemedText } from '@/components/ThemedText';

const genAI = new GoogleGenerativeAI('Gemini API Key');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const chat = model.startChat()

export default function HomeScreen() {
  const [text, setText] = React.useState('');
  const [inputText, setInputText] = React.useState('');

  const sendText = async () => {
    const result = await chat.sendMessageStream(inputText);
    let streamText = '';
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      streamText += chunkText;
      setText(streamText)
      console.log(streamText)
    }
  }

  return (
    <ScrollView>
      <ThemedText>{text}</ThemedText>
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Mesajınızı yazın"
      />
      <Button title='Send' onPress={sendText}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
});

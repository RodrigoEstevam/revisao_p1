import axios from 'axios';//bibli para fazer requisições HTTP,é um recurso javascript
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';

type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;

}

export default function App() {
  //Js sempre antes do return
  
  const [contador, setContador] = useState(0);//usadno o hookstate "useState"

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<Endereco|null>(null);//objeto dinamico Enderco OU nulo

  //excutar uma vez quando o compnente é montado e não pode ser assincroca, mas pode chamar uma kkkkk
  useEffect(()=>{
    carregarCEPInicial();

  }, []);

  //usadno axios
  async function carregarCEPInicial() {
    let resposta = axios.get(`https://viacep.com.br/ws/09390-500/json/`)
    let novoEndereco = (await resposta).data;
    setEndereco(novoEndereco)
    setCep(novoEndereco.cep)
  }

  function contar(){
    setContador(contador+1);
    console.log('Contador: ', contador);
  }


  //ussanoo felch
  async function pesquisarCEP() {
    let url = `https://viacep.com.br/ws/${cep}/json/`; //entre crases
    let resposta = await fetch(url);
    let enderecoNovo = await resposta.json(); //convertendo para json
    console.log('retorno da pesuisa: ', enderecoNovo);
    setEndereco(enderecoNovo)//url da API de CEP
  }
  
  return (
    <View style={styles.container}>
      <Text>Contando: {contador}</Text>
      <StatusBar style="auto" />
      <Button title='CONTAR' onPress={contar}></Button>
      <Image source={{uri: 'http://placeholder.co/150'}} style={{width: 150, height: 150}}/>
      <TextInput onChangeText={setCep} value={cep} ></TextInput>
      <Button title='Enviar CEP' onPress={pesquisarCEP}></Button>
      <View style={styles.card}>
        <Text>CEP: {cep}</Text>
        {endereco&&<View>
          <Text>Rua: {endereco.logradouro}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>Cidade: {endereco.localidade}</Text>
          <Text>Estado: {endereco.uf}</Text>
          </View>}
      </View>
    </View>
  );
}

//{endereco&& --- avalia se "endereco" existe e excuta a View sequente até a ultima chave"}"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    elevation: 5,
  },
});

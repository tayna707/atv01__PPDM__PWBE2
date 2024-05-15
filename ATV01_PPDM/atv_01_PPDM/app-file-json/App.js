import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [dados, setDados] = useState(null);

  const selecionarArquivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      console.log(resultado);

      if (resultado.canceled == true) {
        console.log('Busca de arquivo cancelada!');
        setDados(null);
        return;
      }

      const { assets: [{ mimeType, uri }], canceled } = resultado;
      console.log(mimeType);
      
      if (mimeType !== 'application/json') {
        Alert.alert('O arquivo selecionado não é do tipo JSON')
        setDados(null);

        return;
      }

      const conteudo = await FileSystem.readAsStringAsync(uri);
      const dadosJSON = JSON.parse(conteudo);

      setDados(dadosJSON);

    } catch (error) {
      console.error('Erro ao selecionar o arquivo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLargura}>
        <View style={styles.topo}>
          <Text style={styles.titleConteudo}>Leitura de arquivo JSON com React Native</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={selecionarArquivo}>
          <Text style={styles.buttonText}>Selecionar Arquivo</Text>
        </TouchableOpacity>
        {dados ? (
          <View>

            <Text>Dados do arquivo JSON:</Text>
            <Text>{JSON.stringify(dados)}</Text>         

          </View>
        ) : (
          <Text>Nenhum arquivo selecionado</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLargura: {
    width: '95%',
    justifyContent: 'center',
  },
  titleConteudo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    height: 45,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    color: '#4054F7',
    borderWidth: 1,
    borderColor: '#4D95F7',
    borderRadius: 8,
  },
  titleInfo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#4096F7',
    marginBottom: 1
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: 45,
    backgroundColor: "#4096F7",
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    marginTop: 25,
    marginBottom: 25
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  topo:{
    alignItems:'center',
    justifyContent:'center',
  }
});

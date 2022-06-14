
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image , TextInput , Keyboard , FlatList , ScrollView , SafeAreaView} from 'react-native';
import React , { useState , useEffect} from 'react';
import { Button , Input ,} from '@rneui/base';
import ImagedCardView from "react-native-imaged-card-view";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function SettingsScreen() {

  const [listQuote, setListQuote] = useState([]);

  const [number, onChangeNumber] = React.useState(null);

  const getInfiniteQuote = (num) => {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count='+num)
        .then(response => response.json())
        .then(data => {
          setListQuote(data);
          // console.log(data);
        })
  } 

  const nbrQuote = (num) => {

    if(num > 0)
    {
      getInfiniteQuote(num);
    }

  }

  // le style du séparateur
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 30,
          width: "100%",
          // backgroundColor: "",
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView  >
          
          <Text style={styles.TitrePrincipal}> {"\n"}{"\n"}Nombre de citation :{"\n"}</Text>
          
          <FlatList
            nestedScrollEnabled 
            data={listQuote}
            renderItem={({item}) => 
            
            <Text > 
              
              <ImagedCardView
                stars={0}
                reviews=" "
                ratings={0}
                title={item.character}
                rightSideValue=""
                subtitle={item.quote}
                leftSideValue=""
                backgroundColor="#ff6460"
                leftSideTitle=""
                rightSideTitle=""
                dividerColor="#ff6460"
                source={{
                  uri: item.image
                }}
              />{"\n"}</Text > 
            }
            keyExtractor={item => item.quote}
            ItemSeparatorComponent={ItemDivider}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            placeholder="Saisie du nombre de citation voulu"
            keyboardType="number-pad"
            // onPressOut={() => Keyboard.dismiss}
          />
          <Button 
            color="#ff6460" 
            title="Valider" 
            onPress={() => Keyboard.dismiss() + nbrQuote(number)}
          />
          
          <Text > {"\n"}{"\n"}{"\n"}</Text>
        <StatusBar style="auto" />
      </ScrollView  >
    </SafeAreaView >
  );
}

function HomeScreen() {


  const [nom, setNom] = useState(null);

  const [quote, setQuote] = useState(null);

  const [image, setImage] = useState(null);

  const [perso, onChangePerso] = React.useState(null);

  const [listNewPerso, setListNewPerso] = React.useState(null);

  const getCharacter = () => {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then(response => response.json())
        .then(data => {
          setNom(data[0].character);
          setQuote(data[0].quote);
          setImage(data[0].image);
          // console.log(data);
        })
  }

  

  const getPerso = (val) => {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=10&character='+val)
        .then(response => response.json())
        .then(data => {
          setListNewPerso(data);
          // console.log(data);
        })
  }

  

  const PersoChange = (val) => {

    if(val != "")
    {
      getPerso(val);
    }

  }

  

  // le style du séparateur
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 30,
          width: "100%",
          // backgroundColor: "",
        }}
      />
    );
  }

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView  >
      
        <Text >  {"\n"} {"\n"}</Text>
          <ImagedCardView
            stars={0}
            reviews=" "
            ratings={0}
            title={nom}
            rightSideValue=""
            subtitle={quote}
            leftSideValue=""
            backgroundColor="#ff6460"
            leftSideTitle=""
            rightSideTitle=""
            dividerColor="#ff6460"
            source={{
              uri: image
            }}
          />
          <Text > {"\n"}{"\n"}</Text>
          <Button 
            color="#ff6460" 
            title="Reload" 
            onPress={() => getCharacter()}
          />
          
          <Text style={styles.TitrePrincipal}> {"\n"}{"\n"}Citation d'un personnage en particulier :{"\n"}</Text>

          <FlatList
          nestedScrollEnabled 
            data={listNewPerso}
            renderItem={({item}) => 
            <Text >  {item.quote}{"\n"} </Text > 
            }
            keyExtractor={item => item.quote}
            ItemSeparatorComponent={ItemDivider}
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangePerso}
            placeholder="Saisie du personnage"
          />
          <Button 
            color="#ff6460" 
            title="Valider" 
            onPress={() => Keyboard.dismiss() + PersoChange(perso)}
          />
          <Text > {"\n"}{"\n"}{"\n"}</Text>
        <StatusBar style="auto" />
      </ScrollView  >
    </SafeAreaView >
      
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Personnage" component={HomeScreen} />
        <Tab.Screen name="Citaions aléatoire" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    // width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  TitrePrincipal: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});







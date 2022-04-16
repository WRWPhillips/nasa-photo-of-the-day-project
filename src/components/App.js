import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyle";
import { lightTheme, darkTheme } from "./Themes";

function CardGetter() {
  const [cardDetails, setCardDetails] = useState([])
  const [theme, setTheme] = useState('light');
  const [randomDay, setRandomDay] = useState('01-01-2021')

  const getRandom = () => {
    let year = (Math.floor(Math.random() * (2017 - 1995)) + 1995).toString();
    let month = (Math.floor(Math.random() * (13 - 1)) + 1).toString();
    let day = (Math.floor(Math.random() * (31 - 1)) + 1).toString();

    if (month.length === 1) {
      month = ('0' + month);
    }

    if (day.length === 1) {
      day = ('0' + day);
    }

    setRandomDay(`${year}-${month}-${day}`)

    axios.get(`https://api.nasa.gov/planetary/apod?date=${randomDay}&api_key=ak9UJZ9J4bKzbshagI9bwVLLpTTVmnpWmAZRXbRq`).then((response)=>{
      setCardDetails(response.data)
    })
  }

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }
  let url = 'https://api.nasa.gov/planetary/apod?api_key=ak9UJZ9J4bKzbshagI9bwVLLpTTVmnpWmAZRXbRq'
  useEffect(()=>{
    axios.get(url).then((response)=>{
      console.log(response.data)
      setCardDetails(response.data)
    })
  }, [])
  const Button = styled.button`
    display:inline-block;
    padding:0.35em 1.2em;
    border:0.2em solid ${props => props.theme.borderColor};
    margin:0 0.3em 0.3em 0;
    border-radius:0.15em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:300;
    color: ${props => props.theme.textColor};
    font-size: 1em;
    background-color: ${props => props.theme.backgroundColor};
    text-align:center;
    transition: all 0.2s;
    margin-bottom: 3%;
    &: hover {
      color: ${props => props.theme.backgroundColor};
      background-color: ${props => props.theme.textColor};
    }
  `
  const A = styled.a`
    display:inline-block;
    padding:0.35em 1.2em;
    border:0.2em solid ${props => props.theme.borderColor};
    margin:0 0.3em 0.3em 0;
    border-radius:0.15em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:300;
    color: ${props => props.theme.textColor};
    font-size: 1em;
    background-color: ${props => props.theme.backgroundColor};
    text-align:center;
    transition: all 0.2s;
    margin-bottom: 3%;
    &: hover {
      color: ${props => props.theme.backgroundColor};
      background-color: ${props => props.theme.textColor};
    }
  `

  const H1 = styled.h1`
    font-size: 3.5em;
    font-style: italic;
  `

  const Header = styled.div`
    border: .5em solid ${props => props.theme.borderColor};
    display: flex;
    flex-flow: column wrap;
    width: 80%;
    align-content: center;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5%;
    text-align: center;
  `
  const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
  `

  const PhotoCard = styled.div`
    display: flex;
    flex-flow: column wrap;
  `

  const TitleDate = styled.div`
    display: flex;
    flex-firection: row;
    justify-content: space-around;
  `

  const BigImg = styled.img`
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    border: .5em double ${props => props.theme.borderColor};
  `

  const H3 = styled.h3`
    font-size: 1.5em;
    margin-bottom: .5%;
  `

  const P = styled.p`
    width: 80;
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  `
  return (
  <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <>
      <GlobalStyles/>
        <div App>
          <Header className ='header'>
            <H1 className = 'title'>NASA Photo Of The Day</H1>
            <Nav>
              <Button className = 'home-Button'>Home</Button>
              <A className = 'contact-Button' target='_blank' href='https://www.linkedin.com/in/wrwphillips/'>Contact</A>
              <Button className = 'random-Button' onClick={getRandom}>Get Random</Button>
              <Button className = 'dark-mode-Button' onClick={themeToggler}>Dark Mode</Button>
            </Nav>
          </Header>
          <PhotoCard className ='photoCard'>
            <TitleDate className='titleDate'>
            <H3 className='photoCardTitle'>{cardDetails.title}</H3>
            <H3 className='photoCardDate'>{cardDetails.date}</H3>
            </TitleDate> 
            <BigImg className='photoCardImg' src={cardDetails.hdurl}></BigImg>
            <P classname='photoCardDescription'>{cardDetails.explanation}</P>
            <P className='photoCardCopyright'>{cardDetails.copyright}</P>   
          </PhotoCard>
        </div>
    </>
  </ThemeProvider>
  )
}
function App() {
  return (
    <div className="App">
      <CardGetter />
    </div>
    
  );
};

export default App;

import './App.css';
import React, {Component} from 'react';
import Letter from './Letter';
import Keyboard from './Keyboard';
import Counter from './Counter';


const WORDS = ['ORANGE','OIGNON','AVION','SALADE'];
const KEYBOARD = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

class App extends Component {

state = {
  letter: this.generateLetters(),
  keyboard: KEYBOARD,
  currentLetter: [],
  goodLetters: [],
  triedLetters: [],
}

generateLetters() {
  let result = []
  let candidates = WORDS[Math.floor(Math.random() * WORDS.length)]
  result = candidates.split('')
  return result
}

handleKeyboardClick = index => {
  let { letter, keyboard, goodLetters, triedLetters } = this.state
  let res = 0
  
  for ( let i = 0 ; i < letter.length ; i++ ) {
    if ( keyboard[index] === letter[i] ) {
      this.setState({ goodLetters: goodLetters.concat(keyboard[index]) })
      res++
    }
  }

  this.setState({ triedLetters: triedLetters.concat(keyboard[index]) })

  if ( res === 0 ) {
    this.incrementTry()
  }
}

restartGame() {
  let { goodLetters, triedLetters } = this.state

  this.setState({ goodLetters: goodLetters.fill() })
  this.setState({ triedLetters: triedLetters.fill() })
  this.setState({ letter: this.generateLetters() })
  this.counter.setState({ number: 1 })
}

incrementTry() {
  let number = this.counter.incrementNumber()

  if ( number === 0 ) {
    this.restartGame()
    document.getElementById('looseButton').style.visibility = 'visible'
    document.getElementById('keyboard').style.visibility = 'hidden'
    return true;
  }
  return false;
}

getFeedbakcForLetter(index) {
  let { letter, goodLetters } = this.state
  return goodLetters.includes(letter[index]) ? 'visible' : 'hidden'
}

getFeedbakcForKeyboardClicked(index) {
  let { triedLetters, keyboard } = this.state
  return triedLetters.includes(keyboard[index]) ? 'clicked' : 'visible'
}


handleButtonLooseClick() {
  document.getElementById('looseButton').style.visibility = 'hidden'
  document.getElementById('keyboard').style.visibility = 'visible'
  return
}

handleButtonVictoryClick() {
  document.getElementById('victoryButton').style.visibility = 'hidden'
  document.getElementById('keyboard').style.visibility = 'visible'
  this.restartGame()

}

allLetterVisible() {
  let { letter, goodLetters } = this.state
  let totalLetter = 0

  for ( let i = 0 ; i < letter.length ; i++ ) {
    let res = 0
    for ( let j = 0 ; j < goodLetters.length ; j++ ) {
      if ( letter[i] === goodLetters[j] ) {
        res++
      }
    }

    if ( res !== 0 ) {
      totalLetter++
    }
  }

  if ( totalLetter >= letter.length ) {
    document.getElementById('keyboard').style.visibility = 'hidden'
    document.getElementById('victoryButton').style.visibility = 'visible'
  }
}


handleKeyPress = (event) => {
  let { goodLetters, letter, keyboard, triedLetters } = this.state
  let counter = 0
  let res = event.key.toUpperCase()
  let otherKey = 0

  for ( let i = 0 ; i < keyboard.length ; i++ ) {
    if ( keyboard[i] === res ) {
      this.setState({ triedLetters: triedLetters.concat(res) })
      otherKey++
    }
  }

  if ( document.getElementById('looseButton').style.visibility === 'visible' ) {
    if ( event.key === "Enter" ) {
      this.handleButtonLooseClick()
    }
  }

  if ( document.getElementById('victoryButton').style.visibility === 'visible' ) {
    if ( event.key === "Enter" ) {
      this.handleButtonVictoryClick()
    }
  }

  else {
    if ( otherKey !== 0 ) {
      for ( let i = 0 ; i < letter.length ; i++ ) {
        if ( res === letter[i] ) {
          this.setState({ goodLetters: goodLetters.concat(res) })
          counter++
        }
      }
    
      if ( counter === 0 ) {
        this.incrementTry();
      }
    }
  }
}

componentDidMount() {
  this.focusPrincipal();
}
componentDidUpdate() {
  this.allLetterVisible()
  if(this.state.active)
    this.focusPrincipal();
}

focusPrincipal() {
  document.getElementById('1').focus()
}


  render() {

    const { letter, keyboard } = this.state
    return (
      
      <div className="Pendu" id='1' ref="divPrincipale" tabIndex="0" onKeyPress={ (event) => this.handleKeyPress(event) }>

        {letter.map((letter, index) => (
          <Letter
            letter={letter}
            feedback={this.getFeedbakcForLetter(index)}
            index={index}
            key={index}
          />
        ))}
        <div className="KeyboardPendu" id="keyboard">
        {keyboard.map((keyboard, index) => (
            <Keyboard
              keyboard={keyboard}
              feedback={this.getFeedbakcForKeyboardClicked(index)}
              index={index}
              key={index}
              onClick={this.handleKeyboardClick}
            />
            ))}
        </div>

        <button className="Loose" id='looseButton' onClick={ (e) => this.handleButtonLooseClick(e) } >
          Try Again ! 
        </button>
        
        <button className="Victory" id='victoryButton' onClick={ (e) => this.handleButtonVictoryClick(e) } >
          You Win ! 
        </button>

        <Counter ref={ref => (this.counter = ref )}/>

      </div>

      )
  }
}

export default App;

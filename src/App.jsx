import React, { useState } from 'react';

const flashcards = [
  { id: 1, word: "Hello", translation: "Hola" },
  { id: 2, word: "Goodbye", translation: "Adiós" },
  { id: 3, word: "Please", translation: "Por favor" },
  { id: 4, word: "Thank you", translation: "Gracias" },
  { id: 5, word: "Yes", translation: "Sí" },
];

const Button = ({ onClick, disabled, children }) => (
  <button className="flashcard-button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="flashcard-card">
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder }) => (
  <input
    className="flashcard-input"
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const currentCard = flashcards[currentCardIndex];

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      resetCard();
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      resetCard();
    }
  };

  const handleFlip = () => {
    setShowTranslation(!showTranslation);
  };

  const handleGuessChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmitGuess = () => {
    const correct = userGuess.toLowerCase() === currentCard.translation.toLowerCase();
    setIsCorrect(correct);
    setShowTranslation(true);
  };

  const resetCard = () => {
    setShowTranslation(false);
    setUserGuess('');
    setIsCorrect(null);
  };

  return (
    <div className="flashcard-container">
      <Card>
        <h1 className="flashcard-header">Spanish Flashcards</h1>
        <div className="flashcard-content">
          <h2 className="flashcard-word">
            {showTranslation ? currentCard.translation : currentCard.word}
          </h2>
          <p className="flashcard-language">
            {showTranslation ? "Spanish" : "English"}
          </p>
          {!showTranslation && (
            <div className="flashcard-guess-container">
              <Input
                value={userGuess}
                onChange={handleGuessChange}
                placeholder="Enter your guess"
              />
              <Button onClick={handleSubmitGuess}>
                Submit Guess
              </Button>
            </div>
          )}
          {isCorrect !== null && (
            <div className={`flashcard-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect, try again!'}
            </div>
          )}
        </div>
        <div className="flashcard-footer">
          <Button onClick={handlePrevious} disabled={currentCardIndex === 0}>
            Previous
          </Button>
          <Button onClick={handleFlip}>
            {showTranslation ? "Hide Translation" : "Show Translation"}
          </Button>
          <Button onClick={handleNext} disabled={currentCardIndex === flashcards.length - 1}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default App;
document.addEventListener('DOMContentLoaded', function() {
    const playerName = prompt("Please enter your name:");
    const name = playerName ? playerName : "Player";

    const welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = `Welcome, ${name}!`;
    document.body.insertBefore(welcomeMessage, document.getElementById('choices'));

    let roundsWonUser = 0;
    let roundsWonComputer = 0;
    let currentRound = 0;

    const roundsWonDisplay = document.createElement('p');
    document.body.insertBefore(roundsWonDisplay, document.getElementById('result'));

    function computerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(player, computer) {
        if (player === computer) {
            return 'It\'s a tie!';
        } else if ((player === 'rock' && computer === 'scissors') ||
                   (player === 'paper' && computer === 'rock') ||
                   (player === 'scissors' && computer === 'paper')) {
            roundsWonUser++;
            return 'You win!';
        } else {
            roundsWonComputer++;
            return 'You lose!';
        }
    }

    function updateRoundsDisplay() {
        roundsWonDisplay.textContent = `Rounds Won - ${name}: ${roundsWonUser}, Computer: ${roundsWonComputer}`;
    }

    function playerChoice(player) {
        if (currentRound < 5) {
            const computer = computerChoice();
            const result = determineWinner(player, computer);
            const resultElement = document.getElementById('result');
            resultElement.textContent = `You chose ${player}. Computer chose ${computer}. ${result}`;

            updateRoundsDisplay();

            currentRound++;
            if (currentRound === 5) {
                endGame();
            }
        }
    }

    function endGame() {
        const endGameMessage = document.createElement('p');
        endGameMessage.textContent = `Game Over! Total Rounds Won - ${name}: ${roundsWonUser}, Computer: ${roundsWonComputer}`;
        document.body.appendChild(endGameMessage);

        let overallResultMessage;
        if (roundsWonUser > roundsWonComputer) {
            overallResultMessage = `${name} is the overall winner!`;
        } else if (roundsWonUser < roundsWonComputer) {
            overallResultMessage = 'Computer is the overall winner!';
        } else {
            overallResultMessage = 'It\'s a tie overall!';
        }

        const overallResultElement = document.createElement('p');
        overallResultElement.textContent = overallResultMessage;
        document.body.appendChild(overallResultElement);

        const randomMessages = [
            'Congratulations! Well played!',
            'Better luck next time. Keep practicing!',
            'Nice try! You gave it your best shot.',
            'You\'re a Rock, Paper, Scissors master!',
            'It happens. Don\'t give up!'
        ];

        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        const randomMessageElement = document.createElement('p');
        randomMessageElement.textContent = randomMessage;
        document.body.appendChild(randomMessageElement);

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Game';
        resetButton.addEventListener('click', resetGame);
        document.body.appendChild(resetButton);
    }
        // Resets Game
    function resetGame() {
        currentRound = 0;
        roundsWonUser = 0;
        roundsWonComputer = 0;
   
        document.getElementById('result').textContent = '';
        document.querySelector('p:last-of-type').remove(); // Remove endGameMessage
        document.querySelector('p:last-of-type').remove(); // Remove overallResultElement
        document.querySelector('p:last-of-type').remove(); // Remove randomMessageElement
        document.querySelector('button:last-of-type').remove(); // Remove resetButton
   
       
   
        // Recreate and append Rock, Paper, Scissors buttons
        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML = '';
   
       
   
        choicesDiv.appendChild(rockButton);
        choicesDiv.appendChild(paperButton);
        choicesDiv.appendChild(scissorsButton);
   
        // Update rounds won display
        updateRoundsDisplay();
    }

    const rockButton = document.querySelector('#choices button:nth-child(1)');
    rockButton.addEventListener('click', function() {
        playerChoice('rock');
    });

    const paperButton = document.querySelector('#choices button:nth-child(2)');
    paperButton.addEventListener('click', function() {
        playerChoice('paper');
    });

    const scissorsButton = document.querySelector('#choices button:nth-child(3)');
    scissorsButton.addEventListener('click', function() {
        playerChoice('scissors');
    });
});


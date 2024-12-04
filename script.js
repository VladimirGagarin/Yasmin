document.addEventListener('DOMContentLoaded', function () {
    const IntroDiv = document.querySelector('.intro-div');
    const greetingText = document.querySelector('.greeting h2');
    const greetingQuote = document.querySelector('.greeting p');
    const ProceedBtn = document.querySelectorAll('.greeting .buttons button')[0];
    const ChatBtn = document.querySelectorAll('.greeting .buttons button')[1];
    const QuoteReaderBtn = document.querySelectorAll('.greeting .buttons button')[2];
    const leeterDiv = document.querySelector('.letter-div');
    const dateArena = document.querySelector('.letter-content .right-corner .date-Div p');
    const letterFooter = document.querySelector('.letter-footer');
    const letterDiv = document.querySelector('.letter-text');
    const chatDiv = document.querySelector('.chat-div');
    const ChatContainer = document.querySelector('.chat-area');
    const suggestionContainer = document.querySelector('.suggestion-replies ul');
    const InputPassCode = document.getElementById('password');
    const authOverLay = document.querySelector('.auth-overlay');
    const authContent = document.querySelector('.auth-content');
    const password = "My Angel"; // Original password for comparison
    const day = new Date();
    const hour = day.getHours();
    const Reader = new Audio("letter.mp3");
    const senderTone =  new Audio("sender.mp3");
    const receiverTone = new Audio("receiver.mp3");
    const vibrate = new Audio("vib.mp3");

    let currentQuoteReader = null;
    let currentMedia = null;
    let currentAudioPlayer = null; // Global variable to store the currently playing audio
    let isReadingletter = false;
    let isPlaying = false;
    let quoteInterval;
    let Index = 0; // Use let instead of const
    let currentQuestionIndex = 0;
    let attempt = 0;
    let currentQgameIndex = 0;
    let interval;

    const gText =  hour < 12 ? "Good Morning Yasmin"  : (hour >= 12 && hour < 16 ? "Good Afternoon Yasmin" : "Good Evening Yasmin")
    greetingText.textContent = gText;
    dateArena.textContent = day.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }) + " ,";

    const friendsQuote = [
        {text:"Yasmin, you’re not just a friend; you’re the piece of my soul I never knew was missing.", audio: "qr1.mp3"},
        {text:"With you, Yasmin, every moment feels like a treasure, as though the universe created friendship just to bring us closer.", audio:"qr2.mp3"},
        {text:"You’re not just my friend, Yasmin—you’re the melody my heart hums even in its quietest moments.", audio:"qr3.mp3"},
        {text:"Every path feels brighter, every sky feels clearer, and every dream feels possible when I walk beside you, Yasmin.", audio:"qr4.mp3"},
        {text:"Yasmin, you're the thread that weaves joy into my life.", audio: "qr5.mp3"}, 
        {text:"With you, Yasmin, every moment is a cherished memory.", audio: "qr6.mp3"}, 
        {text:"Yasmin, our friendship is the beautiful melody in my heart.", audio: "qr7.mp3"}, 
        {text:"Life is brighter and more beautiful with you in it, Yasmin.", audio: "qr8.mp3"}, 
        {text:"Yasmin, you make my world a better place, just by being you.", audio: "qr9.mp3"},
        {text:"Yasmin, your laughter is the sunrise that warms my day, and your presence is the calm moonlight that soothes my soul.", audio: "qr10.mp3"}

    ];

    const Questions = [
        {
            question: "What's my favorite color?",
            options: ['Red', 'Green','Yellow', 'Purple', 'Blue', 'Orange', 'Pink', 'Brown', 'Black', 'White'],
            correctAnswer: 'Blue'
        },
        {
            question: "What's my favorite number?",
            options: ['1', '5', '7', '10', '3', '8', '2', '4', '6', '9'],
            correctAnswer: '10'
        },
        {
            question: "What's my favorite food?",
            options: ['Pizza', 'Spaghetti', 'Pilau', 'Chapati', 'Rice', 'Pasta', 'Nyama Choma', 'Ugali + Sukuma', 'Githeri', 'Mandazi'],
            correctAnswer: 'Spaghetti'
        },
        {
            question: "What's my dream country?",
            options: ['Kenya', 'Tanzania', 'India', 'Japan', 'USA', 'Germany', 'France', 'Brazil', 'Italy', 'Spain', 'United Kingdom', 'Netherlands'],
            correctAnswer: 'India'
        },
        {
            question: "What's my favorite drink?",
            options: ['Coffee', 'Tea', 'Orange Juice', 'Water', 'Soda', 'Lemonade', 'Milk', 'Hot Chocolate', 'Iced Tea', 'Smoothie'],
            correctAnswer: 'Orange Juice'
        },
        {
            question: "What's my favorite fruit?",
            options: ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple', 'Strawberry'],
            correctAnswer: 'Orange'
        },
        {
            question: "When is my birthday?",
            options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            correctAnswer: 'May'
        },
        {
            question: "What’s my ideal romantic date?",
            options: [
                'Dinner by the beach',
                'A cozy night in',
                'A movie marathon',
                'A walk in the park',
                'A road trip',
                'Stargazing under the stars',
                'Cooking dinner together',
                'A sunset picnic'
            ],
            correctAnswer: 'Stargazing under the stars'
        },                
        {
            question: "Which song you think remind me of my ex?",
            options: [
                'Mama by Jay Melody', 'Pachini by Kevin Bahati', 
                'Tenda Wema by Willy Paul', 
                'Breakup by ADHM (Ranbir)',
                'Nashville by Otile Brown (Kenya)', 
                'Sina Neno by Bahati (Kenya)', 
                'Wangu by Nyashinski (Kenya)', 
                'Zawadi by Nadia Mukami (Kenya)', 
                'Tujhe Kitna Chahne Lage by Arijit Singh (India)', 
                'Channa Mereya by Arijit Singh (India)', 
                'Agar Tum Saath Ho by Alka Yagnik & Arijit Singh (India)', 
                'Kabira by Arijit Singh (India)',
            ],

            correctAnswer: 'Breakup by ADHM (Ranbir)',
            media:"hsong.mp3"
        },
        {
            question: "What’s my favorite love quote?",
           options: [
                'Love never fails.',
                'Love is the only reality.',
                'You had me at hello.',
                'Love is kind.',
                'Love conquers all.',
                'True love is eternal.',
                'Where there is love, there is life.',
                'Love makes the world go round.'
            ],
            correctAnswer: 'Love is kind.',
            media:"love.mp3",
            text: "Love is an ethereal caress, a celestial balm that heals unseen wounds, a perpetual blessing flowing with gentle grace."
        },        
        {
            question: "If I could have one superpower, what would it be?",
            options: [
                'Flying',
                'Reading minds',
                'Super strength',
                'Time travel',
                'Invisibility',
                'Telekinesis',
                'Shape-shifting',
                'Healing powers'
            ],
            correctAnswer: 'Flying',
            media: "fly.mp3"
        },        
        {
            question: "What’s the most romantic thing I could do for you?",
            options: [
                'Hug you forever',
                'Love gifts',
                'Candlelight dinner',
                'Plan a stargazing night',
                'Write you a heartfelt letter',
                'Cook your favorite meal',
                'Surprise you with a weekend getaway',
                'Create a personalized playlist just for you'
            ],
            correctAnswer: 'Love gifts',
            media: "gift.mp3",
            text: "Love’s gifts are whispers of the heart, wrapped in velvet of  devotion, like stars that light the darkened path between two souls. They are timeless tokens, delicate as rose petals, painting a masterpiece on the canvas of affection."
        },
        {
            question: "Which romantic movie could be our love story?",
            options: [
                'The Notebook',
                'Titanic',
                'La La Land',
                'The Fault in Our Stars',
                'A Walk to Remember',
                'Pride and Prejudice',
                'The Vow',
                'When Harry Met Sally'
            ],
            correctAnswer: 'The Notebook'
        },
        {
            question: "What’s the romantic song I like to listen to?", 
            options: [
                'Tetema by Rayvanny',
                'Jeje by Diamond Platnumz',
                'Atarudi by Harmonize',
                'Sukari by Zuchu',
                'Nakupenda by Jay Melody',
                'Waah by Diamond Platnumz ft. Koffi Olomide',
                'Number One by Rayvanny ft. Zuchu',
                'Moyo by Jay Melody ft. Beka Flavour',
                'Kata by Vanessa Mdee ft. Reekado Banks',
                'Bado by Sauti Soul ft. Alikiba',
                'Upo by Marioo',
                'Nashindwa by Barakah Da Prince ft. Mbosso'
            ],
            correctAnswer: 'Nakupenda by Jay Melody',
            media: 'jay_melody_nakupenda.mp3'
        },
        {
            question: "Which artist do I find most romantic?",
            options: [
                'Jay Melody', 
                'Kevin Bahati', 
                'Willy Paul', 
                'Diamond Platnumz', 
                'Harmonize', 
                'Rayvanny', 
                'Sauti Soul', 
                'Zuchu'
            ],
            correctAnswer: 'Jay Melody'
        },
        {
            question: "If I were to write a song for you, what would it be titled?",
            options: [
                'Whispers of Forever',
                'Echoes of a Forgotten Love',
                'In the Arms of Time',
                'The Heart’s Silent Promise',
                'Dancing in the Moonlight',
                'Unwritten Pages of Us',
                'A Symphony of You and Me',
                'When Stars Collide'
            ],
            correctAnswer: 'A Symphony of You and Me'
        },
        {
            question: "What’s a love song I can sing for you?",
            options: [
                'I Will Always Love You by Whitney Houston',
                'Thinking Out Loud by Ed Sheeran',
                'My Heart Will Go On by Celine Dion',
                'Make You Feel My Love by Adele',
                'Endless Love by Lionel Richie',
                'Can’t Help Falling in Love by Elvis Presley',
                'You Are the Reason by Calum Scott'
            ],
            correctAnswer: 'Endless Love by Lionel Richie',
            media: 'endless_love_lionel_richie.mp3'
        },
        {
            question: "Which song makes me feel sad?",
            options: [
                'You Broke Me First by Tate McRae',  
                'See You Again by Charlie Puth', 
                'Goodbye\'s the Saddest Word by Celine Dion',
                'Someone Like You by Adele',
                'Immortality by Celine Dion',
                'The Night We Met by Lord Huron',
                'I Will Always Love You by Whitney Houston',
                'Hurt by Christina Aguilera'
            ],
            correctAnswer: 'Immortality by Celine Dion',
            media: 'immortality_celine_dion.mp3'
        },
        {
            question: "Which song makes me feel romantic?",
            options: [
                'Tum Hi Ho by Arijit Singh', 
                'Pehla Nasha by Udit Narayan', 
                'Tu Hai by A.R. Rahman & Sanah Moidutty',
                'Raabta by Arijit Singh', 
                'Jeene Laga Hoon by Atif Aslam', 
                'Tum Jo Aaye by Rahat Fateh Ali Khan', 
                'Tum Mile by Neeraj Shridhar'
            ],
            correctAnswer: 'Tu Hai by A.R. Rahman & Sanah Moidutty',
            media: 'tu_hai_ar_rahman_sanah_moidutty.mp3'
        },
        {
            question: "What song reminds me of you?",
            options: [
                'Perfect by Ed Sheeran', 
                'Just the Way You Are by Bruno Mars', 
                'I Will Always Love You by Whitney Houston', 
                'All of Me by John Legend', 
                'A Thousand Years by Christina Perri',
                'You’re Still the One by Shania Twain', 
                'From This Moment On by Shania Twain', 
                'Only Time by Enya'
            ],
            correctAnswer: 'A Thousand Years by Christina Perri',
            media: 'perri.mp3'
        },
        {
            question: "If I could write you a love letter, what would it say?",
            options: [
                'I love you with all my heart, forever and always.',
                'You are my world, and I’m grateful for you every day.',
                'Every moment with you feels like a beautiful dream come true.',
                'You complete me, and I cherish every second we share.',
                'You’re my happiness, and I will always choose you.'
            ],
            correctAnswer: 'You’re my happiness, and I will always choose you.',
            media: 'love_letter.mp3',
            text: "My Dearest Angel Yasmin, From the serendipitous moment our souls intertwined, my existence has been suffused with boundless euphoria. You are my luminescence, my solace, and the ineffable harmony to my being. In this vast cosmos of myriad possibilities, I shall unfalteringly choose you, time and again, without hesitation. Your love has etched its permanence into the very marrow of my heart, a sanctuary I revere with every beat. Through the vicissitudes of life’s odyssey, know this unwavering truth: my love for you transcends the bounds of eternity. Forever yours.  "
        },        
        {
            question: "If I could gift you one thing that shows my love, what would it be?",
            options: [
                'A personalized necklace with our initials',
                'A handwritten letter expressing my feelings',
                'A surprise romantic weekend getaway',
                'A custom piece of art representing our love',
                'A special song written just for you'
            ],
            correctAnswer: 'A personalized necklace with our initials',
        }
        
    ];

    
    InputPassCode.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            const passwordEnter = InputPassCode.value.trim().replace(/\s+/g, " ").toLowerCase();
            const matchedPasscode = password.trim().replace(/\s+/g, " ").toLowerCase();
    
            if (passwordEnter === matchedPasscode) {
                authOverLay.style.display = "none";
                InputPassCode.value = '';
            } else {
                // Vibrate effect for wrong password
                vibrate.play();
                authContent.classList.add("vibrate");
                setTimeout(() => {
                    authContent.classList.remove("vibrate");
                    InputPassCode.value = '';
                }, 1000); // Match vibration animation duration
            }
        }
    });
    
     

    // Function to generate quotes
    const generateFriendsQuote = function () {
        clearInterval(quoteInterval);
        Index = 0;
        greetingQuote.textContent = friendsQuote[Index].text;

        quoteInterval = setInterval(function () {
            // Only move to the next quote if no audio is playing
            if (!currentQuoteReader || currentQuoteReader.paused) {
                Index = (Index + 1) % friendsQuote.length; // Update Index
                greetingQuote.textContent = friendsQuote[Index].text;
            }
        }, 15000); 
    };
    
    // You can call it anywhere in your code
    generateFriendsQuote();
    
    

    ProceedBtn.onclick = function () {
        IntroDiv.style.display = "none";
        leeterDiv.style.display = "block";
        clearInterval(quoteInterval);
        if(!currentQuoteReader.paused){
            currentQuoteReader.pause();
        }
    }

    // Button click logic for playing audio
    QuoteReaderBtn.onclick = function () {
        if (currentQuoteReader && !currentQuoteReader.paused) {
            currentQuoteReader.pause();
            currentQuoteReader = null;
        }

        currentQuoteReader = new Audio(friendsQuote[Index].audio);
        currentQuoteReader.play();
        QuoteReaderBtn.innerHTML = "&#128266;"; // Volume icon
        QuoteReaderBtn.disabled = true;

        currentQuoteReader.onended = function () {
            QuoteReaderBtn.innerHTML = "&#128263;"; // Muted volume icon
            QuoteReaderBtn.disabled = false;
            currentQuoteReader = null; // Reset audio instance after finishing
        };
    };

    ChatBtn.onclick = function () {
        clearInterval(quoteInterval);
        IntroDiv.style.display = "none";
        chatDiv.style.display = "block";
        Reader.pause();
    
        const messages = [
            { text: "Hello Yasmin", action: () => displaygreetings(`Hello ${gText} , My Angel`) },
            { text: "Yasmin, I want to tell you more about me", action: () => displaygreetings("Yasmin, I want to tell you more about me") },
            { text: "Are you ready Yasmin?", action: () => displaygreetings("Are you ready Yasmin?") },
            { text: "fetchQuestions", action: () => fetchAndDisplayQuestions(currentQuestionIndex) }
        ];
    
        let currentIndex = 0;
    
        interval = setInterval(() => {
            if (currentIndex < messages.length) {
                messages[currentIndex].action(); // Execute the associated action
                currentIndex++;
            } else {
                clearInterval(interval); // Stop the interval when all messages are processed
            }
        }, 4000); // Delay of 4 seconds between each message
    };
    
    document.querySelector('.close-chat').onclick = function () {
        clearInterval(interval);
        IntroDiv.style.display = "flex";
        chatDiv.style.display = "none";
        if(currentMedia && !currentMedia.paused) {
            currentMedia.pause();
            currentMedia.currentTime = 0;
        }

        if(currentAudioPlayer && !currentAudioPlayer.paused) {
            currentAudioPlayer.audio.pause();
            currentAudioPlayer.audio.currentTime = 0;
        }

        ChatContainer.innerHTML = '';
        suggestionContainer.innerHTML = '';
        suggestionContainer.scrollTo({
            left: 0,
            behavior: 'smooth'  // Adds a smooth scrolling effect
        });

        generateFriendsQuote();
    }

    letterDiv.addEventListener('scroll', function () {
        const scrollTop = letterDiv.scrollTop; // How much is scrolled
        const scrollHeight = letterDiv.scrollHeight - letterDiv.clientHeight; // Total scrollable height
        const scrollPercent = (scrollTop / scrollHeight) * 100; // Calculate percentage scrolled
    
        if (scrollPercent >= 95) {
            letterFooter.classList.add("view");
        } else {
            letterFooter.classList.remove("view");
        }
    });

    document.querySelector('.letter-div .read-btn').onclick = function () {
        isReadingletter = !isReadingletter;
        this.innerHTML = isReadingletter ? "&#10074;&#10074;": "&#9654;"
        this.style.backgroundColor = isReadingletter ? "#0056b3" : "#8a5a3e";

        if(isReadingletter) {
            Reader.play();
        }
        else {
            Reader.pause();
        }

        Reader.onended = function () {
            isReadingletter = false;
            Reader.currentTime = 0;
            document.querySelector('.letter-div .read-btn').innerHTML = "&#9654;";
            document.querySelector('.letter-div .read-btn').style.backgroundColor = "#b87e55";
        }

        if (Reader.currentTime < Reader.duration / 4) {
            letterDiv.scrollTop = 0; // First quarter
        } else if (Reader.currentTime < Reader.duration / 2) {
            letterDiv.scrollTop = letterDiv.scrollHeight / 4; // Halfway
        } else if (Reader.currentTime < (3 * Reader.duration) / 4) {
            letterDiv.scrollTop = letterDiv.scrollHeight / 2; // Three-quarters
        } else {
            letterDiv.scrollTop = letterDiv.scrollHeight; // End
        }
        
    }

    document.querySelector('.letter-div .close-btn').onclick = function () {
        IntroDiv.style.display = "flex";
        leeterDiv.style.display = "none";
        generateFriendsQuote();

        if(!Reader.paused && isReadingletter){
            Reader.pause();
            Reader.currentTime = 0;
            isReadingletter = false;
            document.querySelector('.letter-div .read-btn').innerHTML = "&#9654;";
            document.querySelector('.letter-div .read-btn').style.backgroundColor = "#b87e55";
        }
    }

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            authOverLay.style.display = "flex";

            if(currentQuoteReader && !currentQuoteReader.paused) {
                currentQuoteReader.pause();
                QuoteReaderBtn.innerHTML = "&#128263;";
            }

            if(!Reader.paused) {
                Reader.pause();
                isReadingletter = false;
                document.querySelector('.letter-div .read-btn').innerHTML = "&#9654;";
                document.querySelector('.letter-div .read-btn').style.backgroundColor = "#b87e55";
            }

            if(currentMedia && !currentMedia.paused) {
                currentMedia.pause();
                document.querySelectorAll('.audio-player-container button').forEach(btn => {btn.innerHTML = "&#9654;"});
                isPlaying = false;
            }

            if(currentAudioPlayer.audio && !currentAudioPlayer.audio.paused) {
                currentAudioPlayer.audio.pause();
                document.querySelectorAll('.audio-player-container button').forEach(btn => {btn.innerHTML = "&#9654;"});
            }

           
            // Pause music, animation, etc.
        } else if (document.visibilityState === 'visible') {
            
            
        }
    });

   

    
    // Fetch and display questions based on the index
    function fetchAndDisplayQuestions(index) {
        if (index < Questions.length) {
            const currentQuestion = Questions[index];
            displayquestionAndOptions(currentQuestion.question, currentQuestion.options, currentQuestion.correctAnswer, currentQuestion.media, currentQuestion.text);
        } else {

            const responseBubble = document.createElement("div");
            responseBubble.classList.add('chat-message', 'received');
            const chatBubble = document.createElement("div");
            chatBubble.classList.add('chat-bubble');
            chatBubble.textContent = "No more questions! Naweza Kuonyesha kitu...!";

            responseBubble.appendChild(chatBubble);
            ChatContainer.appendChild(responseBubble);
            currentQuestionIndex = 0;
            suggestionContainer.innerHTML = ''
    
            // Here, you can reset the game or introduce a new game
            introduceNewGame();
        }
    }
    
    function introduceNewGame() {
        // Example: Display a message that a new game is starting
        const ChatContainer = document.querySelector('.chat-area');
        const responseBubble = document.createElement("div");
        responseBubble.classList.add('chat-message', 'received');
        const chatBubble = document.createElement("div");
        chatBubble.classList.add('chat-bubble');
        chatBubble.textContent = "Choose song moja  nkuimbie!";
        responseBubble.appendChild(chatBubble);
        ChatContainer.appendChild(responseBubble);
    
       if(currentMedia && !currentMedia.paused) {
        currentMedia.pause();
        currentMedia.playIcon.innerHTML = "&#9654;"; 
       }

       displayNewGameTactics();
    }
    

    function displaygreetings(message){
        const ChatContainer = document.querySelector('.chat-area');

        // Create message bubble for the question
        const messageBubble = document.createElement("div");
        messageBubble.classList.add('chat-message', 'received');

        const chatBubble = document.createElement("div");
        chatBubble.classList.add('chat-bubble');

        senderTone.play();
        chatBubble.textContent = message;
        messageBubble.appendChild(chatBubble);
        ChatContainer.appendChild(messageBubble);
    }

    

    // Display the question and its options
    function displayquestionAndOptions(question, arrOptions, correctAnswer, media, text) {
        // Create message bubble for the question
        const messageBubble = document.createElement("div");
        messageBubble.classList.add('chat-message', 'received');

        const chatBubble = document.createElement("div");
        chatBubble.classList.add('chat-bubble');

        senderTone.play();
        chatBubble.textContent = "Guess! " + question;
        messageBubble.appendChild(chatBubble);
        ChatContainer.appendChild(messageBubble);

        ChatContainer.scrollTop = ChatContainer.scrollHeight;

        // Clear previous options
        suggestionContainer.innerHTML = '';
        suggestionContainer.scrollTo({
            left: 0,
            behavior: 'smooth'  // Adds a smooth scrolling effect
        });

        // Create options for the question
        arrOptions.forEach(opt => {
            const optLi = document.createElement('li');
            optLi.textContent = opt;
            optLi.addEventListener('click', function() {
                const messageBubble = document.createElement("div");
                messageBubble.classList.add('chat-message', 'sent');
                const chatBubble = document.createElement("div");

                chatBubble.classList.add('chat-bubble');
                receiverTone.play();
            
                chatBubble.textContent = opt;
                messageBubble.appendChild(chatBubble);
                ChatContainer.appendChild(messageBubble);
                // Scroll chat container to the bottom
                chatBubble.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                ChatContainer.scrollTo({
                    top: ChatContainer.scrollHeight,
                    behavior: 'smooth'
                });

                checkAnswer(opt, correctAnswer, media, text);
                suggestionContainer.querySelectorAll('li').forEach(li => {
                    li.classList.add("disabled");
                    setTimeout(function() {
                        li.classList.remove("disabled");
                    },4000);
                })
            });
            suggestionContainer.appendChild(optLi);

            suggestionContainer.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start" // Ensures horizontal scrolling
            });

        });
    }

    // Check if the selected answer is correct
    function checkAnswer(selectedAnswer, correctAnswer, media,text) {
        const ChatContainer = document.querySelector('.chat-area');

        const responseBubble = document.createElement("div");
        responseBubble.classList.add('chat-message', 'received');
        const chatBubble = document.createElement("div");
        chatBubble.classList.add('chat-bubble');
                
        ChatContainer.scrollTop = ChatContainer.scrollHeight;
        

        const responses = [
            "Correct! You’re absolutely perfect, Yasmin. Well done, my angel.",
            "Bravo! You nailed it, just like you always do. I’m so proud of you.",
            "Well done, my beautiful Yasmin! You’ve got it right, as always.",
            "Kudos, darling! An excellent choice, just like everything you do.",
            "Heko, my love! Umefanikiwa. You always shine so brightly, Yasmin.", // Swahili
            "Hongera, my heart! Umeshinda! You’ve won my heart once again, Yasmin.", // Swahili
            "Félicitations, mon amour! Bien joué. You make everything look effortless.", // French
            "Bravo, ma chérie! Tu as bien répondu. You always know the right answer, just like you know how to make me smile.", // French
            "Kongole, my sweetest Yasmin! Umepata vizuri. You never fail to amaze me.", // Swahili
            "Bravo, my angel! You’ve touched my heart deeply.",
            "Well done, my angel! Your brilliance never ceases to amaze me.",
            "Heko, malaika wangu! Umenifurahisha.", // Swahili
            "Perfect as always, my Angel. You make me proud every day.",
            "Bravo, mon trésor! Every answer from you is a gift to my heart.",
            "Well done, my heart’s desire! You’ve proven yet again that you’re a true wonder."
        ];

        const retryResponses = [
            "Don’t worry, my angel. Every try brings you closer to the right answer. You’re doing amazing!",
            "It’s okay, my beautiful Yasmin. You’ve got this, just a little more focus and you'll nail it!",
            "My angel, you’re incredible! Don’t let one wrong answer stop you – you’ll get it right next time.",
            "Every attempt is a step closer to success, my angel. Let’s try again, together.",
            "It’s just a little bump, my angel. You’re so close to getting it right. Keep going!",
            "No worries, my angel. I know you’ll figure it out and get it right next time!",
            "Keep going, my angel. You’re learning, growing, and you’re going to get it next time!",
            "You’re doing fantastic, my sweetest Yasmin. Just a little more effort, and you’ll ace it!",
            "Every try is progress, my angel. I know you’re going to get the answer right next time!",
            "Don’t give up, my angel. You’re smarter than you think, and the next answer is just waiting for you!",
            "It’s okay, my angel. You’re learning and getting better with every answer. We’ve got this!",
            "Don’t be discouraged, my angel. You’ve got all the strength and intelligence to get it right next time!",
            "Sawa tu, mrembo wangu. utashinda hii quiz, umeweza kabisa!",
            "Usijali, mpenzi wangu. Jaribu tena, tutapata jibu sahihi kwa pamoja!",
            "Jaribu tena umeweza!",
            "Endelea, mrembo wangu, hautashindwa!",
            "Usikate tamaa, mpenzi wangu. Tutashinda pamoja, tutapata jibu sahihi!",
            "Usijali, mrembo wangu. Tunajua utapata jibu sahihi, enda mbele!",
            "Usikate tamaa, mpenzi. Wewe ni mrembo na kipaji cha kutosha kujaribu tena!",
            "Tutashinda kwa pamoja, mpenzi. Hii swali ni yako!"
        ];
        
        


        if (selectedAnswer === correctAnswer) {
            senderTone.play();
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            chatBubble.textContent = randomResponse;
            attempt = 0; // Reset attempts after a correct answer
            // If there's media (audio), add the control
            if (media) {
                const audioPlayerContainer = document.createElement("div");
                audioPlayerContainer.classList.add('audio-player-container');

                const playIcon = document.createElement('button');
                playIcon.innerHTML = "&#9654;";

                
                const audio = new Audio(media);

                playIcon.onclick = () => {
                    isPlaying = !isPlaying;
                    playMedia(isPlaying, audio, playIcon)
                };
            
                audio.onended = () => {
                    isPlaying = false;
                    playIcon.innerHTML = "&#9654;"; // Reset to play icon when audio ends
                };

                const textContainer = document.createElement("div");
                textContainer.classList.add('text-display');
                textContainer.textContent = "You can Listen to: " + correctAnswer; // Add the love letter content
                chatBubble.appendChild(textContainer);

                audioPlayerContainer.appendChild(playIcon);
                chatBubble.appendChild(audioPlayerContainer);
            }

            if (text) {
                const textContainer = document.createElement("div");
                textContainer.classList.add('text-display');
                textContainer.textContent = text; // Add the love letter content
                chatBubble.appendChild(textContainer);
            }
           
            currentQuestionIndex++;
            setTimeout(function() {
                fetchAndDisplayQuestions(currentQuestionIndex);
            },3000);
        } else {
            attempt++;
            if (attempt < 3) {
                ChatContainer.scrollTop = ChatContainer.scrollHeight;
                senderTone.play();
                chatBubble.scrollIntoView({behavior:"smooth", block:"center"});
                const retryResponse = retryResponses[Math.floor(Math.random() * responses.length)];
                chatBubble.textContent = retryResponse;
                
            } else {
                senderTone.play();
                ChatContainer.scrollTop = ChatContainer.scrollHeight;
                chatBubble.scrollIntoView({behavior:"smooth", block:"center"});
                chatBubble.textContent = `Oops! The correct answer is ${correctAnswer}.`;
                attempt = 0;
                
                currentQuestionIndex++;
                setTimeout(function() {
                    fetchAndDisplayQuestions(currentQuestionIndex);
                },3000);

                if (media) {
                    const audioPlayerContainer = document.createElement("div");
                    audioPlayerContainer.classList.add('audio-player-container');
    
                    const playIcon = document.createElement('button');
                    playIcon.innerHTML = "&#9654;";
    
                    
                    const audio = new Audio(media);
    
                    playIcon.onclick = () => {
                        isPlaying = !isPlaying;
                        playMedia(isPlaying, audio, playIcon)
                    };
                
                    audio.onended = () => {
                        isPlaying = false;
                        playIcon.innerHTML = "&#9654;"; // Reset to play icon when audio ends
                    };
    
                    audioPlayerContainer.appendChild(playIcon);
                    chatBubble.appendChild(audioPlayerContainer);
                }

                if (text) {
                    const textContainer = document.createElement("div");
                    textContainer.classList.add('text-display');
                    textContainer.textContent = text; // Add the love letter content
                    chatBubble.appendChild(textContainer);
                }
            }  
        }

        responseBubble.appendChild(chatBubble);
        ChatContainer.appendChild(responseBubble);
    }

    function playMedia(state, media, playIcon) {
        if(currentMedia && currentMedia !== media) {
            currentMedia.pause();
            currentMedia.playIcon.innerHTML = "&#9654;"; 
        }

        currentMedia = media;
        currentMedia.playIcon = playIcon; // Store the associated play icon for resetting later

        if (state) {
            currentMedia.play();
            playIcon.innerHTML = "&#10074;&#10074;"; // Change to pause icon
            
        } else {
            // If state is true (playing), pause the media
            currentMedia.pause();
            playIcon.innerHTML = "&#9654;"; // Reset to play icon
            
        }
    }

    const mindblowingQuestions = [
        {
            question: "What love song can I play for you?",
            options: [
                { opt: "MLTR - Someday", audioPlayer: "mltr_someday.mp3" },
                { opt: "A Whole New World - Ana Mousud", audioPlayer: "aladin.mp3" },
                { opt: "Darshan Raval - Tu Mileya", audioPlayer: "mileya.mp3" },
                { opt: "Lal Chunariya | Parampara Tandon | Shabbir Ahmed | Lovesh Nagar | Bhushan Kumar", audioPlayer: "chunariya.mp3" },
                { opt: "Nadia Mukami ft Latinoh - Zawadi", audioPlayer: "zawadi.mp3" },
                { opt: "Otile Brown x Nadia Mukami - My Sugar", audioPlayer: "my_sugar.mp3" },
                { opt: "Willy Paul - Chocolate", audioPlayer: "chocolate.mp3" },
                { opt: "Brett Young - In Case You Didn't Know", audioPlayer: "brett.mp3" },
                { opt: "Limbofest X Alma Mutheu - SIKUACH", audioPlayer: "sikuachi.mp3" },
                { opt: "Bahati Feat Nadia Mukami - Baby You", audioPlayer: "baby.mp3" },
                { opt: "Vijana Barubaru - Sasa Hivi ft. Gogo Ashley", audioPlayer: "sasa_hivi.mp3" }
            ]
        },
        {
            question: "What story can I read for you?",
            options: [
                {
                    opt: "Happily Ever After",
                    audioPlayer: "story1.mp3",
                    story: "Once upon a time, in a land where the desert met the sky, there were two souls wandering the endless dunes. One was a traveler seeking the warmth of a heart to call home, while the other was a dreamer waiting for the moment fate would reveal their true companion. They searched through stormy winds and silent nights, crossing paths but never meeting. Then, on a moonlit evening, their eyes finally met across a vast oasis. Without a word, they knew. The traveler and the dreamer had found each other. And so, their journey together began, a love as timeless as the stars, in a world where two souls could never be apart. Happily ever after, forevermore."
                  },
                  
                  {
                    opt: "A Little Princess Named Yasmin",
                    audioPlayer: "story2.mp3",
                    story: "Once upon a time, or perhaps twice upon a time, in a kingdom hidden between mountains and rivers, a little princess named Yasmin was born. Her arrival was whispered in the winds, and the stars above seemed to shine brighter that night. From the moment her tiny feet touched the earth, the world felt her warmth. The flowers bloomed more beautifully, the birds sang sweeter, and even the sun seemed to rise with greater brightness. Her laughter brought joy to everyone, and her kindness healed hearts. The kingdom flourished, and all who met her knew that Yasmin's presence had brought a magical change to the world. Her legacy of love, wisdom, and compassion spread far and wide, and her name would be remembered forever. And so, the little princess, with her gentle heart, made the world a better place. Happily ever after."
                  },
                  {
                    opt: "Beauty and the Beast",
                    audioPlayer: "story3.mp3",
                    story: "Once upon a time, or perhaps twice upon a time, in a kingdom hidden behind misty forests, there lived a beautiful princess named Yasmin. Her kindness was as pure as the dawn, and her heart as warm as the sun. But, far away in the depths of the forest, lived a mysterious man named Vivaldi, cursed by a spell that transformed him into a creature of shadows and fear. No one dared approach him, for they believed him to be the Beast. Yasmin, however, was different. When she heard of Vivaldi's plight, she did not fear the creature he had become. She saw past the darkness and recognized the soul of the man he once was. One fateful day, Yasmin ventured into the forest, where the Beast\'s lair lay. With her gentle voice and compassionate heart, she spoke to Vivaldi. Slowly, their bond grew as they shared stories, dreams, and hopes. Yasmin\'s love and unwavering belief in Vivaldi's goodness began to break the curse. As the days passed, Vivaldi\'s true form, a noble and handsome prince, was revealed. The curse was lifted, but what remained was a love stronger than any magic—born from kindness, courage, and understanding. Yasmin and Vivaldi ruled the kingdom together, and their love became a legend, reminding the world that true beauty is found in the heart. And they lived happily ever after, forevermore."
                  }
                  
            ]
        }
    ];
    
    
    function displayNewGameTactics() {    

        const currentMindBlowingQuestion = mindblowingQuestions[currentQgameIndex];

        displayCurrentMindBlowingQuestion(
            currentMindBlowingQuestion.question,
            currentMindBlowingQuestion.options
        );
        currentQgameIndex = (currentQgameIndex + 1) % mindblowingQuestions.length;
    }
    
    function displayCurrentMindBlowingQuestion(question, ArrOptions) {
        const messageBubble = document.createElement("div");
        messageBubble.classList.add('chat-message', 'received');
    
        const chatBubble = document.createElement("div");
        chatBubble.classList.add('chat-bubble');
    
        senderTone.play();
        chatBubble.textContent = question;
        messageBubble.appendChild(chatBubble);
        ChatContainer.appendChild(messageBubble);
    
        ChatContainer.scrollTop = ChatContainer.scrollHeight;
    
        suggestionContainer.innerHTML = '';
        suggestionContainer.scrollTo({
            left: 0,
            behavior: 'smooth'  // Adds a smooth scrolling effect
        });
    
        ArrOptions.forEach(option => {
            const optLi = document.createElement('li');
            optLi.textContent = option.opt;
            optLi.addEventListener('click', function () {
                const messageBubble = document.createElement("div");
                const messageBubble2 = document.createElement("div");
                messageBubble.classList.add('chat-message', 'sent');
                messageBubble2.classList.add('chat-message', 'received');
                const chatBubble = document.createElement("div");
                const chatBubble2 = document.createElement("div");
    
                chatBubble.classList.add('chat-bubble');
                chatBubble2.classList.add('chat-bubble');
                receiverTone.play();
                chatBubble.scrollIntoView({ behavior: "smooth", block: "center" });
                chatBubble.textContent = option.opt;
                messageBubble.appendChild(chatBubble);
                messageBubble2.appendChild(chatBubble2);
                ChatContainer.appendChild(messageBubble);
                ChatContainer.appendChild(messageBubble2);
                suggestionContainer.querySelectorAll('li').forEach(li => {
                    li.classList.add("disabled");
                    setTimeout(function() {
                        li.classList.remove("disabled");
                    },4000);
                });

                 displayNewGameTactics(); 
                // Play media or display story based on the selected option
                playSelectedOption(option, chatBubble2);
                
            });
            suggestionContainer.appendChild(optLi);
        });
    }
    


    // Function to play the selected option (song or story)

    function playSelectedOption(optionObj, element) {
        // If there is an audio currently playing, pause it before playing the new one
        if (currentAudioPlayer && currentAudioPlayer.audio) {
            currentAudioPlayer.audio.pause(); // Pause the previous audio
            currentAudioPlayer.playIcon.innerHTML = "&#9654;"; // Reset the play icon of the previous audio
        }
    
        // Create the audio player container
        const audioPlayerContainer = document.createElement("div");
        audioPlayerContainer.classList.add('audio-player-container');
    
        const playIcon = document.createElement('button');
        playIcon.innerHTML = "&#9654;"; // Play icon (▶️)
    
        // Check if the option contains an audioPlayer
        if (optionObj.audioPlayer) {
            const audio = new Audio(optionObj.audioPlayer);
    
            // Store the audio and its play icon in currentAudioPlayer
            currentAudioPlayer = {
                audio: audio,
                playIcon: playIcon
            };
    
            // Play the audio
            audio.play();
            playIcon.innerHTML = "&#10074;&#10074;"; // Change icon to pause (❚❚)
    
            // Toggle between play and pause on button click
            playIcon.addEventListener('click', function () {
                if (audio.paused) {
                    audio.play();
                    playIcon.innerHTML = "&#10074;&#10074;"; // Pause icon
                } else {
                    audio.pause();
                    playIcon.innerHTML = "&#9654;"; // Play icon
                }
            });
        }

        if (optionObj.audioPlayer) {
            const textContainer = document.createElement("div");
            textContainer.classList.add('text-display');
            textContainer.textContent = "You can listen to: "+ optionObj.opt; // Add the love letter content
           element.appendChild(textContainer);
        }
    
        audioPlayerContainer.appendChild(playIcon);
        element.appendChild(audioPlayerContainer);

        if (optionObj.story) {
            const textContainer = document.createElement("div");
            textContainer.classList.add('text-display');
            textContainer.textContent = optionObj.story; // Add the love letter content
           element.appendChild(textContainer);
        }

        currentAudioPlayer.onended = function () {
            currentAudioPlayer.playIcon.innerHTML = "&#9654;";
        }
    }


    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("service-worker.js")
            .then((registration) => {
              console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch((error) => {
              console.log("Service Worker registration failed:", error);
            });
        });
      }
      
    
        // Check if the app can be installed
        let deferredPrompt;
        const installButton = document.querySelector('.hidden-button button');
        const installOverlay = document.querySelector('.side-install-button-overlay');
        const displayedIcon = document.querySelector('.displayed-icon');

        // Listen for the 'beforeinstallprompt' event
        window.addEventListener('beforeinstallprompt', (event) => {
            // Prevent the default installation prompt
            event.preventDefault();
            deferredPrompt = event;

            // Show the install icon
            displayedIcon.style.display = 'block';

            // Show the icon and set the class to allow button to slide in
            displayedIcon.addEventListener('click', () => {
                installOverlay.classList.toggle('open');
            });
        });

        // When the install button is clicked
        installButton.addEventListener('click', () => {
            // Hide the install overlay and button
            installOverlay.classList.remove('open');

            // Show the install prompt
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                        installOverlay.style.display = "none";
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            }
        });

        window.addEventListener('appinstalled', () => {
            installButton.style.display = "none"; // Hide the install button overlay once installed
          });
    

    // Get the status text element
    const statusText = document.getElementById('status-text');

    // Function to update the status based on the network connection
    function updateStatus() {
    if (navigator.onLine) {
        statusText.textContent = "Online";  // Update status to "Online"
    } else {
        statusText.textContent = "Offline"; // Update status to "Offline"
    }
    }

    // Initial check when the page loads
    updateStatus();

    // Event listeners to detect changes in the network status
    window.addEventListener('online', updateStatus);  // Fired when the user goes online
    window.addEventListener('offline', updateStatus); // Fired when the user goes offline

})

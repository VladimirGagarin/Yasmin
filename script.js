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
    const lovemSong = new Audio("loveme.mp3");
    const readIntro = new Audio("love_letter.mp3");
    const newAudio = new Audio('qr9.mp3');
    const introSong = new Audio('intro.mp3');

   
    // Check if the app can be installed
    let deferredPrompt;
    const installButton = document.querySelector('.hidden-button button');
    const installOverlay = document.querySelector('.side-install-button-overlay');
    const displayedIcon = document.querySelector('.displayed-icon');

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
    let isReadingletterIntro = false;
    let timeoutId;  
    let currentVideoIndex = 0;
    let isPlayingVideo = false;
    let isMuted = false;
    let isFullScreen = false;
    let currentVideo = null;
    let wasPlayingBeforeHidden = false;
    let currentVideoElement = null; // Global reference to the current video element
    let stallTimeout; // To track the timeout for the 'stalled' event
    let waitTimeout;  // To track the timeout for the 'waiting' event

    document.querySelector('.video-reviews').classList.add('hide');
    authOverLay.querySelector('.heartfelt-message').classList.add('hide');
   

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

    function playSongWithLyrics() {
        
        const loadingAnim = document.querySelector('.loading-page-yas');
        const lyricsDiv = document.querySelector('.lyrics-song');
        const loveText = document.querySelector('.love-text');
        let songPlayed = false; // Flag to check if a song plays successfully
    
        loadingAnim.style.display = "flex";

        const removeOverlay = () => {
            setTimeout(function() {
                document.querySelector('.lyrics-song').innerHTML = '';
                loadingAnim.style.display = "none";
                showIntrovideo();
            }, 3000);
        };
    
        // Handle errors
        const handleAudioError = () => {
            introSong.pause();
            newAudio.pause();
            // Remove overlay if no songs play successfully
            removeOverlay();
            songPlayed = false;

        };
    
        const introSongLyrics = [
            { text: "I'm gonna love you", duration: 4 },
            { text: 'Until you hate me', duration: 3 },
            { text: "now I'm gonna show you", duration: 3 },
            { text: 'what really crazy', duration: 3 },
            { text: 'you should know better', duration: 6 },
            { text: "I'm gonna love you", duration: 10 }
        ];
    
        // Function to display lyrics
        function displayLyrics(lyrics) {
            let index = 0;
    
            function showNextLine() {
                if (index < lyrics.length) {
                    lyricsDiv.textContent = lyrics[index].text; // Update lyrics text
                    setTimeout(showNextLine, lyrics[index].duration * 1000); // Wait for the duration
                    index++;
                }
            }
    
            showNextLine();
        }
    
        // Start intro song
        introSong.addEventListener('loadedmetadata', function () {
            setTimeout(function () {
                // Correct comparison of the display property using getComputedStyle
                const loadingAnimDisplay = window.getComputedStyle(loadingAnim).display;
                if (loadingAnimDisplay === "flex") {
                    introSong.play().then(() => {
                        songPlayed = true;
                    }).catch(handleAudioError);
        
                    loveText.style.opacity = '0';
                    introSong.onended = function () {
                        loveText.style.opacity = '1';
                        setTimeout(function () {
                            lyricsDiv.innerHTML = ''; // Clear the lyrics
                            newAudio.play().then(() => {
                                songPlayed = true;
                            }).catch(handleAudioError);
                        }, 1000); // Delay before playing the new song
                    };
                }
                else{
                    introSong.pause();
                    newAudio.pause();
                    loadingAnim.style.display = "none";
                    document.querySelector('.lyrics-song').innerHTML = '';
                }
            }, 1000); // Wait 1 second before checking display property
        });
        
    
        // Display lyrics when the intro song starts playing
        introSong.onplaying = function () {
            displayLyrics(introSongLyrics);
        };

        newAudio.onended = function () {
            removeOverlay();
        }
    
        introSong.onerror = handleAudioError;
        newAudio.onerror = handleAudioError;
        introSong.addEventListener('stalled', function() {
            handleAudioError();
        });

        newAudio.addEventListener('stalled', function() {
            handleAudioError();
        });
    }
    
  
    
    playSongWithLyrics();

    const introsVideos = ['introvid4.mp4', 'Imajin_video.mp4','introvid5.mp4','Imajin_video (2).mp4', 'introvid.mp4','Imajin_video (1).mp4', 'introvid2.mp4', 'introvid3.mp4','introvid6.mp4'];
    let currentVideoIntro = 0;

    let videoStalledTimeout; // Timeout variable for stalled state

    function showIntrovideo() {
        const videoOverlay = document.querySelector('.video-overlay');
        const waitingOverlay = document.querySelector('.video-overlay .loadingvideo-anim');
        const video = document.querySelector('.video-overlay video');
        const playBtn = document.querySelector('.video-overlay .video-overlay-controls button');
        
        // Update the video source
        video.src = introsVideos[currentVideoIntro];
        currentVideoIntro = (currentVideoIntro + 1) % introsVideos.length; // Loop through the videos
    
        // Show the video overlay
        videoOverlay.style.display = "flex";
    
        // Event Handlers
        const handleStalled = () => {
            waitingOverlay.style.display = "flex";
    
            // Set timeout if video remains stalled
            videoStalledTimeout = setTimeout(() => {
                videoOverlay.style.display = "none";
                video.currentTime = 0; // Reset video
                document.querySelector('.video-overlay-controls').style.display = "flex"; // Show controls
            }, 8000); // 8 seconds
        };
    
        const handleWaiting = () => {
            waitingOverlay.style.display = "flex";
        };
    
        const handlePlaying = () => {
            waitingOverlay.style.display = "none"; // Hide loading spinner
            document.querySelector('.video-overlay-controls').style.display = "none"; // Hide controls
            clearTimeout(videoStalledTimeout); // Clear stalled timeout if playing starts
        };
    
        const handlePause = () => {
            waitingOverlay.style.display = "none"; // Hide spinner on pause
        };
    
        const handleEnded = () => {
            videoOverlay.style.display = "none";
            video.currentTime = 0; // Reset video to the beginning
            document.querySelector('.video-overlay-controls').style.display = "flex"; // Show play button
        };
    
        const handleCanPlay = () => {
            waitingOverlay.style.display = "none"; // Hide spinner when video is ready to play
        };
    
        const handleVisibilityChange = () => {
            if (document.hidden) {
                video.pause();
                document.querySelector('.video-overlay-controls').style.display = "flex"; // Show play button
            }
        };
    
        // Add event listeners (ensure they're not duplicated)
        video.removeEventListener('stalled', handleStalled); // Prevent duplicates
        video.addEventListener('stalled', handleStalled);
    
        video.removeEventListener('waiting', handleWaiting);
        video.addEventListener('waiting', handleWaiting);
    
        video.removeEventListener('playing', handlePlaying);
        video.addEventListener('playing', handlePlaying);
    
        video.removeEventListener('pause', handlePause);
        video.addEventListener('pause', handlePause);
    
        video.removeEventListener('ended', handleEnded);
        video.addEventListener('ended', handleEnded);
    
        video.removeEventListener('canplay', handleCanPlay);
        video.addEventListener('canplay', handleCanPlay);
    
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        // Play the video when play button is clicked
        playBtn.addEventListener('click', () => {
            video.play();
            document.querySelector('.video-overlay-controls').style.display = "none"; // Hide play button
        });
    }
    
  
    InputPassCode.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent default behavior
            handlePasswordValidation();
        }
    });
    

    InputPassCode.addEventListener("input", function () {
        if (InputPassCode.value.endsWith("\n")) {
            handlePasswordValidation();
        }
    });

    InputPassCode.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            handlePasswordValidation();
        }
    });
    
    function handlePasswordValidation() {
        
        const passwordEnter = InputPassCode.value.trim().replace(/\s+/g, " ").toLowerCase();
        const matchedPasscode = password.trim().replace(/\s+/g, " ").toLowerCase();

        if (passwordEnter === matchedPasscode) {
            authOverLay.style.display = "none";
            installOverlay.style.display = "none";
            InputPassCode.value = '';
            document.querySelector('.video-reviews').classList.remove('hide');
            authOverLay.querySelector('.heartfelt-message').classList.remove('hide');
            document.querySelector('.loading-page-yas').style.display ='flex';
            setTimeout(function() {
                document.querySelector('.lyrics-song').innerHTML = '';
                document.querySelector('.loading-page-yas').style.display ='none';
                if(!wasPlayingBeforeHidden) {
                    showIntrovideo();
                }
                
            },4000)
        } else {
            vibrate.play();
            authContent.classList.add("vibrate");
            setTimeout(() => {
                authContent.classList.remove("vibrate");
                InputPassCode.value = '';
            }, 1000);
        }
    }
    

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

        Reader.play();
        isReadingletter = true;
        document.querySelector('.letter-div .read-btn').innerHTML = "&#10074;&#10074;";
        document.querySelector('.letter-div .read-btn').style.backgroundColor = "#0056b3";

        clearInterval(quoteInterval);
        if(currentQuoteReader && !currentQuoteReader.paused){
            currentQuoteReader.pause();
        }


        Reader.onended = function () {
            isReadingletter = false;
            Reader.currentTime = 0;
            document.querySelector('.letter-div .read-btn').innerHTML = "&#9654;";
            document.querySelector('.letter-div .read-btn').style.backgroundColor = "#b87e55";
            handleHeartfeltMessageClick();
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
            handleHeartfeltMessageClick();
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
            installOverlay.style.display = "flex"
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

            if(currentAudioPlayer && !currentAudioPlayer.audio.paused) {
                currentAudioPlayer.audio.pause();
                document.querySelectorAll('.audio-player-container button').forEach(btn => {btn.innerHTML = "&#9654;"});
            }

           
            // Pause music, animation, etc.
        } else if (document.visibilityState === 'visible') {
            
            document.querySelector('.loading-page-yas').style.display = "flex";

            setTimeout(function () {
                document.querySelector('.lyrics-song').innerHTML = '';
                document.querySelector('.loading-page-yas').style.display = "none";
                if(!introSong.paused) introSong.pause();
                if(!newAudio.paused)   newAudio.pause();
            },4000)
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

    function clearAllCookies() {
        const cookies = document.cookie.split(";");
    
        cookies.forEach(function(cookie) {
            const cookieName = cookie.split("=")[0].trim();
            // Delete the cookie by setting an expired date and correct path
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // You can also specify the domain if needed:
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=vladimirgagarin.github.io;";
        });
    }

    window.onload = function() {
        clearAllCookies();
    };
    

   // Function to handle the overlay message click event
    function handleHeartfeltMessageClick() {
        const playIcon = document.querySelector('.romantic-container-overlay .play-icon-for-letter');
        const romanticOverlay = document.querySelector('.romantic-container-overlay');

        // Update play icon and play the intro
        playIcon.innerHTML = '&#10074;&#10074;';
        readIntro.play();
        isReadingletterIntro = true;

        // Display the overlay
        romanticOverlay.style.display = "flex";

        // Handle the end of the intro playback
        readIntro.onended = function () {
            isReadingletterIntro = false;
            playIcon.innerHTML = isReadingletterIntro ? '&#10074;&#10074;' : '&#9654;';
            displayImageOverlay();
        };
    }

    // Attach the click event listener
    authOverLay.querySelector('.heartfelt-message').onclick = handleHeartfeltMessageClick;


    document.querySelector('.romantic-container-overlay .play-icon-for-letter').onclick = function () {
        isReadingletterIntro = ! isReadingletterIntro;

        this.innerHTML = isReadingletterIntro ? '&#10074;&#10074;' : '&#9654;';

        if(isReadingletterIntro){
            readIntro.play();
        }
        else{
            readIntro.pause();
        }

        readIntro.onended =  function () {
            isReadingletterIntro = false;
            this.innerHTML = isReadingletterIntro ? '&#10074;&#10074;' : '&#9654;';
            displayImageOverlay ();
        }.bind(this)
    }

    document.querySelector('.romantic-container-overlay .romantic-close').onclick = function () {
        isReadingletterIntro = false;
        document.querySelector('.romantic-container-overlay .play-icon-for-letter').innerHTML = isReadingletterIntro ? '&#10074;&#10074;' : '&#9654;';
        readIntro.pause();
        readIntro.currentTime = 0;
        document.querySelector('.romantic-container-overlay').style.display = "none";
    }

    
   // Function to display the overlay with the image
    function displayImageOverlay() {
        document.querySelector('.overlay-img').style.display = "flex";
    }

    // Function to handle image download
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const img = document.querySelector('.img-preview img');
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'Yasmin-Forever-Yours.jpg'; // Specify the download name
        link.click(); // Trigger the download
        document.querySelector('.overlay-img').style.display = "none";
    });

    // Function to close the overlay
    document.getElementById('closeBtn').addEventListener('click', function() {
        document.querySelector('.overlay-img').style.display = "none";
    });

    
   // Get references
    const playButton = document.querySelectorAll('.overlay-play-button .left-controls span')[0];
    const MuteBtn = document.querySelectorAll('.overlay-play-button .left-controls span')[1];
    const durationArea = document.querySelectorAll('.overlay-play-button .left-controls span')[2];
    const videoContainer = document.querySelector('.video-container');
    const videoField = videoContainer.querySelector('.video-field');
    const progressBar = videoContainer.querySelector('.overlay-play-button .progress-track .progress-bar');
    const overlay = document.querySelector('.overlay-videos-display');
    const closeOverlayButton = document.querySelector('.close-overlay');
    const fullScreenBtn = document.querySelectorAll('.overlay-play-button .right-controls span')[0]; 
    const likeBtn = document.querySelectorAll('.overlay-play-button .right-controls span')[1];
    const animVideo = document.querySelector('.video-container .loading-anim-video');
    const videoCaption = document.querySelector('.video-quote-caption');
    const videoControls = videoContainer.querySelector('.overlay-play-button');
    const progressTruck = videoControls.querySelector('.progress-track');

    // Video list
    const videoList = [
        {video: "vid1.mp4", quote: "No matter where life takes us, I’ll always be here for you, Yasmin.", post: "post1.jpg", liked: false},
        {video: "vid9.mp4", quote: "In every breath I take, in every heartbeat I feel, all I know is that I am falling for you, Yasmin—deeper with every moment.", post: "post9.jpg", liked: false},
        {video: "vid6.mp4", quote: "Yasmin, you're not just a miracle to me; you're the reason I believe in the impossible.", post:"post6.jpg",liked:false},
        {video: "vid10.mp4", quote: "To be loved by you, Yasmin, is the greatest blessing life has bestowed upon me. You make everything in this world feel special, just by being in it.", post: "post10.jpg", liked: false},
        {video: "vid7.mp4", quote: "Yasmin, your beauty is not just incredible—it's the light that makes everything more beautiful.", post:"post7.jpg",liked:false},
        {video: "vid2.mp4", quote: "If you leave, my heart will remain empty, lost without you, Yasmin.", post: "post2.jpg", liked: false},
        {video: "vid3.mp4", quote: "You are the one I needed, and now I’ve found everything in you, Yasmin.", post: "post3.jpg", liked: false},
        {video: "vid4.mp4", quote: "Our souls are threads of the same tapestry, woven together by love to create a bond nothing can tear apart, Yasmin.", post:"post4.jpg", liked:false},
        {video: "vid5.mp4", quote: "No matter where the world pulls us, I’ll always find my way back to you, Yasmin. You’re my home.", post:"post5.jpg",liked:false},
        {video: "vid8.mp4", quote: "You are my light, Yasmin. Without you, I fade into darkness", post:"post8.jpg",liked:false},
        {video: "vid11.mp4", quote: "Yasmin i do really really Like you so much.Forever yours", post:"post11.jpg", liked:false}
    ];
    
    

    // Function to load and display the current video
    function loadVideo() {

        progressBar.style.width = '0%';
        // Create the video element
        const videoElement = document.createElement('video');
        videoElement.src = videoList[currentVideoIndex].video;
        videoCaption.innerHTML = `<span>${videoList[currentVideoIndex].quote}<span>`;
        videoElement.poster = videoList[currentVideoIndex].post;
        videoElement.controls = false; // Optional: Hide default controls
        videoField.innerHTML = ''; // Clear previous video
        videoField.appendChild(videoElement); // Add new video element

        currentVideoElement = videoElement;
        isPlayingVideo = false;
        currentVideo = videoList[currentVideoIndex]
        animVideo.style.backgroundImage = `url(${videoList[currentVideoIndex].post})`;

        // Load liked status from localStorage
        const likedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
        currentVideo.liked = likedVideos.includes(currentVideo.video); // Assuming video URL is unique

        likeBtn.classList.toggle('liked', currentVideo.liked);
        animVideo.style.display = 'none';
        // Update play button state
        playButton.innerHTML = isPlayingVideo ? '&#10074;&#10074;' : '&#9654;';
        playButton.classList.add('disbled');

        setTimeout(function () {
            togglePlayPause(currentVideoElement);
            playButton.classList.remove('disbled');
        },3000);

        if(currentVideo.liked){
            likeBtn.classList.add('liked');
            isLiked = true;
        }

        // Play/Pause video on button click
        playButton.onclick = () => togglePlayPause(currentVideoElement);

        // Update progress bar
        currentVideoElement.ontimeupdate = () => updateProgressBar(currentVideoElement);

        // Play/Pause video on video click
        videoField.onclick = () => togglePlayPause(currentVideoElement);

        currentVideoElement.addEventListener('stalled', function () {
            animVideo.style.display = "flex";
            playButton.classList.add('disbled');
            stallTimeout = setTimeout(function() {
                showRomanticMessage(6000);
            },5000);
            document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.add('disbled')});
        });

        currentVideoElement.addEventListener('waiting', function () {
            animVideo.style.display = "flex";
            waitTimeout = setTimeout(function() {
                showRomanticMessage(6000);
            },5000);
        });

        currentVideoElement.addEventListener('playing', function () {
            animVideo.style.display = "none";
            playButton.classList.remove('disbled');
            clearTimeout(stallTimeout);
            clearTimeout(waitTimeout);
            document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.remove('disbled')});
        });

        currentVideoElement.addEventListener('loadeddata', function () {
            animVideo.style.display = "none";
            playButton.classList.remove('disbled');
            clearTimeout(stallTimeout);
            clearTimeout(waitTimeout);
            document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.remove('disbled')});
        });

        currentVideoElement.addEventListener('error', function () {
            animVideo.style.display = "flex";
            showRomanticMessage(6000);
            setTimeout(hideOverlay(),6000);
        });

        currentVideoElement.addEventListener('canplay', function () {
            animVideo.style.display = "none";
        });

        currentVideoElement.addEventListener('canplaythrough', function () {
            animVideo.style.display = "none";
        });

        currentVideoElement.addEventListener('loadedmetadata', function () {
            animVideo.style.display = "none";
        });

        currentVideoElement.addEventListener('ended', function() {
            animVideo.style.display = "none";
            isPlayingVideo = false;
            playButton.innerHTML = isPlayingVideo ? '&#10074;&#10074;' : '&#9654;';
            progressBar.style.width = `0%`;
            durationArea.textContent = '00:00 / 00:00';
            currentVideoIndex = (currentVideoIndex + 1 + videoList.length) % videoList.length;
            showRomanticMessage(3000);
            setTimeout(loadVideo(),4000)
        });

        // Show controls on mouse move, mouse over, touch start, or touch move
        currentVideoElement.addEventListener('mousemove', () => toggleControls(true));
        currentVideoElement.addEventListener('mouseover', () => toggleControls(true));
        currentVideoElement.addEventListener('touchstart', () => toggleControls(true));
        currentVideoElement.addEventListener('touchmove', () => toggleControls(true)); // For touch devices

        // Hide controls when mouse leaves or after inactivity
        currentVideoElement.addEventListener('mouseleave', () => toggleControls(false));

        currentVideoElement.addEventListener('dblclick', function () {
            isFullScreen = !isFullScreen;
            toggleFullScreen(isFullScreen);
            showRomanticMessage(4000);
        });

        currentVideoElement.addEventListener("contextmenu", function (event) {
            // Prevent the default right-click menu
            event.preventDefault();
          
            // Show a romantic message or animation
            showRomanticMessage();
          
            // Optionally, you can log the event or do something else
            console.log("Right-click disabled. A romantic message is displayed.");
        });
    }

    // Toggle Play/Pause
    function togglePlayPause(videoElement) {
        isPlayingVideo = !isPlayingVideo;
        playButton.innerHTML = isPlayingVideo ? '&#10074;&#10074;' : '&#9654;';
        if (isPlayingVideo) {
            videoElement.play();
            
        } else {
            videoElement.pause();
        }

        toggleControls(isPlayingVideo)
    }

   

    function toggleControls(state) {
        console.log(state)
        if (state) {
            videoControls.style.opacity = 1;
            videoControls.style.pointerEvents = "auto";
            // Clear previous timeout to avoid unexpected behavior if user interacts again
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                videoControls.style.opacity = 0;
                videoControls.style.pointerEvents = "none";
            }, 5000); // Hides the controls after 5 seconds of inactivity
        } else {
            videoControls.style.opacity = 1;
            videoControls.style.pointerEvents = "auto";
        }
    }

    // Update progress bar
    function updateProgressBar(videoElement) {
        const percent = videoElement.duration ? (videoElement.currentTime / videoElement.duration) * 100 : 0;
    
        progressBar.style.width = `${percent}%`;
        durationArea.textContent = `${formattedTime(videoElement.currentTime)} / ${videoElement.duration ? formattedTime(videoElement.duration) : "00 : 00"}`;

       // Calculate the threshold for the last 10 seconds
        const tenSecondsLeft = videoElement.duration ? videoElement.duration - 10 : 0;

        // Show a romantic message if in the last 10 seconds
        if (videoElement.currentTime >= tenSecondsLeft && videoElement.duration) {
            showRomanticMessage(6000); // Show message for 6 seconds
        }
    }
    

    // Show overlay
    function showOverlay() {
        overlay.style.display = 'flex';
        document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.add('disbled')});
        loadVideo();
        setTimeout(function() {
            document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.remove('disbled')})
        },4000)
    }

    // Hide overlay
    function hideOverlay() {
        const videoElement = videoContainer.querySelector('video');
        if (videoElement) videoElement.pause();
        overlay.style.display = 'none';
        isPlayingVideo = false;
        isMuted = false;
        playButton.innerHTML = isPlayingVideo ? '&#10074;&#10074;' : '&#9654;';
        MuteBtn.innerHTML = isMuted ? '&#128264': '&#128263';
        currentVideoIndex = 0;
        progressBar.style.width = '0%';
        document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.add('disbled')});
    }

    // Next/Prev video
    function changeVideo(direction) {
        currentVideoIndex = (currentVideoIndex + direction + videoList.length) % videoList.length;
        progressBar.style.width = '0%';
        loadVideo();
    }

    document.querySelector('.vid-button').onclick = function () {
        showOverlay();
    }

    // Event Listeners
    document.querySelector('.next-btn').onclick = (event) => {
        document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.add('disbled')});

        changeVideo(1)

        setTimeout(function () {
              document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.remove('disbled')});
        },5000);
    }; // Next video

    document.querySelector('.prev-btn').onclick = (event) => {
        document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.add('disbled')});
    
        changeVideo(-1);

        setTimeout(function () {
            document.querySelectorAll('.carousel-controls button').forEach(btn => {btn.classList.remove('disbled')});
        },5000);
    }; // Previous video
     
    overlay.onclick = (e) => {
    if (e.target === overlay) hideOverlay(); // Close overlay if clicked outside
    };
    closeOverlayButton.onclick = hideOverlay;

    document.querySelector('.video-reviews').onclick = showOverlay;

    
    MuteBtn.onclick = function () {
        isMuted = !isMuted;
        const videoElement = videoField.querySelector('video');
        videoElement.muted = isMuted;
        MuteBtn.innerHTML = isMuted ? '&#128264': '&#128266';
        showRomanticMessage(4000);
    }

    fullScreenBtn.onclick = function() {
        isFullScreen = !isFullScreen;
        fullScreenBtn.innerHTML = isFullScreen ? "&#9212;" : "&#x26F6;"; // Example icons, replace as needed
            toggleFullScreen(isFullScreen);
    };

    function toggleFullScreen(state) {
       
        if (state) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.mozRequestFullScreen) { 
                videoContainer.mozRequestFullScreen();
            } else if (videoContainer.webkitRequestFullscreen) { 
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) { 
                videoContainer.msRequestFullscreen();
            }

            showRomanticMessage(4000);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        fullScreenBtn.innerHTML = state ? "&#9212;" : "&#x26F6;";
        videoContainer.classList.toggle('fmode', state);
    }

    // Like button functionality
    likeBtn.onclick = function () {
        currentVideo.liked = !currentVideo.liked;
        likeBtn.classList.toggle('liked', currentVideo.liked);

        // Update the liked videos in localStorage
        let likedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
        if (currentVideo.liked) {
            likedVideos.push(currentVideo.video); // Add video URL to the liked list
            showRomanticMessage(4000);
        } else {
            likedVideos = likedVideos.filter(vid => vid !== currentVideo.video); // Remove video URL from the liked list
        }
        
        localStorage.setItem('likedVideos', JSON.stringify(likedVideos)); // Save updated liked videos list
    }

    document.addEventListener("visibilitychange", function() {
    
        if (document.hidden) {
            if (isPlayingVideo) {
                wasPlayingBeforeHidden = true; // Store state that video was playing
            }

            if(currentVideoElement && !currentVideoElement.paused) {
                currentVideoElement.pause();
            }

            isPlayingVideo = false;
            playButton.innerHTML = '&#9654;'; // Pause icon
        } else {
            if (wasPlayingBeforeHidden) {
                setTimeout(function () {

                    if(currentVideoElement && currentVideoElement.paused) {
                        currentVideoElement.play();
                        showRomanticMessage(4000);
                    }
                   
                    isPlayingVideo = true;
                    playButton.innerHTML = '&#10074;&#10074;'; // Pause icon
                    wasPlayingBeforeHidden = false; // Reset the flag after resuming
                },4000);

            }
        }
    });

    function formattedTime(audioDuration) {
        const min = Math.floor(audioDuration / 60);
        const sec = Math.floor(audioDuration % 60);

        const fmin = min < 10 ? `0${min}` : min;
        const fsec = sec < 10 ? `0${sec}`: sec;

        return `${fmin?? "00"} : ${fsec?? "00"}`;
    }

    progressTruck.onclick = function (event) {
        const width = progressTruck.clientWidth;
        const clientX = event.offsetX;

        const duration = currentVideoElement.duration;

        currentVideoElement.currentTime = (clientX / width) * duration;
    }

    function showRomanticMessage(duration = 5000) {
        // Array of romantic messages
        const loveQuotesMessages = [
            "Every moment with you, Yasmin, feels like an eternal dream woven in stars. ✨",
            "In your eyes, Yasmin, I see the universe, and in your embrace, I find my home. 🌙",
            "Being loved by you, Yasmin, is the greatest blessing; with you, my heart is always full. 💖",
            "You are the rhythm to my soul, Yasmin, the melody that fills every silent moment. 🎶",
            "My love for you, Yasmin, grows deeper with every heartbeat, and your presence makes my world complete. 💫",
            "To love you, Yasmin, is like dancing on clouds, floating effortlessly through a world of our own. ☁️",
            "In your smile, Yasmin, I find my greatest joy, and in your touch, I feel eternity. 💘",
            "With every breath, Yasmin, I fall more deeply in love with you—an endless symphony of affection. 🎶",
            "You, Yasmin, are my every thought, my every wish, and my forever love. Together, we are timeless. ⏳",
            "The love we share, Yasmin, is a rare treasure, sparkling brighter than the stars in the night sky. 🌟"
        ];
          

        // Pick a random quote from the array
        const randomIndex = Math.floor(Math.random() * loveQuotesMessages.length);
        const message = document.createElement('div');
        message.innerHTML = loveQuotesMessages[randomIndex];
    
        // Add the class for styling
        message.classList.add('romantic-message');
    
        // Append the message to the body or video container
        videoField.appendChild(message);
    
        // Remove the message after 3 seconds
        setTimeout(() => {
            message.remove();
        }, duration);
    }
    
    
});

//-----------------------------------------------------------------------------------------------------------------------


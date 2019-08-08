$(document).ready( function() {

        //This code will run after your page loads
    
    var scoreCount = document.getElementById('scoreCount').value;
    var highscore = document.getElementById('highscore').value;
    
    scoreCount = 0;
    highscore = 0;
    
     // Get the modal
    var modal = document.getElementById('gameoverModal');

    // Get the close icon that closes the modal
    var close = document.getElementsByClassName("close")[0];


    // When the user clicks on (x), close the modal
        close.onclick = function() {
        modal.style.display = "none";
        game_over();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            game_over();
        }
    }
    
    // Array of images
    var pengImages = ["images/penguin_1.png", "images/penguin_2.png", "images/penguin_3.png", "images/penguin_4.png", "images/penguin_5.png", "images/penguin_6.png", "images/penguin_7.png", "images/penguin_8.png", "images/penguin_1.png", "images/penguin_2.png", "images/penguin_3.png", "images/yeti.png"];
    
    //wrapper function
    $('#wrapper').on('click', function(e) {
        
        //After one click the target returns so that multiple clicks do not work. 
          if($(e.target).hasClass('click'))
          {
            return;
          }
          
        //if the target has a class of 'gamepieces' then the array adds the images to the mounds
          if($(e.target).hasClass('gamepieces'))
            {
                var penguin = shuffle(pengImages)[0];
                var str = 'url(' +penguin+ ')';
                
                //images pop up from the css
                $(e.target).css('background-image',str);
                
                $(e.target).addClass('click');
                
                // if the picture is a yeti then Game over. 
                if(penguin === 'images/yeti.png') {
                        
                        var yetiAudio = new Audio('audio/yeti.mp3')
                        yetiAudio.play();
                            
                        gameoverMsg.textContent = "Game Over!!";
                        
                        window.setTimeout(function(){
                        var failAudio = new Audio('audio/fail.mp3')
                        failAudio.play();
                        },50);
                    
                        setTimeout(function() {
                                modal.style.display = "block";
                                console.log('Yaaaaarrrrr!!!!!, Game Over!!');
                            },150);
                    }  
                
                // else the game continues till all the 11 penguins are out. 
                else {
                    
                    var pengAudio = new Audio('audio/Peng.mp3')
                    pengAudio.play();
                    
                    scoreCount += 1;
                    console.log(scoreCount);
                    document.getElementById('scoreCount').value = scoreCount;
                    
                    if(scoreCount > highscore) 
                        {
                        document.getElementById('highscore').value = scoreCount;
                        highscore = scoreCount;
                }
            }
                    pengImages.shift();
                    
                // if the array has all the penguins and not the yeti then win the game
                    var length = pengImages.length;

                    if (length === 1 && penguin !== 'images/yeti.png') {
                        gameoverMsg.textContent = "Congratulations!!";

                        var congratsAudio = new Audio('audio/TADA.mp3')
                        congratsAudio.play();
                        
                        setTimeout(function() {
                                    modal.style.display = "block";
                                    console.log('Congratulations!!, You won!!');
                                    congrats();
                                },150);
                        return;
                    }
        }
    });
    
    // game over function. this function restarts the game if the yeti pops out and game over.  
    function game_over()
    {
        pengImages = ["images/penguin_1.png", "images/penguin_2.png", "images/penguin_3.png", "images/penguin_4.png", "images/penguin_5.png", "images/penguin_6.png", "images/penguin_7.png", "images/penguin_8.png", "images/penguin_1.png", "images/penguin_2.png", "images/penguin_3.png", "images/yeti.png"];
        
        $('.gamepieces').css('background-image', '');
        document.getElementById('scoreCount').value = 0;
        scoreCount = 0;
        
        $('.gamepieces').removeClass('click');
    }
    
    // if the penguins are out in the array, then congrats function is invoked and you win the game. 
    function congrats()
    {
        pengImages = ["images/penguin_1.png", "images/penguin_2.png", "images/penguin_3.png", "images/penguin_4.png", "images/penguin_5.png", "images/penguin_6.png", "images/penguin_7.png", "images/penguin_8.png", "images/penguin_1.png", "images/penguin_2.png", "images/penguin_3.png", "images/yeti.png"];
        
        $('.gamepieces').css('background-image', '');
        document.getElementById('scoreCount').value = 0;
        document.getElementById('highscore').value = 0;
        scoreCount = 0;
        highscore = 0;
        
        $('.gamepieces').removeClass('click');
    }
    
    // shuffle the pictures in the array. 
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        while (0 !== currentIndex)
            {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
        return array;
    }
});




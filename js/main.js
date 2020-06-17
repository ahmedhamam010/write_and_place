
    $(window).on("load", function (e) {
        $(".loader").fadeOut();
    })

    $( function(){

        //scale elements
        resizeElements(false);

        //items array
        var items = [
            {id : 1 , name : "scissors" , answer: "incorrect" },
            {id : 2 ,name : "eraser" , answer: "correct" },
            {id : 3, name : "ruler" , answer: "correct" },
            {id : 4, name : "bag" , answer: "incorrect" },
            {id : 5, name : "pencil case" , answer: "incorrect" },
            {id : 6, name : "pencil" , answer: "correct" },
            {id : 7, name : "book" , answer: "correct" },
            {id : 8, name : "pen" , answer: "correct" },
        ];

        
        $.each(items, function(key, value) {
            //append each item into items-container
            $(".items-container").append(`<span id=${value.id} data-answer=${value.answer}>${value.name}</span>`);
            //print elemnts answers fields according to number of correct answers
            if( value.answer == 'correct' ){ 
                $(".items-answers").append(`<div class="item-answer"></div>`);
            }

        });

        //inital value for item that will be selected
        var carriedItem =  "";

        $(".items-container span").click( function(){
            //remove class selected from all childs
            $(".items-container span").removeClass("selected")
            //add class selected to the element clicked
            $(this).addClass("selected");
            //get text and data-answer from this element
            var value = $(this).text() , 
                dataAnswer = $(this).data("answer") ,
                id = $(this).attr("id");  
            carriedItem = [ id , value , dataAnswer ];
        } );


        //add correct answer to page
        $(".items-answers > div").click( function(){
            //check if item container is filled or not
            if( ! $(this).hasClass("added") ){
                if( carriedItem != "" ){
                    if( carriedItem[2] == 'correct' ){
                        if( $(this).text() == ""  ){
                            var correctIcon = '<img style="vertical-align: middle;height: 30px;" src="images/tikMark-small.png">';
                            $(this).html( `<div style="position:relative">${carriedItem[1]}</div><div>${correctIcon}</div>` );
                            $(this).addClass("added");
                            $(`#${carriedItem[0]}` ).css('visibility' , 'hidden').removeClass("selected");
                            var audio = $("#audio1")[0];
                            audio.play();
                            carriedItem =  "";
                        }
                    }else{
                        var correctIcon = '<img class="wrong-icon" style="vertical-align: middle;height: 20px;" src="images/wrong.png">';;
                        $(this).html(`<div style="position:relative">${carriedItem[1]}</div><div>${correctIcon}</div>`).delay(500).queue(function (next) {
                            $(this).text("");
                            var audio = $("#audio2")[0];
                            audio.play();
                            next();
                        });
                    }
                }
            }
        } );


        //retart game after clicking on restart icon 
        $(".restart").click( function(){
            $(".items-container > span").css("visibility" , "visible").removeClass("selected");
            $(".items-answers > div").text("");

        } );


        //show answers after clicking on show answer icon 
        $(".show-answer").click( function(){
            var  correctAnswers = items.filter( (item) => item.answer == "correct" );
            $(".items-answers > div").text("").removeClass("added");
            for( var i=0 ; i<correctAnswers.length ; i++ ){
                var correctValue = correctAnswers[i].name;
                $(`.items-answers > div:eq(${i})`).text( correctValue ) .addClass("added");
                $("[data-answer='correct']").css("visibility" , "hidden");
            }
            console.log(carriedItem)
        } );


        //start resize window
        // scale elements on window resize
        $(window).resize( function(){
           resizeElements(true);
        } );
        //end resize window

        //calculate footer height
        var wrapHeight =  $(".scaleable-wrapper").innerHeight(),
            specificHeight = $(".very-specific-design .header").innerHeight() ,
            boxHeight =  $(".very-specific-design .box-container").innerHeight() ;
            
            console.log( wrapHeight , specificHeight , boxHeight )
            $(".footer").height( wrapHeight - (specificHeight + boxHeight) )

        //show help dialog     
        $(".help_icon").click( function(){
            $(".help_box").fadeIn();
            $(".overlay").css("display" , "block");    
        } )    
        //close pop up when clicking on close icon
        $(".help_box span img").click( function(){
            $(".popup").fadeOut();
            $(".overlay").css("display" , "none"); 
        } ) 
        
        //show help dialog     
        $(".resourse_icon").click( function(){
            $(".resourse_box").fadeIn();   
            $(".overlay").css("display" , "block"); 
        } )    
        //close pop up when clicking on close icon
        $("span img").click( function(){
            $(".popup").fadeOut();
            $(".overlay").css("display" , "none"); 
        } ) 
       




    } );


    function resizeElements(scalable = false){
        var CurrentWindowSize = $(this).height();
        var $el = $("#very-specific-design");
        var elHeight = $el.outerHeight();
        var elWidth = $el.outerWidth();
        var wrapper = $("#scaleable-wrapper");
        wrapper.css({'height':CurrentWindowSize+'px'});
        function doResize(ui) {
            var scale;
           
            if( scalable == true ){
                scale = Math.min(ui.size.width / elWidth,ui.size.height / elHeight);
               
            } else{
                scale = 1;
            }
            $el.css({
                transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
                });
        }
            var starterData = { 
            size: {
            width: wrapper.width(),
            height: wrapper.height()
            }
            
        }
        
        doResize(starterData);
    
    }


   
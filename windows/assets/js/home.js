//CALL 'package' USING package("package_name", "package_type", "message if applicable");


//SESSIONS
if (sessionStorage.getItem("mycv") == "" || sessionStorage.getItem("mycv") == null){
    $(".splash_screen_1").show();
    setTimeout(function(){
        sessionStorage.setItem("mycv", Math.floor((Math.random() * 1030) + 1) + ""+ new Date().getHours() +""+ new Date().getSeconds());
    }, 15000);
    loading();
} else {
    $(".main_screen").show();
    $(".modal").show();
}

function loading(){
    //LOAD SPLASH SCREEN
    setTimeout(function(){
        $(".splash_screen_1").hide();
        $(".splash_screen_2").show();
        splash_screen_content();
    }, 8000);

    //APPENDER
    setTimeout(function(){
        $(".splash_screen_1 .top_table tr:last-child").show("slow");
        runner();
    }, 1500);
}

//RUNNER
const runner = () => {
    setInterval(function(){
        let data = parseInt($(".runner").attr("data"));
        let max = parseInt($(".runner").html()) +  (Math.round(data / 60));
        if (max < data){
            $(".runner").html(max+"K OK");
        }
    }, 50);
};

//SPLASH SCREEN CONTENT
const splash_screen_content = () => {
    let count = 2;
    let interval = setInterval(function(){
        if (count > 5){
            count = 2;
            clearInterval(interval);
            setTimeout(function(){$(".splash_screen_2 .bottom_table td").html("Completed fetching details, continuing to load Curriculum vitae ...");}, 1000);
        } else if (count == 3){
            setTimeout(function(){$(".splash_screen_2 .middle_table tr:nth-child("+count+")").show(); count++;}, 1000);
        } else if (count == 4){
            setTimeout(function(){
                    $(".splash_screen").hide();
                    $(".main_screen").show();
                    $(".modal").show();
                    count++;
                }, 4000);
        } else {
            $(".splash_screen_2 .middle_table tr:nth-child("+count+")").show();
            count++;
        }
    }, 1000);
};


//ESC PRESSED
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        window.close();
    }
};


//RESIZE
function operation(type){
    switch (type){
        case "resize":
            if ($(".modal").width() < 800){ 
                $(".modal").css("width", "100%");
                $(".modal").css("height", "100%");
            } else {
                $(".modal").css("width", "700px");
                $(".modal").css("height", "70vh");
            }
        break;
        case "restore":
            if ($(".modal").is(":hidden")){
                $(".modal").show();
                $("nav li:first-child").children(".active").css("box-shadow", "inset -1.5px -1.5px 0 0 #fcfcfc, inset 1.5px 1.5px 0 0 #263238, inset -3px -3px 0 0 #cac6cb, inset 3px 3px 0 0 #a099a1");
            } else {
                $(".modal").hide();
                $("nav li:first-child").children(".active").css("box-shadow", "inset -1.5px -1.5px 0 0 #263238, inset 1.5px 1.5px 0 0 #fcfcfc, inset -3px -3px 0 0 #a099a1, inset 3px 3px 0 0 #cac6cb");
            }
        break;
        case "close":
            $(".modal").hide();
            $("nav li:first-child").children(".active").remove();
        break;
        case "modal_screen":
            $(".modal .top_tool_bar").css("background-color","#577783");
        break;
        case "main_screen":
            if ($(".modal").is(":visible")){
                   $(".modal .top_tool_bar").css("background-color","#a099a1");             
            }
        break;
    }
}


//DATE
setInterval(function(){
    let date = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    let time = new Date(date);
    time.getHours() > 12 ? time = time.getHours() - 12 + ":" + time.getMinutes() + "PM" : time = time.getHours() + ":" + time.getMinutes() + "AM";
    $(".time").text(time);
}, 1000);



var userData = {
	name: '',
	email: '',
	html: {likes:[],dislikes:[]},
	css: {likes:[],dislikes:[]},
	js: {likes:[],dislikes:[]},
	strength : {css:'',js:'',html: ''},
	currentQuestion : '#welcome',
    visited:{html:false,css:false,js:false}
};


if(localStorage.getItem("userData"))
    {
        userData=JSON.parse(localStorage.userData);
        console.log(localStorage.getItem("userData"));
        
        document.getElementById("name").value=userData.name.toString();
        document.getElementById("email").value=userData.email.toString();
       
        $('#welcome').hide();
        $(''+userData.currentQuestion).show();
        
        
    }
else
    {
        console.log("B");
        localStorage.setItem('userData',JSON.stringify(userData));
    }

$('#start').click(function(){
	console.log("start");
	$('#welcome').hide();
	$('#q1').fadeIn("slow"); 
	userData.currentQuestion = "#q1";
	localStorage.setItem('userData',JSON.stringify(userData));
});



$('#q1_next').click(function(){
	if($('#name').val() && $('#email').val()){
		userData.name = $('#name').val();
		userData.email = $('#email').val();
		//localStorage.setItem('userData',JSON.stringify(userData));
        var pat= /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	    if(pat.test(userData.email))
        {
            $('#q1').hide();
            $('#q2').fadeIn("slow"); 
            userData.currentQuestion = "#q2";
            localStorage.setItem('userData',JSON.stringify(userData));
        }
        else
        {
          alert("Invalid Email");
        }

}else{
	alert('Enter data into the blank field');
}

});
$('#q2_prev').click(function()
{
    userData.currentQuestion = "#q1";
    localStorage.setItem('userData',JSON.stringify(userData));
    $('#q2').hide();
    $('#q1').fadeIn("slow");
    
});
$('#q2_next').click(function()
{
    userData=JSON.parse(localStorage.userData);
    if(!userData.visited.html)
    {
        alert("Answer HTML questions");    
    }
    else if (!userData.visited.css)
    {
        alert("Answer CSS questions");    
    }
    else if (!userData.visited.js)
    {
        alert("Answer JS questions");    
    }
    else
    {
        userData.currentQuestion = "#q3";
        localStorage.setItem('userData',JSON.stringify(userData));
        $('#q2').hide();
        $('#q3').fadeIn("slow"); 
    }
    
    
});


$('#html_q').click(function()
{
    
	$('#q2').hide();
	$('#q2a').fadeIn("slow");
    
    userData.currentQuestion = "#q2a";
	localStorage.setItem('userData',JSON.stringify(userData));
});

$('#css_q').click(function()
{
	$('#q2').hide();
	$('#q2b').show();
    userData.currentQuestion = "#q2b";
    localStorage.setItem('userData',JSON.stringify(userData));
});

$('#javascript_q').click(function()
{
	$('#q2').hide();
	$('#q2c').fadeIn("slow");
    userData.currentQuestion = "#q2c";
    localStorage.setItem('userData',JSON.stringify(userData));
    
});


$('#html_previous').click(function()
{
	$('#q2a').hide();
	$('#q2').fadeIn("slow");
});

$('#css_previous').click(function()
{
	$('#q2b').hide();
	$('#q2').fadeIn("slow");
});
$('#js_previous').click(function()
{
    $('#q2c').hide();
    $('#q2').fadeIn("slow");
});

$('#html_next').click(function()
{
    if(userData.visited.html && userData.visited.css && userData.visited.js) 
    {
        userData.currentQuestion = "#q3";
        localStorage.setItem('userData',JSON.stringify(userData));
        $('#q2a').hide();
	    $('#q3').fadeIn("slow"); 
    }
    else
    {
            
            $("input:checkbox[name=likesHTML]:checked").each(function(){
            userData.html.likes.push($(this).val());
            });
            $("input:checkbox[name=dislikesHTML]:checked").each(function(){
            userData.html.dislikes.push($(this).val());
            });
            userData.currentQuestion = "#q2";
            userData.visited.html=true;
            localStorage.setItem('userData',JSON.stringify(userData));
            $('#html_q').css("color","black");
            $('#q2a').hide();
            $('#q2').fadeIn("slow");    
    }
    
    
});

$('#css_next').click(function()
{
    if(userData.visited.html && userData.visited.css && userData.visited.js)
    {
        userData.currentQuestion = "#q3";
        localStorage.setItem('userData',JSON.stringify(userData));
        $('#q2b').hide();
	    $('#q3').fadeIn("slow"); 
    }
    else
    {
       
        $("input:checkbox[name=likescss]:checked").each(function(){
        userData.css.likes.push($(this).val());
        });
        $("input:checkbox[name=dislikescss]:checked").each(function(){
        userData.css.dislikes.push($(this).val());
        });
        userData.currentQuestion = "#q2";
        userData.visited.css=true;
        localStorage.setItem('userData',JSON.stringify(userData));
        $('#css_q').css("color","black");
        $('#q2b').hide();
        $('#q2').fadeIn("slow");
    }
    
});

$('#js_next').click(function()
{
    if(userData.visited.html && userData.visited.css && userData.visited.js)
    {
        userData.currentQuestion = "#q3";
        localStorage.setItem('userData',JSON.stringify(userData));
        $('#q2c').hide();
        $('#q3').fadeIn("slow"); 
            
    }
    else
    {
        
        $("input:checkbox[name=likesjs]:checked").each(function(){
        userData.js.likes.push($(this).val());
        });
        $("input:checkbox[name=dislikesjs]:checked").each(function(){
        userData.js.dislikes.push($(this).val());
        });
        userData.currentQuestion = "#q2";
        userData.visited.js=true;
        localStorage.setItem('userData',JSON.stringify(userData));
        $('#javascript_q').css("color","black");
        $('#q2c').hide();
        $('#q2').fadeIn("slow");
    }
   
});

$('#q3_previous').click(function()
{
    
    $('#q3').hide();
    $('#q2').fadeIn("slow");
});
$('#q3_next').click(function()
{
    console.log($("input[name='html_str']:checked").length);
    
    if($("input[name='html_str']:checked").length && $("input[name='css_str']:checked").length && $("input[name='js_str']:checked").length)
    {
        userData.strength.html=$("input[name='html_str']:checked").val();
        userData.strength.css=$("input[name='css_str']:checked").val();
        userData.strength.js=$("input[name='js_str']:checked").val();
        userData.currentQuestion = "#thanks";
        localStorage.setItem('userData',JSON.stringify(userData));
        $('#q3').hide();
        $('#thanks').fadeIn("slow");
            
    }
    else
    {    
        alert("Check Radio boxes!");
    }
    
    
});
$('#show_ans').click(function()
{
     document.getElementById("html_like").innerHTML=userData.html.likes.toString();
     document.getElementById("html_dislike").innerHTML=userData.html.dislikes.toString();

     document.getElementById("css_like").innerHTML=userData.css.likes.toString();
     document.getElementById("css_dislike").innerHTML=userData.css.dislikes.toString();

     document.getElementById("js_like").innerHTML=userData.js.likes.toString();
     document.getElementById("js_dislike").innerHTML=userData.js.dislikes.toString();

     document.getElementById("html_strength").innerHTML="Strength: "+userData.strength.html.toString();
     document.getElementById("css_strength").innerHTML="Strength: "+userData.strength.css.toString();
     document.getElementById("js_strength").innerHTML="Strength: "+userData.strength.js.toString();
    userData.currentQuestion='#q4';
    localStorage.setItem('userData',JSON.stringify(userData));
    
    $('#thanks').hide();
    $('#q4').fadeIn("slow");
});
$('#ans_prev').click(function()
{
    userData.currentQuestion='#thanks';
    localStorage.setItem('userData',JSON.stringify(userData));
    $('#q4').hide();
    $('#thanks').fadeIn("slow");
});
$('#del_ans').click(function(){
    alert("Your Answers have been deleted!");
    window.localStorage.clear();
     userData = {
	name: '',
	email: '',
	html: {likes:[],dislikes:[]},
	css: {likes:[],dislikes:[]},
	js: {likes:[],dislikes:[]},
	strength : {css:'',js:'',html: ''},
	currentQuestion : '#welcome',
    visited:{html:false,css:false,js:false}
    };
    localStorage.setItem('userData',JSON.stringify(userData));
    
    $('#thanks').hide();
    $('#welcome').fadeIn("slow");
});
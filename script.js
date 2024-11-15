let textscr=document.getElementById("text-screen");
let textscr2=document.getElementById("text-screen2");
    function display(num){
        textscr.value += num;
        textscr2.value=eval(textscr.value);
    }
    function clearall(){
        textscr.value = "";
        textscr2.value = "";
    }
    function del(){
        textscr.value=textscr.value.slice(0,-1);
        textscr2.value=eval(textscr.value);
    }
    function calculate(){
        try{
            textscr.value=eval(textscr.value);
            textscr2.value = "";
        }
        catch(error){
            alert("Calculation is not possible");
        }
    }
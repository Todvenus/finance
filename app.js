//Дэлгэцтэй ажиллах 
var uiController = (function(){

})();
// Санхүүтэй ажиллах
var financeController = (function(){

})();
// Програмын холбогч
var appController = (function(uiCtrl, fnCtrl){

    var ctrlAddItem = function(){
        console.log('Section for getting data from display');

    };

    document.querySelector('.add__btn').addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener('keypress' , function(event){
        if(event.Keycode === 13 |  event.which === 13) {
            ctrlAddItem();
        }
    });

   document.querySelector('.add__btn').addEventListener('click', function(){
    
   });      
    
})(uiController, financeController); 
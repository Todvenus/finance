//Дэлгэцтэй ажиллах 
var uiController = (function(){

    var DOMstring = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputAddBtn: ".add__btn"
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                vale: document.querySelector(DOMstring.inputValue).value,
               
            };
        },

        getDOMstring:  function(){
            return DOMstring;
        }
    };

})();
// Санхүүтэй ажиллах
var financeController = (function(){

    var Income = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value;
    };

    var Expence = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value;
    };
    
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    }

})();
// Програмын холбогч
var appController = (function(uiCtrl, fnCtrl){
    var ctrlAddItem = function(){
        console.log(uiController.getInput());

    };

var setupEventListeners = function (){
    var DOM = uiController.getDOMstring();

    document.querySelector(DOM.inputAddBtn).addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener('keypress' , function(event){
        if(event.Keycode === 13 |  UIEvent.which === 13) {
            ctrlAddItem();
        }
    });
}; 

return {
    init: function() {
        console.log('Starting...');
        setupEventListeners();
    }
};
   
})(uiController, financeController); 

appController.init();
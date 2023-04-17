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
                value: document.querySelector(DOMstring.inputValue).value,
               
            };
        },

        getDOMstring:  function(){
            return DOMstring;
        },

        addListItem:  function(item, type) {
            var html, list;
            if(type === 'inc'){
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                list = '.income__list';
            }
            else {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
                list = '.expenses__list';
                }
            html = html.replace('%id%', item.id);
            html = html.replace('%Description%', item.description);
            html = html.replace('%value%', item.value);

            document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    }
    return {
        addItem: function(type, desc, val){
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else {
               id = data.items[type] [data.items[type].length -1 ].id + 1;
            };

            if(type === 'inc'){
                item = new Income (id, desc, val);
            }
            else {
                item = new Expence (id, desc, val);
                }
            data.items[type].push(item);

            return item;
        },
    };

})();
// Програмын холбогч
var appController = (function(uiCtrl, fnCtrl){
    var ctrlAddItem = function(){
        var input = uiController.getInput();
    
    var item = financeController.addItem(input.type, input.description, input.value);

    uiController.addListItem(item, input.type);
        
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
        setupEventListeners();
    }
};
   
})(uiController, financeController); 

appController.init();
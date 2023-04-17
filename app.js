//Дэлгэцтэй ажиллах 
var uiController = (function(){

    var DOMstring = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputAddBtn: ".add__btn",
        incomeList: ".income__list",
        expenceList: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage"
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseInt (document.querySelector(DOMstring.inputValue).value,)               
            };
        },

        getDOMstring:  function(){
            return DOMstring;
        },

        addListItem:  function(item, type) {
            var html, list;
            if(type === 'inc'){
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                list = DOMstring.incomeList;
            }
            else {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
                list = DOMstring.expenceList;
                }
            html = html.replace('%id%', item.id);
            html = html.replace('%Description%', item.description);
            html = html.replace('%value%', item.value);

            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        },

        clearFields: function(){
            var fields = document.querySelectorAll(
                DOMstring.inputDescription + ',' + DOMstring.inputValue
            );

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(el){
                el.value = "";
            });

            fieldsArr[0].focus();
        },

        tusuviigUzuuleh: function(niitTusuv) {
            document.querySelector(DOMstring.budgetLabel).textContent = niitTusuv.tusuv + " ₮";
            document.querySelector(DOMstring.incomeLabel).textContent = niitTusuv.totalInc + " ₮";
            document.querySelector(DOMstring.expenseLabel).textContent = niitTusuv.totalExp + " ₮";
            document.querySelector(DOMstring.percentageLabel).textContent = niitTusuv.huvi + '%';
        }
    };

})();
// Санхүүтэй ажиллах
var financeController = (function(){

    var calculationTotal = function(type) {
        var sum = 0;
        data.items[type].forEach(function(el){
            sum = sum + el.value;
        });
        data.totals[type] = sum;
    };

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
        },

        tusuv: 0,

        huvi: 0
    }
    return {
        tusuvTootsooloh: function(){
            calculationTotal("inc");
            calculationTotal("exp");

             data.tusuv = data.totals.inc -  data.totals.exp;

             data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        },
        tusviigAvah: function(){
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
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
    
    if (input.description !== "" && input.value !== ""){

        var item = financeController.addItem(
            input.type, 
            input.description, 
            input.value);
    
        uiController.addListItem(item, input.type);

        uiController.clearFields();

        financeController.tusuvTootsooloh();

        var tusuv = financeController.tusviigAvah();

        uiController.tusuviigUzuuleh(tusuv);


    }   
    };
var setupEventListeners = function (){
    var DOM = uiController.getDOMstring();

    document.querySelector(DOM.inputAddBtn).addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener('keypress' , function(event){
        if(event.Keycode === 13 |  event.which === 13) {
            ctrlAddItem();
        }
    });
}; 

return {
    init: function() {
        uiController.tusuviigUzuuleh({
            tusuv: 0,
            huvi: 0,
            totalInc: 0,
            totalExp: 0
        });
        setupEventListeners();
    }
};
   
})(uiController, financeController); 

appController.init();
let input = document.querySelector('.meal-input');
let mealList = document.querySelector('#list');
let errorText = document.querySelector('#error-text');
let submit = document.querySelector('.search');
let random = document.querySelector('.random');
let greet = document.querySelector('#greet');


submit.addEventListener('click' , function(){
    if(input.value.length === 0){
        errorText.innerHTML = 'Input can not be Empty !!!';
        mealList.innerHTML='';
        greet.innerHTML='';
        return;
    }
   getMealList();

});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = input.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        // console.log(data.meals);
        if(data.meals){
            data.meals.forEach(meal => {                                              //this idMeal,strMealThumb is taken from json response from mealDB

                html += `                                                            
                
                    <div class = "meal-item" data-id = "${meal.idMeal}">                          
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                
                `;
            });
            greeting();
            errorText.innerHTML = '';
            mealList.classList.remove('notFound');
        } else{
            errorText.innerHTML = '';
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}





function greeting(){
    greet.innerHTML = '<---  I hope ! You like it  --->';
    return;
}





// random search food item
random.addEventListener('click' , function(){

    mealList.innerHTML = '';
    input.value ='';
    errorText.innerHTML = '';
    for(let i =0 ; i<20 ;i++ ){
        
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(data => {
			let html = '';
            console.log(data.meals);
            if(data.meals){
            data.meals.forEach(meal => { 
                    html +=  `  <div class = "meal-item" data-id = "${meal.idMeal}">                          
                                    <div class = "meal-img">
                                        <img src = "${meal.strMealThumb}" alt = "food">
                                    </div>
                                    <div class = "meal-name">
                                        <h3>${meal.strMeal}</h3>
                                    </div>
                               </div>
                    `;           

                    });

            }

            mealList.innerHTML += html;
		});
    }
    
});




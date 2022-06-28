$(function() {
    
    // add varibales
    let newSet=  `
    <div class="exercise__set">
        <div>
            <label for="weight">Weight</label><br>
            <input type="text" name="weight" id="weight" required>
        </div>
        <div>
            <label for="reps">Reps</label><br>
             <input type="text" name="reps" id="reps" required>
        </div>
        <div>
            <label for="rpe">RPE</label><br>
            <input type="text" name="rpe" id="rpe" required>
        </div>
    </div>`;

    // Classes

    class Workout {
        constructor (name){
            this.name = name;
            this.date = new Date();
            this.routine = [];   
        }
         
        addExercise = (exercise) => {
            this.routine.push(exercise);
            return this.routine;
        }
    };

    class Exercise {
        constructor(name) {
            this.name = name;
            this.sets = [];
        };
        
        addSet = (set) => {
            this.sets.push(set);
            return this.sets;
        }
    };
    class Set {
        constructor(weight, reps, rpe) {
            this.weight = weight;
            this.reps = reps;
            this.rpe = rpe;
        }
    };
    
    let workout;
    let edit = false;
    if (window.location.pathname.includes('new-workout')) {
        workout = new Workout();
    };


//light and dark mode   
let viewMode = localStorage.getItem('viewMode') 
loadPreference();
function loadPreference() {
    viewMode;
    if (viewMode == 'defaultDark') {
        $("#checkbox").prop('checked',false);

    }
    else {
        $("#checkbox").prop('checked',true);
        $('body').addClass('lightMode'); 
    }
};
$("#checkbox").on('click', function(){
if($("#checkbox").prop('checked')) {
    localStorage.getItem('viewMode'); 
    localStorage.setItem('viewMode','enableLight');
    $('body').addClass('lightMode');
}
else {
    localStorage.getItem('viewMode'); 
    localStorage.setItem('viewMode', 'defaultDark');
    $('body').removeClass('lightMode');
   
}
});    
// Create Workout Functionality 
    

    //On add exercise make modal visible
    $(document).on('click', '.addexercise', function() {
        edit = false;
        $('.exercise').trigger('reset');
        $('.modal').addClass('show');
        let numSets= $('.exercise__set').length;
        if( numSets > 1 ) {
            $('.exercise__set').not(':first').remove();
        };

    });        
    
    // On x click remove show reset form
    $(document).on('click','.exercise__cancel', function() {
        $('.modal').removeClass('show');   
    });
    // Add set to exercise on add set click 
    $(document).on("click",".exercise__addset", function() { 
        $(".exercise__sets").append(newSet);
    });
    //remove set
    $(document).on("click",".exercise__removeset", function() { 
        if ($('.exercise__set').length > 1) {
            $('.exercise__set').remove(':last')
        }
    }); 


    //add exercise to viewable html, add exercise obj to workout, hide modal
    $('.exercise').on('submit', function(e) {
        e.preventDefault();
        if(edit === false) {    
            let exercise = new Exercise();
                exercise.name = $('.exercise').find('[name="exerciseName"]').val();
                $('.exercise').find('.exercise__set').each(function() {
                    let set = new Set();
                    set.weight = $(this).find('[name="weight"]').val();
                    set.reps = $(this).find('[name="reps"]').val();
                    set.rpe = $(this).find('[name="rpe"]').val();
                    exercise.addSet(set);
                });
            postExercise(exercise);
            workout.routine.push(exercise);
            $('.modal').removeClass('show');
            $('.readExercise').animate({opacity: 1}, 1200);
        }
        else {
            let exercise = new Exercise();
                exercise.name = $('.exercise').find('[name="exerciseName"]').val();
                $('.exercise').find('.exercise__set').each(function() {
                    let set = new Set();
                    set.weight = $(this).find('[name="weight"]').val();
                    set.reps = $(this).find('[name="reps"]').val();
                    set.rpe = $(this).find('[name="rpe"]').val();
                    exercise.addSet(set);
                });
            $('.readExercise').get(edit).remove();
            postExercise(exercise);
            workout.routine[edit] = exercise;
            $('.modal').removeClass('show');
            $('.readExercise').animate({opacity: 1}, 1200);
          
        }
    });
    function postExercise(exercise) {
        let readExercise =`
        <div class="readExercise">
            <div class="readExercise__name">
                <p>${exercise.name}</p>
                <div class='dropdown'tabIndex="-1">
                    <div><i class="fas fa-ellipsis-v"></i></div>
                    <div class='dropdown__options'>
                        <div class='dropdown__options-option removeExercise'>Remove Exercise</div>
                        <hr class="dropdown__options-line">
                        <div class='dropdown__options-option editExercise'>Edit Exercise</div>
                    </div>
                </div>
            </div>
            
            `;
            
            let i = 0;
            for (let set of exercise.sets) {
                i += 1;
                readExercise += `
                    <div class="readExercise__set">
                        <div class='setLabel'>
                            <label for="set">Set</label><br>
                            <p class='info'>${i}</p>
                        </div>
                        <div class='label'>
                            <label for="weight">Weight</label><br>
                            <p class='info'>${set.weight}</p>
                        </div>
                        <div class='label'>
                            <label for="reps">Reps</label><br>
                            <p class='info'>${set.reps}</p>
                        </div>
                        <div class='label'>
                            <label for="rpe">RPE</label><br>
                            <p class='info'>${set.rpe}</p>
                        </div>
                    </div>
                `};
        readExercise += `
        <hr class='readExercise__line'>
        </div>`;                    
        $('.routine').append(readExercise) 
    };


    //remove exercise from viewable html and workout obj
    $(document).on("click",".removeExercise", function() {
        let target = $(this).parents('.readExercise');
        target.fadeOut(800);
        let index = target.index();
        workout.routine.pop(index);
        console.log(workout.routine)
    });
    //edit exercise
    $(document).on("click",".editExercise", function() {
        if (window.location.pathname.includes('view')){
            let myWorkouts = JSON.parse(localStorage.getItem("myWorkouts")) || [];
            let urlParams = new URLSearchParams(window.location.search);
            let id = urlParams.get('id');
            workout = myWorkouts[id];
        };
        let target = $(this).parents('.readExercise');
        let index = target.index();
        edit = index;
        $('.exercise').trigger('reset');
        let numSets= $('.exercise__set').length;
        if( numSets > 1 ) {
            $('.exercise__set').not(':first').remove();
        };
        let exercise = workout.routine[index];
        console.log(workout)
        console.log(workout.routine[index])
        console.log(exercise);
        $('.exercise').find('[name="exerciseName"]').val(exercise.name);
        
        for( let i = 0; i < exercise.sets.length; i++) {
            let set = exercise.sets[i];
            if(i === 0) {
                $('.exercise__set').first().find('[name="weight"]').val(set.weight);
                $('.exercise__set').first().find('[name="reps"]').val(set.reps);
                $('.exercise__set').first().find('[name="rpe"]').val(set.rpe);
            }
            else {
                setInfo = `
                <div class="exercise__set">
                <div>
                    <label for="weight">Weight</label><br>
                    <input type="text" name='weight' required value='${set.weight}'>
                </div>
                    
                <div>
                    <label for="reps">Reps</label><br>
                    <input type="text" name='reps' required value='${set.reps}'>
                </div>
                <div>
                    <label for="rpe">RPE</label><br>
                    <input type="text" name='rpe' required value='${set.rpe}'>
                </div>
            </div>
            `;
            $('.exercise__sets').append(setInfo);
            }

        }
        $('.modal').addClass('show');

    });


        // store in local on save workout press 
    $(document).on("click",".save", function() {
        if(window.location.pathname.includes('new-workout')) {
            workout.name = $('.myWorkout').find('[name="workoutName"]').val()
            if(workout.name === '' ) {
                alert("Please Name Workout")
                return;
            }
            if(workout.routine.length == 0){
                alert("Please Add Exercises")
                return;
            }
            let myWorkouts = JSON.parse(localStorage.getItem("myWorkouts")) || [];
            myWorkouts.push(workout);
            let workoutSerial = JSON.stringify(myWorkouts);
            localStorage.setItem("myWorkouts", workoutSerial);
            window.location.href='saved-workouts/index.html';
        }
        else {  
                let myWorkouts = JSON.parse(localStorage.getItem("myWorkouts")) || [];
                let urlParams = new URLSearchParams(window.location.search);
                let id = urlParams.get('id');
                myWorkouts[id] = workout;
                workout.name = $('.myWorkout').find('[name="workoutName"]').val()
                let workoutSerial = JSON.stringify(myWorkouts);
                localStorage.setItem("myWorkouts", workoutSerial);
                window.location.href='saved-workouts/index.html';
            
        }

    });
//view workout
    if(window.location.pathname.includes('view')) {
        let urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id');
        loadMyWorkouts = JSON.parse(localStorage.getItem("myWorkouts")) || [];
        let myWorkouts= loadMyWorkouts;
        workout = myWorkouts[id];
        $('.workoutName').val(workout.name);
        let date = `${new Date(workout.date).toDateString()}`
        $('.myWorkout__date').append(date)
        showWorkout(workout);
        function showWorkout(workout) {
            let routine = workout.routine;
            if(routine.length === 0) {
                let error = `
                <p class='error'>No Exercises in Routine</p>
                `;
                $('.routine').append(error);
            }
            else {
                for(let exercise of routine) {
                    let append = `
                    <div class="readExercise">
                        <div class="readExercise__name">
                            <p>${exercise.name}</p>
                            <div class='dropdown'tabIndex="-1">
                                <div><i class="fas fa-ellipsis-v"></i></div>
                                <div class='dropdown__options'>
                                    <div class='dropdown__options-option removeExercise'>Remove Exercise</div>
                                    <hr class="dropdown__options-line">
                                    <div class='dropdown__options-option editExercise'>Edit Exercise</div>
                                </div>
                            </div>
                        </div>`;
                        i=0;
                    for (let set of exercise.sets) {
                        i+=1;
                        append += `
                            <div class="readExercise__set">
                                <div class='setLabel'>
                                    <label for="set">Set</label><br>
                                    <p class='info'>${i}</p>
                                </div>
                                <div>
                                    <label for="reps">Reps</label><br>
                                    <p>${set.reps}</p>
                                </div>
                                <div>
                                    <label for="weight">Weight</label><br>
                                    <p>${set.weight}</p>
                                </div>
                                <div>
                                    <label for="rpe">RPE</label><br>
                                    <p>${set.rpe}</p>
                                </div>
                            </div>
                        `;  
                    };
                    append += `
                    <hr class='readExercise__line'>
                    </div>`;
                    $('.routine').append(append);
                    $('.readExercise').animate({opacity: 1}, 1200);
                };
                let buttons = `
                <div class="buttons">
                    <button class="addexercise">ADD EXERCISE</button>
                    <button class="save">UPDATE WORKOUT</button>
                    <button class='removeWorkout'><i class="fas fa-times"></i></button>
                </div>`;
                $('.myWorkout').append(buttons);
            };
            $('.removeWorkout').on('click', function(){
                myWorkouts.pop(workout);
                let workoutSerial = JSON.stringify(myWorkouts);
                localStorage.setItem("myWorkouts", workoutSerial);
                window.location.href='saved-workouts/index.html';
    
            });
        };
        
    }




    

    
        


    

});

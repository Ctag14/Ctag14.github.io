// showWorkout


//Saved Workouts Functionality
let loadMyWorkouts;
if (window.location.pathname.includes('saved-workouts')) {
    loadWorkouts();
    $('.workout').animate({opacity: 1}, 1200);
};


// Show save workouts
function loadWorkouts() {
    loadMyWorkouts = JSON.parse(localStorage.getItem("myWorkouts")) || [];
    let myWorkouts= loadMyWorkouts;
    i=0;
    for( let workout of myWorkouts) {
        let url = new URL('http://127.0.0.1:5500//saved-workouts/view.html');
        url.searchParams.append('id',i );
        let totalVolume = 0;
        let volumeInfo = "";
        let exerciseInfo = "";
        for( let exercise of workout.routine) {
            let setVolume = exercise.sets.length
            totalVolume += setVolume;
            exerciseInfo +=`
                <div>${exercise.name}</div>
            `;
            volumeInfo +=`
                <div>${setVolume}</div>
            `;
        };
        let id = `
         <a class='link'href='${url}'><div class='workout'>
            <div class='workout__name'>${workout.name}</div><br>
            <div class='workout__date'>${new Date(workout.date).toLocaleDateString(undefined,{day:'numeric', month: 'short'})}</div>  
            
            <div class= 'workout__volume'>
                <div class='workout__volume-header'>Total Volume</div>
                <div class='workout__volume-count'>${totalVolume} Sets</div>
            </div>

            <div class='exerciseCompressed'>
                <div class ='exerciseCompressed__exercise'>
                    <div class ='exerciseCompressed__exercise-header'>Exercise</div>
                    <div class ='exerciseCompressed__exercise-info'>${exerciseInfo}</div>
                </div>
                <div class ='exerciseCompressed__volume'>
                    <div class = 'exerciseCompressed__volume-header'> Set Volume</div>
                    <div class = 'exerciseCompressed__volume-info'>${volumeInfo}</div>
                </div>
            </div>
        </div></a>`;
    $('.savedWorkouts').append(id)
    i+=1;        
    }; 
           
};

//show selected workout

// //select workout on click 
// $(document).on('click', '.workout', function(){
//     let i = $(this).index();
//     workout = loadMyWorkouts[i];
//     $('.savedWorkouts').remove();
//     let title = `
//         <div class='title'>
//             <div>${workout.name}</div><br>
//             <div class='date'>${new Date(workout.date).toDateString()}</div>
            
//         </div>`;
//     $('.myWorkout').append(title);
//     showWorkout(workout);
//     console.log(workout)
// });
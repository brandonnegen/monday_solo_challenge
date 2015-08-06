var studentArray = [];//empty array ready for student names
var groupTotal = 0;//group number to be changed after clicking the group number button

function createButtons(){//adds group number buttons to the DOM
    for(i = 2; i <= 11; i++){
        var button = '<button class="group-number btn btn-primary btn-lg raised" data-number=' + [i] + '>' + i + '</button>';//used data-number in order properly link up the button click with how many groups to create
        $('.group-amount').append(button);
    }
}

function createGroups(){//uses the newly formed groupTotal to dynamically append groups based on button click
    for(var i = 1; i <= groupTotal; i++){
        $('.display-groups').append('<h2 class=" col-md-2 teams' + i + '">Team: ' + [i] + '</h2>');
    }
}

function displayStudents(array){//sends the shuffled studentArray to display on the DOM
    var groupIndex = 1;
    for(i = 1; i < array.length; i++){
        $('.teams' + groupIndex).append('<li class="student-list">' + studentArray[i] + '</li>');
        $('.teams' + groupIndex + ' li').last().hide().delay(400 * i).slideDown(200);//tells each li element appended to fadeIn one after the other
        if (groupIndex < groupTotal){//this if else statement makes the li append in order from group 1, 2, 3, ect. in incrementing order and then start over back at group 1 when the last group is populated
            groupIndex++;
        } else {
            groupIndex = 1;
        }
    }
}

function shuffleStudents(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -=1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function getData(){//ajax call retrieving student name from json
    $.ajax({
        url: "/data",
        success: function(data){
            $.each(data, function(){
               studentArray.push(this.name);//pushes each student name into the empty array at top
            });
            createButtons();
        }
    });
}

$(document).ready(function (){
    getData();
    $('.group-amount').on('click', '.group-number', function(){
       groupTotal = $(this).data('number');//give groupTotal a new value based on which button you clicked 2-11
    });
    $('#randomizer').on('click', function(){//makes it work
        shuffleStudents(studentArray);
        createGroups(studentArray);
        displayStudents(studentArray);
    });
});



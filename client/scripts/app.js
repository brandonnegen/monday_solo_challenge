var studentArray = [];
var groupTotal = 0;

function createButtons(){
    for(i = 2; i <= 11; i++){
        var button = '<button class="group-number" data-number=' + [i] + '>' + i + '</button>';
        $('.group-amount').append(button);
    }
}

function createGroups(){
    for(var i = 2; i <= groupTotal; i++){
        $('.display-groups').append('<div class="teams' + i + '">Team: ' + [i] + '</div>');
    }
}

function displayStudents(array){

    var groupIndex = 2;
    for(i = 2; i < array.length; i++){
        $('.teams' + groupIndex).append('<p>' + studentArray[i] + '</p>');
        if (groupIndex < groupTotal){
            groupIndex++;
        } else {
            groupIndex = 2;
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

function getData(){
    $.ajax({
        url: "/data",
        success: function(data){
            $.each(data, function(){
               studentArray.push(this.name);
            });
            createButtons();
            //createGroups();
        }
    });
}

$(document).ready(function (){
    getData();
    $('.group-amount').on('click', '.group-number', function(){
       groupTotal = $(this).data('number');
        console.log(groupTotal);
    });
    $('#randomizer').on('click', function(){
        shuffleStudents(studentArray);
        createGroups(studentArray);
        displayStudents(studentArray);
       console.log('shuffling: ' + studentArray);
    });
});



$(function(){

    var anim_id;


    //saves objects to vars

    var container = $('#road-container');
    var car = $('#car');
    var car_1 = $('#car-1');
    var car_2 = $('#car-2');
    var car_3 = $('#car-3');
    var line_1 = $('#line-1');
    var line_2 = $('#line-2');
    var line_3 = $('#line-3');
    var reset_div = $('#reset-div');
    var reset = $('#reset');
    var score = $('#score');
    var hazard_1 = $('#hazard-1');
    var hazard_2 = $('#hazard-2');
    var hazard = $('#hazard');

    //initial setup

    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());
    var hazard_width = parseInt(hazard.width());

    //additional declarations

    var game_over = false;
    var score_counter = 1;
    var speed =  2;
    var line_speed = 5;
    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;



    //////////////////////////////////////GAME CODE STARTS HERE////////////////////////////////////////////

    // key presses 
    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    // move the car 
    function left() {
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }

    // animate
    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3) || collision(car, hazard_1) || collision(car, hazard_2)) {
            stop_the_game();
            return;
        }

        score_counter++;

        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
        }
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
            
        }
    

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);
        hazard_down(hazard_1);
        hazard_down(hazard_2);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        anim_id = requestAnimationFrame(repeat);
        
    }

    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

    function hazard_down(hazard) {
        var hazard_current_top = parseInt(hazard.css('top'));
        if (hazard_current_top > container_height) {
            hazard_current_top = -200;
            var hazard_left = parseInt(Math.random() * (container_width - hazard_width));
            hazard.css('left', hazard_left);
        }
        hazard.css('top', hazard_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    reset.click(function() {
        location.reload();
    });

    function stop_the_game() {
        hscore = score_counter;
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        reset_div.slideDown();
        reset.focus();
    }

     // colition detection

     function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }


    //////////////////////////////////////GAME CODE ENDS HERE////////////////////////////////////////////

   


});
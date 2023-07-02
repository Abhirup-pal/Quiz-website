let correct_answers = 0, wrong_answers = 0;
let total_ques = 1;
let current_ques = 1;
let score = 0;
let skip = 1;
let finish = document.getElementById('finish');
let ans_val = '';
let password = 'Password';
let wrong_color = '#ee0f0f', correct_color = '#0fee0f';
let question_container_color = 'rgb(82, 172, 207)', qcard_color = 'rgb(155, 206, 226)';
let total_time = 300; //total time in seconds


//getting questions from localstorage
let ques_array = [];

ques_array = localStorage.getItem('question_array');
if (ques_array != null) {
    ques_array = JSON.parse(ques_array);
    Array.from(ques_array).forEach(element => {
        total_ques++;
        let newdiv = document.createElement('div');
        let question = document.createElement('div');
        let ques_cont = document.getElementById('ques_cont_child');
        let option_div = document.createElement('div');
        let correctans = element.correct_ans;
        question.innerHTML = element.ques;
        question.classList.add('question');
        newdiv.appendChild(question);
        for (let i = 0; i < 4; i++) {
            if (i != correctans - 1) {
                let one_option = document.createElement('div');
                one_option.innerHTML = '<input type="radio" name="q1" value="wa" onclick=change_skip(this.value)><label>' + element.opt[i] + '</label>';
                one_option.classList.add('option');
                one_option.classList.add('wa');
                option_div.appendChild(one_option);

            }
            else {
                let one_option = document.createElement('div');
                one_option.innerHTML = '<input type="radio" name="q1" value="ca" onclick=change_skip(this.value)><label>' + element.opt[i] + '</label>';
                one_option.classList.add('option');
                one_option.classList.add('ca');
                option_div.appendChild(one_option);
            }
        }
        let skip_button = document.createElement('div');
        skip_button.innerHTML = '<input type="radio" name="q1" value="skip" onclick=change_skip(this.value)><label>Skip this question</label>';
        skip_button.classList.add('skip_option');
        skip_button.classList.add('option');
        option_div.appendChild(skip_button);
        newdiv.appendChild(option_div);
        newdiv.style.display = 'none';
        newdiv.id = 'question' + (total_ques);
        newdiv.classList.add('qcard');
        newdiv.style.display = 'none';
        ques_cont.appendChild(newdiv);
    });
}

//getting number of questions and amount of time given
document.getElementById('number_of_questions').innerHTML = 'YOU WILL HAVE '+total_time+' SECONDS TO ANSWER ALL THE ' + total_ques + ' QUESTIONS <BR>';

let time_give=localStorage.getItem('time_given');
if(time_give!=null){
    //error
    console.log(typeof(time_give))
    let t=parseInt(time_give)
    console.log(typeof(t));
    console.log(isNaN(t))
    if(!isNaN(t))
        total_time=t;
}

document.getElementById('score_display').innerHTML += ('/ ' + total_ques * 4);


function start() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('question' + 1).style.display = 'flex';
    document.getElementById('finish').style.display = 'flex';
    document.getElementById('clock').style.display = 'flex';
    document.getElementById('score_display').style.display = 'flex';
    const intvl = setInterval(() => {
        total_time=Number(total_time);
        document.getElementById('clock').innerHTML = "REMAINING TIME : " + parseInt(total_time / 60) + " : " + total_time % 60 + '<br>';
        total_time--;
        if (total_time < 15) {
            document.getElementById('clock').style.background = "red";
        }
        if (total_time <= 0) {
            document.getElementById('question' + current_ques).style.display = 'none';
            document.getElementById('score_display').style.display = 'none';
            document.getElementById('clock').style.display = 'none';
            document.getElementById('finish').style.display = 'none';
            document.getElementById('question_container').style.background = qcard_color;
            let final_score = document.getElementById('final_score');
            final_score.style.display = 'flex';
            final_score.innerHTML = 'YOUR FINAL ' + document.getElementById('score_display').innerHTML;
            final_score.innerHTML += '<BR><BR> THANK YOU!'
        }
    }, 999);
}

function change_skip(val) {
    skip = 0;
    ans_val = val;
    finish.innerText = 'SUBMIT';
    if (ans_val == "skip") {
        skip = 1;
        finish.innerText = 'SKIP'
    }
    // console.log(skip, ans_val);
}

function send_back_to_home() {
    document.getElementById('question_container').style.display = 'flex';
    // document.getElementById('score_display').style.display = 'flex';
    document.getElementById('question_input').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
}


finish.addEventListener('click', function funish() {
    if (current_ques < total_ques && skip == 1) {
        document.getElementById('question' + current_ques).style.display = 'none';
        current_ques++;
        document.getElementById('question' + (current_ques)).style.display = 'flex';
        document.getElementById('question_container').style.background = question_container_color;
        Array.from(document.getElementsByClassName('wa')).forEach(
            function (element) {

                element.style.background = qcard_color;
                element.addEventListener('mouseover', function () {
                    element.style.background = 'rgb(6, 81, 83)';
                }
                );
                element.addEventListener('mouseout', function () {
                    element.style.background = qcard_color;
                }
                );
            }
        )
        Array.from(document.getElementsByClassName('ca')).forEach(
            function (element) {

                element.style.background = qcard_color;
                element.addEventListener('mouseover', function () {
                    element.style.background = 'rgb(6, 81, 83)';
                }
                ),
                    element.addEventListener('mouseout', function () {
                        element.style.background = qcard_color;
                    }
                    );
            }
        )
        Array.from(document.getElementsByTagName('input')).forEach(element => {
            element.style.display = 'inline';
        });
    }
    else if (current_ques == total_ques && skip == 1) {
        document.getElementById('question' + total_ques).style.display = 'none';
        document.getElementById('score_display').style.display = 'none';
        document.getElementById('finish').style.display = 'none';
        document.getElementById('question_container').style.background = qcard_color;
        document.getElementById('clock').style.display = 'none';
        let final_score = document.getElementById('final_score');
        final_score.style.display = 'flex';
        final_score.innerHTML = 'YOUR FINAL ' + document.getElementById('score_display').innerHTML;
        final_score.innerHTML += '<BR><BR> THANK YOU!'
    }
    else if (skip == 0) {

        Array.from(document.getElementsByClassName('wa')).forEach(
            function (element) {
                element.style.background = wrong_color;
            }
        )
        Array.from(document.getElementsByClassName('ca')).forEach(
            function (element) {
                element.style.background = correct_color;
            }
        )
        Array.from(document.getElementsByTagName('input')).forEach(element => {
            element.style.display = 'none';
        });
        let commentdiv = document.getElementById('comment');
        if (ans_val == 'wa') {
            document.getElementById('question_container').style.background = wrong_color;
            wrong_answers++;
            commentdiv.innerText = "OOPS! That's a wrong answer! :("
            commentdiv.style.display = 'block';
            setTimeout(() => {
                commentdiv.style.display = 'none';
            }, 2000);
            score -= 1;
            document.getElementById('score_display').innerText = 'SCORE : ' + score + ' / ' + (total_ques * 4);

        }
        else if (ans_val == 'ca') {
            document.getElementById('question_container').style.background = correct_color;
            correct_answers++;
            commentdiv.innerText = "GREAT JOB! CORRECT ANSWER! :)"
            commentdiv.style.display = 'block';
            setTimeout(() => {
                commentdiv.style.display = 'none';
            }, 2000);
            score += 4;
            document.getElementById('score_display').innerText = 'SCORE : ' + score + ' / ' + (total_ques * 4);
        }
        finish.innerText = 'NEXT';
        skip = 1;
    }
})

function save_time() {
    let time =(document.getElementById('input_time').value);
    if (time == "" || isNaN(time))
        alert('INVALID INPUT');
    else {
        total_time =Number(time);
        let time_given=localStorage.getItem('time_given');
        if(time_given!=null)
        {
            localStorage.removeItem('time_given');
        }
        localStorage.setItem('time_given',JSON.stringify(time))
        document.getElementById('input_time').value = '';
        document.getElementById('comment_time').innerHTML = "Time updated to " + time + "seconds successfully";
        document.getElementById('comment_time').style.display='block';
        setTimeout(() => {
            document.getElementById('comment_time').style.display='none';
        }, 3000);

    }
}

//edit questions (incomplete)
// function del_edit() {

// }

//add questions operation using quesion objects
let ques_obj = new Object();
ques_obj.ques = "";
ques_obj.opt = new Array();
for (let i = 0; i < 4; i++)
    ques_obj.opt[i] = "";
ques_obj.correct_ans = 0;

function add_question() {
    let input_password = prompt('Enter the password to add questions :');
    if (input_password == password) {
        document.getElementById('question_container').style.display = 'none';
        document.getElementById('score_display').style.display = 'none';
        document.getElementById('question_input').style.display = 'flex';
        document.getElementById('finish').style.display = 'none';
        document.getElementById('instructions').style.display = 'none';
        ques_obj.ques = "";
        ques_obj.opt = new Array();
        for (let i = 0; i < 4; i++)
            ques_obj.opt[i] = "";
        ques_obj.correct_ans = 0;
    }
    else {
        alert('Wrong password!');
    }
}
let correctans = 0;
function fetchval(val) {
    correctans = Number(val);
}
function addques_btn() {
    total_ques++;
    ques_obj.ques = document.getElementById('question_inp').value;
    ques_obj.opt[0] = document.getElementById('o1input').value;
    ques_obj.opt[1] = document.getElementById('o2input').value;
    ques_obj.opt[2] = document.getElementById('o3input').value;
    ques_obj.opt[3] = document.getElementById('o4input').value;
    // console.log(ques_obj);
    ques_obj.correct_ans = correctans;
    if (correctans == 0) {
        alert('PLEASE SELECT THE CORRECT OPTION');
    }
    else {
        let ques_array = [];
        if (localStorage.getItem('question_array') != null) {
            ques_array = localStorage.getItem('question_array');
            ques_array = JSON.parse(ques_array);
        }
        else localStorage.setItem('question_array', '');
        ques_array.push(ques_obj);
        localStorage.removeItem('question_array');
        localStorage.setItem('question_array', JSON.stringify(ques_array));
        let newdiv = document.createElement('div');
        let question = document.createElement('div');
        let ques_cont = document.getElementById('ques_cont_child');
        let option_div = document.createElement('div');
        question.innerHTML = ques_obj.ques;
        question.classList.add('question');
        newdiv.appendChild(question);
        for (let i = 0; i < 4; i++) {
            if (i != correctans - 1) {
                let one_option = document.createElement('div');
                one_option.innerHTML = '<input type="radio" name="q1" value="wa" onclick=change_skip(this.value)><label>' + ques_obj.opt[i] + '</label>';
                one_option.classList.add('option');
                one_option.classList.add('wa');
                option_div.appendChild(one_option);
            }
            else {
                let one_option = document.createElement('div');
                one_option.innerHTML = '<input type="radio" name="q1" value="ca" onclick=change_skip(this.value)><label>' + ques_obj.opt[i] + '</label>';
                one_option.classList.add('option');
                one_option.classList.add('ca');
                option_div.appendChild(one_option);
            }
        }
        let skip_button = document.createElement('div');
        skip_button.innerHTML = '<input type="radio" name="q1" value="skip" onclick=change_skip(this.value)><label>Skip this question</label>';
        skip_button.classList.add('skip_option');
        skip_button.classList.add('option');
        option_div.appendChild(skip_button);
        newdiv.appendChild(option_div);
        newdiv.style.display = 'none';
        newdiv.id = 'question' + (total_ques);
        newdiv.classList.add('qcard');
        newdiv.style.display = 'none';
        ques_cont.appendChild(newdiv);

        document.getElementById('question_inp').value = '';
        document.getElementById('o1input').value = '';
        document.getElementById('o2input').value = '';
        document.getElementById('o3input').value = '';
        document.getElementById('o4input').value = '';
        let comment = document.getElementById('comment_in_add');
        comment.innerHTML = 'QUESTION ADDED SUCCESSFULLY!';
        comment.style.display='block';
        setTimeout(() => {
            comment.style.display = 'none';
        }, 3000);
    }
}

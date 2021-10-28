//학번 : 201827035
//이름 : 홍희승
/*
*----------------------------------------------------------------------------
* 1. 하노이탑 구현
* div를 한번 클릭한 경우 Selected로, 두번클릭하면 Deselected로 전환
* Selected된 div가 있을때 다른 div를 선택할 경우 블록을 해당 div으로 이동
* 클릭하여 Selected 상태로 바뀐 창은 각각 다른색으로 하이라이트 하게 하시오
*
* 2. 예외처리 : Undo로 하시오
* -> 잘못된 블록이 일단 이동된 후 경고창을 닫을경우 원상복구하기
**
*----------------------------------------------------------------------------
*/

class node{
  constructor(data, value) {
    this.data = data;
    this.value = value;
  }
}


class Stack{
  constructor(num) {
    this.val = new Array(num);
    this.stack_arr = new Array(num);
    this.stack_length = num;
    this.stack_current_item_index = 0;;
  }
  push(node) {

    if(this.stack_current_item_index < this.stack_length)
      {
      this.stack_arr[this.stack_current_item_index] = node.data;
      this.val[this.stack_current_item_index] = node.value;
      this.stack_current_item_index++;
      }else{
          throw "Exception : Stack Overflow!"
      }

  }
  pop() {
    if(this.stack_current_item_index > 0)
    {
      let result = this.stack_arr[this.stack_current_item_index-1];
      /*index가 push가 마지막으로 동작했을 때 +1만큼
      증가되었으므로 -1해줘야함 */
      this.stack_current_item_index--;
      return new node(result,this.val[this.stack_current_item_index]);
    }else{
      throw "Exception : Stack Underflow!"
    }

  }
  length()
  {
    return this.stack_current_item_index;
  }
  value()
  {
    if(this.stack_current_item_index == 0)
    {
      return 7;
    }else {
      return this.val[this.stack_current_item_index-1];
    }
  }

}

class Queue {
  constructor(num) {
    this.stack1 = new Stack(num);
    this.stack2 = new Stack(num);
    this.queue_length = num;
    this.queue_current_item_index = 0;
  }
  enqueue(item) {
    this.stack1.push(item);
    this.queue_current_item_index++;
  }
  dequeue() {

      let length = this.stack1.length();
      if(this.stack2.length() == 0)
      {
          for(let i=0;i<length;i++)
          this.stack2.push(this.stack1.pop());
      }

      this.queue_current_item_index--;

      return this.stack2.pop();


  }
  length()
  {
    return this.queue_current_item_index;
  }
}


function reset() {

let l_length = arrLeft.length();
let r_length = arrRight.length();
let rr_length = arrRightRight.length();

  for(let i=0; i<l_length; i++)
    {
      arrLeft.pop();
    }
  for(let i=0; i<r_length; i++)
    {
      arrRight.pop();
    }
  for(let i=0; i<rr_length; i++)
    {
      arrRightRight.pop();
    }



    arrLeft.push(new node("🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥",6));
    arrLeft.push(new node("🟨🟨🟨🟨🟨🟨🟨🟨🟨",5));
    arrLeft.push(new node("🟩🟩🟩🟩🟩🟩🟩",4));
    arrLeft.push(new node("🟦🟦🟦🟦🟦",3));
    arrLeft.push(new node("🟪🟪🟪",2));
    arrLeft.push(new node("⬛",1));



  Draw();
}

function Draw() {

  var div = document.getElementsByClassName("div");
  while ( div[0].hasChildNodes() ) {
    div[0].removeChild( div[0].firstChild );
  }
  while ( div[1].hasChildNodes() ) {
    div[1].removeChild( div[1].firstChild );
  }
  while ( div[2].hasChildNodes() ) {
    div[2].removeChild( div[2].firstChild );
  }


  for (var i = arrLeft.length()-1; i >= 0; i--) {
    var paragraph = document.createElement("p");
    var content = document.createTextNode(arrLeft.stack_arr[i]);
    paragraph.appendChild(content);
    div[0].appendChild(paragraph);
  }

  for (var i = arrRight.length()-1; i >= 0; i--) {
    var paragraph = document.createElement("p");
    var content = document.createTextNode(arrRight.stack_arr[i]);
    paragraph.appendChild(content);
    div[1].appendChild(paragraph);
  }

  for (var i = arrRightRight.length()-1; i >= 0; i--) {
    var paragraph = document.createElement("p");
    var content = document.createTextNode(arrRightRight.stack_arr[i]);
    paragraph.appendChild(content);
    div[2].appendChild(paragraph);
  }

}

function skyblue() {
  if(touch_first){
    document.getElementById('first').style.backgroundColor = "#ffffff";
    touch_first = false;
  }else {
    document.getElementById('first').style.backgroundColor = "red";
    touch_first = true;
    if (touch_second) {
      if (arrLeft.value()>arrRight.value()) {
          arrLeft.push(arrRight.pop());
      }else {
          alert("이동할 수 없습니다.");
      }
      document.getElementById('first').style.backgroundColor = "#ffffff";
      document.getElementById('second').style.backgroundColor = "#ffffff";
      touch_first = false;
      touch_second = false;
    }
    if (touch_third) {
      if (arrLeft.value()>arrRightRight.value()) {
          arrLeft.push(arrRightRight.pop());
      }else {
          alert("이동할 수 없습니다.");
      }
      document.getElementById('first').style.backgroundColor = "#ffffff";
      document.getElementById('third').style.backgroundColor = "#ffffff";
      touch_first = false;
      touch_third = false;
    }
  }

  Draw();

}

function lightblue() {
  if(touch_second){
    document.getElementById('second').style.backgroundColor = "#ffffff";
    touch_second = false;
  }else {
    document.getElementById('second').style.backgroundColor = "green";
    touch_second = true;
    if(touch_first){
      if (arrRight.value()>arrLeft.value()) {
          arrRight.push(arrLeft.pop());
      }else {
          alert("이동할 수 없습니다.");
      }
      document.getElementById('first').style.backgroundColor = "#ffffff";
      document.getElementById('second').style.backgroundColor = "#ffffff";
      touch_first = false;
      touch_second = false;
    }
    if(touch_third){
      if (arrRight.value()>arrRightRight.value()) {
          arrRight.push(arrRightRight.pop());
      }else {
          alert("이동할 수 없습니다.");
      }
      document.getElementById('third').style.backgroundColor = "#ffffff";
      document.getElementById('second').style.backgroundColor = "#ffffff";
      touch_second = false;
      touch_third = false;
    }
  }

  Draw();
}


function gray(){
  if(touch_third){
    document.getElementById('third').style.backgroundColor = "#ffffff";
    touch_third = false;
  }else {
    document.getElementById('third').style.backgroundColor = "blue";
    touch_third = true;
    if (touch_first) {
      if (arrRightRight.value()>arrLeft.value()) {
          arrRightRight.push(arrLeft.pop());
      }else {
          alert("이동할 수 없습니다.");
      }
      document.getElementById('first').style.backgroundColor = "#ffffff";
      document.getElementById('third').style.backgroundColor = "#ffffff";
      touch_first = false;
      touch_third = false;
    }
    if(touch_second){
      if (arrRightRight.value()>arrRight.value()) {
          arrRightRight.push(arrRight.pop());
      }else {
          alert("이동할 수 없습니다.");
      }
      document.getElementById('third').style.backgroundColor = "#ffffff";
      document.getElementById('second').style.backgroundColor = "#ffffff";
      touch_second = false;
      touch_third = false;
    }
  }

  Draw();
}

var arrRightRight;
var arrRight;
var arrLeft;

var touch_first = false;
var touch_second  = false;
var touch_third  = false;

window.onload = ()=>{
  arrRight = new Stack(6);
  arrLeft = new Stack(6);
  arrRightRight = new Stack(6);
    reset();

  var reset_Button = document.getElementById('reset');
  reset_Button.addEventListener('click', reset);
  var skb = document.getElementById('first');
  skb.addEventListener('click', skyblue);
  var lib = document.getElementById('second');
  lib.addEventListener('click', lightblue);
  var gr = document.getElementById('third');
  gr.addEventListener('click', gray);

}

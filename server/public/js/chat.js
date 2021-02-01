//Make connection
var socket=io.connect("http://localhost:5000");
socket.on('connection',()=>{
  console.log(socket.connected);
})

//Query DOM
var message=document.getElementById('message');
var from=document.getElementById('from');
var to=document.getElementById('to');
var handleFrom=document.getElementById('handleFrom');
var handleTo=document.getElementById('handleTo');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');
var prev=document.getElementById('prev');

window.onload=function(){
 var obj=JSON.parse(prev.value);
 var arr=[];
 for(var i in obj)
 arr.push(obj[i]);
  console.log(arr);
  arr.forEach((data)=>{
    if(from.value===data.from)
    output.innerHTML+='<p><strong>'+handleFrom.value.substring(5)+':</strong>'+data.content +'</p>'
    else
    output.innerHTML+='<p><strong>'+handleTo.value.substring(3)+':</strong>'+data.content +'</p>'

});

}




//emit events
btn.addEventListener("click",function(){
  socket.emit('chat',{
    message:message.value,
    handleFrom:handleFrom.value,
    from:from.value,
    to:to.value
  });
});

message.addEventListener("keypress",function(){
  socket.emit("typing",handleFrom.value)
})

//Listen for events
socket.on('chat',function(data){
  feedback.innerHTML="";
  output.innerHTML+='<p><strong>'+data.handleFrom.substring(5)+':</strong>'+data.message +'</p>'

})
socket.on("typing",function(data){
   feedback.innerHTML='<p><em>'+data+' is typing a message</em></p>'
})

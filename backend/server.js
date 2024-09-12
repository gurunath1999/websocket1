const express=require('express')
const WebSocket=require('ws')

const wss=new WebSocket.Server({port:8080})

wss.on('connection',(socket)=>{
socket.on('message',(message,isBinary)=>{
    console.log(`received message ${message}`)


wss.clients.forEach((client)=>{
  if(client.readyState===WebSocket.OPEN)  {
    client.send(message, { binary: isBinary });
    console.log(message)
  }
})})
})
console.log('server connected')
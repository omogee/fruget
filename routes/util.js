let users =[]
let typingUsers =[]
function addUser (id,userId){
    const user= {id,userId}
    if(users.length === 0){
    users.push(user)
    console.log("users",users)
    return user
    }else{   
        for (var i =0; i<users.length; i++){
            if( users[i].userId === userId){
                return user;
            }
            users.push(user)
    console.log("users",users)
    return user
        }
    }    
}  
function addTypingUser (id,sender,reciept){
    const user= {id, sender,reciept}
    if(typingUsers.length === 0){
    typingUsers.push(user)
    console.log("typingUsers",typingUsers)
    return user
    }else{
        for (var i =0; i<typingUsers.length; i++){
            if( typingUsers[i].sender === sender){
                return user;
            }
            typingUsers.push(user)
    console.log("typingUsers",typingUsers)
    return user
        }
    } 
}
function removeUser (id){
    const userIndex = users.findIndex(user => user.id === id)
        if(userIndex !== -1){
      //   return users.splice(userIndex,1)[0]
         return users.splice(userIndex,1)[0]
        }
}

function getCurrentUser (id){
    return users.find(user => user.id === id)
}
function getreciept(userId){    
    console.log("User",users)
    return users.find(user => user.userId == userId)
}
function formatMessage(message){ 
    let d = new Date();       
    const time = `${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? "pm" : "am"}`   
    const currentTime = d.getTime(); 
  return {  
      message,
      time :currentTime
  }
}

function getConnectedUsers(){
    let userArray = []
    for (var i =0; i<users.length; i++){
        userArray.push(users[i].userId)
    }
    return userArray
}
function getTypingUsers(userId){
    let userArray = []
    for (var i =0; i<typingUsers.length; i++){
        if(typingUsers[i].reciept === userId){
            userArray.push(typingUsers[i].reciept)
        }
    }
    return userArray
}
module.exports={
    addUser,
    addTypingUser,
    getTypingUsers,
    removeUser, 
    getreciept,
    formatMessage,
    getCurrentUser,
    getConnectedUsers
}
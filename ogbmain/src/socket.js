import Cookies from "js-cookie"
import io from "socket.io-client"

const socket = io(`ws://127.0.0.1:5000`);
let mainToken
if(Cookies.get("cm_pp")){
    const myToken = Cookies.get("cm_pp")
    let myMainTokenlen = parseInt(myToken.split("%")[0])
     let userIdlen = parseInt(myToken.split("%")[1])
     let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
     let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
      mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
     let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
    socket.emit('add user', parseInt(userId))
}
export default socket
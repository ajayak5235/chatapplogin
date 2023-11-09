async function saveUser(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;

    const user={
        name,email,phone,password
    }
    console.log(user)

    try{
        const response = await axios.post("http://localhost:4000/user/signup",user)
        alert(response.data.message);
        window.location.href = "./login.html";
    }catch(err){
        console.log(err);
    }
}


async function logInUser(event){
event.preventDefault();
const email = event.target.email.value;
const password = event.target.password.value;

const user = {
    email,password
}

try{

    const res = await axios.post("http://localhost:4000/user/login", user)
    console.log("user")
    alert("u login")
    //alert(res.data.message)
    window.location.href = "./expense.html";
}catch(err){
    console.log(err)
}
}
export default function Validation (values){
    let error ={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if(values.email === ""){
        error.email = "Email is required"
    }
    else {
        error.email = ""
    }
    if(!email_pattern.test(values.email)){
        error.email = "Email is invalid"
    }
    else {
        error.email = ""
    }
    if(values.password === ""){
        error.password = "Password is required"
    }
    else {
        error.password = ""
    }
    if(!password_pattern.test(values.password)){
        error.password = "Password is invalid"
    }
    else {
        error.password = ""
    }
    return(error)
}

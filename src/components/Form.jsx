import UserIcon from "./UserIcon";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

const api_endpoint = "../../api/index.php"

// const patterns = {
//     username: /.{3,}/,
//     email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
//     phone: /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
//     message: /.{10,}/
// };
// let errorMessages = {
//     usernameError: "your name must be more than 3 characters",
//     emailError: "this must be a valid email address",
//     phoneError: "must be a valid phone number",
//     messageError: "your message cannot be less than 10 characters"
// };
const Form = (props) => {
    const [erros, setErrors] = useState({ usernameError: null, emailError: null, phoneError: null, messageError: null });
    const { register, handleSubmit, watch } = useForm();
    const [res, setRes] = useState(null);
    // useEffect(() => {
    //     const subscription = watch((value, { name, type }) => {
    //         let unmatches = Object.keys(value).filter(k => (!patterns[name].test(value[k])));
    //         if (unmatches.length) {
    //             let e = {};
    //             for (let i = 0; i < unmatches.length; i++) {
    //                 let s = unmatches[i] + "Error";
    //                 e[s] = errorMessages[s];
    //                 setErrors(e);
    //             }
    //         }
    //     });
    //     return () => subscription.unsubscribe();
    // }, [watch]);

    useEffect(() => { }, [erros]);
    const submitHandler = (d) => {
        axios.post(api_endpoint, d)
            .then(function (response) {
                setRes(response.data.message);
                // setErrors(...erros);
            })
            .catch(function (error) {
                setErrors(error.response.data);
            });
    }

    return (
        <div className="form">
            <h1>contact me</h1>
            {res}
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="input">
                    <input type="text" {...register("username")} placeholder="type your user name" />
                    <UserIcon />
                    {erros.usernameError && <p className="error">{erros.usernameError}</p>}
                </div>
                <input type="email" {...register("email")} placeholder="someone@domainName.com" />
                {erros.emailError && <p className="error">{erros.emailError}</p>}
                <input type="phone" {...register("phone")} placeholder="mobile number" />
                {erros.phoneError && <p className="error">{erros.phoneError}</p>}
                <textarea placeholder="your message" {...register("message")}></textarea>
                {erros.messageError && <p className="error">{erros.messageError}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form;
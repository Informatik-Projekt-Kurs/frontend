"use client";
import { login, signup } from "@/services/authService";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInputs, RegisterInputs } from "@/types";

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginInputs>({
    mode: "onBlur"
  });

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    getValues
  } = useForm<RegisterInputs>({
    mode: "onBlur"
  });

  const onSubmitLogin: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const result = await login(dispatch, data);
      console.log(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onSubmitRegister: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      await signup(data).then(() => console.log("success"));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="loginContainer bg-base-300 before:bg-primary">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit(onSubmitLogin)}>
            <h2 className="text-3xl font-semibold text-primary-content mb-2.5">Log In</h2>
            <input
              className={`input bg-base-300 mb-4 ${errors.email ? "input-error" : "input-primary"}`}
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: "Invalid email format"
                }
              })}
            />
            <input
              className={`input bg-base-300 mb-4 ${errors.password ? "input-error" : "input-primary"}`}
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                }
              })}
            />
            {Object.values(errors)[0] && <p className="text-error mb-3">{Object.values(errors)[0].message}</p>}
            <input type="submit" value="Log In" className="btn btn-primary px-8" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form" onSubmit={handleSubmit2(onSubmitRegister)}>
            <h2 className="text-3xl font-semibold text-primary-content mb-2.5">Sign Up</h2>
            <input
              className={`input bg-base-300 mb-4 ${errors2.name ? "input-error" : "input-primary"}`}
              type="text"
              placeholder="Name"
              {...register2("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name must be at most 20 characters long"
                }
              })}
            />
            <input
              className={`input bg-base-300 mb-4 ${errors2.email ? "input-error" : "input-primary"}`}
              type="email"
              placeholder="Email"
              {...register2("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: "Invalid email format"
                }
              })}
            />
            <input
              className={`input bg-base-300 mb-4 ${errors2.password ? "input-error" : "input-primary"}`}
              type="password"
              placeholder="Password"
              {...register2("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                }
              })}
            />
            <input
              className={`input bg-base-300 mb-4 ${errors2.password_confirmation ? "input-error" : "input-primary"}`}
              type="password"
              placeholder="Repeat Password"
              {...register2("password_confirmation", {
                required: "Password confirmation is required",
                validate: (value) => value === getValues("password") || "Passwords do not match"
              })}
            />
            {Object.values(errors2)[0] && <p className="text-error mb-3">{Object.values(errors2)[0].message}</p>}
            <input type="submit" value="Sign Up" className="btn btn-primary px-8" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button className="btn btn-outline text-primary-content px-8" id="sign-up-btn">
              {" "}
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button className="btn btn-outline text-primary-content px-8" id="sign-in-btn">
              {" "}
              Sign in
            </button>
          </div>
          <Image src="img/register.svg" className="image" alt="" width={100} height={100} />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

"use client";

import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../TextInput/TextInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import Button from "../Button/Button";
import * as Yup from "yup";
import { fetchPostsApi } from "@/lib/api/api-utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const signupValidationSchema = Yup.object().shape({
    username: Yup.string().required("required!"),
    password: Yup.string()
        .required("required!")
        .min(8, "password must be at least 8 characters long!"),
    confirmPassword: Yup.string()
        .required("required!")
        .oneOf([Yup.ref("password"), ""], "passwords must match!"),
});

const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [submitStatus, setSubmitStatus] = useState<
        "username error" | "ok" | "submitting" | "idle"
    >("idle");
    const router = useRouter()

    const handleSubmit = async (values: typeof initialValues) => {
        const body = {
            username: values.username,
            password: values.password,
        };

        setSubmitStatus("submitting");

        const response = await fetchPostsApi("/auth/sign-up", "post", {
            requestBody: {
                contentType: "application/json",
                data: body,
            },
        });

        if (response.status === 200) {
            setSubmitStatus("ok");
            setTimeout(() => {
                router.push("/")
            }, 500)
        } else if (response.status === 409) {
            setSubmitStatus("username error");
        }
    };

    const renderButtonText = () => {
        switch (submitStatus) {
            case "idle":
                return "Sign Up";
            case "submitting":
                return "Signing Up...";
            case "ok":
                return "Complete!";
            case "username error":
                return "Username Taken!";
        }
    };

    useEffect(() => {
        if (submitStatus === "username error" || submitStatus === "ok") {
            const resetButtonCb = () => setSubmitStatus("idle");
            window.addEventListener("click", resetButtonCb);
            return () => window.removeEventListener("click", resetButtonCb);
        }
    }, [submitStatus]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signupValidationSchema}
        >
            {({ errors, touched }) => (
                <Form className="flex flex-col gap-6 w-full items-center p-6 bg-asphalt-700 text-white shadow-md">
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xl" htmlFor="username">
                            username
                        </label>
                        <TextInput
                            error={(errors.username !== undefined && touched.username) || submitStatus === "username error"}
                            success={!errors.username && touched.username && submitStatus !== "username error"}
                            aria-label="username"
                            name="username"
                            placeholder="username"
                        />
                        <div className="flex w-full justify-end font-light text-sm text-danger-400">
                            <ErrorMessage name="username" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xl" htmlFor="password">
                            password
                        </label>
                        <PasswordInput
                            name="password"
                            aria-label="password"
                            placeholder="password"
                            error={errors.password !== undefined && touched.password}
                            success={!errors.password && touched.password}
                        />
                        <div className="flex w-full justify-end font-light text-sm text-danger-400">
                            <ErrorMessage name="password" />
                        </div>
                        <label className="text-xl" htmlFor="confirmPassword"></label>
                        <PasswordInput
                            name="confirmPassword"
                            aria-label="confirm-password"
                            placeholder="confirm password"
                            error={errors.confirmPassword !== undefined && touched.password}
                            success={!errors.confirmPassword && touched.confirmPassword}
                        />
                        <div className="flex w-full justify-end font-light text-sm text-danger-400">
                            <ErrorMessage name="confirmPassword" />
                        </div>
                    </div>
                    <div className="mt-6 w-full">
                        <Button theme={submitStatus === "username error" ? "danger" : "primary"}>
                            {renderButtonText()}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignUpForm;

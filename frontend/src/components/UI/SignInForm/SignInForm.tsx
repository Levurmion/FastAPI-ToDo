"use client";

import { Formik, Form, ErrorMessage } from "formik";
import TextInput from "../TextInput/TextInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import Button from "../Button/Button";
import * as Yup from "yup";
import { setBearerToken } from "@/lib/tokens/tokens";
import { useEffect, useState } from "react";
import { useWindowClickOnce } from "@/lib/hooks/useEffectHooks";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "@/lib/redux/posts/postsApi";

const signInValidationSchema = Yup.object().shape({
    username: Yup.string().required("required!"),
    password: Yup.string().required("required!"),
});

const initialValues = {
    username: "",
    password: "",
};

const SignInForm = () => {
    const [signIn, { isLoading, isError, isSuccess, isUninitialized, data }] = useSignInMutation();
    const [showOriginal, setShowOriginal] = useState(false)
    const router = useRouter();

    const handleSubmit = (form: typeof initialValues) => {
        if (!isSuccess) {
            setShowOriginal(false)
            const formEncoded = new URLSearchParams(Object.entries(form)).toString()
            signIn({
                requestBody: {
                    contentType: "application/x-www-form-urlencoded",
                    data: formEncoded as any,
                },
            });
        }
    };

    const renderButtonText = () => {
        if (isUninitialized || showOriginal) return "Sign In";
        if (isLoading) return "Signing In...";
        if (isError) return "Invalid Credentials";
        if (isSuccess) return "Sign In Successful!";
    };

    useEffect(() => {
        if (data) {
            setBearerToken(data)
            router.push('/')
        }
    }, [data])

    useWindowClickOnce(
        () => setShowOriginal(true),
        [isError],
        () => {
            return isError;
        }
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signInValidationSchema}
        >
            {({ errors, touched }) => (
                <Form className="flex flex-col gap-6 w-full items-center p-6 bg-asphalt-700 text-white shadow-md">
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xl" htmlFor="username">
                            username
                        </label>
                        <TextInput
                            error={(errors.username !== undefined && touched.username) || isError}
                            success={!errors.username && touched.username && !isError}
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
                            error={(errors.password !== undefined && touched.password) || isError}
                            success={!errors.password && touched.password && !isError}
                        />
                        <div className="flex w-full justify-end font-light text-sm text-danger-400">
                            <ErrorMessage name="password" />
                        </div>
                    </div>
                    <div className="mt-6 w-full">
                        <Button theme={isError && !showOriginal ? "danger" : "primary"} type="submit">
                            {renderButtonText()}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignInForm;

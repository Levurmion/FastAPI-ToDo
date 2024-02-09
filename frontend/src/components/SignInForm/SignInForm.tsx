"use client";

import { Formik, Form, ErrorMessage } from "formik";
import TextInput from "../TextInput/TextInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import Button from "../Button/Button";
import * as Yup from "yup"

const signInValidationSchema = {
    username: Yup.string().required("required!"),
    password: Yup.string().required("required!")
}

const initialValues = {
    username: "",
    password: ""
}

const SignInForm = () => {

    const handleSubmit = () => {

    }

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
                            error={
                                errors.username !== undefined && touched.username
                            }
                            success={
                                !errors.username &&
                                touched.username
                            }
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
                    </div>
                    <div className="mt-6 w-full">
                        <Button theme="primary">
                            Sign In
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignInForm;

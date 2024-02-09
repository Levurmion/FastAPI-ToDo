import { Formik, Form } from "formik";
import { ReactNode } from "react";

const FormikForm = ({ children, initialValues, onSubmit }: { children: ReactNode, initialValues: { [k: string]: any }, onSubmit: () => void }) => (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
            {children}
        </Form>
    </Formik>
)

export default FormikForm
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../redux/contactsSlice";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("This is a required field"),
  number: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("This is a required field"),
});

function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    dispatch(add(newContact));
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          number: "",
        }}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
            <label htmlFor={nameFieldId}>Name</label>
            <Field className={css.input} type="text" name="name" id={nameFieldId} />
            <ErrorMessage className={css.error} name="name" component="span" />

            <label htmlFor={phoneFieldId}>Number</label>
            <Field
              className={css.input}
              type="tel"
              name="number"
              id={phoneFieldId}
            />
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />

          <button className={css.submit} type="submit">
            Add user
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default ContactForm;
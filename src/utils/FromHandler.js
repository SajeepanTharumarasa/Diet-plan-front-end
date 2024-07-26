import { useEffect, useState } from 'react';

const FormHandler = (callback, validate) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			setIsSubmitting(false);
			callback();
		}
	}, [errors]);

	useEffect(() => {
		form.isSubmitted = isSubmitted;
	}, [isSubmitted]);

	const handleSubmit = () => {
		setIsSubmitted(true);
		setIsSubmitting(true);
		if (Array.isArray(values)) {
			values.length > 0 &&
				values.forEach(obj => {
					Object.keys(obj).forEach(key => {
						if (typeof obj[key] === 'string') {
							obj[key] = obj[key].trimEnd();
						}
					});
				});
		} else {
			!isEmpty(values) &&
				Object.keys(values).forEach(key => {
					if (typeof values[key] === 'string') {
						values[key] = values[key].trimEnd();
					}
				});
		}

		setErrors(validate(values));
	};

	function checkDirty(errorsI, isSubmittedI, formI) {
		if (isSubmittedI) {
			return errorsI;
		}
		for (let property in errorsI) {
			if (!formI[property] && !formI[property]?.dirty) {
				delete errorsI[property];
			}
		}
		return errorsI;
	}

	const handleKeyDown = event => {
		['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
	};

	const handleChange = (name, event) => {
		event && (event = event ? event : '');

		setValues(values => ({ ...values, [name]: event }));
		setErrors(
			checkDirty(
				validate({ ...values, [name]: event }),
				isSubmitted,
				form,
			),
		);
		setIsSubmitting(false);
	};

	const handleChangeForObject = (name, index, event) => {
		event && (event = event ? event : '');
		const clone = values.map((value, i) => {
			if (index === i) {
				if (name === 'multi') {
					return {
						...value,
						...event,
					};
				} else {
					return {
						...value,
						[name]: event,
					};
				}
			} else {
				return value;
			}
		});

		setValues(clone);

		setErrors(checkDirty(validate(values), isSubmitted, form));
		setIsSubmitting(false);
	};

	const setValue = value => {
		setValues(values => ({ ...values, ...value }));
		setErrors(
			checkDirty(validate({ ...values, ...value }), isSubmitted, form),
		);
		setIsSubmitting(false);
	};

	const refresh = () => {
		setValues(values => ({ ...values }));
		setErrors(checkDirty(validate({ ...values }), isSubmitted, form));
		setIsSubmitting(false);
	};

	const initForm = values => {
		setValues(values);
		setErrors({});
		setForm({});
		setIsSubmitted(false);
		setIsSubmitting(false);
	};

	const handleOnBlur = event => {
		if (isFunction(event.persist())) {
			event.persist();
		}
		setErrors(
			checkDirty(
				validate({
					...values,
					[event.target.name]: event.target.value,
				}),
				isSubmitted,
				{
					...form,
					[event.target.name]: { dirty: true },
				},
			),
		);
		setForm(form => ({ ...form, [event.target.name]: { dirty: true } }));
		setIsSubmitting(false);
	};

	const deleteErrors = error => {
		if (!error || isEmpty(error)) return;
		Object.keys(error).forEach(key => delete form[key]);
		setErrors({});
	};

	function isEmpty(obj) {
		if (!obj) {
			return true;
		}
		for (let prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				return false;
			}
		}

		return JSON.stringify(obj) === JSON.stringify({});
	}

	function isFunction(functionToCheck) {
		return (
			functionToCheck &&
			{}.toString.call(functionToCheck) === '[object Function]'
		);
	}

	return {
		handleChange,
		handleChangeForObject,
		handleOnBlur,
		handleSubmit,
		initForm,
		setValue,
		deleteErrors,
		handleKeyDown,
		refresh,
		values,
		errors,
		form,
	};
};

export default FormHandler;

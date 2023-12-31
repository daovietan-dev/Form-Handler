import { useEffect, useRef, useState } from 'react'

const SimpleInput = props => {
  const formRef = useRef() // tham chiếu đến form để thiết lập giá trị ban đầu
  const [inputValue, setInputValue] = useState({})
  const [inputIsValid, setInputIsValid] = useState({})
  const [inputIsTouched, setInputIsTouched] = useState({})

  // khởi tạo giá trị ban đầu của form
  function setInit() {
    const inputTags = [...formRef.current.elements]

    for (let index = 0; index < inputTags.length - 1; index++) {
      const inputTag = inputTags[index]
      setInputValue(preState => ({ ...preState, [inputTag.id]: '' }))
      setInputIsTouched(preState => ({ ...preState, [inputTag.id]: false }))
      setInputIsValid(preState => ({ ...preState, [inputTag.id]: false }))
    }
  }

  // xác thực <input> có hợp lệ không?
  function validateInput(inputTag) {
    let isValid = true
    // inputIsInvalid = inputIsValid: false + inputIsTouched: true
    setInputIsTouched(preState => ({ ...preState, [inputTag.id]: true }))
    if (inputTag.value.trim() == '') {
      setInputIsValid(preState => ({ ...preState, [inputTag.id]: false }))
      isValid = false
    } else {
      setInputIsValid(preState => ({ ...preState, [inputTag.id]: true }))
    }

    return isValid
  }

  // <form onSubmit>
  function submitHandler(e) {
    e.preventDefault()

    let formIsValid = true
    const inputTags = [...e.target.elements]

    for (let index = 0; index < inputTags.length - 1; index++) {
      const inputTag = inputTags[index]
      if (!validateInput(inputTag)) {
        formIsValid = false
      }
    }

    // nếu form hợp lệ thì ...
    if (formIsValid) {
      alert(`Form is send ✅`)
      setInit()
    }
  }

  // <input onBlur>
  function inputLostFocusHandler(e) {
    const inputTag = e.target
    validateInput(inputTag)
  }

  // <input onChange>
  function inputChangeHandler(e) {
    setInputValue(preState => ({
      ...preState,
      [inputTag.id]: inputTag.value,
    }))

    const inputTag = e.target
    validateInput(inputTag)
  }

  useEffect(() => {
    setInit()
  }, [])

  console.log(`inputValue`, inputValue)
  console.log(`inputIsValid`, inputIsValid)
  console.log(`inputIsTouched`, inputIsTouched)

  return (
    <form onSubmit={submitHandler} ref={formRef}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          className={!inputIsValid.name && inputIsTouched.name ? 'invalid' : ''}
          value={inputValue.name}
          onBlur={inputLostFocusHandler}
          onChange={inputChangeHandler}
        />
        {!inputIsValid.name && inputIsTouched.name && (
          <p className="error-text">Name isn't be emptied</p>
        )}
        <br></br>
        <label htmlFor="age">Your Age</label>
        <input
          type="number"
          id="age"
          className={!inputIsValid.age && inputIsTouched.age ? 'invalid' : ''}
          value={inputValue.age}
          onBlur={inputLostFocusHandler}
          onChange={inputChangeHandler}
        />
        {!inputIsValid.age && inputIsTouched.age && (
          <p className="error-text">Age isn't be emptied</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput

function validator(formSelector) {
    const formElement = document.querySelector(formSelector);
    const inputs = formElement.querySelectorAll("[name][rules]");
    const formRules = {};
    const validatorRules = {
        required: function (value) {
            return value ? undefined : "not be empty";
        },
        email: function (value) {
            regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)
                ? undefined
                : "Please enter a valid email address.";
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Password is too short`;
            };
        },
        isConfirmed: function (value) {
            let pass = formElement.querySelector(".password");
            return value == pass.value
                ? undefined
                : "Those passwords didn't match. Try again.";
        },
    };

    if (formElement) {
        // lấy ra và xử lý các thẻ input
        for (var input of inputs) {
            var rules = input.getAttribute("rules").split("|");
            for (var rule of rules) {
                var isRuleHasValue = rule.includes(":");
                var ruleInfor;

                if (isRuleHasValue) {
                    ruleInfor = rule.split(":");
                    rule = ruleInfor[0];
                }

                var ruleFunc = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfor[1]);
                }
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }
            // Lắng nghe sự kiện để validate
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // Hàm xử lí khi validate có lỗi
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;
            for (var rule of rules) {
                errorMessage = rule(event.target.value);
                if (errorMessage) break;
            }
            if (errorMessage) {
                var formGroup = event.target.closest(".form-group");
                if (formGroup) {
                    formGroup.classList.add("invalid");
                    let formMessage = formGroup.querySelector(".form-message");
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
        }

        function handleClearError() {
            var formGroup = this.closest(".form-group");
            if (formGroup.classList.contains("invalid")) {
                formGroup.classList.remove("invalid");
                let formMessage = formGroup.querySelector(".form-message");
                if (formMessage) formMessage.innerText = "";
            }
        }
    }

    // xử lí submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();
        let isValid = true;
        for (var input of inputs) {
            if (!handleValidate({ target: input })) isValid = false;
        }
    };
}

const toggleForm = () => {
    const closeBtnForm = document.querySelector(".form-close");
    closeBtnForm.onclick = () => {
        document.querySelector("#signUp-container").style.display = "none";
        const inputsSignUpForm = document.querySelectorAll(
            "#signUp-container [name][rules]"
        );
        for (var input of inputsSignUpForm) {
            input.value = "";
            var formGroup = input.closest(".form-group");
            if (formGroup.classList.contains("invalid")) {
                formGroup.classList.remove("invalid");
                let formMessage = formGroup.querySelector(".form-message");
                if (formMessage) formMessage.innerText = "";
            }
        }
    };
    document.querySelector(".switch-register-form").onclick = () => {
        document.querySelector("#signUp-container").style.display = "flex";
    };
};

function main() {
    validator("#register-form");
    validator("#login-form");
    toggleForm();
}

main();

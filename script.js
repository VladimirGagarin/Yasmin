function handlePasswordValidation() {
    const passwordEnter = InputPassCode.value.trim().replace(/\s+/g, " ").toLowerCase();
    const matchedPasscode = password.trim().replace(/\s+/g, " ").toLowerCase();

    if (passwordEnter === matchedPasscode) {
        authOverLay.style.display = "none";
        InputPassCode.value = '';
    } else {
        vibrate.play();
        authContent.classList.add("vibrate");
        setTimeout(() => {
            authContent.classList.remove("vibrate");
            InputPassCode.value = '';
        }, 1000);
    }
}

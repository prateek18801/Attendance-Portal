const username = document.forms['attendance-form']['username'];
const password = document.forms['attendance-form']['password'];
const message = document.getElementById('message');
const details = document.getElementById('details');

username.focus();

const handleSubmit = async () => {
    const usernameVal = username.value.trim().toLowerCase();
    const passwordVal = password.value.trim();

    if (usernameVal === '') {
        username.focus();
        return;
    }
    if (passwordVal === '') {
        password.focus();
        return;
    }

    const data = {
        username: usernameVal,
        password: passwordVal
    }

    const response = await fetch('/api/v1/attendance', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    const json = await response.json();

    message.innerText = json.message;
    
    if (json.error) {
        alert(json.error);
    }
    if (json.data) {
        details.innerText = `${json.data.in} - ${json.data.out} = ${json.data.duration}ms`;
    }

    username.value = '';
    password.value = '';

    setTimeout(() => {
        message.innerText = '';
        details.innerText = '';
    }, 5000);
}
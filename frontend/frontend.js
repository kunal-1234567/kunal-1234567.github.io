const register = () => {
    console.log("Register function called");

    fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "testuser",
            email: "test@example.com",
            password: "123456"
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
const login = () => {
    console.log("Login function called");       
    fetch('http://localhost:5000/api/users/login', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: "test@example.com",       

            password:"123456"
        })
    })  
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })

    .catch(error => {
        console.error('Error:', error);
    });
}
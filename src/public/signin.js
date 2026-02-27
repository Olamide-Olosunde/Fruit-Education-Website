const form = document.getElementById('user');
form.addEventListener("submit", event => {
    event.preventDefault();

    let isValid = true;
//Form validation
    //Email: NOT NULL & UNIQUE (eerr === emailError)
    let eErr = document.getElementById('emailError');
    eErr.innerHTML = '';
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if( !document.getElementById('email').value )
    {
        eErr.innerHTML = 'Enter an email!';
        eErr.style.display = 'block';
        isValid = false;
    }
    else if( !regex.test(document.getElementById('email').value) )
    {
        eErr.innerHTML = 'Invalid email';
        eErr.style.display = 'block';
        isValid = false;
    } else
    {
        eErr.innerHTML = '';
        eErr.style.display = 'none';
        isValid = true;
    }
if( isValid )
{

    let email = document.getElementById('email').value;
    //send it to the database
    fetch(`http://127.0.0.1:3005/api/user/${email}`)
    .then(response => {
        if( !response.ok )
        {
            if( response.status === 404 )
            {
                eErr.innerHTML = 'We couldn’t find your details in our database. Please, create an account to continue.';
                eErr.style.display = 'block';
                isValid = false;
            }
            throw response;
        }
        else
            return response.json();
    })
    .then(result =>{
        console.log("Form submitted successfully:", result);
        // document.getElementById('FruiT').innerHTML = '';
        // document.getElementById('FruiT').innerHTML = `Hello ${result.fname}`;

        localStorage.setItem('fname', result.fname);
        window.location.href = "fruit.html";
        //OR
        // window.location.href = `fruit.html?fname=${result.fname}`;
        
        // done = true;
        // alert("Form submitted successfully!");
    })
    .catch(error => {
        console.log("Error submitting form:", error);
    });
}
});
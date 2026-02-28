function signIn(){
    window.location.href = "signin.html";
}

//for prefix (other option)
function showC_P(){
    if( document.getElementById('prefix').value === "other" )
    {
        //show if user picks other
        document.getElementById('c_p').style.display = "block";
        document.getElementById('br').style.display = "none";
    }
    else
    {
        //else, don't show
        document.getElementById('c_p').style.display = "none";
        document.getElementById('br').style.display = "block";
    }
}


//form submission and addition of data to database
// const form = document.querySelector('.form');
const form = document.getElementById('user');
form.addEventListener("submit", event => {
    event.preventDefault();

    function getActualPrefix()
    {
        if( document.getElementById('prefix').value === "other" )
            return document.getElementById('custom_prefix').value;
        else 
            return document.getElementById('prefix').value;
    }

    function getActualProfession()
    {
        if( document.getElementById('prof').value === "Other" )
            return document.getElementById('other_profession').value;
        else
            return document.getElementById('prof').value;
    }

    //g === gender
    function getSelectedGender( groupName )
    {
        const g = document.getElementsByName(groupName);
        for( let i = 0; i < g.length; i++ )
        {
            if( g[i].checked )
                return g[i].value;
        }
        return null;
    }
    //gend === gender
    const gend = getSelectedGender("gender");
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

    //fname (fnerr === fnameError)
    let fnerr = document.getElementById('fnameError');
    fnerr.innerHTML = '';
    if( !document.getElementById('fname').value )
    {
        //Enter a name
        fnerr.innerHTML = 'Enter your First Name :)';
        fnerr.style.display = 'block';
        isValid = false;
    } else
    {
        fnerr.innerHTML = '';
        fnerr.style.display = 'none';
        isValid = true;
    }

    //lname (lnerr === lnameError)
    let lnerr = document.getElementById('lnameError');
    lnerr.innerHTML = '';
    if( !document.getElementById('lname').value )
    {
        lnerr.innerHTML = 'Enter your Last Name :)';
        lnerr.style.display = 'block';
        isValid = false;
    } else{
        lnerr.innerHTML = '';
        lnerr.style.display = 'none';
        isValid = true;
    }

    //dob ( dobErr === dobError )
    let dobErr = document.getElementById('dobError');
    dobErr.innerHTML = '';
    if( !document.getElementById('dob').value )
    {
        dobErr.innerHTML = 'Enter your Date of Birth :)';
        dobErr.style.display = 'block';
        isValid = false;
    } else{
        dobErr.innerHTML = '';
        dobErr.style.display = 'none';
        isValid = true;
    }

    //profession ( pErr === profError )
    let pErr = document.getElementById('profError');
    pErr.innerHTML = '';
    profValue = getActualProfession();
    if( !profValue )
    {
        pErr.innerHTML = 'Enter a profession :)';
        pErr.style.display = 'block';
        isValid = false;
    } else{
        pErr.innerHTML = '';
        pErr.style.display = 'none';
        isValid = true;
    }


    // let done = false;
if( isValid )
{
    data = {
        prefix: getActualPrefix(),
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        gender: gend,
        profession: profValue,
        about: document.getElementById('about').value
    };

    // let show = document.createElement('h1');
    // show.innerHTML('data');
    console.log(data);

    //send it to the database
    fetch("http://127.0.0.1:3005/api/user", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if( !response.ok )
        {
            // console.log("An error was thrown");
            throw response;
        }
        else
            return response.json();
    })
    .then(result =>{
        console.log("Form submitted successfully:", result);
        // done = true;
        // alert("Form submitted successfully!");
        window.location.href = `fruit.html?fname=${data.fname}`;
    })
    .catch(error => {
        console.log("Error submitting form:", error);
    });
} else 
{
    generalError = document.getElementById('generalError');
    generalError.innerHTML = "There seems to be some required data you haven't filled out";
    generalError.style.display = 'block';
    window.location.href="#user";
}
});

profDropdown = document.getElementById('prof');
profDropdown.addEventListener("change", ()=>{
    if( profDropdown.value === "Other" )
    {
        other_profession_div = document.getElementById('other_profession_div')

        // add a new input (typing)
        other_profession_div.style.display = "block";

        // allocate typing input into profession variable
        
        // if other's clicked, we open typing input
        // if user clicks something else, we remove typing input & nullify their input.

        // only open new typing if other's selected.
        // if another profession (or none) is picked, new input should be absent.
    } else {
        other_profession_div.style.display = "none";
    }

});
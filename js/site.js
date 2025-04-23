function displayMessage() {

    //get the <input /> element from the page
    let inputElement = document.getElementById('messageInput')
    //inputElement = <input id="messageInput" class="form-control" stlye="max-width: 16rem" placeholder="Enter a Message" />

    //get the text that was typed into the input element
    let message = inputElement.value;


    //use alert() to show the text that was typed
    Swal.fire(
        {
            backdrop: false,
            title: 'App Name',
            text: message,
        }
    );


}


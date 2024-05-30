let AccountService = {
    initFormValidation : function(formId){
        $(formId).validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true
                },
                password: {
                    required: true,
                    strongPassword: true,
                    maxlength: 20
                }
            },
            messages: {
                name: {
                    required: "Please enter your name"
                },
                email: {
                    required: "Please enter your email"
                },
                  password: {
                    required: "Please enter your password",
                    maxlength: "Your password cannot be longer than 20 characters"
                  }
            },
            submitHandler: function (form) {
                try {
                    $.blockUI({ message: '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>'});
        
                    setTimeout(function(){
                        toastr.success('Form submitted successfully!');
                        $.unblockUI();
                    }, 2000)
                    
                } catch (error) {
                    console.error('Error in submitHandler:', error);
                    alert('An error occurred. Please try again later.');
                    $.unblockUI();
                }
            }
        });
    },
    showProfilePage : function(){
        document.getElementById('sign-up-form').addEventListener('submit', function(event){
            event.preventDefault();
            const username = document.getElementById('name').value;
            setTimeout(function(){
                document.getElementById('sign-up-section').classList.add('hidden');
                document.getElementById('profile-section').classList.remove('hidden');
                document.getElementById('profile-name').innerText = username;
            }, 2500)
            
        });
        document.getElementById('logout-button').addEventListener('click', function(){
            document.getElementById('profile-section').classList.add('hidden');
            document.getElementById('sign-up-section').classList.remove('hidden');
            document.getElementById('profile-name').value = '';
        })
    }
}
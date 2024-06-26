const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');
const epostaile=document.getElementById('epostaile')
const epostailegiris=document.getElementById()

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

epostaile.addEventListener('click',function(){
    window.location.href = 'mail.html';
})

epostailegiris.addEventListener('click',function(){
    window.location.href = 'mail.html';
})
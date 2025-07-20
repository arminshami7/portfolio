const changecolorbtn = document.getElementById('changecolorbtn');
const profileCard = document.querySelector('.profile-card');
const jobtitle = document.querySelector('h2');
const container = document.querySelector('.button-message-container');
changecolorbtn.addEventListener('click' , function(){
    const currentColor = getComputedStyle(profileCard).backgroundColor;
    if( currentColor === 'rgb(233, 233, 233)'){
        profileCard.style.backgroundColor = '#ffff';
        jobtitle.textContent ='طراح وب';
    }
    else{
        profileCard.style.backgroundColor = 'rgb(233, 233, 233)';
        jobtitle.textContent ='متخصص فرانت';
    }

const exictingmessage = document.getElementById('updatemessage');
if(exictingmessage){
    container.removeChild(exictingmessage);
}
else{
    const newmessage = document.createElement('p');
    newmessage.textContent = 'بروز رسانی شده';
    newmessage.id = 'updatemessage';
    container.appendChild(newmessage);
}
});
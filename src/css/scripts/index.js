import { getUser } from './services/user.js';
import { getRepositories } from './services/repositories.js';
import { user } from './objects/user.js';
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () =>{ 
    let userName = document.getElementById('input-search').value;

    if(userName.length === 0){ 
        alert('Preencha o campo com o nome do usuário do GitHub')
        return;
    }

    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) =>{
    let userName = e.target.value; 
    let key = e.which || e.keyCode; 
    let isEnterKeyPressed = key === 13; 

    if(isEnterKeyPressed){ 
        if(userName.length === 0){ 
            alert('Preencha o campo com o nome do usuário do GitHub')
            return;
        }

        getUserData(userName)
    }
})

async function getUserData(userName){ 

    let userResponse = await getUser(userName); 

    if(userResponse.message === 'Not Found'){ 
        screen.renderNotFound()
        return
    }

    let repositoriesResponse = await getRepositories(userName);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    
    screen.renderUser(user);
}

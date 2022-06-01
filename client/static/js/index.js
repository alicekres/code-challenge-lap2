// const url = 'http://localhost:3000/stories';

// document.addEventListener('DOMContentLoaded', init);

// window.addEventListener('hashchange', loadPost);

// function init() {
//     let urlArray = window.location.href.split('#');
//     if (urlArray.length > 1) {
//         getPost(parseInt(urlArray[0]));
//     } else {
//         addPostForm();
//     }
// }

// function addPostForm() {
//     const storyForm = document.querySelector('form');
//     storyForm.classList.remove('hidden');
//     storyForm.button.addEventListener('submit', (e) => {
//         e.preventDefault();

//         try {
//             if (
//                 !e.target[0].value ||
//                 !e.target[1].value ||
//                 !e.target[2].value
//             ) {
//                 throw new Error(
//                     'The story is empty and there is not much to show! Remember to add the title and your name as well!'
//                 );
//             } else {
//                 createStory(
//                     e.target[0].value,
//                     e.target[1].value,
//                     e.target[2].value
//                 );
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     });
// }

// function getStory(id) {
//     fetch(`${url}/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//             displayStory(data);
//         });
// }

// function displayStory(s) {
//     document.querySelector('#displayTitle').textContent = s.title;
//     document.querySelector('#displayPseudonym').textContent = s.pseudonym;
//     document.querySelector('#displayStory').textContent = s.story;
//     document.querySelector('postWrapper').style.display = 'grid';
// }

// function createPost(title, pseudonym, story) {
//     let storyData = {
//         title,
//         pseudonym,
//         story,
//     };

//     const options = {
//         method: 'POST',
//         body: JSON.stringify(storyData),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };

//     fetch(url, options)
//         .then((r) => r.json())
//         .then((data) => {
//             let storyData = Object.values(data)[0]
//                 .toString()
//                 .replace('(', '')
//                 .replace(')', '')
//                 .split(',');
//             window.location.href = `${window.location.href}#${storyData[0]}`;
//             window.location.reload();
//         })
//         .catch(console.warn);
// }

const form = document.querySelector('.form');
const post = document.getElementById('post');
form.addEventListener('submit', createPost);

window.addEventListener('hashchange', loadPost);

async function createPost(e) {
    e.preventDefault();
    try {
        const postData = {
            title: e.target.title.value,
            pseudonym: e.target.pseudonym.value,
            story: e.target.story.value,
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch('http://localhost:3000/', options);
        const res = await response.json();
        console.log(res);

        window.location.hash = `${res.id}`;
        const div = document.querySelector('#postWrapper');
        div.textContent = '';
        displayPost(res);
    } catch (err) {
        console.log(err);
    }
}

async function displayPost(data) {
    console.log(data);
    const h4 = document.createElement('h4');
    const pPseudonym = document.createElement('p');
    const p = document.createElement('p');

    h4.id = `title-${data.id}`;
    h4.class = 'title';
    h4.textContent = `${data.title}`;

    pPseudonym.id = `pseudonym-${data.id}`;
    pPseudonym.class = 'pseudonym';
    pPseudonym.textContent = `${data.pseudonym}`;

    p.id = `story-${data.id}`;
    p.class = 'story';
    p.textContent = `${data.story}`;

    post.append(h4, pPseudonym, p);
}

async function loadPost(e) {
    e.preventDefault();

    const formContainer = document.getElementById('formContainer');
    const postContainer = document.querySelector('#post');

    formContainer.innerHTML = '';
    postContainer.innerHTML = '';

    const id = window.location.hash.substring(1);
    const response = await fetch(`http://localhost:3000/${id}`);
    const data = await response.json();

    displayPost(data);
}

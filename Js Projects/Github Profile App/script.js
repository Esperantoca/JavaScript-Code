const githubApi = "https://api.github.com/users/";
const page = document.getElementById('page');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getProfileInfo(profile) {
    const response = await fetch(githubApi + profile);
    const responseData = await response.json();

    viewProfile(responseData);
    fetchRepos(profile);
}

async function fetchRepos(profile) {
    const response = await fetch(githubApi + profile + "/repos");
    const responseData = await response.json();

    reposInfosAdd(responseData);
}

function viewProfile(profile) {
    const cardHTML = `
    <div class="card">
    <div>
    <img class="avatar" src="${profile.avatar_url}" alt="${profile.name}"/>
    </div>
    <div class="profil-bilgi">
   <h2>${profile.name}</h2>
   <p>${profile.bio}</p>
        <ul class="bilgi">
            <li><strong>${profile.followers} Followers</strong></li>
            <li><strong>${profile.following} Follow</strong></li>
            <li><strong>${profile.public_repos} Repos</strong></li>
        </ul>
        <div id="repos"></div>
   </div>
   </div>
    `;

    page.innerHTML = cardHTML;
}

function reposInfosAdd(repos) {
    const reposEl = document.getElementById('repos');

    repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        repoEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const profile = search.value;
    if (profile) {
        getProfileInfo(profile);
        search.value = "";
    }
});
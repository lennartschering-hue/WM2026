Promise.all([
    fetch("standings.json").then(r => r.json()),
    fetch("matches.json").then(r => r.json())
])

.then(([standingsData, matchesData]) => {

    const standings = standingsData;
    const matches = matchesData;

    // HERO

    document.getElementById("matchesPlayed").textContent =
        matches.length;

    document.getElementById("playerCount").textContent =
        standings.length;

    document.getElementById("playersCount2").textContent =
        standings.length;

    document.getElementById("matchesCount").textContent =
        matches.length;

    document.getElementById("leaderName").textContent =
        standings[0].player;

    document.getElementById("leaderPoints").textContent =
        standings[0].points;

    // PODIUM

    const podium = document.getElementById("topThree");

    const medals = ["🥇","🥈","🥉"];

    standings.slice(0,3).forEach((player,index)=>{

        podium.innerHTML += `
            <div class="podium-card">
                <h3>${medals[index]}</h3>
                <h2>${player.player}</h2>
                <p>${player.points} Punkte</p>
            </div>
        `;
    });

    // TABLE

    const tbody =
        document.querySelector("#leaderboard tbody");

    standings.forEach((player,index)=>{

        tbody.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>${player.player}</td>
                <td>${player.points}</td>
            </tr>
        `;
    });

    // RESULTS

    const resultsGrid =
        document.getElementById("resultsGrid");

    matches
        .slice(-12)
        .reverse()
        .forEach(match=>{

            resultsGrid.innerHTML += `
                <div class="result-card">
                    <h3>${match.match}</h3>
                    <p>${match.result[0]} : ${match.result[1]}</p>
                </div>
            `;
        });

});

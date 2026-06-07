Promise.all([
    fetch("standings.json").then(response => response.json()),
    fetch("matches.json").then(response => response.json())
])

.then(([standingsData, matchesData]) => {

    console.log("standingsData:", standingsData);
    console.log("matchesData:", matchesData);

    // --------------------------------------------------
    // Parse data safely
    // --------------------------------------------------

    const standings = standingsData.standings || [];
    const matches = matchesData || [];

    console.log("standings:", standings);
    console.log("matches:", matches);

    // --------------------------------------------------
    // HERO
    // --------------------------------------------------

    document.getElementById("matchesPlayed").textContent =
        matches.length;

    document.getElementById("playerCount").textContent =
        standings.length;

    document.getElementById("playersCount2").textContent =
        standings.length;

    document.getElementById("matchesCount").textContent =
        matches.length;

    if (standings.length > 0) {

        document.getElementById("leaderName").textContent =
            standings[0].player;

        document.getElementById("leaderPoints").textContent =
            standings[0].points;
    }

    // --------------------------------------------------
    // PODIUM
    // --------------------------------------------------

    const podium = document.getElementById("topThree");

    const medals = ["🥇", "🥈", "🥉"];

    standings.slice(0, 3).forEach((player, index) => {

        podium.innerHTML += `
            <div class="podium-card">
                <h3>${medals[index]}</h3>
                <h2>${player.player}</h2>
                <p>${player.points} Punkte</p>
            </div>
        `;
    });

    // --------------------------------------------------
    // TABLE
    // --------------------------------------------------

    const tbody =
        document.querySelector("#leaderboard tbody");

    standings.forEach((player, index) => {

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${player.player}</td>
                <td>${player.points}</td>
            </tr>
        `;
    });

    // --------------------------------------------------
    // RESULTS
    // --------------------------------------------------

    const resultsGrid =
        document.getElementById("resultsGrid");

    matches
        .slice(-12)
        .reverse()
        .forEach(match => {

            resultsGrid.innerHTML += `
                <div class="result-card">
                    <h3>${match.match}</h3>
                    <p>${match.result[0]} : ${match.result[1]}</p>
                </div>
            `;
        });

})

.catch(error => {

    console.error("Error loading data:", error);

    document.body.insertAdjacentHTML(
        "afterbegin",
        `
        <div style="
            background:#dc2626;
            color:white;
            padding:15px;
            text-align:center;
            font-weight:bold;
        ">
            Error loading standings.json or matches.json.
            Open F12 → Console.
        </div>
        `
    );
});

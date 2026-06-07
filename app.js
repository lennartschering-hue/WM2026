fetch("standings.json")
    .then(response => response.json())
    .then(data => {

        const tbody = document.querySelector("#leaderboard tbody");

        data.standings.forEach((player, index) => {

            const row = document.createElement("tr");

            let place = index + 1;

            if (place === 1) {
                place = "🥇";
            } else if (place === 2) {
                place = "🥈";
            } else if (place === 3) {
                place = "🥉";
            }

            row.innerHTML = `
                <td>${place}</td>
                <td>${player.player}</td>
                <td>${player.points}</td>
            `;

            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error(error);
    });

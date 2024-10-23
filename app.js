class Team {
    constructor(name, city, foundedYear, titles, stadium) {
        this.name = name;
        this.city = city;
        this.foundedYear = foundedYear;
        this.titles = titles;
        this.stadium = stadium;
    }

    getDetails() {
        return `${this.name} (${this.city}) - Fundado: ${this.foundedYear}, Títulos: ${this.titles}, Estadio: ${this.stadium}`;
    }
}

class View {
    constructor() {
        this.teamList = document.getElementById('teamList');
    }

    renderTeams(teams) {
        this.teamList.innerHTML = ''; // Limpia la lista existente
        teams.forEach((team) => {
            const teamItem = document.createElement('li');
            teamItem.classList.add('team-item');
            teamItem.innerHTML = `
                <span>${team.getDetails()}</span>
                <button class="btn btn-green remove-btn">Remover</button>
            `;
            this.teamList.appendChild(teamItem);
        });
    }
}

class Controller {
    constructor(view) {
        this.view = view;
        this.teams = [];

        this.init();
    }

    init() {
        // Manejar el evento de envío del formulario
        document.getElementById('teamForm').addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar el envío del formulario
            this.addTeam();
        });

        // Manejar el evento de clic en "Eliminar todos"
        document.getElementById('removeAll').addEventListener('click', () => {
            this.removeAllTeams();
        });

        // Manejar el evento de clic en el botón "Remover" de cada equipo
        this.view.teamList.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-btn')) {
                this.removeTeam(event.target.parentElement);
            }
        });
    }

    addTeam() {
        const name = document.getElementById('teamName').value;
        const city = document.getElementById('city').value;
        const foundedYear = document.getElementById('foundedYear').value;
        const titles = document.getElementById('titles').value;
        const stadium = document.getElementById('stadium').value;

        const newTeam = new Team(name, city, foundedYear, titles, stadium);
        this.teams.push(newTeam);
        this.view.renderTeams(this.teams); // Actualiza la vista
        document.getElementById('teamForm').reset(); // Reinicia el formulario
    }

    removeTeam(teamElement) {
        const index = Array.from(this.view.teamList.children).indexOf(teamElement);
        if (index !== -1) {
            this.teams.splice(index, 1); // Elimina el equipo del array
            this.view.renderTeams(this.teams); // Actualiza la vista
        }
    }

    removeAllTeams() {
        this.teams = []; // Limpia el array de equipos
        this.view.renderTeams(this.teams); // Actualiza la vista
    }
}

// Inicializar la aplicación
const view = new View();
const controller = new Controller(view);

const path = require('path');
const fs = require('fs/promises');


const moviesPath = path.join(__dirname, '..', 'db', 'movies.json');
// console.log(moviesPath);

// CRUD with files

class FileOperations {
	constructor(pathToFile) {
		this.pathToFile = pathToFile;
	}
	async read() {
		return await fs.readFile(this.pathToFile, 'utf-8');
	};

	async display() {
		console.log(await this.read());
	}

	async create(data) {
		try {
			return await fs.writeFile(this.pathToFile, JSON.stringify(data, null, 4));
		} catch (error) {
			console.log(error.message);
		}
	};

	async update(id, data) {
		try {
			const allMovies = await this.read();
			// console.log(allMovies);
			const allMoviesArray = JSON.parse(allMovies);
			// console.log(Array.isArray(allMoviesArray));
			const idx = allMoviesArray.findIndex(movie => movie.id === id);
			// console.log(idx);
			// console.log(typeof allMovies);
			allMoviesArray[idx] = data;
			// console.log(allMoviesArray[idx]);
			await fs.writeFile(this.pathToFile, JSON.stringify(allMoviesArray, null, 4));
		} catch (error) {
			console.log(error.message);
		}
	};

	async remove() {
		try {
			return await fs.unlink(this.pathToFile);
		} catch (error) {
			console.log(error.message);
		}
	};
}

const file = new FileOperations(moviesPath);
// file.display();

const movies = [
	{
		"Title": "Avatar",
		"Year": "2009",
		"Genre": "Action, Adventure, Fantasy"
	},
	{
		"Title": "I Am Legend",
		"Year": "2007",
		"Genre": "Drama, Horror, Sci-Fi"
	},
	{
		"Title": "300",
		"Year": "2006",
		"Genre": "Action, Drama, Fantasy"
	}
]

// file.create(movies);

const terminator = {
	"id": "20",
	"Title": "Terminator",
	"Year": "2009",
	"Genre": "Fantasy"
}
// file.update('20', terminator);

// file.remove()


// console.log(__filename);
// console.log(__dirname);

// console.log(path.join('/rostyk', '/music'));
// console.log(path.resolve('/rostyk', '/pics'));

// console.log(path.join(__dirname, '/rostyk', '/music'));
// console.log(path.resolve(__dirname, '/rostyk', '/pics'));

async function asyncHandler(clb) {
	try {
		// console.log(clb)
		await clb();
		// console.log(result);
	} catch (error) {
		console.log(error.message);
	}
}

asyncHandler(file.display.bind(file));
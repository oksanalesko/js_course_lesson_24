"use strict"

if (confirm("Почати тестування?")) {
	// Клас, який робить запити та повертає результати
	class CatAPI {
		// Приватне поле з ключем API
		#apiKey = "live_JccebQ2G4OLKYTRqle7Ok2mk924IUr3wvSGlT2C1nQNMp1627TDfl6grHFoqT45m"

		constructor() {
			// API для зображень котиків
			this.apiURL = "https://api.thecatapi.com/v1/images/search"
			// API для фактів про котиків
			this.factURL = "https://catfact.ninja/fact"
		}

		// Геттер для apiKey
		get ApiKey() {
			return this.#apiKey
		}

		// Сеттер для apiKey
		set ApiKey(newKey) {
			this.#apiKey = newKey
		}

		// асинхронна функція для запиту зображення котика
		async fetchCatImage() {
			const response = await fetch(this.apiURL, {
				headers: {
					method: "GET",
					"x-api-key": this.ApiKey,
				},
			})
			const data = await response.json()
			// Повертаємо URL зображення котика
			return data[0].url
		}

		// асинхронна функція для запиту факта про котиків
		async fetchCatFact() {
			const response = await fetch(this.factURL, {
				method: "GET",
			})
			const data = await response.json()
			// Повертаємо факт про котиків
			return data.fact
		}
	}

	// Клас для створення розмітки
	class CatMarkup {
		constructor(containerId) {
			this.container = containerId
		}

		// Метод для створення динамічної розмітки
		createMarkup(imageUrl, fact) {
			const imageContainer = document.createElement("div")
			imageContainer.className = "image-container"

			const image = document.createElement("img")
			image.className = "cat-image"
			image.src = imageUrl
			image.alt = "Cats image"

			imageContainer.append(image)

			const factContainer = document.createElement("div")
			factContainer.className = "cat-fact"
			factContainer.innerText = fact

			return {imageContainer, factContainer}
		}

		// Метод для додавання розмітки в контейнер
		appendMarkup(markup) {
			this.container.append(markup.imageContainer)
			this.container.append(markup.factContainer)
		}
	}

	// Завантажуємо дані при завантаженні сторінки
	window.onload = async function () {
		const container = document.querySelector("#task .condition")
		// Створюємо новий екземпляр класу CatAPI
		const api = new CatAPI()
		// Створюємо новий екземпляр класу CatMarkup
		const markup = new CatMarkup(container)
		// Функція для завантаження даних
		async function loadCatData() {
			try {
				const imageUrl = await api.fetchCatImage()
				const fact = await api.fetchCatFact()
				const catMarkup = markup.createMarkup(imageUrl, fact)
				markup.appendMarkup(catMarkup)
			}
			catch (error) {
				console.error("Error:", error)
			}
			finally {
				console.log('Це новий котик!')
			}
		}
		// Також завантажуємо дані при натисканні на кнопку
		document.getElementById("newCatButton").addEventListener("click", loadCatData)
		// Викликаємо функцію завантаження даних
		await loadCatData()
	}
}

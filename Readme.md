# Movie Search App Documentation

The Movie Search App is a React Native application that allows users to search for movies and view their details. It utilizes the OMDB API to fetch movie data and provides a user-friendly interface for searching and browsing movies.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
  - [Home Screen](#home-screen)
  - [Movie Details Screen](#movie-details-screen)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

To run the Movie Search App, you need to have the following installed on your machine:

- Node.js
- React Native CLI
- Android/iOS Emulator or a physical device to run the app

### Installation

1. Install the dependencies:

   ```bash
   yarn install
   ```

2. Start the Metro server:

   ```bash
   yarn react-native start
   ```

3. Run the app on an iOS/Android Emulator or a physical device:

   ```bash

   # For iOS
   npx react-native run-ios

   # For Android
   npx react-native run-android
   ```

   Make sure you have the Android/iOS Emulator running or your physical device connected.

## Features

### Home Screen

The Home Screen is the main screen of the app, where users can search for movies and view the search results. It provides the following features:

- Search Bar: Users can enter the title of a movie to search for.
- Search Button: Pressing the Search button triggers the movie search.
- Movie List: Displays a list of movies based on the search results. Each movie item includes the movie title, poster, and year.
- Infinite Scrolling: When the user scrolls to the bottom of the list, more movies are loaded automatically if there are more search results available.
- Movie Details Navigation: Tapping on a movie item navigates the user to the Movie Details Screen for that movie.

### Movie Details Screen

The Movie Details Screen displays detailed information about a selected movie. It includes the following information:

- Title: The title of the movie.
- Poster: The movie poster.
- Year: The release year of the movie.
- Plot: A brief overview of the movie's plot.
- Director: The director of the movie.
- Rating: The IMDb rating of the movie.

## Usage

1. Launch the Movie Search App on your Android/iOS Emulator or physical device.
2. On the Home Screen, enter the title of a movie in the search bar.
3. Press the Search button to fetch the search results.
4. Browse through the movie list and tap on a movie item to view its details on the Movie Details Screen.
5. On the Movie Details Screen, you can see additional information about the selected movie, such as the plot, director, and rating.

## Contributing

Contributions to the Movie Search App are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/YaAlB/omdMovies).

## License

The Movie Search App is released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the app as per the terms of the license.
# piksel

piksel is a minimal Electron application designed to display images. It provides an efficient way to view images with a user-friendly interface.

## Features

- Display images using Electron.
- Simple navigation between images.
- Full-screen view for images.

## Getting Started

### Prerequisites

To clone and run this repository, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/KaanBahaSever/ImageViewer.git
    ```
2. Go into the repository:
    ```bash
    cd piksel/src
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the app:
    ```bash
    npm start
    ```

## Usage

Once the application is running, you can:

- Open an image to view.
- Navigate through images using the provided interface.

## Development

### Folder Structure

- `package.json` - Lists the app's details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

### Building

To build the application for distribution:

```bash
npm run dist

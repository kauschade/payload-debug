# FSIS Payload Debug

FSIS Payload Debug is a web-based tool designed to help developers analyze and debug JSON payloads. It provides a user-friendly interface to visualize and interact with structured data, making it easier to understand and troubleshoot complex JSON payloads used in application development.

## Features

- **JSON Parsing and Validation:** Paste your JSON payload into the tool to parse and validate it. If the JSON is invalid, an error message will be displayed.

- **Interactive Visualization:** The tool organizes JSON data into collapsible sections, allowing you to expand or collapse different parts of the payload for a clearer view.

- **SQL Formatting:** SQL statements within the JSON payload are formatted for easier reading, with special highlighting provided by Prism.js.

- **Copy SQL Functionality:** Easily copy SQL statements from the structured view for use in other applications or tools.

- **Responsive Design:** The application is styled with a dark theme for improved readability and a modern look, and it's designed to be responsive for use on different devices.

## Getting Started

To get started with FSIS Payload Debug, simply clone the repository and open the `index.html` file in your browser.

### Prerequisites

Ensure you have a modern web browser that supports ES6 JavaScript and HTML5.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/kauschade/payload-debug.git
    ```

2. Navigate to the project directory:
    ```bash
    cd payload-debug
    ```

3. Open `index.html` in your browser:
    ```bash
    open index.html
    ```

## Usage

1. Paste your JSON payload into the textarea provided on the main page.
2. Click the "Processar Payload" button to parse and visualize the JSON data.
3. Expand or collapse sections to view the details of each part of the payload.
4. Use the "Copiar SQL" button to copy any SQL statements for further analysis.

## Technologies Used

- **HTML5** and **CSS3** for structure and styling.
- **JavaScript** for dynamic interactions and JSON parsing.
- **Prism.js** for syntax highlighting of SQL code.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request.

## Acknowledgments

- The [Prism.js](https://prismjs.com/) library for syntax highlighting.
- The JSON logo from [Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/1024px-JSON_vector_logo.svg.png).

## Contact

If you have any questions, please feel free to reach out to [kauschade](https://github.com/kauschade) on GitHub.
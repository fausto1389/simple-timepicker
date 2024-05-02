# Simple Timepicker

---

## Description

The npm package "Simple Timepicker" is a lightweight and easy-to-use tool for adding time selectors to your web applications. This timepicker is designed to simplify the selection of hours and minutes in forms and other user interfaces where entering or selecting a specific time is needed.

With an intuitive and minimalist interface, Simple Timepicker offers a smooth and hassle-free user experience. It allows users to choose the desired time with just a few clicks or taps, making data input easy and improving the usability of your application.

---

## Features

- Simple and user-friendly interface.
- Selection of hour and minutes in a single field.
- Support for both 12-hour and 24-hour formats.
- Customizable and easily integrable into existing projects.
- Lightweight and dependency-free.
- Compatible with modern browsers and mobile devices.

---

## Installation

You can install Simple Timepicker via npm using the following command:

```
npm install @fausto_trujillo/timepicker
```

---

## Usage

To use Simple Timepicker in your project, simply include the script and style in your HTML:

```html
<link rel="stylesheet" href="dist/timepicker.css">
<script src="dist/timepicker.js"></script>
```

Then, you can create an input field in your HTML and apply Simple Timepicker to it:

```html
<input type="text" id="timepicker">
<script>
  timepicker('#timepicker');
</script>
```

---

## Options

Simple Timepicker has two options to configure:

- __twentyFourHours__: Option that enables or disables the use of 24 hours. Its default value is true.
- __nullSelection__: Option that enables or disables the use of a null selection; that is, the hour and minutes can remain empty. Its default value is true.


## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Timepicker Example</title>
  <link rel="stylesheet" href="dist/timepicker.css">
</head>
<body>

  <label for="time">Select a time:</label>
  <input type="text" id="time">

  <script src="dist/timepicker.js"></script>
  <script>
    timepicker('#time', {
      twentyFourHours: false,
      nullSelection: false
    });
  </script>
</body>
</html>
```

---

## Contribution

Contributions are welcome! If you want to improve Simple Timepicker or report issues, feel free to submit a pull request or open an issue on the GitHub repository: [https://github.com/fausto1389/simple-timepicker.git](#).

---

## License

This package is distributed under the GPLv3 License. For more information, see the LICENSE file included in this repository.

---

We hope you find Simple Timepicker useful in your projects! If you have any questions or suggestions, feel free to contact us.

---

*Copyright © 2024 Simple Timepicker. All rights reserved.*

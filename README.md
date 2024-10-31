# maiton (alpha)

Simple and customizable components that you can copy and paste for building Farcaster frames fast.
maiton is free and open-source. Use it to build your own Farcaster frame components.

![docs get started page](/public/docs.jpg)

## Documentation

Visit https://maiton.xyz for the full documentation.

## Installation

To install maiton, run:

```bash
pnpm install maiton
```

## Usage

To use maiton, first you need to initialize the project:

```bash
pnpm maiton init
```

This command installs dependencies and adds the `cn` util for the project.

Then, you can add components to your project:

```bash
pnpm maiton add [component]
```

For example:

```bash
pnpm maiton add avatar
```

Or you can run the command without any arguments to view a list of all available components:

```bash
pnpm maiton add
```

Enjoy building your Farcaster frame with maiton 🥳

## Components

- [Avatar](https://maiton.xyz/components/avatar): A simple circle avatar.
- [Row](https://maiton.xyz/components/row): A horizontal flex container for layout.
- [Column](https://maiton.xyz/components/column): A vertical flex container for layout.
- [Container](https://maiton.xyz/components/container): A wrapper component with customizable padding.
- [Address](https://maiton.xyz/components/address): A component to display and format blockchain addresses.
- [Text](https://maiton.xyz/components/text): A customizable text component with various styles and sizes.
- [Background Image](https://maiton.xyz/components/background-image): A component to add and style background images.
- [Badge](https://maiton.xyz/components/badge): A small label component for status or categories.
- [Banner](https://maiton.xyz/components/banner): A full-width component for important announcements or messages.
- [Progress](https://maiton.xyz/components/progress): A progress bar component to show completion status.
- [Transaction Result](https://maiton.xyz/components/transaction-result): A component to display blockchain transaction outcomes.
- [User Banner](https://maiton.xyz/components/user-banner): A banner component displaying user information and details.
- [Card](https://maiton.xyz/components/card): A versatile container component with optional header and footer.

## Development

Just follow these steps:

1. Clone the repo

```
git clone git@github.com:builders-garden/maiton-ui.git
```

2. Install the dependencies

```
pnpm install
```

3. Start the development server

```
pnpm dev
```

## Contributing

Please read the [contributing guide](CONTRIBUTING.md).

## License

Licensed under the [MIT license](https://github.com/builders-garden/maiton-ui/blob/main/LICENSE.md).

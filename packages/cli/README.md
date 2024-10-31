# maiton

A CLI for adding components to your Farcaster frame project.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies and adds the `cn` util for the project.

```bash
npx maiton init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx maiton add [component]
```

### Example

```bash
npx maiton add avatar
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx maiton add
```

## Documentation

Visit https://maiton.xyz to view the documentation.

## License

Licensed under the [MIT license](https://github.com/builders-garden/maiton-ui/blob/main/LICENSE.md).

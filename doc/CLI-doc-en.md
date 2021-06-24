# CLI documentation

You can run all components of DiPiCar separately by using the CLI.
The base command needs at least one argument, or else it will show by default the installed version of the service.

```sh
#Base command
sudo dipicar [command]
```

Here's a list of all the possible command:

| Command | Description |
|--|--|
| `fullStart` | Configures and secures the wireless interfaces and then launches the API server. |
| `start` | Only starts the API server. |
| `configure` | Only configures and secures the wireless interfaces. |
| `version` (default) | Shows the installed version of the service. |
| `genSSL` | Generate a basic certificate in `/etc/dipicar/creds/`. |

# A RemedyBG debugger breakpoint integration for VSCode

## Features

This extension automatically changes the breakpoints in the RemedyBG debugger to match the breakpoints in your VSCode instance.

## Limitations

Conditional breakpoints are currently not supported.

## Requirements

For this extension to work...
- You need to add the following line to your project's settings.json file:
    ```
    "remedybg-breakpoint-integration.enabled": true
    ```
- Your launch.json file needs to include a launch configuration which starts a **seperate** executable on your computer.
    
    **This executable mustn't exit on its own. It must run for the entire duration of your debugging session!**
    
    Example launch.json:

    ```
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "cppvsdbg",
                "request": "launch",
                "name": "Run Debug (Windows)",
                "program": "${workspaceFolder}/seperate_loop.exe",
                "args": [],
                "cwd": "${workspaceFolder}"
            }
        ]
    }
    ```


Launch RemedyBG **before** starting a debugging session for a bug-free experience!

## Extension Settings

- ### "remedybg-breakpoint-integration.launchConfigurations"

    You need to set this to true. It is recommended to set this in your project's settings.json file.

- ### "remedybg-breakpoint-integration.launchConfigurations"

    Launch configurations (by "name") which should use RemedyBG Breakpoint Integration. Leaving this array empty means that all launch configurations apply!

## Known Issues

If an instance of RemedyDB isn't already open, this extension will open it for you even though this isn't intended behavior. 

Setting "remedybg-breakpoint-integration.launchConfigurations" to an appropriate array of launch configuration names can minimize this problem.


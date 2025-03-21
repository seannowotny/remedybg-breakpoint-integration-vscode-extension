# A RemedyBG debugger breakpoint integration for VSCode

## Features

This extension automatically changes the breakpoints in the RemedyBG debugger to match the breakpoints in your VSCode instance.

## Limitations

Conditional breakpoints are currently not supported.

## Requirements

Your launch.json file should include a launch configuration which starts a **seperate** executable on your computer that doesn't exit on its own.

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

Search for "remedybg-breakpoint-integration.launchConfigurations" for more info

## Known Issues

None

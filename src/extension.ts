// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as proc from 'child_process';

function executeCmdCommand(command: string) {
	console.log(command)
	proc.exec(command);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand("remedybg-breakpoint-integration.continue", () => {
		executeCmdCommand("remedybg continue-execution");
	});
	context.subscriptions.push(disposable);

	let breakpoints: {[filePath: string]: number[]} = {};

	vscode.debug.registerDebugAdapterTrackerFactory('*', {
		createDebugAdapterTracker(session: vscode.DebugSession) {
		  return {
			onWillReceiveMessage: m => {
				const config = vscode.workspace.getConfiguration("remedybg-breakpoint-integration");
				const launchConfigs = config.get<string[]>("launchConfigurations", []);
				
				if (launchConfigs.length > 0 && !launchConfigs.includes(vscode.debug.activeDebugSession?.name || ""))
				{
					return
				}

				if (m.command == "disconnect")
				{
					executeCmdCommand("remedybg stop-debugging");
					executeCmdCommand("remedybg remove-all-breakpoints");
				}

				if (m.command == "setExceptionBreakpoints") // setExceptionBreakpoints: the last command received when launching the VSCode debugger
				{
					executeCmdCommand("remedybg stop-debugging");
					for (const [fileName, lines] of Object.entries(breakpoints))
					{
						for (let i = 0; i < lines.length; i++)
						{
							executeCmdCommand(`remedybg add-breakpoint-at-file ${fileName} ${lines[i]}`);
						}
					}
					setTimeout(() => executeCmdCommand("remedybg start-debugging"), 100);
				}

				if (m.command == "setBreakpoints")
				{
					const args = m.arguments;
					const filePath = args.source.path;

					let previousBreakpointLines: number[] = breakpoints[filePath] || [];
					let newBreakPointLines: number[] = args.lines;

					for (let i = 0; i < previousBreakpointLines.length; i++)
					{
						const oldLine = previousBreakpointLines[i];
						if (!newBreakPointLines.includes(oldLine))
						{
							executeCmdCommand(`remedybg remove-breakpoint-at-file ${filePath} ${oldLine}`);
						}
					}

					for (let i = 0; i < newBreakPointLines.length; i++)
					{
						const newLine = newBreakPointLines[i];
						if (!previousBreakpointLines.includes(newLine))
						{
							executeCmdCommand(`remedybg add-breakpoint-at-file ${filePath} ${newLine}`);
						}
					}

					breakpoints[filePath] = newBreakPointLines
				}
			},
		  };
		}
	});
}

// This method is called when your extension is deactivated
// I would have liked to stop the RemedyBG debugger from here (in case of VSCode shutting down) but it didn't work
export function deactivate() {
}

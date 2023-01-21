import * as vscode from "vscode";
import ChatGptViewProvider from './chatgpt-view-provider';

export async function activate(context: vscode.ExtensionContext) {
	const chatGptExtensionConfig = vscode.workspace.getConfiguration("chatgpt");
	const provider = new ChatGptViewProvider(context);


	const view = vscode.window.registerWebviewViewProvider(
		"chatgpt.view",
		provider,
		{
			webviewOptions: {
				retainContextWhenHidden: true,
			},
		}
	);

	const freeText = vscode.commands.registerCommand("chatgpt.freeText", async () => {
		const value = await vscode.window.showInputBox({
			prompt: "Ask anything...",
		});

		if (value) {
			provider?.sendApiRequest(value);
		}
	});

	const resetThread = vscode.commands.registerCommand("chatgpt.clearConversation", async () => {
		provider?.sendMessage({ type: 'clearConversation' }, true);
	});

	const exportConversation = vscode.commands.registerCommand("chatgpt.exportConversation", async () => {
		provider?.sendMessage({ type: 'exportConversation' }, true);
	});

	const clear = vscode.commands.registerCommand("chatgpt.clearSession", () => {
		context.globalState.update("chatgpt-session-token", null);
	});



	const commands = [
		["chatgpt.addTests", "promptPrefix.addTests"],
		["chatgpt.findProblems", "promptPrefix.findProblems"],
		["chatgpt.refactor", "promptPrefix.refactor"],
		["chatgpt.optimize", "promptPrefix.optimize"],
		["chatgpt.explain", "promptPrefix.explain"],
		["chatgpt.rewrite", "promptPrefix.rewrite"],
		["chatgpt.generate", "promptPrefix.generate"],
		["chatgpt.ask", "promptPrefix.ask"],
	];

	const registeredCommands = commands.map(([command, configKey]) =>
		vscode.commands.registerCommand(command, () => {
			let commandPrefix = chatGptExtensionConfig.get(configKey) as string;
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			if (command === 'chatgpt.generate') {
				commandPrefix += `(${editor.document.languageId})`;
			}

			const selection = editor.document.getText(editor.selection);
			if (selection) {
				provider?.sendApiRequest(commandPrefix, selection);
			}
		})
	);

	context.subscriptions.push(view, freeText, resetThread, exportConversation, clear, ...registeredCommands);
}

export function deactivate() { }

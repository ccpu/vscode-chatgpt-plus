import * as vscode from "vscode";
import ChatGptViewProvider from './chatgpt-view-provider';

export async function activate(context: vscode.ExtensionContext) {
	const chatGptExtensionConfig = vscode.workspace.getConfiguration("chatgptplus");
	const provider = new ChatGptViewProvider(context);


	const view = vscode.window.registerWebviewViewProvider(
		"chatgptplus.view",
		provider,
		{
			webviewOptions: {
				retainContextWhenHidden: true,
			},
		}
	);

	const freeText = vscode.commands.registerCommand("chatgptplus.freeText", async () => {
		const value = await vscode.window.showInputBox({
			prompt: "Ask anything...",
		});

		if (value) {
			provider?.sendApiRequest(value);
		}
	});

	const resetThread = vscode.commands.registerCommand("chatgptplus.clearConversation", async () => {
		provider?.sendMessage({ type: 'clearConversation' }, true);
	});

	const exportConversation = vscode.commands.registerCommand("chatgptplus.exportConversation", async () => {
		provider?.sendMessage({ type: 'exportConversation' }, true);
	});

	const clear = vscode.commands.registerCommand("chatgptplus.clearSession", () => {
		context.globalState.update("chatgpt-session-token", null);
	});



	const commands = [
		["chatgptplus.addTests", "promptPrefix.addTests"],
		["chatgptplus.findProblems", "promptPrefix.findProblems"],
		["chatgptplus.refactor", "promptPrefix.refactor"],
		["chatgptplus.optimize", "promptPrefix.optimize"],
		["chatgptplus.explain", "promptPrefix.explain"],
		["chatgptplus.rewrite", "promptPrefix.rewrite"],
		["chatgptplus.generate", "promptPrefix.generate"],
		["chatgptplus.send", "promptPrefix.send"],
		["chatgptplus.comment", "promptPrefix.comment"],
	];

	const registeredCommands = commands.map(([command, configKey]) =>
		vscode.commands.registerCommand(command, () => {
			let commandPrefix = chatGptExtensionConfig.get(configKey) as string;
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			if (command === 'chatgptplus.generate') {
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

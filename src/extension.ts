import * as vscode from "vscode";
import ChatGptViewProvider from './chatgpt-view-provider';
import { getLanguage, isResponseWithCode } from "./utils";

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
			provider?.sendApiRequest({ value });
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
		["chatgptplus.summarize", "promptPrefix.summarize"],
	];

	const registeredCommands = commands.map(([command, configKey]) =>
		vscode.commands.registerCommand(command, () => {
			let commandPrefix = chatGptExtensionConfig.get(configKey) as string;
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const selection = editor.document.getText(editor.selection);

			const isCode = isResponseWithCode(command);

			if (isCode) {
				commandPrefix += ` (${getLanguage(selection)})\n`;
			}

			if (selection) {
				provider?.sendApiRequest({
					value: selection,
					command,
					isCode,
					prompt: commandPrefix
				});

			}
		})
	);

	context.subscriptions.push(view, freeText, resetThread, exportConversation, clear, ...registeredCommands);
}

export function deactivate() { }

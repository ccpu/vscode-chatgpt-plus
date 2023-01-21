import * as vscode from "vscode";
import ChatGptViewProvider from './chatgpt-view-provider';
import { getFileType } from "./utils";

export async function activate(context: vscode.ExtensionContext) {
	const chatGptExtensionConfig = vscode.workspace.getConfiguration("chatgpt");
	const provider = new ChatGptViewProvider(context);


	const view = vscode.window.registerWebviewViewProvider(
		"vscode-chatgpt.view",
		provider,
		{
			webviewOptions: {
				retainContextWhenHidden: true,
			},
		}
	);

	const freeText = vscode.commands.registerCommand("vscode-chatgpt.freeText", async () => {
		const value = await vscode.window.showInputBox({
			prompt: "Ask anything...",
		});

		if (value) {
			provider?.sendApiRequest(value);
		}
	});

	const resetThread = vscode.commands.registerCommand("vscode-chatgpt.clearConversation", async () => {
		provider?.sendMessage({ type: 'clearConversation' }, true);
	});

	const exportConversation = vscode.commands.registerCommand("vscode-chatgpt.exportConversation", async () => {
		provider?.sendMessage({ type: 'exportConversation' }, true);
	});

	const clear = vscode.commands.registerCommand("vscode-chatgpt.clearSession", () => {
		context.globalState.update("chatgpt-session-token", null);
	});



	const commands = [
		["vscode-chatgpt.addTests", "promptPrefix.addTests"],
		["vscode-chatgpt.findProblems", "promptPrefix.findProblems"],
		["vscode-chatgpt.refactor", "promptPrefix.refactor"],
		["vscode-chatgpt.optimize", "promptPrefix.optimize"],
		["vscode-chatgpt.explain", "promptPrefix.explain"],
		["vscode-chatgpt.rewrite", "promptPrefix.rewrite"],
		["vscode-chatgpt.generate", "promptPrefix.generate"],
		["vscode-chatgpt.ask", "promptPrefix.ask"],
	];

	const registeredCommands = commands.map(([command, configKey]) =>
		vscode.commands.registerCommand(command, () => {
			let commandPrefix = chatGptExtensionConfig.get(configKey) as string;
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const fileType = getFileType(editor.document.fileName);

			console.log(fileType, command);


			if (command === 'vscode-chatgpt.generate') {
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

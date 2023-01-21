import * as vscode from "vscode";

export const getConfig = (confName: string) => {
    const config = vscode.workspace.getConfiguration("chatgpt");
    return config.get(confName) as string | undefined;
};



export const getConfigs = () => {

    return {
        apiKey: getConfig('apiKey'),
        maxTokens: getConfig('maxTokens') as unknown as number,
        model: getConfig('model')!
    };
};


export type Config = ReturnType<typeof getConfigs>;
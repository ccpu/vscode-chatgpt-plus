import * as vscode from 'vscode';

export const getLanguage = (_code: string) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  let lang = editor.document.languageId;

  lang = lang.replace('react', '');

  if (lang === 'html') {
    return 'xml';
  }

  return lang;
};

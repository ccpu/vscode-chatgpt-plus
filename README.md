<h1 align="center">

<br>ChatGPT PLUS</h1>

<div align="center">
<h2>

Make ChatGPT your partner to improve your programming experience.</h2>

</div>

With just one click, you can create files/projects, fix your code, or utilize OpenAI's official GPT3 APIs--all without any configuration! Simply put your API key in the settings, and begin! Exporting all your conversation history at once in Markdown format is also easily done.

# Features

The extension includes a context menu commands that enables you to send the chosen text or code to the chatGPT service and display the output in the chatGPT panel. This panel allows you to copy or move the code to the current file or create a new file and then move the result there.

# API Key

You need to create an API key and enter it into your Visual Studio Code settings to use this extension:

```
{
  "chatgptplus.apiKey": "YOUR API KEY"
}
```

# Available Commands

- ChatGPT: Ask Anything
- ChatGPT: Refactor Code
- ChatGPT: Generate Comment
- ChatGPT: Generate Code
- ChatGPT: Generate Tests
- ChatGPT: Find Bugs
- ChatGPT: Optimize Code
- ChatGPT: Explain Code
- ChatGPT: Clear Conversation
- ChatGPT: Export Conversation
- ChatGPT: Rewrite Selection
- ChatGPT: Send Selection
- ChatGPT: Summarize Selection

---

### Refactor Code

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/refactor-code.png" alt="Refactor Code" width="800"/>

---

### Generate Comment

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/generate-comment.png" alt="Generate Comment" width="800"/>

---

### Generate Code

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/generate-code.png" alt="Generate Code" width="800"/>

---

### Generate Tests

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/generate-test.png" alt="Generate Tests" width="800"/>

---

### Find Bugs

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/find-bugs.png" alt="Find Bugs" width="800"/>

---

### Optimize Code

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/optimize-code.png" alt="Optimize Code" width="800"/>

---

### Explain Code

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/explain-code.png" alt="Explain Code" width="800"/>

---

### Rewrite Selection

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/rewrite-selection.png" alt="Rewrite Selection" width="800"/>

---

### Summarize Selection

<img src="https://raw.githubusercontent.com/ccpu/vscode-chatgpt-plus/main/images/summarize.png" alt="Summarize Selection" width="800"/>

---

# Customize your code prompts or use defaults

```json
  "chatgptplus.promptPrefix.addTests": {
    "default": "Generate tests:",
    "description": "The prompt prefix used for adding tests for the selected code"
  },
  "chatgptplus.promptPrefix.summarize": {
    "description": "The prompt prefix used for summarizing text.",
    "default": "Summarize text: "
  },
  "chatgptplus.promptPrefix.comment": {
    "default": "Generate short comment: ",
    "description": "The prompt prefix used to generate comment for selected code."
  },
  "chatgptplus.promptPrefix.explain": {
    "default": "Explain code: ",
    "description": "The prompt prefix used for explaining the selected code"
  },
  "chatgptplus.promptPrefix.findProblems": {
    "default": "Find problems: ",
    "description": "The prompt prefix used for finding problems for the selected code"
  },
  "chatgptplus.promptPrefix.generate": {
    "default": "Generate code: ",
    "description": "The prompt prefix used generate code base on text"
  },
  "chatgptplus.promptPrefix.optimize": {
    "default": "Optimize code: ",
    "description": "The prompt prefix used for optimizing the selected code"
  },
  "chatgptplus.promptPrefix.refactor": {
    "default": "Refactor code and explain what's changed: ",
    "description": "The prompt prefix used for refactoring the selected code"
  },
  "chatgptplus.promptPrefix.rewrite": {
    "default": "Rewrite text: ",
    "description": "Will try to rewrite sentences."
  }
```

# Caveats & Limitations

Although the conversation panel appears to be having a conversation with ChatGPT, it is not. This extension uses the official OpenAPI library to communicate with the ChatGPT API and this library does not yet provide a conversation API. This means that it will only provide an answer to the current question asked and will not be aware of any preceding conversations.

# Disclaimer

- Using this extension comes with no guarantee that it will continue to function as intended, without any issues or side-effects. Please proceed with caution, as it may be subject to changes that are out of our control. For example, OpenAI may make unannounced alterations to some or all of its features, which could have an impact on this extension's performance.

- This extension never uses or stores your personally identifiable information.

- This extension will use an API Key stored in the settings.json file. Please note that VS Code may sync this key across its instances and this is outside of this extension's boundary. If you are not comfortable with this, then you should not use the extension.

- The extension will only collect metadata in order to improve its features, with no personally identifiable information being collected. You can choose whether or not to enable telemetry by setting either 'telemetry.telemetryLevel' or 'chatgptplus.telemetry.disable' to their respective values; the extension will then only collect metadata if both of these settings have allowed telemetry.

- We cannot be held liable for any issues that may arise while using this extension. Please note that your use of OpenAI services is subject to OpenAI's [Privacy Policy](https://openai.com/privacy/) and [Terms of Use](https://openai.com/terms/).

# Credits

- It would not be achievable without [OpenAI's ChatGPT](https://openai.com).
- This extension was inspired by and based on [barnesoir/chatgpt-vscode-plugin](https://github.com/barnesoir/chatgpt-vscode-plugin) and [gencay/vscode-chatgpt](https://github.com/gencay/vscode-chatgpt)

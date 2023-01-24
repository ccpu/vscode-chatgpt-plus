export const isQuestionWithCode = (command: string) => {
  if (
    ![
      'chatgptplus.rewrite',
      'chatgptplus.send',
      'chatgptplus.generate',
      'chatgptplus.summarize',
    ].includes(command)
  ) {
    return true;
  }
  return false;
};

export const isResponseWithCode = (command: string) => {
  if (
    ![
      'chatgptplus.rewrite',
      'chatgptplus.send',
      'chatgptplus.explain',
      'chatgptplus.findProblems',
      'chatgptplus.comment',
      'chatgptplus.summarize',
    ].includes(command)
  ) {
    return true;
  }
  return false;
};

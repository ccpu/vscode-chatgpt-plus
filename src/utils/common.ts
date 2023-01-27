export const isQuestionWithCode = (command: string) => {
  if (
    command &&
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
    command &&
    ![
      'chatgptplus.rewrite',
      'chatgptplus.send',
      'chatgptplus.explain',
      'chatgptplus.findProblem',
      'chatgptplus.comment',
      'chatgptplus.summarize',
    ].includes(command)
  ) {
    return true;
  }
  return false;
};

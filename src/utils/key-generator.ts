export const generateKey = (pre: any) => {
  pre = pre || "";

  if (typeof pre === 'object' && pre !== null) {
    pre = JSON.stringify(pre);
  }

  return `${ pre }_${ new Date().getTime() }`;
}

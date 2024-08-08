export const parseMention = (mention: string) => {
  const mentionArray = mention.split(';');
  const id = +mentionArray[0];
  const name = mentionArray[1];

  return { id, name };
};

export const stringifyMention = (id: number, name: string) => {
  return `${id};${name}`;
};

import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const rounds = 11;

  const salt = await bcrypt.genSalt(rounds);

  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

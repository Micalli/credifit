export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, ""); // remove pontuação

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // todos iguais

  let sum = 0;
  let rest;

  // primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  // segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

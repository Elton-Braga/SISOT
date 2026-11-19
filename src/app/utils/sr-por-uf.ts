/**
 * Mapa UF → SR principal.
 * Quando a UF possui várias SRs (ex.: PA tem Belém, Marabá e Santarém),
 * usamos a SR "principal" (a que primeiro aparece na lista do formulário).
 */
const SR_POR_UF: Record<string, string> = {
  AC: 'SR(14)AC',
  AL: 'SR(22)AL',
  AM: 'SR(15)AM',
  AP: 'SR(21)AP',
  BA: 'SR(05)BA',
  CE: 'SR(02)CE',
  DF: 'SR(28)DFE',
  ES: 'SR(20)ES',
  GO: 'SR(04)GO',
  MA: 'SR(12)MA',
  MG: 'SR(06)MG',
  MS: 'SR(16)MS',
  MT: 'SR(13)MT',
  PA: 'SR(01)PA', // demais: SR(27)MBA, SR(30)STA
  PB: 'SR(18)PB',
  PE: 'SR(03)PE', // demais: SR(29)MSF
  PI: 'SR(24)PI',
  PR: 'SR(09)PR',
  RJ: 'SR(07)RJ',
  RN: 'SR(19)RN',
  RO: 'SR(17)RO',
  RR: 'SR(25)RR',
  RS: 'SR(11)RS',
  SC: 'SR(10)SC',
  SE: 'SR(23)SE',
  SP: 'SR(08)SP',
  TO: 'SR(26)TO',
};

/** Retorna a SR correspondente à UF (ou '' se desconhecida). */
export function getSrFromUf(uf: string | null | undefined): string {
  if (!uf) return '';
  return SR_POR_UF[uf.trim().toUpperCase()] ?? '';
}

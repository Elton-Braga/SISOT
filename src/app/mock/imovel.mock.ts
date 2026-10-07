import { Dados } from './imovel.model';

export const IMOVEIS_MOCK: Dados[] = [
  {
    imovel: {
      sr: 'SR(27)MBA',
      imovel: 'Fazenda Surubim',
      sncr: '1478523697412',
      areaHa: 10978.8258,
      proprietario:
        'Amilcar Farid Yamin, Adriane Rocha Yamin e Christiane Rocha Yamin',
      processo: '54000.160184/2025-42',
      modalidade: 'Compra e Venda Decreto 433/92',
      situacao: 'Em Trâmite',
      municipio: 'Xinguara',
      uf: 'PA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      /* ---------- NOVOS ---------- */
      matriculas: 'Matrícula nº 12.345 – CRI de Xinguara/PA',
      cpfCnpjProprietario: '111.222.333-44',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 10978.8258,
      areaCertificada: 10978.8258,
      areaVisada: 10978.8258,
      vtiMedio: 181997328.31,
      vtnMedio: 181997328.31,
    },

    obtencao: {
      processoSei: '54000.160184/2025-42',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Compra e Venda Decreto 433/92',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 201,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Silvio Santos',
    },

    avaliacao: {
      valorTotalImovelInferior: 192387136.53,
      valorTotalImovelMedio: 181997328.31,
      valorTotalImovelSuperior: 206036936.15,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 175172428.5,
      valorTerraNuaMedio: 181997328.31,
      valorTerraNuaSuperior: 188822228.12,
      valorBenfeitorias: 17214708.03,
      valorPassivoAmbiental: 242641.88,
      valorAtivoAmbiental: 0,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },

    resolucaoCdr: {
      idResolucaoCdr: '001',
      dataResolucaoCdr: new Date('2026-08-27'),
      dataReuniaoCdr: new Date('2026-08-20'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 10978.8258,
      valorTotal: 192387136.53,
      valorTotalPorExtenso:
        'Cento e noventa e dois milhões, trezentos e oitenta e sete mil, cento e trinta e seis reais e cinquenta e três centavos',
      valorTda: 175172428.5,
      valorTdaPorExtenso:
        'Cento e setenta e cinco milhões, cento e setenta e dois mil, quatrocentos e vinte e oito reais e cinquenta centavos',
      valorMoeda: 17214708.03,
      valorMoedaPorExtenso:
        'Dezessete milhões, duzentos e catorze mil, setecentos e oito reais e três centavos',
      prazo: '30',
      responsavelPagamento:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      cpfResponsavel: '111.222.333-44',
    },

    /* ---------- NOVO — Fase 2 ---------- */
    instrucaoBasica: {
      espelhoImovelSncr: 'Espelho SNCR - Fazenda Surubim (cód. 1478523697412)',
      espelhoImovelSncrAnexo: 'espelho-sncr-surubim.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/PA-1504200-1A2B3C4D5E6F7G8H',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-surubim.pdf',

      matriculas: 'Matrícula nº 12.345 – CRI de Xinguara/PA',
      matriculasAnexo: 'matricula-surubim.pdf',

      arquivoVetorialShp: 'surubim_vetorial.zip',
      arquivoVetorialShpAnexo: 'surubim_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda Surubim (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-surubim.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda Surubim',
      memorialDescritivoAnexo: 'memorial-descritivo-surubim.pdf',

      observacao:
        'Documentação em conformidade com SIGEF/SNCR/SICAR. Nenhuma pendência identificada nesta fase.',
    },
  },

  {
    imovel: {
      sr: 'SR(12)MA',
      imovel: 'Baixa Fria e São Benedito',
      sncr: '3978523697414',
      areaHa: null,
      proprietario: 'Itaguatins S/A. Agropecuária',
      processo: '54000.079109/2025-65',
      modalidade: 'Adjudicação',
      situacao: 'Em Trâmite',
      municipio: 'Coelho Neto',
      uf: 'MA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 9.876 – CRI de Coelho Neto/MA',
      cpfCnpjProprietario: '22.333.444/0001-55',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: null,
      areaCertificada: null,
      areaVisada: null,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.079109/2025-65',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Adjudicação',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Silvio Santos',
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '002',
      dataResolucaoCdr: new Date('2026-07-15'),
      dataReuniaoCdr: new Date('2026-07-10'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 5234.12,
      valorTotal: 78997328.31,
      valorTotalPorExtenso:
        'Setenta e oito milhões, novecentos e noventa e sete mil, trezentos e vinte e oito reais e trinta e um centavos',
      valorTda: 75172428.5,
      valorTdaPorExtenso:
        'Setenta e cinco milhões, cento e setenta e dois mil, quatrocentos e vinte e oito reais e cinquenta centavos',
      valorMoeda: 7214708.03,
      valorMoedaPorExtenso:
        'Sete milhões, duzentos e catorze mil, setecentos e oito reais e três centavos',
      prazo: '45',
      responsavelPagamento: 'Caixa Econômica Federal - Agência Redenção',
      cpfResponsavel: '222.333.444-55',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Baixa Fria e São Benedito (cód. 3978523697414)',
      espelhoImovelSncrAnexo: 'espelho-sncr-baixa-fria.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MA-2103109-9F8E7D6C5B4A3928',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-baixa-fria.pdf',

      matriculas: 'Matrícula nº 9.876 – CRI de Coelho Neto/MA',
      matriculasAnexo: 'matricula-baixa-fria.pdf',

      arquivoVetorialShp: 'baixa-fria_vetorial.zip',
      arquivoVetorialShpAnexo: 'baixa-fria_vetorial.zip',

      mapaImpresso: 'Mapa - Baixa Fria e São Benedito (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-baixa-fria.pdf',

      memorialDescritivo: 'Memorial Descritivo - Baixa Fria e São Benedito',
      memorialDescritivoAnexo: 'memorial-descritivo-baixa-fria.pdf',

      observacao:
        'Área registrada pendente de atualização junto ao CRI. Demais documentos regulares.',
    },
  },

  {
    imovel: {
      sr: 'SR(27)MBA',
      imovel: 'Fazenda Surubim',
      sncr: '1478523697412',
      areaHa: 10978.8258,
      proprietario:
        'Amilcar Farid Yamin, Adriane Rocha Yamin e Christiane Rocha Yamin',
      processo: '54000.160184/2025-42',
      modalidade: 'Compra e Venda Decreto 433/92',
      situacao: 'Em Trâmite',
      municipio: 'Xinguara',
      uf: 'PA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 12.345 – CRI de Xinguara/PA',
      cpfCnpjProprietario: '111.222.333-44',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 10978.8258,
      areaCertificada: 10978.8258,
      areaVisada: 10978.8258,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.160184/2025-42',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Compra e Venda Decreto 433/92',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Silvio Santos',
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr: 'Espelho SNCR - Fazenda Surubim (cód. 1478523697412)',
      espelhoImovelSncrAnexo: 'espelho-sncr-surubim.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/PA-1504200-1A2B3C4D5E6F7G8H',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-surubim.pdf',

      matriculas: 'Matrícula nº 12.345 – CRI de Xinguara/PA',
      matriculasAnexo: 'matricula-surubim.pdf',

      arquivoVetorialShp: 'surubim_vetorial.zip',
      arquivoVetorialShpAnexo: 'surubim_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda Surubim (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-surubim.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda Surubim',
      memorialDescritivoAnexo: 'memorial-descritivo-surubim.pdf',

      observacao: 'Documentação em conformidade com SIGEF/SNCR/SICAR.',
    },
  },

  {
    imovel: {
      sr: 'SR(12)MA',
      imovel: 'Baixa Fria e São Benedito',
      sncr: '3978523697414',
      areaHa: null,
      proprietario: 'Itaguatins S/A. Agropecuária',
      processo: '54000.079109/2025-65',
      modalidade: 'Adjudicação',
      situacao: 'Em Trâmite',
      municipio: 'Coelho Neto',
      uf: 'MA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 9.876 – CRI de Coelho Neto/MA',
      cpfCnpjProprietario: '22.333.444/0001-55',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: null,
      areaCertificada: null,
      areaVisada: null,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.079109/2025-65',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Adjudicação',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Silvio Santos',
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Baixa Fria e São Benedito (cód. 3978523697414)',
      espelhoImovelSncrAnexo: 'espelho-sncr-baixa-fria.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MA-2103109-9F8E7D6C5B4A3928',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-baixa-fria.pdf',

      matriculas: 'Matrícula nº 9.876 – CRI de Coelho Neto/MA',
      matriculasAnexo: 'matricula-baixa-fria.pdf',

      arquivoVetorialShp: 'baixa-fria_vetorial.zip',
      arquivoVetorialShpAnexo: 'baixa-fria_vetorial.zip',

      mapaImpresso: 'Mapa - Baixa Fria e São Benedito (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-baixa-fria.pdf',

      memorialDescritivo: 'Memorial Descritivo - Baixa Fria e São Benedito',
      memorialDescritivoAnexo: 'memorial-descritivo-baixa-fria.pdf',

      observacao: 'Área registrada pendente de atualização junto ao CRI.',
    },
  },

  {
    imovel: {
      sr: 'SR(20)ES',
      imovel: 'Bloco 16 AR',
      sncr: '7578523698912',
      areaHa: 503.5075,
      proprietario: 'Claralba Comercial S.A (Suzano)',
      processo: '54000.037326/2024-14',
      modalidade: 'Compra e Venda Decreto 433/92',
      situacao: 'Em Trâmite',
      municipio: 'Aracruz',
      uf: 'ES',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 45.678 – CRI de Aracruz/ES',
      cpfCnpjProprietario: '33.444.555/0001-66',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 503.5075,
      areaCertificada: 503.5075,
      areaVisada: 503.5075,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.037326/2024-14',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Compra e Venda Decreto 433/92',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },

    resolucaoCdr: {
      idResolucaoCdr: '004',
      dataResolucaoCdr: new Date('2026-04-10'),
      dataReuniaoCdr: new Date('2026-04-05'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 15200.5,
      valorTotal: 255000000.0,
      valorTotalPorExtenso: 'Duzentos e cinquenta e cinco milhões de reais',
      valorTda: 230000000.0,
      valorTdaPorExtenso: 'Duzentos e trinta milhões de reais',
      valorMoeda: 2500000.0,
      valorMoedaPorExtenso: 'Dois milhões e quinhentos mil reais',
      prazo: '60',
      responsavelPagamento: 'Tesouro Nacional / SPU',
      cpfResponsavel: '444.555.666-77',
    },

    instrucaoBasica: {
      espelhoImovelSncr: 'Espelho SNCR - Bloco 16 AR (cód. 7578523698912)',
      espelhoImovelSncrAnexo: 'espelho-sncr-bloco16.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/ES-3200607-2B3C4D5E6F7G8H9I',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-bloco16.pdf',

      matriculas: 'Matrícula nº 45.678 – CRI de Aracruz/ES',
      matriculasAnexo: 'matricula-bloco16.pdf',

      arquivoVetorialShp: 'bloco16_vetorial.zip',
      arquivoVetorialShpAnexo: 'bloco16_vetorial.zip',

      mapaImpresso: 'Mapa - Bloco 16 AR (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-bloco16.pdf',

      memorialDescritivo: 'Memorial Descritivo - Bloco 16 AR',
      memorialDescritivoAnexo: 'memorial-descritivo-bloco16.pdf',

      observacao:
        'Área pequena com documentação completa. Sem pendências identificadas.',
    },
  },

  {
    imovel: {
      sr: 'SR(12)MA',
      imovel: 'Bom Lugar e Outros',
      sncr: '2078523697412',
      areaHa: 4324.0473,
      proprietario:
        'Grupo João Santos (Itapajé SA Celulose Papéis e Artefatos)',
      processo: '54000.095506/2025-84',
      modalidade: 'Adjudicação',
      situacao: 'Em Trâmite',
      municipio: 'Coelho Neto',
      uf: 'MA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 7.654 – CRI de Coelho Neto/MA',
      cpfCnpjProprietario: '44.555.666/0001-77',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 4324.0473,
      areaCertificada: 4324.0473,
      areaVisada: 4324.0473,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.095506/2025-84',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Adjudicação',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '005',
      dataResolucaoCdr: new Date('2026-03-05'),
      dataReuniaoCdr: new Date('2026-02-28'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 3200.75,
      valorTotal: 43000000.0,
      valorTotalPorExtenso: 'Quarenta e três milhões de reais',
      valorTda: 40000000.0,
      valorTdaPorExtenso: 'Quarenta milhões de reais',
      valorMoeda: 3000000.0,
      valorMoedaPorExtenso: 'Três milhões de reais',
      prazo: '20',
      responsavelPagamento: 'INCRA - Superintendência Regional RO',
      cpfResponsavel: '555.666.777-88',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Bom Lugar e Outros (cód. 2078523697412)',
      espelhoImovelSncrAnexo: 'espelho-sncr-bom-lugar.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MA-2103109-3C4D5E6F7G8H9I0J',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-bom-lugar.pdf',

      matriculas: 'Matrícula nº 7.654 – CRI de Coelho Neto/MA',
      matriculasAnexo: 'matricula-bom-lugar.pdf',

      arquivoVetorialShp: 'bom-lugar_vetorial.zip',
      arquivoVetorialShpAnexo: 'bom-lugar_vetorial.zip',

      mapaImpresso: 'Mapa - Bom Lugar e Outros (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-bom-lugar.pdf',

      memorialDescritivo: 'Memorial Descritivo - Bom Lugar e Outros',
      memorialDescritivoAnexo: 'memorial-descritivo-bom-lugar.pdf',

      observacao:
        'Imóvel oriundo de adjudicação. Verificar cadeia dominial na Fase 7.',
    },
  },

  {
    imovel: {
      sr: 'SR(12)MA',
      imovel: 'COCAL 1 E 2',
      sncr: '9478523697412',
      areaHa: null,
      proprietario: 'Itaguatins S/A. Agropecuária',
      processo: '54000.079133/2025-02',
      modalidade: 'Adjudicação',
      situacao: 'Em Trâmite',
      municipio: 'Coelho Neto',
      uf: 'MA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 3.210 – CRI de Coelho Neto/MA',
      cpfCnpjProprietario: '22.333.444/0001-55',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: null,
      areaCertificada: null,
      areaVisada: null,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.079133/2025-02',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Adjudicação',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '006',
      dataResolucaoCdr: new Date('2026-02-15'),
      dataReuniaoCdr: new Date('2026-02-10'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 18900.3,
      valorTotal: 310000000.0,
      valorTotalPorExtenso: 'Trezentos e dez milhões de reais',
      valorTda: 290000000.0,
      valorTdaPorExtenso: 'Duzentos e noventa milhões de reais',
      valorMoeda: 1500000.0,
      valorMoedaPorExtenso: 'Um milhão e quinhentos mil reais',
      prazo: '90',
      responsavelPagamento: 'Fundo Nacional de Reforma Agrária - FNRA',
      cpfResponsavel: '666.777.888-99',
    },

    instrucaoBasica: {
      espelhoImovelSncr: 'Espelho SNCR - COCAL 1 E 2 (cód. 9478523697412)',
      espelhoImovelSncrAnexo: 'espelho-sncr-cocal.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MA-2103109-4D5E6F7G8H9I0J1K',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-cocal.pdf',

      matriculas: 'Matrícula nº 3.210 – CRI de Coelho Neto/MA',
      matriculasAnexo: 'matricula-cocal.pdf',

      arquivoVetorialShp: 'cocal_vetorial.zip',
      arquivoVetorialShpAnexo: 'cocal_vetorial.zip',

      mapaImpresso: 'Mapa - COCAL 1 E 2 (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-cocal.pdf',

      memorialDescritivo: 'Memorial Descritivo - COCAL 1 E 2',
      memorialDescritivoAnexo: 'memorial-descritivo-cocal.pdf',

      observacao:
        'Área registrada pendente. Processo com prazo estendido para 90 dias.',
    },
  },

  {
    imovel: {
      sr: 'SR(09)PR',
      imovel: 'Colônia Piquiri (Lotes nº 87, 88 e 89)',
      sncr: '2578833697412',
      areaHa: 238.6899,
      proprietario: 'Anélia Stipp Amador e outros',
      processo: '54000.076811/2025-13',
      modalidade: 'Compra e Venda Decreto 433/92',
      situacao: 'Em Trâmite',
      municipio: 'Santa Maria do Oeste',
      uf: 'PR',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 21.543 – CRI de Santa Maria do Oeste/PR',
      cpfCnpjProprietario: '555.666.777-88',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 238.6899,
      areaCertificada: 238.6899,
      areaVisada: 238.6899,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.076811/2025-13',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Compra e Venda Decreto 433/92',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '002',
      dataResolucaoCdr: new Date('2026-07-15'),
      dataReuniaoCdr: new Date('2026-07-10'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 5234.12,
      valorTotal: 78997328.31,
      valorTotalPorExtenso:
        'Setenta e oito milhões, novecentos e noventa e sete mil, trezentos e vinte e oito reais e trinta e um centavos',
      valorTda: 75172428.5,
      valorTdaPorExtenso:
        'Setenta e cinco milhões, cento e setenta e dois mil, quatrocentos e vinte e oito reais e cinquenta centavos',
      valorMoeda: 7214708.03,
      valorMoedaPorExtenso:
        'Sete milhões, duzentos e catorze mil, setecentos e oito reais e três centavos',
      prazo: '45',
      responsavelPagamento: 'Caixa Econômica Federal - Agência Redenção',
      cpfResponsavel: '222.333.444-55',
    },

    instrucaoBasica: {
      espelhoImovelSncr: 'Espelho SNCR - Colônia Piquiri (cód. 2578833697412)',
      espelhoImovelSncrAnexo: 'espelho-sncr-colonia-piquiri.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/PR-4124103-5E6F7G8H9I0J1K2L',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-colonia-piquiri.pdf',

      matriculas: 'Matrícula nº 21.543 – CRI de Santa Maria do Oeste/PR',
      matriculasAnexo: 'matricula-colonia-piquiri.pdf',

      arquivoVetorialShp: 'colonia-piquiri_vetorial.zip',
      arquivoVetorialShpAnexo: 'colonia-piquiri_vetorial.zip',

      mapaImpresso: 'Mapa - Colônia Piquiri (Lotes 87, 88 e 89) (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-colonia-piquiri.pdf',

      memorialDescritivo:
        'Memorial Descritivo - Colônia Piquiri (Lotes 87, 88 e 89)',
      memorialDescritivoAnexo: 'memorial-descritivo-colonia-piquiri.pdf',

      observacao:
        'Pequenas áreas com múltiplos proprietários. Verificar cadeia dominial individualizada.',
    },
  },

  {
    imovel: {
      sr: 'SR(02)PE',
      imovel: 'Engenho Dois Rios, Gleba São Bento',
      sncr: '1378524197412',
      areaHa: 341.1496,
      proprietario: '3R Empreendimentos Imobiliários LTDA',
      processo: '54000.183516/2023-41',
      modalidade: 'Compra e Venda Decreto 433/92',
      situacao: 'Em Trâmite',
      municipio: 'Itambé',
      uf: 'PE',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 5.432 – CRI de Itambé/PE',
      cpfCnpjProprietario: '66.777.888/0001-99',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 341.1496,
      areaCertificada: 341.1496,
      areaVisada: 341.1496,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.183516/2023-41',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Compra e Venda Decreto 433/92',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Engenho Dois Rios, Gleba São Bento (cód. 1378524197412)',
      espelhoImovelSncrAnexo: 'espelho-sncr-engenho-dois-rios.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/PE-2607653-6F7G8H9I0J1K2L3M',
      demonstrativoImovelSicarAnexo:
        'demonstrativo-sicar-engenho-dois-rios.pdf',

      matriculas: 'Matrícula nº 5.432 – CRI de Itambé/PE',
      matriculasAnexo: 'matricula-engenho-dois-rios.pdf',

      arquivoVetorialShp: 'engenho-dois-rios_vetorial.zip',
      arquivoVetorialShpAnexo: 'engenho-dois-rios_vetorial.zip',

      mapaImpresso: 'Mapa - Engenho Dois Rios, Gleba São Bento (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-engenho-dois-rios.pdf',

      memorialDescritivo:
        'Memorial Descritivo - Engenho Dois Rios, Gleba São Bento',
      memorialDescritivoAnexo: 'memorial-descritivo-engenho-dois-rios.pdf',

      observacao:
        'Imóvel com área reduzida. Documentação SIGEF em conformidade.',
    },
  },

  {
    imovel: {
      sr: 'SR(27)MBA',
      imovel: 'Castanhal João Lobo (Fazenda Mutamba)',
      sncr: '6378523697412',
      areaHa: 1685.0366,
      proprietario: 'Espólio de Aziz Mutran Neto',
      processo: '54000.062562/2025-32',
      modalidade: 'Desapropriação Lei 4132/62',
      situacao: 'Em Trâmite',
      municipio: 'Marabá',
      uf: 'PA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 8.901 – CRI de Marabá/PA',
      cpfCnpjProprietario: '777.888.999-00',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 1685.0366,
      areaCertificada: 1685.0366,
      areaVisada: 1685.0366,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.062562/2025-32',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Desapropriação Lei 4132/62',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Castanhal João Lobo / Fazenda Mutamba (cód. 6378523697412)',
      espelhoImovelSncrAnexo: 'espelho-sncr-mutamba.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/PA-1504200-7G8H9I0J1K2L3M4N',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-mutamba.pdf',

      matriculas: 'Matrícula nº 8.901 – CRI de Marabá/PA',
      matriculasAnexo: 'matricula-mutamba.pdf',

      arquivoVetorialShp: 'mutamba_vetorial.zip',
      arquivoVetorialShpAnexo: 'mutamba_vetorial.zip',

      mapaImpresso:
        'Mapa - Castanhal João Lobo (Fazenda Mutamba) (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-mutamba.pdf',

      memorialDescritivo:
        'Memorial Descritivo - Castanhal João Lobo (Fazenda Mutamba)',
      memorialDescritivoAnexo: 'memorial-descritivo-mutamba.pdf',

      observacao:
        'Desapropriação por interesse social. Espólio como proprietário — verificar inventário.',
    },
  },

  {
    imovel: {
      sr: 'SR(13)MT',
      imovel: 'FAZENDA MONTE ALEGRE, PARTE (GLEBA SALOBRA)',
      sncr: '',
      areaHa: 12111.542,
      proprietario: 'União Federal',
      processo: '54000.035933/2023-41',
      modalidade: 'Arrecadação de Terras Públicas da União',
      situacao: 'Em Trâmite',
      municipio: 'Cáceres',
      uf: 'MT',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 14.258 – CRI de Cáceres/MT',
      cpfCnpjProprietario: '00.394.544/0001-08',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 12111.542,
      areaCertificada: 12111.542,
      areaVisada: 12111.542,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.035933/2023-41',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Arrecadação de Terras Públicas da União',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Monte Alegre, Parte (Gleba Salobra) — código SNCR não informado',
      espelhoImovelSncrAnexo: 'espelho-sncr-monte-alegre.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MT-5102504-8H9I0J1K2L3M4N5O',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-monte-alegre.pdf',

      matriculas: 'Matrícula nº 14.258 – CRI de Cáceres/MT',
      matriculasAnexo: 'matricula-monte-alegre.pdf',

      arquivoVetorialShp: 'monte-alegre_vetorial.zip',
      arquivoVetorialShpAnexo: 'monte-alegre_vetorial.zip',

      mapaImpresso:
        'Mapa - Fazenda Monte Alegre, Parte (Gleba Salobra) (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-monte-alegre.pdf',

      memorialDescritivo:
        'Memorial Descritivo - Fazenda Monte Alegre, Parte (Gleba Salobra)',
      memorialDescritivoAnexo: 'memorial-descritivo-monte-alegre.pdf',

      observacao:
        'Imóvel da União Federal. Arrecadação de terras públicas — verificar destinação na Fase 13.',
    },
  },

  {
    imovel: {
      sr: 'SR(13)MT',
      imovel: 'GLEBA MACACO',
      sncr: '9502040000000',
      areaHa: 46852.864,
      proprietario: 'UNIÃO FEDERAL',
      processo: '54000.011137/2018-56',
      modalidade: 'Arrecadação de Terras Públicas da União',
      situacao: 'Em Trâmite',
      municipio: 'União do Sul',
      uf: 'MT',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 18.756 – CRI de União do Sul/MT',
      cpfCnpjProprietario: '00.394.544/0001-08',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 46852.864,
      areaCertificada: 46852.864,
      areaVisada: 46852.864,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.011137/2018-56',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Arrecadação de Terras Públicas da União',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr: 'Espelho SNCR - Gleba Macaco (cód. 9502040000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-gleba-macaco.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MT-5102504-9I0J1K2L3M4N5O6P',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-gleba-macaco.pdf',

      matriculas: 'Matrícula nº 18.756 – CRI de União do Sul/MT',
      matriculasAnexo: 'matricula-gleba-macaco.pdf',

      arquivoVetorialShp: 'gleba-macaco_vetorial.zip',
      arquivoVetorialShpAnexo: 'gleba-macaco_vetorial.zip',

      mapaImpresso: 'Mapa - Gleba Macaco (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-gleba-macaco.pdf',

      memorialDescritivo: 'Memorial Descritivo - Gleba Macaco',
      memorialDescritivoAnexo: 'memorial-descritivo-gleba-macaco.pdf',

      observacao:
        'Gleba pública federal de grande extensão. Verificar sobreposição com UC na Fase 6.',
    },
  },

  {
    imovel: {
      sr: 'SR(13)MT',
      imovel: 'Gleba Pública Federal Ribeirão Grande - Remanescente III',
      sncr: '9501140000000',
      areaHa: 3676.843,
      proprietario: 'UNIÃO FEDERAL',
      processo: '54000.136209/2018-77',
      modalidade: 'Arrecadação de Terras Públicas da União',
      situacao: 'Em Trâmite',
      municipio: 'Nova Mutum',
      uf: 'MT',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 22.109 – CRI de Nova Mutum/MT',
      cpfCnpjProprietario: '00.394.544/0001-08',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 3676.843,
      areaCertificada: 3676.843,
      areaVisada: 3676.843,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.136209/2018-77',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Arrecadação de Terras Públicas da União',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Gleba Pública Federal Ribeirão Grande - Remanescente III (cód. 9501140000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-ribeirao-grande.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MT-5106224-0J1K2L3M4N5O6P7Q',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-ribeirao-grande.pdf',

      matriculas: 'Matrícula nº 22.109 – CRI de Nova Mutum/MT',
      matriculasAnexo: 'matricula-ribeirao-grande.pdf',

      arquivoVetorialShp: 'ribeirao-grande_vetorial.zip',
      arquivoVetorialShpAnexo: 'ribeirao-grande_vetorial.zip',

      mapaImpresso:
        'Mapa - Gleba Pública Federal Ribeirão Grande - Remanescente III (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-ribeirao-grande.pdf',

      memorialDescritivo:
        'Memorial Descritivo - Gleba Pública Federal Ribeirão Grande - Remanescente III',
      memorialDescritivoAnexo: 'memorial-descritivo-ribeirao-grande.pdf',

      observacao:
        'Remanescente de gleba pública. Verificar sobreposição com projetos de assentamento existentes.',
    },
  },

  {
    imovel: {
      sr: 'SR(14)AC',
      imovel: 'Gleba São Pedro do Icó',
      sncr: '9502200000000',
      areaHa: null,
      proprietario:
        'UNIÃO FEDERAL (A área visada é menor devido ao acordo N° 05/2025 Câmara de Destinação de Terras Públicas, SEI 24921057)',
      processo: '54000.125706/2024-98',
      modalidade: 'Arrecadação de Terras Públicas da União',
      situacao: 'Em Trâmite',
      municipio: 'Sena Madureira',
      uf: 'AC',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 11.222 – CRI de Sena Madureira/AC',
      cpfCnpjProprietario: '00.394.544/0001-08',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: null,
      areaCertificada: null,
      areaVisada: null,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.125706/2024-98',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Arrecadação de Terras Públicas da União',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Gleba São Pedro do Icó (cód. 9502200000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-sao-pedro-ico.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/AC-1200500-1K2L3M4N5O6P7Q8R',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-sao-pedro-ico.pdf',

      matriculas: 'Matrícula nº 11.222 – CRI de Sena Madureira/AC',
      matriculasAnexo: 'matricula-sao-pedro-ico.pdf',

      arquivoVetorialShp: 'sao-pedro-ico_vetorial.zip',
      arquivoVetorialShpAnexo: 'sao-pedro-ico_vetorial.zip',

      mapaImpresso: 'Mapa - Gleba São Pedro do Icó (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-sao-pedro-ico.pdf',

      memorialDescritivo: 'Memorial Descritivo - Gleba São Pedro do Icó',
      memorialDescritivoAnexo: 'memorial-descritivo-sao-pedro-ico.pdf',

      observacao:
        'Atenção: acordo N° 05/2025 da Câmara de Destinação de Terras Públicas (SEI 24921057) reduz a área visada.',
    },
  },

  {
    imovel: {
      sr: 'SR(14)AC',
      imovel: 'Seringal Acaraú',
      sncr: '9502630000000',
      areaHa: 142849.152,
      proprietario: 'UNIÃO FEDERAL',
      processo: '54000.058789/2025-83',
      modalidade: 'Arrecadação de Terras Públicas da União',
      situacao: 'Em Trâmite',
      municipio: 'Tarauacá',
      uf: 'AC',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 33.444 – CRI de Tarauacá/AC',
      cpfCnpjProprietario: '00.394.544/0001-08',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 142849.152,
      areaCertificada: 142849.152,
      areaVisada: 142849.152,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.058789/2025-83',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Arrecadação de Terras Públicas da União',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Banco do Brasil',
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr: 'Espelho SNCR - Seringal Acaraú (cód. 9502630000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-seringal-acarau.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/AC-1200401-2L3M4N5O6P7Q8R9S',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-seringal-acarau.pdf',

      matriculas: 'Matrícula nº 33.444 – CRI de Tarauacá/AC',
      matriculasAnexo: 'matricula-seringal-acarau.pdf',

      arquivoVetorialShp: 'seringal-acarau_vetorial.zip',
      arquivoVetorialShpAnexo: 'seringal-acarau_vetorial.zip',

      mapaImpresso: 'Mapa - Seringal Acaraú (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-seringal-acarau.pdf',

      memorialDescritivo: 'Memorial Descritivo - Seringal Acaraú',
      memorialDescritivoAnexo: 'memorial-descritivo-seringal-acarau.pdf',

      observacao:
        'Imóvel de grande extensão na Amazônia Legal. Atenção à sobreposição com UC/ TI na Fase 6.',
    },
  },

  {
    imovel: {
      sr: 'SR(26)TO',
      imovel:
        'Fazenda Navarro, lotes 216, 218, 263, 264P, 268 e 269 da Gleba Anaja Pombas',
      sncr: '',
      areaHa: 43014.543,
      proprietario: 'União',
      processo: '54000.113404/2025-58',
      modalidade: 'Arrecadação de Terras Públicas da União',
      situacao: 'Em Trâmite',
      municipio: 'Palmeirante',
      uf: 'TO',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 15.987 – CRI de Palmeirante/TO',
      cpfCnpjProprietario: '00.394.544/0001-08',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 43014.543,
      areaCertificada: 43014.543,
      areaVisada: 43014.543,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.113404/2025-58',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Arrecadação de Terras Públicas da União',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Banco do Brasil',
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Navarro, lotes 216, 218, 263, 264P, 268 e 269 da Gleba Anaja Pombas — código SNCR não informado',
      espelhoImovelSncrAnexo: 'espelho-sncr-fazenda-navarro.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/TO-1720937-3M4N5O6P7Q8R9S0T',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-fazenda-navarro.pdf',

      matriculas: 'Matrícula nº 15.987 – CRI de Palmeirante/TO',
      matriculasAnexo: 'matricula-fazenda-navarro.pdf',

      arquivoVetorialShp: 'fazenda-navarro_vetorial.zip',
      arquivoVetorialShpAnexo: 'fazenda-navarro_vetorial.zip',

      mapaImpresso:
        'Mapa - Fazenda Navarro, lotes 216, 218, 263, 264P, 268 e 269 (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-fazenda-navarro.pdf',

      memorialDescritivo:
        'Memorial Descritivo - Fazenda Navarro, lotes 216, 218, 263, 264P, 268 e 269',
      memorialDescritivoAnexo: 'memorial-descritivo-fazenda-navarro.pdf',

      observacao:
        'Múltiplos lotes em uma única matrícula. Verificar individualização na Fase 7.',
    },
  },

  {
    imovel: {
      sr: 'SR(26)TO',
      imovel: 'LOTEAMENTO MARIANÓPOLIS GLEBA 2 LOTE 24',
      sncr: '',
      areaHa: 9715.82,
      proprietario: 'União',
      processo: '54000.064376/2025-38',
      modalidade: 'Arrecadação de Terras Públicas da União',
      situacao: 'Em Trâmite',
      municipio: 'Marianópolis do Tocantins',
      uf: 'TO',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 19.753 – CRI de Marianópolis/TO',
      cpfCnpjProprietario: '00.394.544/0001-08',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 9715.82,
      areaCertificada: 9715.82,
      areaVisada: 9715.82,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.064376/2025-38',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Arrecadação de Terras Públicas da União',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Banco do Brasil',
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Loteamento Marianópolis Gleba 2 Lote 24 — código SNCR não informado',
      espelhoImovelSncrAnexo: 'espelho-sncr-marianopolis.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/TO-1716307-4N5O6P7Q8R9S0T1U',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-marianopolis.pdf',

      matriculas: 'Matrícula nº 19.753 – CRI de Marianópolis/TO',
      matriculasAnexo: 'matricula-marianopolis.pdf',

      arquivoVetorialShp: 'marianopolis_vetorial.zip',
      arquivoVetorialShpAnexo: 'marianopolis_vetorial.zip',

      mapaImpresso:
        'Mapa - Loteamento Marianópolis Gleba 2 Lote 24 (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-marianopolis.pdf',

      memorialDescritivo:
        'Memorial Descritivo - Loteamento Marianópolis Gleba 2 Lote 24',
      memorialDescritivoAnexo: 'memorial-descritivo-marianopolis.pdf',

      observacao:
        'Lote individualizado em gleba pública. Verificar destinação na Fase 13.',
    },
  },

  {
    imovel: {
      sr: 'SR(08)SP',
      imovel: 'Fazenda Santa Fé (Recreio Gleba 3)',
      sncr: '9500920000000',
      areaHa: 4049.031,
      proprietario: 'Jorge Ivan Cassaro',
      processo: '54000.018750/2025-23',
      modalidade: 'Desapropriação Lei 8.629/93',
      situacao: 'Em Trâmite',
      municipio: 'Gália',
      uf: 'SP',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 28.456 – CRI de Gália/SP',
      cpfCnpjProprietario: '888.999.000-11',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 4049.031,
      areaCertificada: 4049.031,
      areaVisada: 4049.031,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54000.018750/2025-23',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Desapropriação Lei 8.629/93',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Banco do Brasil',
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Santa Fé / Recreio Gleba 3 (cód. 9500920000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-santa-fe.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/SP-3516606-5O6P7Q8R9S0T1U2V',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-santa-fe.pdf',

      matriculas: 'Matrícula nº 28.456 – CRI de Gália/SP',
      matriculasAnexo: 'matricula-santa-fe.pdf',

      arquivoVetorialShp: 'santa-fe_vetorial.zip',
      arquivoVetorialShpAnexo: 'santa-fe_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda Santa Fé (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-santa-fe.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda Santa Fé',
      memorialDescritivoAnexo: 'memorial-descritivo-santa-fe.pdf',

      observacao:
        'Desapropriação por interesse social (Lei 8.629/93). Documentação regular.',
    },
  },

  {
    imovel: {
      sr: 'SR(08)SP',
      imovel: 'Fazenda Três Irmãos',
      sncr: '6011280000000',
      areaHa: 4987.911,
      proprietario: 'Olimpia Maria Ferreira Thiago',
      processo: '54190.003091/2007-59',
      modalidade: 'Desapropriação Lei 8.629/93',
      situacao: 'Em Trâmite',
      municipio: "Palmeira d'Oeste",
      uf: 'SP',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: "Matrícula nº 32.109 – CRI de Palmeira d'Oeste/SP",
      cpfCnpjProprietario: '999.000.111-22',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 4987.911,
      areaCertificada: 4987.911,
      areaVisada: 4987.911,
      vtiMedio: 0,
      vtnMedio: 0,
    },

    obtencao: {
      processoSei: '54190.003091/2007-59',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Desapropriação Lei 8.629/93',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 0,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: 'Banco do Brasil',
    },

    avaliacao: {
      valorTotalImovelInferior: 0,
      valorTotalImovelMedio: 0,
      valorTotalImovelSuperior: 0,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 0,
      valorTerraNuaMedio: 0,
      valorTerraNuaSuperior: 0,
      valorBenfeitorias: 0,
      valorPassivoAmbiental: 0,
      valorAtivoAmbiental: 0,
    },
    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Três Irmãos (cód. 6011280000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-tres-irmaos.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/SP-3534806-6P7Q8R9S0T1U2V3W',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-tres-irmaos.pdf',

      matriculas: "Matrícula nº 32.109 – CRI de Palmeira d'Oeste/SP",
      matriculasAnexo: 'matricula-tres-irmaos.pdf',

      arquivoVetorialShp: 'tres-irmaos_vetorial.zip',
      arquivoVetorialShpAnexo: 'tres-irmaos_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda Três Irmãos (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-tres-irmaos.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda Três Irmãos',
      memorialDescritivoAnexo: 'memorial-descritivo-tres-irmaos.pdf',

      observacao:
        'Processo antigo (2007). Verificar atualização cadastral na Fase 7.',
    },
  },

  {
    imovel: {
      sr: 'SR(27)MBA',
      imovel: 'Fazenda Santa Helena',
      sncr: '2589631478520',
      areaHa: 8456.3271,
      proprietario:
        'João Carlos de Almeida, Maria de Fátima Almeida e Pedro Henrique Almeida',
      processo: '54000.125478/2025-18',
      modalidade: 'Desapropriação Lei 4132/62',
      situacao: 'Em Trâmite',
      municipio: 'Marabá',
      uf: 'PA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 41.258 – CRI de Marabá/PA',
      cpfCnpjProprietario: '123.456.789-00',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 8456.3271,
      areaCertificada: 8456.3271,
      areaVisada: 8456.3271,
      vtiMedio: 96587324.18,
      vtnMedio: 86587324.18,
    },

    obtencao: {
      processoSei: '54000.125478/2025-18',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Desapropriação Lei 4132/62',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 156,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 87452136.42,
      valorTotalImovelMedio: 96587324.18,
      valorTotalImovelSuperior: 105478921.67,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 79852136.42,
      valorTerraNuaMedio: 86587324.18,
      valorTerraNuaSuperior: 95478921.67,
      valorBenfeitorias: 10000000,
      valorPassivoAmbiental: 254321.88,
      valorAtivoAmbiental: 0,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Santa Helena (cód. 2589631478520)',
      espelhoImovelSncrAnexo: 'espelho-sncr-santa-helena.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/PA-1504200-7Q8R9S0T1U2V3W4X',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-santa-helena.pdf',

      matriculas: 'Matrícula nº 41.258 – CRI de Marabá/PA',
      matriculasAnexo: 'matricula-santa-helena.pdf',

      arquivoVetorialShp: 'santa-helena_vetorial.zip',
      arquivoVetorialShpAnexo: 'santa-helena_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda Santa Helena (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-santa-helena.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda Santa Helena',
      memorialDescritivoAnexo: 'memorial-descritivo-santa-helena.pdf',

      observacao:
        'Desapropriação com capacidade para 156 famílias. Documentação SIGEF em conformidade.',
    },
  },

  {
    imovel: {
      sr: 'SR(08)SP',
      imovel: 'Fazenda Boa Esperança',
      sncr: '3698521470369',
      areaHa: 5234.7896,
      proprietario: 'Espólio de Antônio Pereira da Silva e sucessores',
      processo: '54000.298741/2025-63',
      modalidade: 'Desapropriação Lei 4132/62',
      situacao: 'Em Trâmite',
      municipio: 'Presidente Prudente',
      uf: 'SP',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 52.369 – CRI de Presidente Prudente/SP',
      cpfCnpjProprietario: '234.567.890-11',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 5234.7896,
      areaCertificada: 5234.7896,
      areaVisada: 5234.7896,
      vtiMedio: 58742951.26,
      vtnMedio: 53242951.26,
    },

    obtencao: {
      processoSei: '54000.298741/2025-63',
      situacao: 'Em Trâmite',
      entidadeDemandante:
        'INCRA - Instituto Nacional de Colonização e Reforma Agrária',
      processoCadeiaDominial: '',
      formaObtencao: 'Desapropriação Lei 4132/62',
      acampamentoVinculado: '',
      imovelOcupado: true,
      orgaoConcorrente: 'Nenhum',
      capacidadeAssentamento: 98,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 52368142.73,
      valorTotalImovelMedio: 58742951.26,
      valorTotalImovelSuperior: 65178324.91,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 47852136.73,
      valorTerraNuaMedio: 53242951.26,
      valorTerraNuaSuperior: 59178324.91,
      valorBenfeitorias: 5500000,
      valorPassivoAmbiental: 128754.32,
      valorAtivoAmbiental: 75000,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Boa Esperança (cód. 3698521470369)',
      espelhoImovelSncrAnexo: 'espelho-sncr-boa-esperanca.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/SP-3541406-8R9S0T1U2V3W4X5Y',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-boa-esperanca.pdf',

      matriculas: 'Matrícula nº 52.369 – CRI de Presidente Prudente/SP',
      matriculasAnexo: 'matricula-boa-esperanca.pdf',

      arquivoVetorialShp: 'boa-esperanca_vetorial.zip',
      arquivoVetorialShpAnexo: 'boa-esperanca_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda Boa Esperança (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-boa-esperanca.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda Boa Esperança',
      memorialDescritivoAnexo: 'memorial-descritivo-boa-esperanca.pdf',

      observacao:
        'ATENÇÃO: imóvel ocupado (imovelOcupado = true). Verificar ações de reintegração de posse antes da destinação.',
    },
  },

  {
    imovel: {
      sr: 'SR(11)RS',
      imovel: 'Fazenda Rincão de São Brás (Fazenda Barcelos)',
      sncr: '9500420000000',
      areaHa: 321654,
      proprietario: 'Banco do Brasil SA',
      processo: '54000.116968/2024-61',
      modalidade: 'Aquisição Onerosa de Entidades Públicas (Compensação)',
      situacao: 'Em Trâmite',
      municipio: 'Viamão',
      uf: 'RS',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 62.147 – CRI de Viamão/RS',
      cpfCnpjProprietario: '00.000.000/0001-91',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 321654,
      areaCertificada: 321654,
      areaVisada: 321654,
      vtiMedio: 58742951.26,
      vtnMedio: 53242951.26,
    },

    obtencao: {
      processoSei: '54000.116968/2024-61',
      situacao: 'Em Trâmite',
      entidadeDemandante: '',
      processoCadeiaDominial: '',
      formaObtencao: 'Aquisição Onerosa de Entidades Públicas (Compensação)',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: '',
      capacidadeAssentamento: 3214,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 52368142.73,
      valorTotalImovelMedio: 58742951.26,
      valorTotalImovelSuperior: 65178324.91,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 47852136.73,
      valorTerraNuaMedio: 53242951.26,
      valorTerraNuaSuperior: 59178324.91,
      valorBenfeitorias: 5500000,
      valorPassivoAmbiental: 128754.32,
      valorAtivoAmbiental: 75000,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Rincão de São Brás / Fazenda Barcelos (cód. 9500420000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-rincao-sao-bras.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/RS-4323002-9S0T1U2V3W4X5Y6Z',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-rincao-sao-bras.pdf',

      matriculas: 'Matrícula nº 62.147 – CRI de Viamão/RS',
      matriculasAnexo: 'matricula-rincao-sao-bras.pdf',

      arquivoVetorialShp: 'rincao-sao-bras_vetorial.zip',
      arquivoVetorialShpAnexo: 'rincao-sao-bras_vetorial.zip',

      mapaImpresso:
        'Mapa - Fazenda Rincão de São Brás (Fazenda Barcelos) (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-rincao-sao-bras.pdf',

      memorialDescritivo:
        'Memorial Descritivo - Fazenda Rincão de São Brás (Fazenda Barcelos)',
      memorialDescritivoAnexo: 'memorial-descritivo-rincao-sao-bras.pdf',

      observacao:
        'Aquisição onerosa de entidade pública (Banco do Brasil). Capacidade para 3.214 famílias.',
    },
  },

  {
    imovel: {
      sr: 'SR(14)AC',
      imovel: 'Seringal Gaivota',
      sncr: '',
      areaHa: 6142.52,
      proprietario: 'Banco do Brasil SA',
      processo: '54000.126269/2024-20',
      modalidade: 'Aquisição Onerosa de Entidades Públicas (Compensação)',
      situacao: 'Em Trâmite',
      municipio: 'Rio Branco',
      uf: 'AC',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 71.852 – CRI de Rio Branco/AC',
      cpfCnpjProprietario: '00.000.000/0001-91',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 6142.52,
      areaCertificada: 6142.52,
      areaVisada: 6142.52,
      vtiMedio: 58742951.26,
      vtnMedio: 53242951.26,
    },

    obtencao: {
      processoSei: '54000.126269/2024-20',
      situacao: 'Em Trâmite',
      entidadeDemandante: '',
      processoCadeiaDominial: '',
      formaObtencao: 'Aquisição Onerosa de Entidades Públicas (Compensação)',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: '',
      capacidadeAssentamento: 654,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 52368142.73,
      valorTotalImovelMedio: 58742951.26,
      valorTotalImovelSuperior: 65178324.91,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 47852136.73,
      valorTerraNuaMedio: 53242951.26,
      valorTerraNuaSuperior: 59178324.91,
      valorBenfeitorias: 5500000,
      valorPassivoAmbiental: 128754.32,
      valorAtivoAmbiental: 75000,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Seringal Gaivota — código SNCR não informado',
      espelhoImovelSncrAnexo: 'espelho-sncr-seringal-gaivota.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/AC-1200401-0T1U2V3W4X5Y6Z7A',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-seringal-gaivota.pdf',

      matriculas: 'Matrícula nº 71.852 – CRI de Rio Branco/AC',
      matriculasAnexo: 'matricula-seringal-gaivota.pdf',

      arquivoVetorialShp: 'seringal-gaivota_vetorial.zip',
      arquivoVetorialShpAnexo: 'seringal-gaivota_vetorial.zip',

      mapaImpresso: 'Mapa - Seringal Gaivota (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-seringal-gaivota.pdf',

      memorialDescritivo: 'Memorial Descritivo - Seringal Gaivota',
      memorialDescritivoAnexo: 'memorial-descritivo-seringal-gaivota.pdf',

      observacao:
        'Aquisição onerosa (Banco do Brasil). Código SNCR pendente de regularização.',
    },
  },

  {
    imovel: {
      sr: 'SR(16)MS',
      imovel: 'Fazenda São Vicente',
      sncr: '9110540000000',
      areaHa: 2135.991,
      proprietario: 'Banco do Brasil S/A',
      processo: '54000.078874/2024-87',
      modalidade: 'Aquisição Onerosa de Entidades Públicas (Compensação)',
      situacao: 'Em Trâmite',
      municipio: 'Maracaju',
      uf: 'MS',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 81.357 – CRI de Maracaju/MS',
      cpfCnpjProprietario: '00.000.000/0001-91',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 2135.991,
      areaCertificada: 2135.991,
      areaVisada: 2135.991,
      vtiMedio: 58742951.26,
      vtnMedio: 53242951.26,
    },

    obtencao: {
      processoSei: '54000.078874/2024-87',
      situacao: 'Em Trâmite',
      entidadeDemandante: '',
      processoCadeiaDominial: '',
      formaObtencao: 'Aquisição Onerosa de Entidades Públicas (Compensação)',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: '',
      capacidadeAssentamento: 34568,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 52368142.73,
      valorTotalImovelMedio: 58742951.26,
      valorTotalImovelSuperior: 65178324.91,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 47852136.73,
      valorTerraNuaMedio: 53242951.26,
      valorTerraNuaSuperior: 59178324.91,
      valorBenfeitorias: 5500000,
      valorPassivoAmbiental: 128754.32,
      valorAtivoAmbiental: 75000,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [],
      consideracaoFinal: '',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda São Vicente (cód. 9110540000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-sao-vicente.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MS-5005400-1U2V3W4X5Y6Z7A8B',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-sao-vicente.pdf',

      matriculas: 'Matrícula nº 81.357 – CRI de Maracaju/MS',
      matriculasAnexo: 'matricula-sao-vicente.pdf',

      arquivoVetorialShp: 'sao-vicente_vetorial.zip',
      arquivoVetorialShpAnexo: 'sao-vicente_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda São Vicente (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-sao-vicente.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda São Vicente',
      memorialDescritivoAnexo: 'memorial-descritivo-sao-vicente.pdf',

      observacao:
        'Aquisição onerosa (Banco do Brasil). Imóvel produtivo no Mato Grosso do Sul.',
    },
  },

  {
    imovel: {
      sr: 'SR(27)MBA',
      imovel: 'Fazenda Ana Célia',
      sncr: '',
      areaHa: 926.267,
      proprietario: 'Vale SA',
      processo: '54000.000000/0000-00',
      modalidade: 'Doação',
      situacao: 'Em Trâmite',
      municipio: 'Curionópolis',
      uf: 'PA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 91.753 – CRI de Curionópolis/PA',
      cpfCnpjProprietario: '33.592.510/0001-54',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 926.267,
      areaCertificada: 926.267,
      areaVisada: 926.267,
      vtiMedio: 58742951.26,
      vtnMedio: 53242951.26,
    },

    obtencao: {
      processoSei: '54000.000000/0000-00',
      situacao: 'Em Trâmite',
      entidadeDemandante: '',
      processoCadeiaDominial: '',
      formaObtencao: 'Doação',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: '',
      capacidadeAssentamento: 444,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 52368142.73,
      valorTotalImovelMedio: 58742951.26,
      valorTotalImovelSuperior: 65178324.91,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 47852136.73,
      valorTerraNuaMedio: 53242951.26,
      valorTerraNuaSuperior: 59178324.91,
      valorBenfeitorias: 5500000,
      valorPassivoAmbiental: 128754.32,
      valorAtivoAmbiental: 75000,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [
        'Imóvel produtivo com alto valor de benfeitorias.',
        'Não há ocupação irregular ou conflitos fundiários.',
      ],
      consideracaoFinal:
        'Resolução aprovada sem ressalvas, liberado para pagamento imediato.',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Ana Célia — código SNCR não informado',
      espelhoImovelSncrAnexo: 'espelho-sncr-ana-celia.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/PA-1504200-2V3W4X5Y6Z7A8B9C',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-ana-celia.pdf',

      matriculas: 'Matrícula nº 91.753 – CRI de Curionópolis/PA',
      matriculasAnexo: 'matricula-ana-celia.pdf',

      arquivoVetorialShp: 'ana-celia_vetorial.zip',
      arquivoVetorialShpAnexo: 'ana-celia_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda Ana Célia (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-ana-celia.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda Ana Célia',
      memorialDescritivoAnexo: 'memorial-descritivo-ana-celia.pdf',

      observacao:
        'Imóvel doado pela Vale SA. Área pequena com alto potencial de destinação.',
    },
  },

  {
    imovel: {
      sr: 'SR(28)DFE',
      imovel: 'Fazenda Centro Agropecuário',
      sncr: '4040630000000',
      areaHa: 4546.335,
      proprietario:
        'CODEVASF - Companhia de Desenvolvimento dos Vales do São Francisco e do Parnaíba',
      processo: '54000.111948/2023-13',
      modalidade: 'Doação',
      situacao: 'Em Trâmite',
      municipio: 'Brasilândia de Minas',
      uf: 'MG',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 12.987 – CRI de Brasilândia de Minas/MG',
      cpfCnpjProprietario: '00.399.207/0001-79',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 4546.335,
      areaCertificada: 4546.335,
      areaVisada: 4546.335,
      vtiMedio: 58742951.26,
      vtnMedio: 53242951.26,
    },

    obtencao: {
      processoSei: '54000.111948/2023-13',
      situacao: 'Em Trâmite',
      entidadeDemandante: '',
      processoCadeiaDominial: '',
      formaObtencao: 'Doação',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: '',
      capacidadeAssentamento: 987,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 52368142.73,
      valorTotalImovelMedio: 58742951.26,
      valorTotalImovelSuperior: 65178324.91,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 47852136.73,
      valorTerraNuaMedio: 53242951.26,
      valorTerraNuaSuperior: 59178324.91,
      valorBenfeitorias: 5500000,
      valorPassivoAmbiental: 128754.32,
      valorAtivoAmbiental: 75000,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [
        'Imóvel produtivo com alto valor de benfeitorias.',
        'Não há ocupação irregular ou conflitos fundiários.',
      ],
      consideracaoFinal:
        'Resolução aprovada sem ressalvas, liberado para pagamento imediato.',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda Centro Agropecuário (cód. 4040630000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-centro-agropecuario.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/MG-3108552-3W4X5Y6Z7A8B9C0D',
      demonstrativoImovelSicarAnexo:
        'demonstrativo-sicar-centro-agropecuario.pdf',

      matriculas: 'Matrícula nº 12.987 – CRI de Brasilândia de Minas/MG',
      matriculasAnexo: 'matricula-centro-agropecuario.pdf',

      arquivoVetorialShp: 'centro-agropecuario_vetorial.zip',
      arquivoVetorialShpAnexo: 'centro-agropecuario_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda Centro Agropecuário (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-centro-agropecuario.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda Centro Agropecuário',
      memorialDescritivoAnexo: 'memorial-descritivo-centro-agropecuario.pdf',

      observacao:
        'Doação da CODEVASF. Verificar vinculação com projetos de irrigação na Fase 6.',
    },
  },

  {
    imovel: {
      sr: 'SR(29)MSF',
      imovel: 'Fazenda São Jorge',
      sncr: '3100420000000',
      areaHa: 13621.934,
      proprietario: 'Banco do Nordeste',
      processo: '54000.106964/2025-56',
      modalidade: 'Aquisição Onerosa de Entidades Públicas (Compensação)',
      situacao: 'Em Trâmite',
      municipio: 'Juazeiro',
      uf: 'BA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 14.258 – CRI de Juazeiro/BA',
      cpfCnpjProprietario: '07.237.373/0001-20',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 13621.934,
      areaCertificada: 13621.934,
      areaVisada: 13621.934,
      vtiMedio: 58742951.26,
      vtnMedio: 53242951.26,
    },

    obtencao: {
      processoSei: '54000.106964/2025-56',
      situacao: 'Em Trâmite',
      entidadeDemandante: '',
      processoCadeiaDominial: '',
      formaObtencao: 'Aquisição Onerosa de Entidades Públicas (Compensação)',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: '',
      capacidadeAssentamento: 76,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 52368142.73,
      valorTotalImovelMedio: 58742951.26,
      valorTotalImovelSuperior: 65178324.91,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 47852136.73,
      valorTerraNuaMedio: 53242951.26,
      valorTerraNuaSuperior: 59178324.91,
      valorBenfeitorias: 5500000,
      valorPassivoAmbiental: 128754.32,
      valorAtivoAmbiental: 75000,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [
        'Imóvel produtivo com alto valor de benfeitorias.',
        'Não há ocupação irregular ou conflitos fundiários.',
      ],
      consideracaoFinal:
        'Resolução aprovada sem ressalvas, liberado para pagamento imediato.',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr:
        'Espelho SNCR - Fazenda São Jorge (cód. 3100420000000)',
      espelhoImovelSncrAnexo: 'espelho-sncr-sao-jorge.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/BA-2918407-4X5Y6Z7A8B9C0D1E',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-sao-jorge.pdf',

      matriculas: 'Matrícula nº 14.258 – CRI de Juazeiro/BA',
      matriculasAnexo: 'matricula-sao-jorge.pdf',

      arquivoVetorialShp: 'sao-jorge_vetorial.zip',
      arquivoVetorialShpAnexo: 'sao-jorge_vetorial.zip',

      mapaImpresso: 'Mapa - Fazenda São Jorge (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-sao-jorge.pdf',

      memorialDescritivo: 'Memorial Descritivo - Fazenda São Jorge',
      memorialDescritivoAnexo: 'memorial-descritivo-sao-jorge.pdf',

      observacao:
        'Aquisição onerosa (Banco do Nordeste). Área no semiárido baiano.',
    },
  },

  {
    imovel: {
      sr: 'SR(29)MSF',
      imovel: 'Salitre',
      sncr: '',
      areaHa: 33762.528,
      proprietario: 'Estado da Bahia',
      processo: '54000.018508/2025-50',
      modalidade: 'Doação',
      situacao: 'Em Trâmite',
      municipio: 'Juazeiro',
      uf: 'BA',
      acoes: ['Espelho', 'Histórico', 'Editar', 'Log'],

      matriculas: 'Matrícula nº 25.369 – CRI de Juazeiro/BA',
      cpfCnpjProprietario: '13.937.073/0001-30',
      nomeOutraParte: '',
      cpfCnpjOutraParte: '',
      areaRegistrada: 33762.528,
      areaCertificada: 33762.528,
      areaVisada: 33762.528,
      vtiMedio: 58742951.26,
      vtnMedio: 53242951.26,
    },

    obtencao: {
      processoSei: '54000.018508/2025-50',
      situacao: 'Em Trâmite',
      entidadeDemandante: '',
      processoCadeiaDominial: '',
      formaObtencao: 'Doação',
      acampamentoVinculado: '',
      imovelOcupado: false,
      orgaoConcorrente: '',
      capacidadeAssentamento: 956,
      acoesReintegracao: '',
      familiasCadastradas: undefined,
      grupo: undefined,
    },

    avaliacao: {
      valorTotalImovelInferior: 52368142.73,
      valorTotalImovelMedio: 58742951.26,
      valorTotalImovelSuperior: 65178324.91,
      valorTotalNegociado: undefined,
      valorTerraNuaInferior: 47852136.73,
      valorTerraNuaMedio: 53242951.26,
      valorTerraNuaSuperior: 59178324.91,
      valorBenfeitorias: 5500000,
      valorPassivoAmbiental: 128754.32,
      valorAtivoAmbiental: 75000,
    },

    processo: {
      fase: '',
      processualPecaDocumento: '',
      data: null,
      campoComplementar: '',
      defineFase: '',
      obrigatorio: '',
      responsavel: '',
      temPrazo: '',
      observacoes: '',
    },
    resolucaoCdr: {
      idResolucaoCdr: '003',
      dataResolucaoCdr: new Date('2026-05-20'),
      dataReuniaoCdr: new Date('2026-05-15'),
      consideracoes: [
        'Imóvel produtivo com alto valor de benfeitorias.',
        'Não há ocupação irregular ou conflitos fundiários.',
      ],
      consideracaoFinal:
        'Resolução aprovada sem ressalvas, liberado para pagamento imediato.',
      area: 8456.0,
      valorTotal: 148500000.0,
      valorTotalPorExtenso:
        'Cento e quarenta e oito milhões e quinhentos mil reais',
      valorTda: 140000000.0,
      valorTdaPorExtenso: 'Cento e quarenta milhões de reais',
      valorMoeda: 8500000.0,
      valorMoedaPorExtenso: 'Oito milhões e quinhentos mil reais',
      prazo: '30',
      responsavelPagamento: 'Banco do Brasil S.A - Sinop',
      cpfResponsavel: '333.444.555-66',
    },

    instrucaoBasica: {
      espelhoImovelSncr: 'Espelho SNCR - Salitre — código SNCR não informado',
      espelhoImovelSncrAnexo: 'espelho-sncr-salitre.pdf',

      demonstrativoImovelSicar:
        'Demonstrativo SICAR - CAR/BA-2918407-5Y6Z7A8B9C0D1E2F',
      demonstrativoImovelSicarAnexo: 'demonstrativo-sicar-salitre.pdf',

      matriculas: 'Matrícula nº 25.369 – CRI de Juazeiro/BA',
      matriculasAnexo: 'matricula-salitre.pdf',

      arquivoVetorialShp: 'salitre_vetorial.zip',
      arquivoVetorialShpAnexo: 'salitre_vetorial.zip',

      mapaImpresso: 'Mapa - Salitre (impresso/pdf)',
      mapaImpressoAnexo: 'mapa-salitre.pdf',

      memorialDescritivo: 'Memorial Descritivo - Salitre',
      memorialDescritivoAnexo: 'memorial-descritivo-salitre.pdf',

      observacao:
        'Doação do Estado da Bahia. Grande extensão no semiárido — verificar sobreposição com áreas indígenas na Fase 6.',
    },
  },
];

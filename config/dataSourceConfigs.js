const dataSourceConfigs = {
    '/api/payer_stats': {
      defaultPayers: [
        { value: 'Aetna', label: 'Aetna' },
        { value: 'Anthem', label: 'Anthem' },
        { value: 'UnitedHealthcare', label: 'UnitedHealthCare' }
      ],
      defaultCodes: [
        { value: '99211', label: '99211' },
        { value: '99212', label: '99212' },
        { value: '99215', label: '99215' }
      ],
      filterKeys: { payer: 'payer', code: 'code' }
    },
    '/api/provider_benchmarking': {
      defaultEntities: [
        { value: 'UCSF', label: 'UCSF' },
        { value: 'UCSF DENTAL ONCOLOGY', label: 'UCSF DENTAL ONCOLOGY' },
        { value: 'UCSF DEPARTMENT OF MEDICINE', label: 'UCSF DEPARTMENT OF MEDICINE' }
      ],
      defaultCodes: [
        { value: '99211', label: '99211' },
        { value: '99212', label: '99212' },
        { value: '99215', label: '99215' }
      ],
      filterKeys: { payer: 'entity_name', code: 'code' }
    }
  };


  export default dataSourceConfigs